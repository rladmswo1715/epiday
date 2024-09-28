'use client';

import { useSession } from 'next-auth/react';
import CommentGroup from '../comment/CommentGroup';
import ProfileImage from '../ProfileImage';
import VisibilityToggle from '../VisibilityToggle';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getEpidayCommentsById, postAddComment } from '@/api/comments';
import { useState } from 'react';
import { addCommentSchema } from '@/schema/addCommentSchema';
import Spinner from '../Spinner';

type TPostCommentData = {
  epigramId: number;
  isPrivate: boolean;
  content: string;
};

const CommentsContainer = ({ epidayId }: { epidayId: number }) => {
  const { data: session } = useSession();

  const [content, setContent] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const { data, isPending, refetch } = useQuery({
    queryKey: ['epiday', 'comments', epidayId],
    queryFn: () => getEpidayCommentsById(epidayId, session?.accessToken),
    enabled: !!session?.accessToken,
  });

  const addCommentMutation = useMutation({
    mutationFn: (postCommentData: TPostCommentData) => postAddComment(postCommentData, session.accessToken),
    onSuccess: () => {
      refetch();
    },
  });

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      addCommentSchema.parse(content);
      const postCommentData = { epigramId: epidayId, isPrivate: isVisible, content };
      addCommentMutation.mutate(postCommentData);
      setContent('');
      setIsVisible(false);
    } catch (error) {
      alert(error.errors[0].message);
    }
  };

  return (
    <section className='pb-[22.8rem] pt-[4.8rem]'>
      {isPending && <Spinner />}
      <h3 className='text-[2rem] font-[600] text-var-black-600'>댓글 ({data?.totalCount})</h3>
      <form onSubmit={handleAddComment}>
        <div className='mt-[2.4rem] flex gap-[2.4rem]'>
          <ProfileImage size='50px' userSetting={session?.image} />
          <textarea
            className='h-[10.4rem] w-[56.8rem] overflow-scroll rounded-[0.8rem] border-[0.1rem] border-var-line-200 px-[1.6rem] py-[1.2rem] text-[2rem] scrollbar-hide'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='100자 이내로 입력해주세요.'
            maxLength={100}
          />
        </div>
        <div className='mt-[1.6rem] flex items-center justify-between'>
          <VisibilityToggle isVisible={isVisible} setIsVisible={setIsVisible} />
          <button className='leadeing-[2.6rem] rounded-[0.8rem] border-[0.1rem] bg-var-black-500 px-[1.6rem] py-[0.9rem] text-[1.6rem] font-[600] text-var-blue-100'>저장</button>
        </div>
      </form>
      <CommentGroup commentsData={data} />
    </section>
  );
};

export default CommentsContainer;
