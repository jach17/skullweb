import { requireSession } from './_lib/auth.js';
import { readCatalog, writeCatalog } from './_lib/catalog-store.js';
import { getRequestBody, json, methodNotAllowed } from './_lib/http.js';

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      return json(response, 200, await readCatalog());
    }

    if (request.method === 'PUT') {
      if (!requireSession(request, response)) return;
      const { products, version } = getRequestBody(request);
      const catalog = await writeCatalog(products, Number(version));
      return json(response, 200, { initialized: true, ...catalog });
    }

    return methodNotAllowed(response, ['GET', 'PUT']);
  } catch (error) {
    console.error('Catalog error:', error);
    return json(response, error.statusCode || 500, {
      error: error.statusCode ? error.message : 'No se pudo acceder al catálogo.',
    });
  }
}
