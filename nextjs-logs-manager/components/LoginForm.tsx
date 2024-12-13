"use client"

import { loginForm } from '@/actions/loginForm'
import { useForm } from '@/hooks/useForm'

export const LoginForm = () => {

    const { formData, changeFormValues, resetForm } = useForm()

    return (
        <form action={loginForm} onSubmit={resetForm} className="mt-2 flex flex-col gap-2">
            <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input onChange={(e) => changeFormValues(e.target)} value={formData.email} type="email" id="email" name="email" placeholder="asd123@asd123.com" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input onChange={(e) => changeFormValues(e.target)} value={formData.password} type="password" id="password" name="password" placeholder="******" />
            </div>
            <button type="submit" className="p-2 text-white rounded w-full bg-blue-500 hover:bg-blue-600">Login</button>
        </form>
    )
}
