import { create } from 'zustand';

import { toast } from 'sonner';

export type EditableColumn = 'name' | 'value' | 'type' | 'description';

export type EditingState = {
  tokenId: string;
  columnId: EditableColumn;
  draft: string;
};

type RowPointerOpts = {
  rowId: string;
  rowIndex: number;
  shiftKey: boolean;
  metaKey: boolean;
  ctrlKey: boolean;
  orderedIds: string[];
  /** Plain checkbox click toggles off when this row is the only selection */
  source?: 'row' | 'checkbox';
};

function rangeInclusive(a: number, b: number): number[] {
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  return Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
}

export const usePrimitiveTokensTableStore = create<{
  selectedIds: string[];
  anchorIndex: number | null;
  editing: EditingState | null;

  applyRowSelection: (opts: RowPointerOpts) => void;
  toggleSelectAll: (orderedIds: string[]) => void;
  clearSelection: () => void;

  tryBeginEdit: (rowId: string, columnId: EditableColumn, initialDraft: string) => void;
  setEditDraft: (draft: string) => void;
  cancelEdit: () => void;
  completeEdit: () => void;
}>((set, get) => ({
  selectedIds: [],
  anchorIndex: null,
  editing: null,

  applyRowSelection: ({ rowId, rowIndex, shiftKey, metaKey, ctrlKey, orderedIds, source = 'row' }) => {
    if (get().editing) return;

    const mod = metaKey || ctrlKey;

    if (shiftKey) {
      const anchor = get().anchorIndex;
      if (anchor === null) {
        set({ selectedIds: [rowId], anchorIndex: rowIndex });
        return;
      }
      const indices = rangeInclusive(anchor, rowIndex);
      const next = indices.map((i) => orderedIds[i]).filter(Boolean);
      set({ selectedIds: next, anchorIndex: rowIndex });
      return;
    }

    if (mod) {
      const cur = new Set(get().selectedIds);
      if (cur.has(rowId)) cur.delete(rowId);
      else cur.add(rowId);
      set({ selectedIds: [...cur], anchorIndex: rowIndex });
      return;
    }

    if (source === 'checkbox') {
      const cur = get().selectedIds;
      if (cur.length === 1 && cur[0] === rowId) {
        set({ selectedIds: [], anchorIndex: null });
        return;
      }
    }

    set({ selectedIds: [rowId], anchorIndex: rowIndex });
  },

  toggleSelectAll: (orderedIds) => {
    if (get().editing) return;
    const all = orderedIds.length > 0 && get().selectedIds.length === orderedIds.length;
    if (all) {
      set({ selectedIds: [], anchorIndex: null });
    } else {
      set({ selectedIds: [...orderedIds], anchorIndex: orderedIds.length - 1 });
    }
  },

  clearSelection: () => set({ selectedIds: [], anchorIndex: null }),

  tryBeginEdit: (rowId, columnId, initialDraft) => {
    const { selectedIds, editing } = get();
    if (editing) return;

    if (selectedIds.length > 1) {
      toast.message('Select one row to edit');
      return;
    }

    set({
      editing: { tokenId: rowId, columnId, draft: initialDraft },
      selectedIds: [],
      anchorIndex: null,
    });
  },

  setEditDraft: (draft) => {
    const e = get().editing;
    if (!e) return;
    set({ editing: { ...e, draft } });
  },

  cancelEdit: () => {
    const e = get().editing;
    if (!e) return;
    set({
      editing: null,
      selectedIds: [e.tokenId],
      anchorIndex: null,
    });
  },

  completeEdit: () => {
    const e = get().editing;
    if (!e) return;
    set({
      editing: null,
      selectedIds: [e.tokenId],
      anchorIndex: null,
    });
  },
}));
