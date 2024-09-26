import { set } from 'react-hook-form';
import { create } from 'zustand';

interface ITagStore {
  tagList: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

export const useTagStore = create<ITagStore>((set) => ({
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
