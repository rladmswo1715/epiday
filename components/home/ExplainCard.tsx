import mainLanding1 from '@/public/images/main-landing-1.png';
import mainLanding2 from '@/public/images/main-landing-2.png';
import mainLanding3 from '@/public/images/main-landing-3.png';
import Image, { StaticImageData } from 'next/image';

type TCardContentIndex = 'first' | 'second' | 'third';

const cardContent: Record<
  TCardContentIndex,
  {
    img: StaticImageData;
    title: string[];
    content: string[];
  }
> = {
  first: {
    img: mainLanding1,
    title: ['명언이나 글귀,', '토막 상식들을 공유해 보세요.'],
    content: ['나만 알던 소중한 글들을', '다른 사람들에게 전파하세요.'],
  },
  second: {
    img: mainLanding2,
    title: ['감정 상태에 따라,', '알맞은 위로를 받을 수 있어요.'],
    content: ['태그를 통해 글을 모아 볼 수 있어요.'],
  },
  third: {
    img: mainLanding3,
    title: ['내가 요즘 어떤 감정 상태인지', '통계로 한눈에 볼 수 있어요.'],
    content: ['감정 달력으로', '내 마음에 담긴 감정을 확인해보세요.'],
  },
};

interface IExplainCardProps {
  order: TCardContentIndex;
  isReversed: boolean;
}

const ExplainCard = ({ order, isReversed }: IExplainCardProps) => {
  return (
    <div className={`mx-auto grid max-w-[118.8rem] grid-cols-1 items-center gap-[8rem] px-[2rem] text-center md:grid-cols-[auto_1fr] md:px-0 ${isReversed ? 'md:grid-flow-col-dense' : ''}`}>
      <Image className={`mx-auto ${isReversed ? 'md:order-2' : 'md:order-1'}`} src={cardContent[order].img} alt='예시' width={744} height={388} />
      <div className={`${isReversed ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left'}`}>
        <div>
          {cardContent[order].title.map((line: string, index: number) => (
            <p className='text-[3.2rem] font-[700] leading-[4.6rem] text-var-black-950' key={index}>
              {line}
            </p>
          ))}
        </div>
        <div className='mt-[4rem]'>
          {cardContent[order].content.map((line: string, index: number) => (
            <p className='text-[2.4rem] font-[500] text-var-blue-600' key={index}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplainCard;
