import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Input from "./ui/Input";
import Button from "./ui/Button";

type RegisterFormData = {
  fullName: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const { register: registerUser } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      await registerUser(data.fullName, data.email, data.password);
    } catch (err: any) {
      setServerError(err.message || "Registration failed");
    }
  };

  return (
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

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
