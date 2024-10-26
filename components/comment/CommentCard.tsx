import { timeAgo } from '@/utils/formatDate';
import ProfileImage from '../ProfileImage';
import { useModalStore } from '@/store/modalStore';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import VisibilityToggle from '../VisibilityToggle';
import { addCommentSchema } from '@/schema/addCommentSchema';
import { useSession } from 'next-auth/react';
import { patchUpdateComment } from '@/api/comments';
import { IComment, TCommentData } from '@/types/comments';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type TPatchCommentData = TCommentData & {
  commentId: number;
};

interface ICommentCardProps {
  cardData: IComment;
}

const CommentCard = ({ cardData }: ICommentCardProps) => {
  const { openModal } = useModalStore();
  const [isEditing, setIsEditing] = useState(false);
  const [contentValue, setContentValue] = useState(cardData?.content);
  const [isVisible, setIsVisible] = useState(cardData?.isPrivate);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const pathName = usePathname();

  const updateCommentMutation = useMutation({
    mutationFn: async (patchCommentData: TPatchCommentData) => {
      await patchUpdateComment(patchCommentData, session.accessToken);
    },
    onSuccess: () => {
      if (pathName === '/epidays') {
        queryClient.invalidateQueries({ queryKey: ['epiday', 'comments', 'recent'] });
      } else if (pathName.startsWith('/epidays')) {
        queryClient.invalidateQueries({ queryKey: ['epiday', 'comments', String(cardData.epigramId)] });
      } else if (pathName.startsWith('/mypage')) {
        queryClient.invalidateQueries({ queryKey: ['epiday', 'mypage', 'comments', session.id] });
      }
    },
    onSettled: () => {
      setIsEditing(false);
    },
  });

  const handleSaveClick = async () => {
    addCommentSchema.parse(contentValue);
    const patchCommentData = { commentId: cardData.id, isPrivate: isVisible, content: contentValue };
    updateCommentMutation.mutate(patchCommentData);
  };

  const handleSaveCancelClick = () => {
    setIsEditing(false);
    setContentValue(cardData.content);
    setIsVisible(cardData?.isPrivate);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(e.target.value);
  };

  const handleOpenProfile = () => {
    openModal('profile', { userNickname: session.nickname, userImage: session.image });
  };

  return (
    <div className='flex gap-[1.6rem] border-t-[0.1rem] border-var-line-200 bg-var-background px-[2.4rem] py-[3rem] sm:py-[3.5rem]'>
      <ProfileImage size='48px' userSetting={cardData?.writer.image} onClick={handleOpenProfile} />
      <div className='w-[52.8rem]'>
        <div className='flex items-center justify-between'>
          <p className='space-x-[0.8rem] text-[1.6rem] leading-[2.6rem] text-var-black-300'>
            <button type='button' className='font-bold' onClick={handleOpenProfile}>
              {cardData?.writer.nickname}
            </button>
            <span className='text-var-black-200'>{timeAgo(cardData?.createdAt)}</span>
          </p>
          <div className='flex gap-[1.6rem] text-[1.6rem] leading-[1.8rem] underline-offset-[0.2rem]'>
            {(pathName === '/epidays' || pathName.startsWith('/mypage')) && (
              <button className='text-var-blue-500'>
                <Link href={`/epidays/${cardData.epigramId}`}>게시글 가기</Link>
              </button>
            )}
            {String(cardData?.writer.id) === session?.id &&
              (isEditing ? (
                <>
                  <button className='text-var-black-600 underline decoration-var-black-600' onClick={handleSaveClick}>
                    저장
                  </button>
                  <button className='text-var-black-600 underline decoration-var-black-600' onClick={handleSaveCancelClick}>
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button className='text-var-black-600 underline decoration-var-black-600' onClick={() => setIsEditing(true)}>
                    수정
                  </button>
                  <button className='text-var-error underline decoration-var-error' onClick={() => openModal('confirmDelete', { commentId: cardData.id, epidayId: cardData.epigramId })}>
                    삭제
                  </button>
                </>
              ))}
          </div>
        </div>
        {isEditing ? (
          <>
            <textarea
              className='mt-[1.6rem] w-full overflow-scroll rounded-[0.8rem] border-[0.1rem] border-var-line-200 px-[1.6rem] py-[1.2rem] text-[1.6rem] leading-[2.2rem] scrollbar-hide sm:text-[2rem] sm:leading-[3.2rem]'
              value={contentValue}
              onChange={handleCommentChange}
              maxLength={100}
            />
            <VisibilityToggle isVisible={isVisible} setIsVisible={setIsVisible} />
          </>
        ) : (
          <p className='mt-[1.6rem] whitespace-pre-line break-words text-[1.6rem] text-var-black-700 sm:text-[2rem]'>{cardData?.content}</p>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
