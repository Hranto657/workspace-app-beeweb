import { useMutation } from "@tanstack/react-query";
import { checkSlugAvailability } from "@/services/workspaces.api";

export const useCheckSlugAvailability = () => {
  return useMutation({
    mutationFn: checkSlugAvailability,
  });
};
