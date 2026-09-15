export function json(response, status, body) {
  response.status(status);
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.json(body);
}

export function methodNotAllowed(response, allowed) {
  response.setHeader('Allow', allowed.join(', '));
  json(response, 405, { error: 'Método no permitido.' });
}

export function getRequestBody(request) {
  if (request.body && typeof request.body === 'object') return request.body;
  if (!request.body) return {};

  try {
    return JSON.parse(request.body);
  } catch {
    return {};
  }
}
