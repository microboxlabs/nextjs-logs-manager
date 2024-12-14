'use client'
import Link from "next/link"
import { useState } from "react";
import { RiEyeCloseLine, RiEyeLine, RiLoginBoxLine } from "react-icons/ri";
import { AiOutlineUser,  } from "react-icons/ai";
import { useRouter } from "next/navigation";
//import { formLogin } from "../../../actions/authActions";


export default function Login(){
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // setLoading(true);
    // try {
    //   const loginResult = await formLogin(formData);
    //   console.log("loginResult", loginResult);
    //   if (!loginResult.error) {
    //     router.push("/");
    //   }
    // } catch (error) {
    //   const { message } = error as Error;
    //   setError(message.split(".")[0] ?? "Authentication failed");
    //   setLoading(false);
    // }
  }


    return(
        <div >
        <div className="w-[400px] bg-gray-50 rounded-md shadow-md px-12 py-8 flex flex-col items-center border border-gray-300">
      <h3 className="text-xl font font-semibold">Login</h3>
      <h4 className="text-sm font-light mt-2">Access to your account</h4>
      <form  className="mt-4 w-full">
        <div className="flex flex-col mt-2">
          <div className="border border-gray-300 p-2 rounded-md bg-gray-100 flex gap-2 items-center">
            <AiOutlineUser className="w-5 h-5 text-gray-600" />
            <input
              type="text"
              name="username"
              placeholder="Enter your User"
              className=" focus:outline-none bg-gray-100 text-xs placeholder:text-xs"
            />
          </div>
          <div className="border border-gray-300 p-2 rounded-md bg-gray-100 flex gap-2 items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              {/* <RiEyeCloseLine className="w-5 h-5 text-gray-600" />  */}
              <RiEyeLine 
              className="w-4 h-4 cursor-pointer text-gray-600"
              onClick={() => setViewPassword(!viewPassword)}
            />
              <input
                type={viewPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="focus:outline-none bg-gray-100 text-xs placeholder:text-xs"
              />
            </div>
            
          </div>

          <button
            type="submit"
            className="bg-neutral-700 text-white font-semibold p-2 rounded-md mt-6 hover:bg-neutral-500 flex items-center justify-center h-10"
          >
            {loading ? (
              <RiLoginBoxLine className="h-5 w-5 animate-spin" />
            ) : (
              "Login"
            )}
          </button>
          {error && <p className="text-red-500 text-xs mt-2 w-full text-center">{error}</p>}
        </div>
      </form>
        </div>
        </div>
    )
}