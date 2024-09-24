import CommentsContainer from '@/components/detailEpiday/CommentsContainer';
import LikeContainer from '@/components/detailEpiday/LikeContainer';
import InnerLayout from '@/components/InnerLayout';

type EditEpidayPage = {
  params: { epidayId: number };
};

const DetailEpiday = ({ params }: EditEpidayPage) => {
  const { epidayId } = params;
  return (
    <div className='bg-var-blue-100'>
      <InnerLayout>
        <LikeContainer epidayId={epidayId} />
        <CommentsContainer />
      </InnerLayout>
    </div>
  );
};

export default DetailEpiday;
