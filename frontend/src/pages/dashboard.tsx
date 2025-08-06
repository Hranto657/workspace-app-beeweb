import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded shadow p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
        <p className="mb-6">
          You are logged in as{" "}
          <span className="font-semibold">{user.fullName}</span>
        </p>
        <button
          onClick={() => logout()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
