import UserController from "@/app/db/controller/userController";


export async function GET(){
    try{
        const users = await UserController.listUsers()
        console.log(users)
        return new Response(JSON.stringify(users),{status:200})
    } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error as Error }), { status: 500 });
  }
}
//---> RESOLVER EL GETUSER

// export async function GETUSER(username: string){
//     try{
//         const users = await UserController.getUser(username)
//         console.log(users)
//         return new Response(JSON.stringify(users),{status:200})
//     } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: error as Error }), { status: 500 });
//   }
// }



export async function POST(req: Request){
    try {
        const { username, password, role } = await req.json();
        const newUser = await UserController.addUser(username, password, role);
        return new Response(JSON.stringify(newUser), { status: 201 });
      } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error as Error }), { status: 500 });
      }
    }
