import Link from "next/link";
import { Workspace } from "@/types/workspaces";
import { useDeleteWorkspace } from "@/hooks/workspaces/useDeleteWorkspace";

interface Props {
  workspace: Workspace;
}

export default function WorkspaceCard({ workspace }: Props) {
  const { mutate: deleteWorkspace, isPending } = useDeleteWorkspace(
    workspace.id
  );

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this workspace?")) {
      deleteWorkspace(undefined, {
        onSuccess: () => {
          console.log("Deleted");
        },
      });
    }
  };

  return (
    <div className="border p-4 rounded flex items-center justify-between">
      <div>
        <h2 className="font-semibold">{workspace.name}</h2>
        <p className="text-sm text-gray-500">Slug: {workspace.slug}</p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/workspaces/${workspace.slug}`}
          className="text-blue-600 hover:underline"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-red-600 hover:underline"
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
