import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Input from "./ui/Input";
import Button from "./ui/Button";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      await login(data.email, data.password);
    } catch (err: any) {
      setServerError(err.message || "Login failed");
    }
  };

  return (
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

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <Button type="submit" isLoading={isSubmitting}>
        Log In
      </Button>
    </form>
  );
}
