import { createSessionCookie, verifyPassword } from '../_lib/auth.js';
import { getRequestBody, json, methodNotAllowed } from '../_lib/http.js';

export default function handler(request, response) {
  if (request.method !== 'POST') return methodNotAllowed(response, ['POST']);

  const { username, password } = getRequestBody(request);
  const expectedUsername = process.env.ADMIN_USERNAME;
  if (!expectedUsername || !process.env.ADMIN_PASSWORD_HASH || !process.env.SESSION_SECRET) {
    return json(response, 503, { error: 'La autenticación no está configurada.' });
  }

  if (String(username) !== expectedUsername || !verifyPassword(password)) {
    return json(response, 401, { error: 'Usuario o contraseña incorrectos.' });
  }

  response.setHeader('Set-Cookie', createSessionCookie(expectedUsername));
  return json(response, 200, { authenticated: true, username: expectedUsername });
}
