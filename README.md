# Skull Studio Web

Sitio estático con catálogo administrable y persistencia compartida mediante
Vercel Blob. Las imágenes incluidas originalmente siguen sirviéndose desde
`src/assets`; las nuevas imágenes y el catálogo editable se almacenan en Blob.

## Variables de entorno

Configura estas variables en Vercel para Production:

```text
BLOB_READ_WRITE_TOKEN
ADMIN_USERNAME
ADMIN_PASSWORD_HASH
SESSION_SECRET
```

`BLOB_READ_WRITE_TOKEN` se crea automáticamente al conectar un Blob Store
**público** al proyecto. No debe exponerse en el frontend.

Genera el hash de contraseña localmente:

```bash
npm run hash-password -- "una-contraseña-larga"
```

Copia la salida completa como valor de `ADMIN_PASSWORD_HASH`. Genera el secreto
de sesión con:

```bash
npm run generate-secret
```

Copia la salida como `SESSION_SECRET`. Después de crear o modificar variables,
haz un redeploy de Production.

## Desarrollo

```bash
npm install
vercel env pull .env.local
npx vercel dev
```

El frontend está en `src` y las Functions están en `api`.

## Persistencia

- Catálogo: `catalog/data/catalog.json` en Vercel Blob.
- Imágenes nuevas: `catalog/images/<uuid>.webp`.
- El primer cambio guardado desde el dashboard inicializa Blob con los productos
  precargados en `app.js`.
- Las escrituras usan versión y ETag para detectar ediciones simultáneas.
- Las imágenes se reducen a un máximo de 1920 px y se convierten a WebP antes
  de subirlas.
- Tamaño máximo después de optimizar: 4 MB.

## Despliegue

El archivo `vercel.json` define `src` como salida estática. Vercel despliega las
Functions de `api` junto con el sitio. Para probar la persistencia, crea o edita
un producto en Production y abre el catálogo desde otro navegador.
