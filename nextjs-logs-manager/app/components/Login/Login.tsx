"use client"

import { Alert, Button, Label, TextInput } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [invalidCredentials, setInvalidCredentials] = useState("")
    const router = useRouter();


    const handleSubmit = async (username: string, password: string) => {

      setInvalidCredentials("")

        if (!password || !username) return;

        try {
           const data = await fetch("/api/auth", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password}),
              })

              if (!data.ok) {
                setInvalidCredentials("Credenciales inválidas")
                return;
              }

              router.push("dashboard")

        } catch (error) {
            setInvalidCredentials("Algo salió mal")
        }

    }

  return (
<>
 <div className='flex-col justify-items-center p-5 bg-slate-50 '>

    {invalidCredentials && (
        <Alert color="failure" className="mb-4">
            <span className="font-medium">{invalidCredentials}</span>
        </Alert>
        )}

        <h1 className='mb-2'>Debes iniciar sesión</h1>
    <div>
      <div className="mb-2">
        <Label htmlFor="Username" value="Tu user" />
      </div>
      <TextInput value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Usuario" />
    </div>
    <div>
      <div className="mb-2 my-1 block">
        <Label htmlFor="password" value="Password" />
      </div>
      <TextInput value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Contraseña' />
    </div>
    <Button onClick={() => handleSubmit(username, password)} className='my-4' size={"sm"} type="submit">Ingresar</Button>

    </div>

    </>
  )
}

export default Login
