import { getCommentList } from '@/api/comments';
import CommentGroup from '@/components/comment/CommentGroup';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import plus from '@/public/images/icon/plus.svg';

const RecentCommentsContainer = () => {
  const { data } = useQuery({
    queryKey: ['epiday', 'comments', 'recent'],
    queryFn: () => getCommentList(),
  });

  return (
    <div>
      <h3 className='text-[2.4rem] font-[600] text-var-black-600'>최신 댓글</h3>
      <CommentGroup commentsData={data?.list} />
      {data && data.totalCount > 4 && (
        <button type='button' className='mx-auto mt-[7.2rem] flex items-center gap-[0.8rem] rounded-[10rem] border-[0.1rem] border-var-line-200 px-[4rem] py-[1.2rem]'>
          <Image src={plus} alt='더보기' width={24} height={24} />
          <span className='text-[2rem] font-[500] text-var-blue-500'>최신 댓글 더보기</span>
        </button>
      )}
    </div>
  );
};

export default RecentCommentsContainer;
