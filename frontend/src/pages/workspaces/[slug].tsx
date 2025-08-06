import { useRouter } from "next/router";
import { useWorkspaceBySlug } from "@/hooks/workspaces/useWorkspaceBySlug";
import { useWorkspace } from "@/hooks/workspaces/useWorkspace";
import { useUpdateWorkspace } from "@/hooks/workspaces/useUpdateWorkspace";
import WorkspaceForm from "@/components/workspaces/WorkspaceForm";

export default function EditWorkspacePage() {
  const router = useRouter();
  const slug =
    typeof router.query.slug === "string" ? router.query.slug : undefined;

  const {
    data: workspaceBySlug,
    isLoading: isLoadingSlug,
    error: errorSlug,
  } = useWorkspaceBySlug(slug);

  const workspaceId = workspaceBySlug?.id;

  const {
    data: workspace,
    isLoading: isLoadingWorkspace,
    error: errorWorkspace,
  } = useWorkspace(workspaceId);

  const updateMutation = useUpdateWorkspace(workspaceId);

  if (!slug || isLoadingSlug || isLoadingWorkspace)
    return <p>Loading workspace...</p>;

  if (errorSlug || errorWorkspace || !workspace)
    return <p>Workspace not found.</p>;

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
