import { create } from 'zustand';

import type { SemanticTokenRecord } from '@/queries/semantic-tokens/semantic-tokens.type';

interface SemanticTokensTableState {
  selectedToken: SemanticTokenRecord | null;
  isOpenAddDialog: boolean;
  isOpenEditDialog: boolean;
  isOpenDeleteDialog: boolean;
}

interface SemanticTokensTableActions {
  openAddDialog: () => void;
  openEditDialog: (token: SemanticTokenRecord) => void;
  openDeleteDialog: (token: SemanticTokenRecord) => void;
  closeAddDialog: () => void;
  closeEditDialog: () => void;
  closeDeleteDialog: () => void;
}

type SemanticTokensTableStore = SemanticTokensTableState & SemanticTokensTableActions;

const initialState: SemanticTokensTableState = {
  selectedToken: null,
  isOpenAddDialog: false,
  isOpenEditDialog: false,
  isOpenDeleteDialog: false,
};

export const useSemanticTokensTableStore = create<SemanticTokensTableStore>((set) => ({
  ...initialState,
  openAddDialog: () => set({ isOpenAddDialog: true }),
  openEditDialog: (token) => set({ selectedToken: token, isOpenEditDialog: true }),
  openDeleteDialog: (token) => set({ selectedToken: token, isOpenDeleteDialog: true }),
  closeAddDialog: () => set({ isOpenAddDialog: false }),
  closeEditDialog: () => set({ selectedToken: null, isOpenEditDialog: false }),
  closeDeleteDialog: () => set({ selectedToken: null, isOpenDeleteDialog: false }),
}));
