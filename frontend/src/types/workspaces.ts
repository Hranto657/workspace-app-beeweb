export interface CreateWorkspaceDto {
  name: string;
  slug: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateWorkspaceDto {
  name?: string;
  slug?: string;
}
