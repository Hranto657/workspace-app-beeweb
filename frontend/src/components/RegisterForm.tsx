import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/auth/useAuth";
import { parseError } from "@/utils/parseError";
import Input from "./ui/Input";
import Button from "./ui/Button";
import FormError from "./ui/FormError";

type RegisterFormData = {
  fullName: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.fullName, data.email, data.password);
    } catch (error) {
      const message = parseError(error);
      setError("root", { message });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <Input
          label="Full Name"
          type="text"
          error={errors.fullName?.message}
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Full name must be at least 2 characters",
            },
          })}
        />

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
            validate: (val) =>
              (/[a-zA-Z]/.test(val) && /\d/.test(val)) ||
              "Password must contain at least one letter and one number",
          })}
        />

        <Button type="submit" isLoading={isSubmitting}>
          Register
        </Button>
      </form>

      <FormError error={errors.root} />
    </>
  );
}
