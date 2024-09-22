import EditEpidayForm from '@/components/form/EditEpidayForm';
import EpidayForm from '@/components/form/EpidayForm';

type EditEpidayPage = {
  params: { epidayId: number };
};

const EditEpiday = ({ params }: EditEpidayPage) => {
  const { epidayId } = params;
  return <EditEpidayForm epidayId={epidayId} />;
};

export default EditEpiday;
