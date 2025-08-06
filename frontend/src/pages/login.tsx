import LoginForm from "@/components/LoginForm";
import FormWrapper from "@/components/ui/FormWrapper";
import { withGuestGuard } from "@/hoc/withGuestGuard";

function LoginPage() {
  return (
    <FormWrapper title="Login">
      <LoginForm />
    </FormWrapper>
  );
}

export default withGuestGuard(LoginPage);
