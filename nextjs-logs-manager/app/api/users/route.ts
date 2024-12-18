import UserController from "@/app/db/controller/userController";


export async function GET(req: Request) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");

  try {
    if (username) {
      const user = await UserController.getUser(username);
      return new Response(JSON.stringify(user), { status: 200 });
    } else {
      const users = await UserController.listUsers();
      return new Response(JSON.stringify(users), { status: 200 });
    }
  } catch (error) {
    console.error("GET error:", error);
    return new Response(JSON.stringify({ error: error as Error }), { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const { username, email, password, role } = await req.json();
    const newUser = await UserController.addUser(username, email, password, role);
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: error as Error }), { status: 500 });
  }
}
