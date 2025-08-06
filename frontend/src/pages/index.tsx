import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center space-y-6">
        <h1 className="text-2xl font-bold">Welcome to the App</h1>
        <p className="text-gray-600">Please login or register to continue.</p>
        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
