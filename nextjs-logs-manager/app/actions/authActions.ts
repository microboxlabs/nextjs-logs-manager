// "use server";

// import { signOut } from "@/auth";

// export async function Logout() {
//   await signOut();
// }
// import { signIn } from "@/auth";


// export async function login(credentials: { username: string; password: string }) {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/users`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(credentials),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || "Authentication failed");
//     }
//     console.log("body", JSON.stringify(credentials));
//     const data = await response.json();
//     console.log("data", data);
//     return data
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// }

// export async function getUser(username: string) {
//   try {
//     const result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/users?username=${username}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await result.json();
//     return {
//       userId: data.id,
//       role: data.role,
//       username: data.username,
//     };
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function formLogin(formData: FormData) {
//   const username = formData.get("username") as string;
//   //const parsedUser = username.toLowerCase();
//   const password = formData.get("password");

//   console.log("parsedausername estoy en authActions.ts", username);

//   try {
//     const result = await signIn("credentials", {
//       username: username,
//       password: password as string,
//       redirect: false,
//     });

//     console.log("result estoy en authActions.ts", result);
//     console.log("email estoy en authActions.ts", username);
//     console.log("password estoy en authActions", password);
//     console.log("redirect estoy en authActions", false);

//     return result;
//   } catch (error) {
//     console.log("actions error", error);
//     throw new Error((error as Error).message);
//   }
// }
// export async function logOut() {
//   try {
//     // Lógica para cerrar sesión
//     localStorage.removeItem("token");
//   } catch (error) {
//     console.error("Logout error:", error);
//   }
// }