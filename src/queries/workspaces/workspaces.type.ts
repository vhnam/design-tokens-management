export type CreateWorkspacePayload = {
  name: string;
  image: string;
  brands: string[];
  themes: string[];
};

export type UpdateWorkspacePayload = {
  id: string;
  name: string;
  image: string;
  brands: string[];
  themes: string[];
};

export type DeleteWorkspacePayload = {
  id: string;
};
