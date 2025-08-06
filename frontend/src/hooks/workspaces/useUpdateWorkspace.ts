import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkspace } from "@/services/workspaces.api";
import { UpdateWorkspaceDto, Workspace } from "@/types/workspaces";

export const useUpdateWorkspace = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation<Workspace, Error, UpdateWorkspaceDto>({
    mutationFn: async (dto) => {
      if (!id) throw new Error("Workspace ID is required");
      return updateWorkspace(id, dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", id] });
    },
  });
};
