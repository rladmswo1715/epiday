import { useState } from 'react';
import MyActivityRadioInput from '../input/MyActivityRadioInput';
import MyEpidays from './MyEpidays';
import MyComments from './MyComments';
import { useSession } from 'next-auth/react';
import Spinner from '../Spinner';

const MypageMyActivity = () => {
  const [selectedActivity, setSelectedActivity] = useState<'epiday' | 'comment'>('epiday');
  const { data: session } = useSession();

  if (!session) {
    return <Spinner />;
  }

  return (
    <section className='mt-[9.6rem]'>
      <div className='flex items-center gap-[2.4rem]'>
        <MyActivityRadioInput activityType='epiday' selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} />
        <MyActivityRadioInput activityType='comment' selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} />
      </div>
      {selectedActivity === 'epiday' ? <MyEpidays userId={session.id} /> : <MyComments />}
    </section>
  );
};

export default MypageMyActivity;
