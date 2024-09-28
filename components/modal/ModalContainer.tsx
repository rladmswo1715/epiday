'use client';

import { useModalStore } from '@/store/modalStore';
import ConfirmDelete from './modalContent/ConfirmDelete';

const ModalContainer = () => {
  const { modalType, isOpen } = useModalStore();

  if (!isOpen) {
    return null;
  }

  const modalContent = () => {
    switch (modalType) {
      case 'confirmDelete':
        return <ConfirmDelete />;
      default:
        return null;
    }
  };

  return (
    <div className='fixed inset-0 z-modal flex items-center justify-center bg-var-black-900 bg-opacity-50'>
      <div className='rounded-lg bg-white shadow-lg'>{modalContent()}</div>
    </div>
  );
};

export default ModalContainer;
