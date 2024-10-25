import { IEpidayData, ITag } from '@/types/epiday';
import { authorFilter } from '@/utils/commonFunction';
import Link from 'next/link';

interface IEpidayCardProps {
  epidayData: IEpidayData;
}

const EpidayCard = ({ epidayData }: IEpidayCardProps) => {
  return (
    <div>
      <Link
        href={`/epidays/${epidayData.id}`}
        className='flex flex-col justify-between overflow-hidden rounded-[1.6rem] border-[0.1rem] border-var-line-100 bg-var-blue-100 shadow-feed hover:shadow-lg'
        style={{
          backgroundImage: 'repeating-linear-gradient(white, white 21px, #F2F2F2 24px)',
        }}
      >
        <q className='line-clamp-4 h-[18rem] break-words px-[2.4rem] pt-[2.4rem] font-iropke text-[2.4rem] leading-[4rem] text-var-black-600 quotes-none'>{epidayData.content}</q>
        <div className='mt-[2rem] min-h-[6.48rem] bg-white px-[2.4rem] pb-[2.4rem] text-right'>
          <cite className='font-iropke text-[2.4rem] leading-[4rem] text-var-blue-400'>{authorFilter(epidayData.author)}</cite>
        </div>
      </Link>
      <div className='mt-[0.8rem] flex justify-end gap-[1.6rem]'>
        {epidayData.tags.map((tag: ITag) => {
          return (
            <span key={tag.id} className='font-iropke text-[2.4rem] leading-[4rem] text-var-blue-400'>
              #{tag.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};
export default EpidayCard;
