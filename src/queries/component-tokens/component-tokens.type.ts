export type CreateComponentTokenPayload = {
  componentToken: string;
  semanticToken: string;
  description?: string;
};

export type UpdateComponentTokenPayload = {
  id: string;
  componentToken: string;
  semanticToken: string;
  description?: string;
};

export type DeleteComponentTokenPayload = {
  id: string;
};
