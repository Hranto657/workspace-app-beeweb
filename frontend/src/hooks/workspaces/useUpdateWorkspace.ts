import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkspace } from "@/services/workspaces.api";
import { UpdateWorkspaceDto, Workspace } from "@/types/workspaces";

export const useUpdateWorkspace = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Workspace, Error, UpdateWorkspaceDto>({
    mutationFn: (dto) => updateWorkspace(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces", id] });
    },
  });
};
