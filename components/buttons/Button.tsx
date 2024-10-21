interface TButtonProps {
  children: React.ReactNode;
  cssStyle?: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ children, cssStyle, onClick, disabled }: TButtonProps) => {
  let baseCss = 'rounded-[0.8rem] bg-var-blue-400 px-[2rem] text-[1rem] font-[500] text-var-blue-100 ';
  if (cssStyle) baseCss += cssStyle;

  return (
    <button className={baseCss} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
