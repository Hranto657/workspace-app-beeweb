import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createWorkspace } from "@/services/workspaces.api";
import { CreateWorkspaceDto, Workspace } from "@/types/workspaces";

export const useCreateWorkspaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Workspace, Error, CreateWorkspaceDto>({
    mutationFn: createWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
};
