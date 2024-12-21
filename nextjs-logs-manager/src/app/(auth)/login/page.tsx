import FormWrapper from "@/src/components/auth/FormWrapper";
import Header from "@/src/components/auth/Header";
import AuthFooter from "@/src/components/auth/AuthFooter";
import LoginForm from "@/src/components/auth/forms/LoginForm";

export default function Page() {
  return (
    <>
      <Header
        title="Welcome to LogSpace"
        description="Effortless log management at your fingertips."
        image="/assets/slang_to_the_moon.webp"
      />
      <FormWrapper page="login">
        <LoginForm />
      </FormWrapper>
      <AuthFooter />
    </>
  );
}
