import CommentsContainer from '@/components/detailEpiday/CommentsContainer';
import LikeContainer from '@/components/detailEpiday/LikeContainer';
import Image from 'next/image';
import detailLine from '@/public/images/detail-line.png';

type EditEpidayPage = {
  params: { epidayId: number };
};

const DetailEpiday = ({ params }: EditEpidayPage) => {
  const { epidayId } = params;
  return (
    <div className='bg-var-background'>
      <LikeContainer epidayId={epidayId} />
      <div className='overflow-x-hidde mt-[-2.5rem] w-full'>
        <Image src={detailLine} alt='배경' width={2640} height={54} className='w-[264rem] max-w-[264rem]' />
      </div>
      <CommentsContainer epidayId={epidayId} />
    </div>
  );
};

export default DetailEpiday;
