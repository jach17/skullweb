import { getSession } from '../_lib/auth.js';
import { json, methodNotAllowed } from '../_lib/http.js';

export default function handler(request, response) {
  if (request.method !== 'GET') return methodNotAllowed(response, ['GET']);
  const session = getSession(request);
  return json(response, 200, {
    authenticated: Boolean(session),
    username: session?.username || null,
  });
}
