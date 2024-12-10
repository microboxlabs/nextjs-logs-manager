import SignInForm from "../components/SignInForm";
import Heading from "../components/Heading";

export default function SignIn() {
  return (
    <div>
      <Heading className="mb-6 text-center">Sign In</Heading>
      <SignInForm />
    </div>
  );
}
