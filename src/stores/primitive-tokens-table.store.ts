import { create } from 'zustand';

import type { PrimitiveToken } from '@/types/token';

interface PrimitiveTokensTableState {
  selectedToken: PrimitiveToken | null;
  isOpenAddDialog: boolean;
  isOpenEditDialog: boolean;
  isOpenDeleteDialog: boolean;
}

interface PrimitiveTokensTableActions {
  openAddDialog: () => void;
  openEditDialog: (token: PrimitiveToken) => void;
  openRemoveDialog: (token: PrimitiveToken) => void;
  closeAddDialog: () => void;
  closeEditDialog: () => void;
  closeDeleteDialog: () => void;
}

type PrimitiveTokensTableStore = PrimitiveTokensTableState & PrimitiveTokensTableActions;

const initialState: PrimitiveTokensTableState = {
  selectedToken: null,
  isOpenAddDialog: false,
  isOpenEditDialog: false,
  isOpenDeleteDialog: false,
};

export const usePrimitiveTokensTableStore = create<PrimitiveTokensTableStore>((set) => ({
  ...initialState,
  openAddDialog: () => {
    set({ isOpenAddDialog: true });
  },
  openEditDialog: (token: PrimitiveToken) => {
    set({ selectedToken: token, isOpenEditDialog: true });
  },
  openRemoveDialog: (token: PrimitiveToken) => {
    set({ selectedToken: token, isOpenDeleteDialog: true });
  },
  closeAddDialog: () => {
    set({ isOpenAddDialog: false });
  },
  closeEditDialog: () => {
    set({ selectedToken: null, isOpenEditDialog: false });
  },
  closeDeleteDialog: () => {
    set({ selectedToken: null, isOpenDeleteDialog: false });
  },
}));
