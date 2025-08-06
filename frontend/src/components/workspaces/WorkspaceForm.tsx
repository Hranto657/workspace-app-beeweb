import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import FormError from "@/components/ui/FormError";

import { useCheckSlugAvailability } from "@/hooks/workspaces/useCheckSlugAvailability";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useUpdateEffect } from "@/hooks/common/useUpdateEffect";

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

  useUpdateEffect(() => {
    if (!isSlugTouched.current) {
      const generatedSlug = slugify(name);
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [name, setValue]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!slug || (mode === "edit" && slug === initialValues?.slug)) return;

      if (isSlugTouched.current || mode === "create") {
        checkSlug(slug);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [slug, mode, initialValues?.slug, checkSlug]);

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
        {slugCheckResult?.available === false &&
          Array.isArray(slugCheckResult.suggestions) &&
          slugCheckResult.suggestions.length > 0 &&
          !(mode === "edit" && slug === initialValues?.slug) && (
            <div className="flex flex-wrap gap-2 mt-1">
              {slugCheckResult.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 text-sm"
                  onClick={() => setValue("slug", suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="text-gray-600 hover:underline"
        >
          ✖ Cancel
        </button>

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
