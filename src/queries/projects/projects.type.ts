export type CreateProjectPayload = {
  name: string;
  image?: string;
};

export type UpdateProjectPayload = {
  id: string;
  name: string;
  image?: string;
};

export type DeleteProjectPayload = {
  id: string;
};
