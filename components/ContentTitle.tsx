const ContentTitle = ({ children, contentTitle, fontSizeStyle, marginStyle, isRequired = false }) => {
  return (
    <fieldset className='flex flex-col'>
      <legend className={`${marginStyle} ${fontSizeStyle} flex items-center font-[600] leading-[3.2rem] sm:leading-[2.4rem]`}>
        {contentTitle}
        {isRequired && <span className='ml-[0.6rem] pt-[0.3rem] text-[2.4rem] font-[500] leading-[3.2rem] text-var-error sm:text-[1.6rem] sm:leading-[2.6rem]'>*</span>}
      </legend>
      {children}
    </fieldset>
  );
};

export default ContentTitle;
