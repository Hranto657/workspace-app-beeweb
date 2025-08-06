import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkspace } from "@/services/workspaces.api";

export const useDeleteWorkspace = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteWorkspace(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
};
