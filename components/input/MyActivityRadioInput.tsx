import classNames from 'classnames';

type TActivityType = 'epiday' | 'comment';

interface IMyActivityRadioInputProps {
  activityType: TActivityType;
  selectedActivity: TActivityType;
  setSelectedActivity: React.Dispatch<React.SetStateAction<TActivityType>>;
  totalCount: number;
}

const initOptions: Record<IMyActivityRadioInputProps['activityType'], Record<'id' | 'text', string>> = {
  epiday: {
    id: 'my-epiday',
    text: '에피데이',
  },
  comment: {
    id: 'my-comment',
    text: '댓글',
  },
};

const MyActivityRadioInput = ({ activityType, selectedActivity, setSelectedActivity, totalCount }: IMyActivityRadioInputProps) => {
  return (
    <>
      <input
        type='radio'
        id={initOptions[activityType].id}
        name='activityType'
        value={activityType}
        className='hidden'
        onChange={() => setSelectedActivity(activityType)}
        checked={selectedActivity === activityType}
      />
      <label
        htmlFor={initOptions[activityType].id}
        className={classNames('cursor-pointer text-[2rem] font-[600] sm:text-[2.4rem]', selectedActivity === activityType ? 'text-var-black-600' : 'text-var-gray-300')}
      >
        내 {initOptions[activityType].text}({totalCount})
      </label>
    </>
  );
};

export default MyActivityRadioInput;
