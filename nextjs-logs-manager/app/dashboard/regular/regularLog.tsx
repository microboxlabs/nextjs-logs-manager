'use client'
import { useEffect, useState } from "react";

export default function RegularDashboard() {
  return(
    <div>
      <h1>Hello User</h1>
    </div>
  )
}

// const Login = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const storedDarkMode = localStorage.getItem("darkMode");
//     if (storedDarkMode === "enabled") {
//       setDarkMode(true);
//       document.body.classList.add("dark");
//     }
//   }, []);

//   const toggleDarkMode = () => {
//     if (darkMode) {
//       document.body.classList.remove("dark");
//       localStorage.setItem("darkMode", "disabled");
//       setDarkMode(false);
//     } else {
//       document.body.classList.add("dark");
//       localStorage.setItem("darkMode", "enabled");
//       setDarkMode(true);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-white dark:from-gray-800 dark:to-gray-900">
//       <div className="absolute top-4 right-4">
//         <button
//           onClick={toggleDarkMode}
//           className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
//         >
//           Toggle Dark Mode
//         </button>
//       </div>
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 dark:text-gray-100">
//           Login
//         </h2>
//         <form className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-gray-500"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-gray-500"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
//           <a
//             href="#"
//             className="text-blue-500 hover:underline dark:text-blue-400"
//           >
//             Forgot Password?
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;