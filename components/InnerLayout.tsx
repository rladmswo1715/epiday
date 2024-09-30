import { ReactNode } from 'react';

interface IInnerLayoutProps {
  children: ReactNode;
  cssStyle?: string;
}

const InnerLayout = ({ children, cssStyle }: IInnerLayoutProps) => {
  return <div className={`mx-auto w-full max-w-[68.8rem] px-[2.4rem] pt-[8rem] ${cssStyle}`}>{children}</div>;
};

export default InnerLayout;
