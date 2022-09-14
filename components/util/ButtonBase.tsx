interface BaseButtonProps {
  onButtonClick: () => void;
  label?: string;
  classStyle?: string;
  iconSvg?: any;
}

export default function ButtonBase(
  { label, classStyle, iconSvg, onButtonClick }: BaseButtonProps,
) {
  return (
    <button type="button" className={classStyle} onClick={onButtonClick}>
      {iconSvg}
      <span>{label}</span>
    </button>
  );
}
