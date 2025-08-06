import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { parseError } from "@/utils/parseError";
import Input from "./ui/Input";
import Button from "./ui/Button";
import FormError from "./ui/FormError";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      const message = parseError(error);
      setError("root", { message });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />

        <Button type="submit" isLoading={isSubmitting}>
          Log In
        </Button>
      </form>

      <FormError error={errors.root} />
    </>
  );
}
