'use client';

import { useSession } from 'next-auth/react';
import CommentGroup from '../comment/CommentGroup';
import ProfileImage from '../ProfileImage';
import VisibilityToggle from '../VisibilityToggle';
import { useMutation } from '@tanstack/react-query';
import { postAddComment } from '@/api/comments';
import { useEffect, useState } from 'react';
import { addCommentSchema } from '@/schema/addCommentSchema';
import Spinner from '../Spinner';
import { TCommentData } from '@/types/comments';
import { useInView } from 'react-intersection-observer';
import { throttle } from 'lodash';
import InnerLayout from '../InnerLayout';
import useCommentsInfiniteQuery from '@/hooks/useCommentsInfiniteQuery';

type TPostCommentData = TCommentData & {
  epigramId: number;
};

const CommentsContainer = ({ epidayId }: { epidayId: number }) => {
  const { data: session } = useSession();

  const [content, setContent] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const { data, commentFlatMapList, isPending, isFetching, refetch, fetchNextPage, hasNextPage } = useCommentsInfiniteQuery({
    pageType: 'postComments',
    userToken: session?.accessToken,
    epidayId,
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const fetchNextPageThrottled = throttle(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, 1000);

  useEffect(() => {
    // view에 들어오고, 데이터를 가져오는 중이 아니고, 다음 페이지가 있을 때 fetchNextPage 진행
    if (inView && hasNextPage) {
      fetchNextPageThrottled();
    }
  }, [inView, hasNextPage, fetchNextPage]);

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
    <section className='bg-var-background pb-[10rem] pt-[3rem] sm:pb-[22.8rem] sm:pt-[4.8rem]'>
      {isPending && <Spinner />}
      <InnerLayout>
        <h3 className='text-[2rem] font-[600] text-var-black-600'>댓글 ({data?.pages[0].totalCount})</h3>
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
        <CommentGroup commentsData={commentFlatMapList} />
        <div ref={ref} className='h-[0.1rem]'></div>
      </InnerLayout>
    </section>
  );
};

export default CommentsContainer;
