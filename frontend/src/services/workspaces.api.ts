import { api } from "@/lib/axios";
import {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  Workspace,
} from "@/types/workspaces";

export const createWorkspace = async (
  data: CreateWorkspaceDto
): Promise<Workspace> => {
  const response = await api.post("/workspaces", data);
  return response.data;
};

export const checkSlugAvailability = async (
  slug: string
): Promise<{ available: boolean; suggestions?: string[] }> => {
  const response = await api.get("/workspaces/check-slug", {
    params: { slug },
  });
  return response.data;
};

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const response = await api.get("/workspaces");
  return response.data;
};

export const getWorkspaceById = async (id: string): Promise<Workspace> => {
  const response = await api.get(`/workspaces/${id}`);
  return response.data;
};

export const getWorkspaceBySlug = async (slug: string): Promise<Workspace> => {
  const response = await api.get(`/workspaces/slug/${slug}`);
  return response.data;
};

export const updateWorkspace = async (
  id: string,
  data: UpdateWorkspaceDto
): Promise<Workspace> => {
  const response = await api.patch(`/workspaces/${id}`, data);
  return response.data;
};

export const deleteWorkspace = async (
  id: string
): Promise<{ message: string }> => {
  const response = await api.delete(`/workspaces/${id}`);
  return response.data;
};
