import { timeAgo } from '@/utils/formatDate';
import ProfileImage from '../ProfileImage';
import { useModalStore } from '@/store/modalStore';

const CommentCard = ({ cardData }) => {
  const { openModal } = useModalStore();

  const handleConfirmDelete = () => {
    openModal('confirmDelete', { commentId: cardData.id, epidayId: cardData.epigramId });
  };

  return (
    <div className='flex gap-[1.6rem] border-t-[0.1rem] border-var-line-200 bg-var-background px-[2.4rem] py-[3.5rem]'>
      <ProfileImage size='48px' userSetting={cardData?.writer.image} />
      <div className='w-[52.8rem]'>
        <div className='flex items-center justify-between'>
          <p className='space-x-[0.8rem] text-[1.6rem] leading-[2.6rem] text-var-black-300'>
            <span>{cardData?.writer.nickname}</span>
            <span>{timeAgo(cardData?.createdAt)}</span>
          </p>
          <div className='flex gap-[1.6rem] text-[1.6rem] leading-[1.8rem] underline-offset-[0.2rem]'>
            <button className='text-var-black-600 underline decoration-var-black-600'>수정</button>
            <button className='text-var-error underline decoration-var-error' onClick={handleConfirmDelete}>
              삭제
            </button>
          </div>
        </div>
        <p className='mt-[1.6rem] whitespace-pre-line break-words text-[2rem] text-var-black-700'>{cardData?.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
