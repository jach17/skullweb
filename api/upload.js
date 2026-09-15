import { del, put } from '@vercel/blob';
import { requireSession } from './_lib/auth.js';
import { json, methodNotAllowed } from './_lib/http.js';

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const MAX_SIZE = 4 * 1024 * 1024;

export const config = {
  api: { bodyParser: false },
};

export default async function handler(request, response) {
  if (!requireSession(request, response)) return;

  try {
    if (request.method === 'POST') {
      const type = String(request.headers['content-type'] || '').split(';')[0];
      const length = Number(request.headers['content-length'] || 0);
      if (!ALLOWED_TYPES.has(type)) {
        return json(response, 415, { error: 'Formato de imagen no permitido.' });
      }
      if (length > MAX_SIZE) {
        return json(response, 413, { error: 'La imagen supera el límite de 4 MB.' });
      }

      const chunks = [];
      let size = 0;
      for await (const chunk of request) {
        size += chunk.length;
        if (size > MAX_SIZE) return json(response, 413, { error: 'La imagen supera el límite de 4 MB.' });
        chunks.push(chunk);
      }
      if (!size) return json(response, 400, { error: 'No se recibió ninguna imagen.' });

      const extension = type === 'image/jpeg' ? 'jpg' : type.split('/')[1];
      const pathname = `catalog/images/${crypto.randomUUID()}.${extension}`;
      const blob = await put(pathname, Buffer.concat(chunks), {
        access: 'public',
        addRandomSuffix: false,
        contentType: type,
        cacheControlMaxAge: 60 * 60 * 24 * 30,
      });
      return json(response, 201, { url: blob.url, pathname: blob.pathname });
    }

    if (request.method === 'DELETE') {
      const url = Array.isArray(request.query?.url) ? request.query.url[0] : request.query?.url;
      if (!isOwnedBlobUrl(url)) return json(response, 400, { error: 'URL de imagen inválida.' });
      await del(url);
      return json(response, 200, { deleted: true });
    }

    return methodNotAllowed(response, ['POST', 'DELETE']);
  } catch (error) {
    console.error('Upload error:', error);
    return json(response, 500, { error: 'No se pudo procesar la imagen.' });
  }
}

function isOwnedBlobUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.endsWith('.public.blob.vercel-storage.com');
  } catch {
    return false;
  }
}
