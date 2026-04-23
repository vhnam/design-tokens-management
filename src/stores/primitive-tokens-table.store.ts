import { create } from 'zustand';

import type { PrimitiveToken } from '@/types/token';

interface PrimitiveTokensTableState {
  selectedToken: PrimitiveToken | null;
  isOpenAddDialog: boolean;
  isOpenEditDialog: boolean;
  isOpenDeleteDialog: boolean;
}

interface PrimitiveTokensTableActions {
  openEditDialog: (token: PrimitiveToken) => void;
  openDeleteDialog: (token: PrimitiveToken) => void;
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
  openEditDialog: (token: PrimitiveToken) => {
    set({ selectedToken: token, isOpenEditDialog: true });
  },
  openDeleteDialog: (token: PrimitiveToken) => {
    set({ selectedToken: token, isOpenDeleteDialog: true });
  },
  closeEditDialog: () => {
    set({ selectedToken: null, isOpenEditDialog: false });
  },
  closeDeleteDialog: () => {
    set({ selectedToken: null, isOpenDeleteDialog: false });
  },
}));
