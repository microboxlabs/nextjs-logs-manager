import Header from "@/src/components/auth/Header";
import AuthFooter from "@/src/components/auth/AuthFooter";
import SignInForm from "@/src/components/auth/forms/SignInForm";
import FormWrapper from "@/src/components/auth/FormWrapper";

export default function Page() {
  return (
    <>
      <Header
        title="Unlock your LogSpace"
        description="Navigate your data and keep track of what matters."
        image="/assets/strategy_3.webp"
      />
      <FormWrapper page="register">
        <SignInForm />
      </FormWrapper>
      <AuthFooter />
    </>
  );
}
