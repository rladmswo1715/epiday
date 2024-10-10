import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const data = {
  // 예시 데이터
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1,
    },
  ],
};

const EmotionChart = () => {
  return (
    <div className='flex flex-col gap-[4.8rem]'>
      <h3 className='text-[2.4rem] font-[600] text-var-black-600'>감정 차트</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default EmotionChart;
