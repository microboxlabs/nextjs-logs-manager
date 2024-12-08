'use client'

import { useState } from 'react'
import { Button, Card, Label, TextInput, DarkThemeToggle, Alert, Tooltip } from 'flowbite-react'
import { HiMail, HiLockClosed, HiInformationCircle } from 'react-icons/hi'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Credenciales inválidas')
        setLoading(false)
        return
      }

      // Redirigir a logs (ruta válida para ambos roles)
      router.push('/pages/logs')
      
    } catch (error) {
      setError('Ocurrió un error al iniciar sesión')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="absolute right-4 top-4">
        <DarkThemeToggle />
      </div>

      <div className="absolute left-4 top-4">
        <Tooltip
          content={
            <div className="w-80 p-2">
              <p className="font-bold mb-2">Credenciales de prueba:</p>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold">Admin:</p>
                  <p>Email: admin@local.com</p>
                  <p>Password: admin123</p>
                </div>
                <div>
                  <p className="font-semibold">Usuario Regular:</p>
                  <p>Email: user@local.com</p>
                  <p>Password: user123</p>
                </div>
              </div>
            </div>
          }
          placement="right"
          style="dark"
        >
          <Button color="gray" size="sm">
            <HiInformationCircle className="size-5" />
          </Button>
        </Tooltip>
      </div>
      
      <Card className="w-full max-w-md">
        <div className="space-y-6 p-6">
          <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Iniciar Sesión
          </h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                name="email"
                type="email"
                icon={HiMail}
                placeholder="nombre@compañia.com"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Contraseña" />
              </div>
              <TextInput
                id="password"
                name="password"
                type="password"
                icon={HiLockClosed}
                required
              />
            </div>

            {error && (
              <Alert color="failure">
                {error}
              </Alert>
            )}

            <Button type="submit" isProcessing={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
} 