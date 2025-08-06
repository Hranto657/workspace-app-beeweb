import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import FormError from "@/components/ui/FormError";

import { useCheckSlugAvailability } from "@/hooks/workspaces/useCheckSlugAvailability";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface FormValues {
  name: string;
  slug: string;
}

interface WorkspaceFormProps {
  mode: "create" | "edit";
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  isSubmitting?: boolean;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function WorkspaceForm({
  mode,
  initialValues,
  onSubmit,
  isSubmitting = false,
}: WorkspaceFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialValues ?? {
      name: "",
      slug: "",
    },
  });
  const isSlugTouched = useRef(false);

  const name = watch("name");
  const slug = watch("slug");
  const router = useRouter();

  const {
    mutate: checkSlug,
    data: slugCheckResult,
    isPending: isCheckingSlug,
  } = useCheckSlugAvailability();

  // Авто-генерация slug из name (только в create режиме)
  useEffect(() => {
    if (mode === "create") {
      const generated = slugify(name);
      setValue("slug", generated);
    }
  }, [name, mode, setValue]);

  // Проверка slug
  useEffect(() => {
    const delay = setTimeout(() => {
      if (slug) checkSlug(slug);
    }, 1000);

    return () => clearTimeout(delay);
  }, [slug]);

  useEffect(() => {
    if (!isSlugTouched.current) {
      const generated = slugify(name);
      setValue("slug", generated);
    }
  }, [name, setValue]);

  const onValid = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-6">
      <div>
        <Input
          label="Name"
          {...register("name", { required: "Name is required" })}
        />
        <FormError error={errors.name} />
      </div>

      <div>
        <Input
          label="Slug"
          {...register("slug", {
            required: "Slug is required",
            pattern: {
              value: /^[a-z0-9-]+$/,
              message: "Only lowercase letters, numbers and dashes allowed",
            },
            onChange: () => {
              isSlugTouched.current = true;
            },
          })}
        />
        <FormError error={errors.slug} />
        {slug && (
          <p className="text-sm mt-1">
            {isCheckingSlug
              ? "Checking slug..."
              : slugCheckResult?.available === false
              ? "❌ Slug is already taken"
              : "✅ Slug is available"}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        {mode === "edit" && (
          <button
            type="button"
            onClick={() => router.push("/workspaces")}
            className="text-gray-600 hover:underline"
          >
            ✖ Cancel
          </button>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || slugCheckResult?.available === false}
        >
          {isSubmitting
            ? mode === "edit"
              ? "Saving..."
              : "Creating..."
            : mode === "edit"
            ? "✔ Save Changes"
            : "Create Workspace"}
        </Button>
      </div>
    </form>
  );
}
