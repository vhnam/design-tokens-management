export type CreateWorkspacePayload = {
  name: string;
  image?: string;
};

export type UpdateWorkspacePayload = {
  id: string;
  name: string;
  image?: string;
};

export type DeleteWorkspacePayload = {
  id: string;
};
