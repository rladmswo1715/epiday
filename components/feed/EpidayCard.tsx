const EpidayCard = () => {
  return (
    <div>
      <div
        className='shadow-feed flex flex-col justify-between overflow-hidden rounded-[1.6rem] border-[0.1rem] border-var-line-100 bg-var-blue-100'
        style={{
          backgroundImage: 'repeating-linear-gradient(white, white 21px, #F2F2F2 24px)',
        }}
      >
        <q className='quotes-none min-h-[10rem] px-[2.4rem] pt-[2.4rem] font-iropke text-[2.4rem] leading-[4rem] text-var-black-600'>오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.</q>
        <div className='min-h-[4rem] bg-white px-[2.4rem] pb-[2.4rem] text-right'>
          <cite className='font-iropke text-[2.4rem] leading-[4rem] text-var-blue-400'>- 앙드레 말로 -</cite>
        </div>
      </div>
      <div className='mt-[0.8rem] flex justify-end gap-[1.6rem]'>
        <span className='font-iropke text-[2.4rem] leading-[4rem] text-var-blue-400'>#나아가</span>
        <span className='font-iropke text-[2.4rem] leading-[4rem] text-var-blue-400'>#꿈을이루고싶을때</span>
      </div>
    </div>
  );
};
export default EpidayCard;
