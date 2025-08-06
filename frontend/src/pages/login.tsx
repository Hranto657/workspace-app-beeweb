import LoginForm from "@/components/LoginForm";
import FormWrapper from "@/components/ui/FormWrapper";
import { withGuestGuard } from "@/hoc/withGuestGuard";
import { useEffect } from "react";
import { queryClient } from "./_app";

function LoginPage() {
  useEffect(() => {
    queryClient.clear();
  }, []);

  return (
    <FormWrapper title="Login">
      <LoginForm />
    </FormWrapper>
  );
}

export default withGuestGuard(LoginPage);
