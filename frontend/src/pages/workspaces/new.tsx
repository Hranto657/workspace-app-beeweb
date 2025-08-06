import { useRouter } from "next/router";
import WorkspaceForm from "@/components/workspaces/WorkspaceForm";
import { useCreateWorkspace } from "@/hooks/workspaces/useCreateWorkspace";

export default function CreateWorkspacePage() {
  const router = useRouter();
  const createMutation = useCreateWorkspace();

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create Workspace</h1>

      <WorkspaceForm
        mode="create"
        onSubmit={(values) =>
          createMutation.mutate(values, {
            onSuccess: () => router.push("/dashboard"),
          })
        }
        isSubmitting={createMutation.isPending}
      />
    </div>
  );
}
