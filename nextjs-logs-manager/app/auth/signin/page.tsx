"use client";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen p-4 dark:bg-gray-800">
        <h1 className="mx-4 mb-4 text-2xl font-bold dark:text-white">Login</h1>
        <LoginForm />
      </main>
    </>
  );
};

export default LoginPage;
