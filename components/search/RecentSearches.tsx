const RecentSearches = () => {
  return (
    <div className='mt-[4rem]'>
      <div className='flex justify-between'>
        <h3 className='text-[2.4rem] font-[500] text-var-black-700'>최근 검색어</h3>
        <button className='items-center text-[1.6rem] font-[600] leading-[2.6rem] text-var-error'>모두 지우기</button>
      </div>
      <div className='mt-[4rem] flex flex-wrap gap-[1.6rem]'>
        <button className='rounded-[2.2rem] bg-var-background px-[1.4rem] py-[1.2rem] text-[2.4rem] text-var-black-300'>#나아가야할때</button>
        <button className='rounded-[2.2rem] bg-var-background px-[1.4rem] py-[1.2rem] text-[2.4rem] text-var-black-300'>#나아가야할때</button>
        <button className='rounded-[2.2rem] bg-var-background px-[1.4rem] py-[1.2rem] text-[2.4rem] text-var-black-300'>#나아가야할때</button>
        <button className='rounded-[2.2rem] bg-var-background px-[1.4rem] py-[1.2rem] text-[2.4rem] text-var-black-300'>#나아가야할때</button>
      </div>
    </div>
  );
};

export default RecentSearches;
