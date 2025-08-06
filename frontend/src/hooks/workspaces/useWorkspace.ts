import { useQuery } from "@tanstack/react-query";
import { getWorkspaceById } from "@/services/workspaces.api";
export function useWorkspace(id?: string) {
  return useQuery({
    queryKey: ["workspace", id],
    queryFn: async () => {
      if (!id) throw new Error("Workspace ID is required");
      return getWorkspaceById(id);
    },
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
