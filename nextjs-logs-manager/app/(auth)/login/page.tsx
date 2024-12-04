
export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col rounded border border-gray-100 p-10">
        <h1 className="mb-5 text-xl font-bold">Iniciar sesión</h1>
        <form action="" className="flex flex-col">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm">Correo electrónico</label>
            <input type="text" className="rounded border border-gray-200"/>
          </div>
          <div className="my-5 flex flex-col space-y-2">
            <label htmlFor="password" className="text-sm">Contraseña</label>
            <input type="password" className="rounded border border-gray-200"/>
          </div>
          <button type="submit" className="btn-primary">Entrar</button>
        </form>
      </div>
    </div>
  );
}