import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Workspace } from '@/types/workspace';

interface WorkspaceState {
  isOpenAddDialog: boolean;
  isOpenEditDialog: boolean;
  isOpenDeleteDialog: boolean;
  activeWorkspace: Workspace | null;
  selectedWorkspace: Workspace | null;
}

interface WorkspaceActions {
  setActiveWorkspace: (workspace: Workspace | null) => void;
  openAddDialog: () => void;
  openEditDialog: (workspace: Workspace) => void;
  openRemoveDialog: (workspace: Workspace) => void;
  closeAddDialog: () => void;
  closeEditDialog: () => void;
  closeDeleteDialog: () => void;
}

type WorkspaceStore = WorkspaceState & WorkspaceActions;

const initialState: WorkspaceState = {
  isOpenAddDialog: false,
  isOpenEditDialog: false,
  isOpenDeleteDialog: false,
  activeWorkspace: null,
  selectedWorkspace: null,
};

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set) => ({
      ...initialState,
      setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
      openAddDialog: () => set({ isOpenAddDialog: true }),
      openEditDialog: (workspace) => set({ isOpenEditDialog: true, selectedWorkspace: workspace }),
      openRemoveDialog: (workspace) => set({ isOpenDeleteDialog: true, selectedWorkspace: workspace }),
      closeAddDialog: () => set({ isOpenAddDialog: false, selectedWorkspace: null }),
      closeEditDialog: () => set({ isOpenEditDialog: false, selectedWorkspace: null }),
      closeDeleteDialog: () => set({ isOpenDeleteDialog: false, selectedWorkspace: null }),
    }),
    {
      name: 'workspace-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ activeWorkspace: state.activeWorkspace }),
    },
  ),
);
