import useModalScrollBlock from '@/hooks/useModalScrollBlock';
import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';
import confirmLogo from '@/public/images/icon/confirm.svg';
import { deleteComment } from '@/api/comments';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

const ConfirmDelete = () => {
  const { closeModal, modalProps } = useModalStore();
  useModalScrollBlock();

  const { data } = useSession();
  const queryClient = useQueryClient();
  const pathName = usePathname();

  const deleteCommentMutation = useMutation({
    mutationFn: async () => {
      await deleteComment(modalProps.commentId, data.accessToken);
    },
    onSuccess: () => {
      if (pathName === '/epidays') {
        queryClient.invalidateQueries({ queryKey: ['epiday', 'comments', 'recent'] });
      } else if (pathName.startsWith('/epidays')) {
        queryClient.invalidateQueries({ queryKey: ['epiday', 'comments', String(modalProps.epidayId)] });
      } else if (pathName.startsWith('/mypage')) {
        queryClient.invalidateQueries({ queryKey: ['epiday', 'mypage', 'comments', data.id] });
      }
    },
    onSettled: () => {
      closeModal();
    },
  });

  const handleCommentDelete = () => {
    deleteCommentMutation.mutate();
  };

  return (
    <div className='px-[3.8rem] py-[4rem]'>
      <div className='flex w-[37.6rem] flex-col items-center'>
        <Image src={confirmLogo} alt='confirm 로고' width={56} height={56} />

        <span className='mt-[2.4rem] text-[2.4rem] font-[600] text-var-black-700'>댓글을 삭제하시겠어요?</span>
        <span className='mt-[1.6rem] text-[1.8rem] leading-[2.6rem] text-var-gray-400'>댓글은 삭제 후 복구할 수 없어요.</span>
        <div className='mt-[4rem] flex justify-between gap-[1.6rem]'>
          <button className='flex w-[18rem] justify-center rounded-[1.2rem] bg-var-blue-200 py-[1.3rem] text-[2rem] text-var-black-700' onClick={closeModal}>
            취소
          </button>
          <button className='flex w-[18rem] justify-center rounded-[1.2rem] bg-var-blue-900 py-[1.3rem] text-[2rem] font-[600] text-var-blue-100' onClick={handleCommentDelete}>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
