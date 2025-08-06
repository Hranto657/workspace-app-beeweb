import { useRouter } from "next/router";
import { useWorkspace } from "@/hooks/workspaces/useWorkspace";
import WorkspaceForm from "@/components/workspaces/WorkspaceForm";
import { useUpdateWorkspace } from "@/hooks/workspaces/useUpdateWorkspace";
import { useMemo } from "react";

export default function EditWorkspacePage() {
  const router = useRouter();
  const id = typeof router.query.id === "string" ? router.query.id : undefined;

  const { data: workspace, isLoading } = useWorkspace(id);
  const updateMutation = useUpdateWorkspace(id);

  if (!id || isLoading) return <p>Loading workspace...</p>;
  if (!workspace) return <p>Workspace not found.</p>;

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Workspace</h1>

      <WorkspaceForm
        mode="edit"
        initialValues={{
          name: workspace.name,
          slug: workspace.slug,
        }}
        onSubmit={(values) =>
          updateMutation.mutate(values, {
            onSuccess: () => router.push("/dashboard"),
          })
        }
        isSubmitting={updateMutation.isPending}
      />
    </div>
  );
}
