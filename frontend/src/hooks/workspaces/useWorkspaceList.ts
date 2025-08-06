import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "@/services/workspaces.api";

export const useWorkspaceList = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });
};
