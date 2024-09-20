import { set } from 'react-hook-form';
import { create } from 'zustand';

interface TagStore {
  tagList: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

export const useTagStore = create<TagStore>((set) => ({
  tagList: [],
  addTag: (tag) =>
    set((state) => ({
      tagList: [...state.tagList, tag],
    })),
  removeTag: (tag) =>
    set((state) => ({
      tagList: state.tagList.filter((t) => t != tag),
    })),
}));
