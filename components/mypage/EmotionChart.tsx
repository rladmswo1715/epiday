import { EMOTION_IMAGE_SRC, EMOTION_OPTIONS, EMOTIONS } from '@/constant/emotion';
import { TEmotions } from '@/types/emotion';
import 'chart.js/auto';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const EmotionChart = ({ initialData }) => {
  const [emotionRatio, setEmotionRatio] = useState<Record<TEmotions, number>>(
    EMOTIONS.reduce(
      (acc, item) => {
        acc[item] = 0;
        return acc;
      },
      {} as Record<TEmotions, number>,
    ),
  );
  const [hasEmotion, setHasEmotion] = useState<boolean>(false);
  const [emotionPercentages, setEmotionPercentages] = useState<Record<TEmotions, number>>({} as Record<TEmotions, number>);
  const [highRatioEmotion, setHighRatioEmotion] = useState<TEmotions | null>(null);

  useEffect(() => {
    const resetEmotionRatio = EMOTIONS.reduce(
      (acc, item) => {
        acc[item] = 0;
        return acc;
      },
      {} as Record<TEmotions, number>,
    );

    setEmotionRatio(resetEmotionRatio);

    //얕은 복사
    const updatedEmotionRatio = { ...resetEmotionRatio };
    let emotionCount = 0;

    initialData.forEach((dataItem) => {
      updatedEmotionRatio[dataItem.emotion]++;
      emotionCount++;
    });
    setEmotionRatio(updatedEmotionRatio);

    if (emotionCount > 0) {
      setHasEmotion(true);
      const percentages = EMOTIONS.reduce(
        (acc, item) => {
          acc[item] = Math.round((updatedEmotionRatio[item] / emotionCount) * 100);
          return acc;
        },
        {} as Record<TEmotions, number>,
      );
      setEmotionPercentages(percentages);

      const highestEmotion = Object.keys(percentages).reduce((maxKey, key) => {
        return percentages[maxKey] > percentages[key] ? maxKey : key;
      });

      setHighRatioEmotion(highestEmotion as TEmotions);
    } else {
      setHasEmotion(false);
      setEmotionPercentages({} as Record<TEmotions, number>);
    }
  }, [initialData]);

  const chartData = {
    labels: Object.keys(EMOTION_OPTIONS).map((item) => EMOTION_OPTIONS[item].value),
    datasets: [
      {
        data: hasEmotion ? Object.keys(emotionRatio).map((item) => emotionRatio[item]) : [1],
        backgroundColor: hasEmotion ? Object.keys(EMOTION_OPTIONS).map((item) => EMOTION_OPTIONS[item].backgroundColor) : ['#EFF3F8'],
      },
    ],
  };

  const chartOptions = {
    cutout: '80%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: hasEmotion,
      },
    },
  };

  return (
    <div className='flex flex-col gap-[4.8rem]'>
      <h3 className='text-[2.4rem] font-[600] text-var-black-600'>감정 차트</h3>
      <div className='flex items-center justify-between px-[11.2rem] py-[2.4rem]'>
        <div className='relative h-[18rem] w-[18rem]'>
          <Doughnut data={chartData} options={chartOptions} />
          <div className='absolute inset-0 flex flex-col items-center justify-center gap-[0.8rem]'>
            {hasEmotion && (
              <>
                <div className='relative h-[4rem] w-[4rem]'>
                  <Image src={EMOTION_IMAGE_SRC[highRatioEmotion]} alt='감정' fill />
                </div>
                <span className='text-[1.6rem] font-[700] leading-normal text-var-black-600'>
                  {
                    EMOTION_OPTIONS.find((item) => {
                      return item.value === highRatioEmotion;
                    }).emotionText
                  }
                </span>
              </>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-[1.4rem]'>
          {EMOTION_OPTIONS.map((item) => {
            return (
              <div key={item.id} className='flex items-center gap-[1.6rem]'>
                <div className='h-[1.6rem] w-[1.6rem] rounded-[0.2rem]' style={{ backgroundColor: item.backgroundColor }} />
                <Image src={item.src} alt={item.value} width={24} height={24} />
                <span className='text-[2rem] font-[600] text-var-black-600'>{emotionPercentages[item.value] ? emotionPercentages[item.value] : 0}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmotionChart;
