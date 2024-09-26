'use client';

import Image from 'next/image';
import like from '@/public/images/icon/like.svg';
import share from '@/public/images/icon/share.svg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getEpidayData } from '@/api/getEpiday';
import { useSession } from 'next-auth/react';
import Spinner from '../Spinner';
import { authorFilter } from '@/utils/commonFunction';
import DropBoxGroup from '../DropBox/DropBoxGroup';
import { deleteLike, postLike } from '@/api/like';
import { MouseEventHandler } from 'react';

interface IEpidayData {
  likeCount: number;
  tags: ITag;
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
  id: number;
  isLiked: boolean;
}
interface ITag {
  id: number;
  name: string;
}

const DropBoxitemList = ['수정하기', '삭제하기'];

const LikeContainer = ({ epidayId }: { epidayId: number }) => {
  const { data: session } = useSession();

  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['epiday', epidayId],
    queryFn: () => getEpidayData(epidayId, session?.accessToken),
    enabled: !!session?.accessToken,
  });

  const likeMutation = useMutation({
    mutationFn: async (userAction: 'UNLIKE_POST' | 'LIKE_POST') => {
      if (userAction === 'LIKE_POST') {
        await postLike(epidayId, session.accessToken);
      } else {
        await deleteLike(epidayId, session.accessToken);
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['epiday', epidayId] });

      const prevLikeStatus = queryClient.getQueryData(['epiday', epidayId]);

      queryClient.setQueryData(['epiday', epidayId], (prevData: IEpidayData) => {
        return { ...prevData, likeCount: prevData.isLiked ? prevData.likeCount - 1 : prevData.likeCount + 1, isLiked: !prevData.isLiked };
      });

      return { prevLikeStatus };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['epiday', epidayId], context.prevLikeStatus);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['epiday', epidayId] });
    },
  });

  const handleLikeButtonClick = () => {
    const userAction = data?.isLiked ? 'UNLIKE_POST' : 'LIKE_POST';
    likeMutation.mutate(userAction);
  };

  return (
    <section className='pb-[3.6rem] pt-[4rem]'>
      {(isLoading || isFetching || !data) && <Spinner />}
      <div className='flex flex-col gap-[3.2rem]'>
        <div className='flex justify-between'>
          <div className='flex gap-[1.6rem]'>
            {data?.tags.map((tag: ITag) => {
              return (
                <span key={tag.id} className='text-[2rem] text-var-blue-400'>
                  #{tag.name}
                </span>
              );
            })}
          </div>
          <DropBoxGroup items={DropBoxitemList} data={epidayId} />
        </div>
        <p className='font-iropke text-[3.2rem] leading-[4.8rem] text-var-black-700'>{data?.content}</p>
        <cite className='text-right font-iropke text-[2.4rem] leading-[4rem] text-var-blue-400'>{authorFilter(data?.author)}</cite>
      </div>
      <div className='mt-[3.6rem] flex justify-center gap-[1.6rem]'>
        <button type='button' className='flex items-center rounded-[10rem] bg-var-black-600 px-[1.4rem] py-[0.6rem]' onClick={() => handleLikeButtonClick()}>
          <Image src={like} alt='좋아요 버튼' />
          <span className='text-[2rem] font-[600] leading-[3.2rem] text-var-blue-100'>{data?.likeCount}</span>
        </button>
        <button className='flex items-center rounded-[10rem] bg-var-line-100 px-[1.6rem] py-[0.6rem]'>
          <span className='text-[2rem] font-[500] leading-[3.2rem] text-var-gray-300'>공유하기</span>
          <Image src={share} alt='공유 버튼' />
        </button>
      </div>
    </section>
  );
};

export default LikeContainer;