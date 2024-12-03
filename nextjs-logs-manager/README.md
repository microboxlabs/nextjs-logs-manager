## Utilización

Para utilizar el código se requiere seguir los siguientes pasos:

- Inicia el proyecto con el comando `npm i`
- Agrega un archivo `.env` con
  ```tsx
  SECRET="Palabra secreta para el hasheado de elementos”
  ```
- En la terminal escribir el comando “`npx prisma db push`”
- Agregar roles y tipo de logs a la base de datos con los comandos:
  ```tsx
  sqlite3 dev.db "INSERT INTO Role (name) VALUES ('Admin')"
  sqlite3 dev.db "INSERT INTO Role (name) VALUES ('Regular')"
  sqlite3 dev.db "Select * from role"

  sqlite3 dev.db "INSERT INTO Type (name) VALUES ('ERROR')"
  sqlite3 dev.db "INSERT INTO Type (name) VALUES ('INFO')"
  sqlite3 dev.db "INSERT INTO Type (name) VALUES ('WARNING')"
  ```
- Ejecutar el código con `npm run dev`.

## Aprendizaje

Para la realización de esta prueba técnica se uso `NextJs` con `Tailwind`, usando componentes predefinidos de la librería `flowbite`.

Como `ORM` utilizamos Prisma para facilitar el acceso a la base de datos la cual es `SQLite`

Para la creación de la base de dato simplemente al instanciar la `ORM` (con `npm i @prisma/client`) y generar prisma con `npx prisma init` luego se instala SQLite con `npm install sqlite3`

con esto generado podremos ir a la carpeta prisma creada en el proyecto y en esta agregamos una base de datos llamada `dev.db` con eso aplicado podemos pasar al desarrollo del `schema` , en este caso nuestro schema se ve de la siguiente forma:

```jsx
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite" // obvio por la base de dato que usamos
  url      = "file:./dev.db" // definimos la posicion de la base de datos
}

model Role {
  id        Int     @id @default(autoincrement())
  name      String  @unique
	user      User[] // esto hace referencia a una relacion de 1 a 1
}

model User {
  id        Int       @id @default(autoincrement())
  username  String    @unique
  password  String
  role      Role      @relation(fields: [roleId], references: [id])
  roleId    Int
}

model Type {
  id        Int       @id @default(autoincrement())
  name      String    @unique
  log       Log[]
}

model Log {
  id        Int       @id @default(autoincrement())
  datetime  DateTime
  type      Type      @relation(fields: [typeId], references: [id])
  typeId    Int
  service   String
  message   String
}
```

con esto aplicamos esto a `dev.db` con el comando `npx prisma db push` para crear a base de nuestro esquema.

Para la carga de valores base no listable se utilizo

```jsx
sqlite3 dev.db "INSERT INTO Role (name) VALUES ('Admin')"
sqlite3 dev.db "INSERT INTO Role (name) VALUES ('Regular')"
sqlite3 dev.db "Select * from role"

sqlite3 dev.db "INSERT INTO Type (name) VALUES ('ERROR')"
sqlite3 dev.db "INSERT INTO Type (name) VALUES ('INFO')"
sqlite3 dev.db "INSERT INTO Type (name) VALUES ('WARNING')"

sqlite3 dev.db "INSERT INTO Route (path, roleid) VALUES ('/dashboard', 2)"
sqlite3 dev.db "INSERT INTO Route (path, roleid) VALUES ('/log_loading', 1)"
```

Al front end se le agrego un elemento extra siendo este `react-hot-toast` ya que su implementación es algo mas sencilla y cómoda tanto de programar como de usar.

Para la creación o mejor dicho “mantención” de contraseñas de usuario se utilizo `bcrypt` junto con lógicas custom para la lectura, confirmación y almacenamiento de datos de usuario (**la sesión se almacena directamente en la maquina local, pero almacenarla en la base de datos permitiría al usuario cerrar su cuenta en todos los dispositivos conectados, lo que lo haría mas seguro**).

Para el proceso de encriptación y desencriptación de un `jwt` utilizaremos la librería `jose` principalmente por que es abiertamente usada para el propósito de firmado y desencriptación de `json web tokens`.

uno de los temas aprendidos durante este desarrollo es el uso de `middlewares`, este (al igual que al trabajar en rest api’s convencionales) nos permite especificar código que se ejecutara antes de llegar a cierta llamada de un “`endpoint`” permitiéndonos cosas como por ejemplo verificar los permisos del usuario antes de que acceda a cierto endpoint, asegurándonos de que solo pueda ver la información que uno tenga permitido.

La utilización de estos se basa netamente en la creación de un archivo con el nombre `middleware.tsx` en la ruta base, aquí se definirá un middleware y en que rutas este funcionara, por ejemplo:

```jsx
// definimos la base del middleware
export const middleware = (request: NextRequest) => {
	return NextResponse.redirect(new URL("/login", request.url))
}

// definimos los endpoints donde actuara
export const config = {
	matcher: "/home"
}
```

Lo que este ejemplo hace es que cada vez que el usuario entre a la pagina `/home` este sera redirigido a la pagina `/login` , mas cosas como esta se pueden hacer, pero usualmente lo ideal es guardarlo para lógica algo mas necesaria.

Uno de los elementos que salió mal durante el desarrollo fue la implementación de rutas dinámicamente definidas desde la base de datos, para así definir una ruta y su nivel requerido para acceder, la razon por la que no pude es por que los middlewares son “edge functions” o un tipo extraño de “funciones serverless” por lo que no se puede usar el client de prisma para acceder a los datos, teóricamente se podría hacer simplemente accediendo a los datos de forma común (haciendo una llamada directa a sqlite3) pero por temas de tiempo se definió la siguiente alternativa:

```tsx
// middleware.ts

// cuando se quieren agregar nuevas rutas se agregan aqui, el 1 y 2 hacen
// referencia al rol requerido para abrir esta ruta siendo:
// - 1. Admin
// - 2. Regular
const routes = new Map<string, number>([
  ["/log_loading", 1],
  ["/dashboard", 2],
]);
```

Otro cambio aplicado son los toast, la funcionalidad de los toast básicos de flowbite no se me hacen visualmente atractivos, mientras que con react-hot-toast (una librería light weight que los crea en un formato mas animado) podemos definir fácilmente elementos como animaciones y otros que haga la aplicación mas dinámica.

---

En tiempo de ejecución en los casos donde cosas como los toasts de el dashboard se ejecutan 2 veces, esto es por que por defecto en nextjs react strict_mode viene activo, esto lo hace activar 2 veces el useEffect
