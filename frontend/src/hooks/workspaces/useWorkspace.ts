import { useQuery } from "@tanstack/react-query";
import { getWorkspaceById } from "@/services/workspaces.api";

export const useWorkspace = (id: string) => {
  return useQuery({
    queryKey: ["workspaces", id],
    queryFn: () => getWorkspaceById(id),
    enabled: !!id, // Only fetch if id is provided
  });
};
