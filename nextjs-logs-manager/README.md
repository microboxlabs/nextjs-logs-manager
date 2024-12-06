# Next.js Logs Manager

Para esta aplicación he usado las siguientes librerías:

1. **Auth.js o NextAuth** -> Es una librería que me permite hacer la autenticación de manera fácil y rápida, además se pueden usar proveedores de autenticación como Google y Github, se puede conectar con OAuth y es casi un estándar para Next.js.

2. **Prisma** -> Es un ORM muy completo y rápido, permite usar distintos motores de base de datos y simplifica bastante el trabajo.

3. **TS-Node** -> Para realizar el seed de los usuarios instalé TS-Node debido a que necesitaba ejecutar un script desde la carpeta seed con una función autoinvocada que borra los registros de los usuarios de la base de datos e inserta datos desde mi semilla. Lo mismo podría hacerse para logs de prueba.

4. **Zod** -> Zod es un validador de datos que soporta TypeScript, lo utilicé para validar mi schema de login.

5. **Bcryptjs** -> Lo utilicé para hashear las contraseñas al insertarlas en la base de datos y para compararlas al hacer login.

## Para correr la aplicación

1. Se debe copiar el archivo `env.template` y renombrarlo a `.env`, luego rellenar los campos faltantes: **DATABASE_URL** ('file:./prisma/dev.db') y **AUTH_SECRET** (puede ser cualquier string pero se recomienda usar el script `openssl rand -base64 32`)

2. Ejecutar el seed para crear los usuarios con ```npm run seed``` desde una terminal y dentro de la carpeta `nextjs-logs-manager`

3. Los datos para probar el sistema son:
  - Administrador:
    - Email: admin@test.com
    - Password: 123456
  - Usuario normal:
    - Email: user@test.com
    - Password: 123456