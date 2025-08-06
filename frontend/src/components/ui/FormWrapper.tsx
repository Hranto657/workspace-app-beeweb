import React from "react";
import Link from "next/link";

type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export default function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline block text-left mb-4"
        >
          ← Go to Home
        </Link>
        <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
        {children}
      </div>
    </main>
  );
}
