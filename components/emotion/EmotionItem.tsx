import Image from 'next/image';

interface IEmotionItemProps {
  src: string;
  alt: string;
  emotionText: string;
}

const EmotionItem = ({ src, alt, emotionText }: IEmotionItemProps) => {
  return (
    <button className='flex flex-col items-center gap-[0.8rem]'>
      <div className='bg-var-background-emotion rounded-[1.6rem] p-[1.6rem]'>
        <Image src={src} alt={alt} width={48} height={48} />
      </div>
      <span className='text-[2rem] font-[600] text-var-blue-400'>{emotionText}</span>
    </button>
  );
};

export default EmotionItem;
