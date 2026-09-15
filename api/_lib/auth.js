import {
  createHmac,
  scryptSync,
  timingSafeEqual,
} from 'node:crypto';

const COOKIE_NAME = 'skullstudio_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function encode(value) {
  return Buffer.from(value).toString('base64url');
}

function sign(payload) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET no está configurado.');
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function parseCookies(request) {
  return Object.fromEntries(
    String(request.headers.cookie || '')
      .split(';')
      .map(part => part.trim())
      .filter(Boolean)
      .map(part => {
        const separator = part.indexOf('=');
        if (separator < 0) return [part, ''];
        return [part.slice(0, separator), decodeURIComponent(part.slice(separator + 1))];
      })
  );
}

export function verifyPassword(password) {
  const stored = process.env.ADMIN_PASSWORD_HASH || '';
  const [salt, expectedHex] = stored.split(':');
  if (!salt || !expectedHex || !/^[a-f0-9]+$/i.test(expectedHex)) return false;

  const actual = scryptSync(String(password), salt, expectedHex.length / 2);
  const expected = Buffer.from(expectedHex, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function createSessionCookie(username) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const payload = encode(JSON.stringify({ username, expiresAt }));
  const token = `${payload}.${sign(payload)}`;

  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_DURATION_SECONDS}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

export function getSession(request) {
  try {
    const token = parseCookies(request)[COOKIE_NAME];
    if (!token) return null;
    const separator = token.lastIndexOf('.');
    if (separator < 0) return null;

    const payload = token.slice(0, separator);
    const receivedSignature = Buffer.from(token.slice(separator + 1));
    const expectedSignature = Buffer.from(sign(payload));
    if (
      receivedSignature.length !== expectedSignature.length ||
      !timingSafeEqual(receivedSignature, expectedSignature)
    ) return null;

    const session = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (!session.expiresAt || session.expiresAt <= Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}

export function requireSession(request, response) {
  const session = getSession(request);
  if (!session) {
    response.status(401).json({ error: 'Sesión no válida o expirada.' });
    return null;
  }
  return session;
}
