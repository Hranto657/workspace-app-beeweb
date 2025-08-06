import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/auth/useAuth";
import { useWorkspaceList } from "@/hooks/workspaces/useWorkspaceList";
import WorkspaceCard from "@/components/workspaces/WorkspaceCard";
import Link from "next/link";

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const { data: workspaces, isLoading, isError } = useWorkspaceList();

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto py-10">
        <div className="bg-white rounded shadow p-6 mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Welcome, {user.fullName}</h1>
          <p className="mb-6 text-gray-600">Here are your workspaces:</p>

          <div className="flex justify-center mb-4">
            <Link href="/workspaces/new">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                ➕ Create New Workspace
              </button>
            </Link>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
          >
            Logout
          </button>
        </div>

        {isLoading && <p className="text-center">Loading workspaces...</p>}
        {isError && (
          <p className="text-center text-red-500">Failed to load workspaces.</p>
        )}

        <div className="space-y-4">
          {workspaces?.map((workspace) => (
            <WorkspaceCard key={workspace.id} workspace={workspace} />
          ))}
        </div>
      </div>
    </main>
  );
}
