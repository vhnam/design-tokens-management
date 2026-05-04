import type { Organization } from 'better-auth/client/plugins';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface OrganizationState {
  isOpenAddDialog: boolean;
  isOpenEditDialog: boolean;
  isOpenDeleteDialog: boolean;
  activeOrganization: Organization | null;
  selectedOrganization: Organization | null;
}

interface OrganizationActions {
  setActiveOrganization: (organization: Organization | null) => void;
  openAddDialog: () => void;
  openEditDialog: (organization: Organization) => void;
  openRemoveDialog: (organization: Organization) => void;
  closeAddDialog: () => void;
  closeEditDialog: () => void;
  closeDeleteDialog: () => void;
}

type OrganizationStore = OrganizationState & OrganizationActions;

const initialState: OrganizationState = {
  isOpenAddDialog: false,
  isOpenEditDialog: false,
  isOpenDeleteDialog: false,
  activeOrganization: null,
  selectedOrganization: null,
};

export const useOrganizationStore = create<OrganizationStore>()(
  persist(
    (set) => ({
      ...initialState,
      setActiveOrganization: (organization) => set({ activeOrganization: organization }),
      openAddDialog: () => set({ isOpenAddDialog: true }),
      openEditDialog: (organization) => set({ isOpenEditDialog: true, selectedOrganization: organization }),
      openRemoveDialog: (organization) => set({ isOpenDeleteDialog: true, selectedOrganization: organization }),
      closeAddDialog: () => set({ isOpenAddDialog: false, selectedOrganization: null }),
      closeEditDialog: () => set({ isOpenEditDialog: false, selectedOrganization: null }),
      closeDeleteDialog: () => set({ isOpenDeleteDialog: false, selectedOrganization: null }),
    }),
    {
      name: 'organization-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ activeOrganization: state.activeOrganization }),
    },
  ),
);
