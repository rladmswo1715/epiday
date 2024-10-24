import { useEffect, useState } from 'react';
import MyActivityRadioInput from '../input/MyActivityRadioInput';
import MyEpidays from './MyEpidays';
import MyComments from './MyComments';
import { useSession } from 'next-auth/react';
import Spinner from '../Spinner';
import useCommentsInfiniteQuery from '@/hooks/useCommentsInfiniteQuery';
import useEpidaysInfiniteQuery from '@/hooks/useEpidaysInfiniteQuery';

const MypageMyActivity = () => {
  const [selectedActivity, setSelectedActivity] = useState<'epiday' | 'comment'>('epiday');
  const { data: session } = useSession();
  const [moreShowSpinner, setMoreShowSpinner] = useState(false);

  const {
    data: epidayData,
    epidayFlatMapList,
    isFetching: isEpidayFetching,
    fetchNextPage: fetchNextEpidayPage,
    hasNextPage: hasNextEpidayPage,
  } = useEpidaysInfiniteQuery({
    pageType: 'myEpidays',
    userId: session?.id,
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
    epidayFlatMapList,
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
