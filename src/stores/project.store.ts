import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Project } from '@/types/project';

interface ProjectState {
  isOpenAddDialog: boolean;
  isOpenEditDialog: boolean;
  isOpenDeleteDialog: boolean;
  activeProject: Project | null;
  selectedProject: Project | null;
}

interface ProjectActions {
  setActiveProject: (project: Project | null) => void;
  openAddDialog: () => void;
  openEditDialog: (project: Project) => void;
  openDeleteDialog: (project: Project) => void;
  closeAddDialog: () => void;
  closeEditDialog: () => void;
  closeDeleteDialog: () => void;
}

type ProjectStore = ProjectState & ProjectActions;

const initialState: ProjectState = {
  isOpenAddDialog: false,
  isOpenEditDialog: false,
  isOpenDeleteDialog: false,
  activeProject: null,
  selectedProject: null,
};

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      ...initialState,
      setActiveProject: (project) => set({ activeProject: project }),
      openAddDialog: () => set({ isOpenAddDialog: true }),
      openEditDialog: (project) => set({ isOpenEditDialog: true, selectedProject: project }),
      openDeleteDialog: (project) => set({ isOpenDeleteDialog: true, selectedProject: project }),
      closeAddDialog: () => set({ isOpenAddDialog: false, selectedProject: null }),
      closeEditDialog: () => set({ isOpenEditDialog: false, selectedProject: null }),
      closeDeleteDialog: () => set({ isOpenDeleteDialog: false, selectedProject: null }),
    }),
    {
      name: 'project-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ activeProject: state.activeProject }),
    },
  ),
);
