interface FormErrorProps {
  error?: { message?: string };
}

export default function FormError({ error }: FormErrorProps) {
  if (!error?.message) return null;

  return (
    <p className="text-red-500 text-sm mt-4 text-center">{error.message}</p>
  );
}
