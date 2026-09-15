import {
  BlobNotFoundError,
  BlobPreconditionFailedError,
  head,
  put,
} from '@vercel/blob';

const CATALOG_PATH = 'catalog/data/catalog.json';
const ALLOWED_CATEGORIES = new Set(['Tatuajes', 'Piercing', 'Piezas']);
const MAX_PRODUCTS = 500;

function normalizeText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function normalizeProduct(product) {
  const id = typeof product?.id === 'number'
    ? product.id
    : normalizeText(product?.id, 100);
  const name = normalizeText(product?.name, 150);
  const description = normalizeText(product?.description, 3000);
  const category = normalizeText(product?.category, 50);
  const image = normalizeText(product?.image, 2000);
  const imagePath = normalizeText(product?.imagePath, 500);

  if ((!id && id !== 0) || !name || !ALLOWED_CATEGORIES.has(category)) {
    throw new Error('El catálogo contiene un producto inválido.');
  }
  if (!image && !description) {
    throw new Error(`El producto "${name}" necesita imagen o descripción.`);
  }
  if (image && !isAllowedImageUrl(image)) {
    throw new Error(`La imagen de "${name}" no pertenece a una ubicación permitida.`);
  }

  return {
    id,
    name,
    description,
    image,
    imagePath,
    category,
    price: '',
    active: product.active !== false,
  };
}

function isAllowedImageUrl(url) {
  if (/^assets\/[a-z0-9_./-]+$/i.test(url)) return true;
  try {
    return new URL(url).hostname.endsWith('.public.blob.vercel-storage.com');
  } catch {
    return false;
  }
}

export function validateProducts(products) {
  if (!Array.isArray(products) || products.length > MAX_PRODUCTS) {
    throw new Error('El catálogo debe ser una lista de máximo 500 productos.');
  }
  const normalized = products.map(normalizeProduct);
  const ids = new Set(normalized.map(product => String(product.id)));
  if (ids.size !== normalized.length) throw new Error('Hay IDs de producto duplicados.');
  return normalized;
}

export async function readCatalog() {
  let metadata;
  try {
    metadata = await head(CATALOG_PATH);
  } catch (error) {
    if (error instanceof BlobNotFoundError) {
      return { initialized: false, version: 0, updatedAt: null, products: null };
    }
    throw error;
  }

  const response = await fetch(`${metadata.url}?v=${encodeURIComponent(metadata.etag)}`, {
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('No se pudo leer el catálogo almacenado.');
  return { initialized: true, etag: metadata.etag, ...(await response.json()) };
}

export async function writeCatalog(products, expectedVersion) {
  const previous = await readCatalog();

  if (
    previous?.initialized &&
    Number.isInteger(expectedVersion) &&
    expectedVersion !== previous.version
  ) {
    const error = new Error('El catálogo cambió en otra sesión. Recarga antes de guardar.');
    error.statusCode = 409;
    throw error;
  }

  const nextVersion = (previous?.version || 0) + 1;
  const updatedAt = new Date().toISOString();
  let validProducts;
  try {
    validProducts = validateProducts(products);
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
  const catalog = { version: nextVersion, updatedAt, products: validProducts };
  try {
    await put(CATALOG_PATH, JSON.stringify(catalog), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: previous.initialized,
      ...(previous.etag ? { ifMatch: previous.etag } : {}),
      contentType: 'application/json; charset=utf-8',
      cacheControlMaxAge: 60,
    });
  } catch (error) {
    if (error instanceof BlobPreconditionFailedError) {
      const conflict = new Error('El catálogo cambió en otra sesión. Recarga antes de guardar.');
      conflict.statusCode = 409;
      throw conflict;
    }
    throw error;
  }

  return catalog;
}
