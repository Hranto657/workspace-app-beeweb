import RegisterForm from "@/components/RegisterForm";
import FormWrapper from "@/components/ui/FormWrapper";
import { withGuestGuard } from "@/hoc/withGuestGuard";

function RegisterPage() {
  return (
    <FormWrapper title="Register">
      <RegisterForm />
    </FormWrapper>
  );
}

export default withGuestGuard(RegisterPage);
