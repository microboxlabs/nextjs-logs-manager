"use server"
import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"

import { redirect } from "next/navigation"

export const loginForm = async (formData: FormData) => {
    const email = formData.get('email')
    const password = formData.get('password')
    if ((!email && !password)) return;

    try {
        await signIn("credentials", {
            email: email,
            password: password,
            redirect: true,
            redirectTo: '/dashboard'
        })
    } catch (error) {
        if (error instanceof AuthError) {
            return redirect(`/?error=${error.cause?.err?.message}`)
        }
        throw error
    }
}

export const logout = async () => {
    console.log('a')
    await signOut({
        redirect: true,
        redirectTo: '/'
    })
}