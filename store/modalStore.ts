import { create } from 'zustand';

interface IModalStore {
  modalType: string;
  isOpen: boolean;
  modalProps: any;
  openModal: (type: string, props: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<IModalStore>((set) => ({
  isOpen: false,
  modalType: '',
  modalProps: null,
  openModal: (modalType, modalProps) => set({ isOpen: true, modalType, modalProps }),
  closeModal: () => set({ isOpen: false, modalType: '', modalProps: null }),
}));
