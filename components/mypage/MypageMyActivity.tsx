import { useState } from 'react';
import MyActivityRadioInput from '../input/MyActivityRadioInput';

const MypageMyActivity = () => {
  const [selectedActivity, setSelectedActivity] = useState<'epiday' | 'comment'>('epiday');

  return (
    <section className='mt-[9.6rem]'>
      <div className='flex items-center gap-[2.4rem]'>
        <MyActivityRadioInput activityType='epiday' selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} />
        <MyActivityRadioInput activityType='comment' selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} />
      </div>
    </section>
  );
};

export default MypageMyActivity;
