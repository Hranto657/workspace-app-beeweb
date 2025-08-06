import { useQuery } from "@tanstack/react-query";
import { getWorkspaceBySlug } from "@/services/workspaces.api";
import { Workspace } from "@/types/workspaces";

export function useWorkspaceBySlug(slug?: string) {
  return useQuery<Workspace, Error>({
    queryKey: ["workspace-by-slug", slug],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is required");
      return getWorkspaceBySlug(slug);
    },
    enabled: !!slug,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
