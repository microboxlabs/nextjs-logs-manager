import { users } from "@/app/userData/user";
import { NextResponse } from "next/server";



export async function POST(req: Request) { 

    const {username, password} = await req.json();

    const user = Object.values(users).find(
        (user) => user.userName === username && user.password === password
      );


    if (!user) {
        return NextResponse.json({error: "Credenciales inválidas"}, {status: 401})
    }

    const response = NextResponse.json({message: "Iniciado correctamente"})


     response.cookies.set("auth-token", user.role, {
        path: "/"
    })
    
    return response;


}



