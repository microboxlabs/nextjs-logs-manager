import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextInput, Alert } from "flowbite-react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      try {
        const responseVerify = await fetch("/api/auth/verifyToken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: token }),
        });
        const { valid } = await responseVerify.json();
        localStorage.setItem("valid", valid);
      } catch (error) {
        console.log(error);
      }
      localStorage.setItem("token", token);
      localStorage.setItem("user", username); // Store token securely (consider cookies)
      alert("Login successful");
      router.push("/home"); // Redirect to dashboard if login is successful
    } else {
      alert("Login failed");
      setErrorMessage(response.statusText);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center p-4 dark:bg-gray-800">
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Username
          </label>
          <TextInput
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block rounded-md border-gray-300 text-sm text-gray-700"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Password
          </label>
          <TextInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block rounded-md border-gray-300 text-sm text-gray-700"
          />
        </div>

        {errorMessage && (
          <Alert className="mt-4" color="danger">
            {errorMessage}
          </Alert>
        )}

        <Button
          type="submit"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
