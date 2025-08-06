import { cn } from "@/lib/utils";

type InputProps = {
  label: string;
  error?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  error,
  type = "text",
  className,
  ...rest
}: InputProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        className={cn(
          "block w-full rounded-md border px-3 py-2 shadow-sm transition focus:outline-none",
          "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200",
          error && "border-red-500 focus:border-red-500 focus:ring-red-200",
          className
        )}
        {...rest}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
