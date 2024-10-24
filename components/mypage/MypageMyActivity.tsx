import { useEffect, useState } from 'react';
import MyActivityRadioInput from '../input/MyActivityRadioInput';
import MyEpidays from './MyEpidays';
import MyComments from './MyComments';
import { useSession } from 'next-auth/react';
import Spinner from '../Spinner';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { IEpidayList } from '@/types/epiday';
import { getEpidayList } from '@/api/getEpiday';
import useCommentsInfiniteQuery from '@/hooks/useCommentsInfiniteQuery';

const MypageMyActivity = () => {
  const [selectedActivity, setSelectedActivity] = useState<'epiday' | 'comment'>('epiday');
  const { data: session } = useSession();
  const [moreShowSpinner, setMoreShowSpinner] = useState(false);

  const {
    data: epidayData,
    isFetching: isEpidayFetching,
    fetchNextPage: fetchNextEpidayPage,
    hasNextPage: hasNextEpidayPage,
  } = useInfiniteQuery<IEpidayList, Object, InfiniteData<IEpidayList>, [_1: string, _2: string, _3: string], number>({
    queryKey: ['epidays', 'mypage', session?.id],
    queryFn: ({ pageParam }) => getEpidayList(pageParam, undefined, session?.id, 3),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!session?.id,
  });

  const {
    data: commentData,
    commentFlatMapList,
    isFetching: isCommentFetching,
    fetchNextPage: fetchNextCommentPage,
    hasNextPage: hasNextCommentPage,
  } = useCommentsInfiniteQuery({
    pageType: 'myComments',
    userId: session?.id,
    userToken: session?.accessToken,
  });

  const epigramListProps = {
    data: epidayData,
    fetchNextPage: fetchNextEpidayPage,
    hasNextPage: hasNextEpidayPage,
    moreShowSpinner,
  };

  const commentListProps = {
    data: commentData,
    commentFlatMapList,
    fetchNextPage: fetchNextCommentPage,
    hasNextPage: hasNextCommentPage,
    moreShowSpinner,
  };

  useEffect(() => {
    if (isEpidayFetching || isCommentFetching) {
      const timer = setTimeout(() => {
        setMoreShowSpinner(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setMoreShowSpinner(false);
    }
  }, [isEpidayFetching, isCommentFetching]);

  if (!session) {
    return <Spinner />;
  }

  return (
    <section className='mt-[9.6rem]'>
      <div className='flex items-center gap-[2.4rem]'>
        <MyActivityRadioInput activityType='epiday' selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} totalCount={epidayData?.pages[0].totalCount || 0} />
        <MyActivityRadioInput activityType='comment' selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} totalCount={commentData?.pages[0].totalCount || 0} />
      </div>
      {selectedActivity === 'epiday' ? <MyEpidays {...epigramListProps} /> : <MyComments {...commentListProps} />}
    </section>
  );
};

export default MypageMyActivity;
