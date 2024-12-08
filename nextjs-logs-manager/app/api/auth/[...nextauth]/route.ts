/**
 * Configuración de NextAuth.js para autenticación local
 * Este archivo maneja:
 * 1. Autenticación con email/password
 * 2. Roles de usuario (ADMIN/REGULAR)
 * 3. Persistencia de sesión
 */

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "next-auth"

/**
 * Base de datos simulada de usuarios
 * En producción, esto debería estar en una base de datos real
 * 
 * Estructura de usuario:
 * - id: Identificador único
 * - email: Correo para login
 * - password: Contraseña (en producción debe estar hasheada)
 * - role: ADMIN o REGULAR
 */
const users: (User & { password: string })[] = [
  {
    id: "1",
    email: "admin@local.com",
    password: "admin123", // En producción, esta contraseña debe estar hasheada
    role: "ADMIN" as const,
  },
  {
    id: "2",
    email: "user@local.com",
    password: "user123",
    role: "REGULAR" as const,
  },
]

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // Define la estructura del formulario de login
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      /**
       * Función de autorización
       * @param credentials - Datos del formulario de login
       * @returns Usuario autenticado o null
       */
      async authorize(credentials): Promise<User | null> {
        // Validación básica de campos
        if (!credentials?.email || !credentials?.password) return null
        
        // Busca el usuario en nuestra "base de datos"
        const user = users.find(user => user.email === credentials.email)
        
        // Verifica credenciales y retorna usuario sin password
        if (user && user.password === credentials.password) {
          const { password, ...userWithoutPassword } = user
          return userWithoutPassword
        }
        return null
      }
    })
  ],
  callbacks: {
    /**
     * Callback para personalizar el token JWT
     * Se ejecuta cuando se crea o actualiza el token
     */
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role // Añade el rol al token
      }
      return token
    },
    /**
     * Callback para personalizar la sesión
     * Se ejecuta cuando se crea o verifica una sesión
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "ADMIN" | "REGULAR"
      }
      return session
    }
  },
  // Configuración de páginas personalizadas
  pages: {
    signIn: '/login', // Ruta a la página de login personalizada
  },
})

export { handler as GET, handler as POST } 