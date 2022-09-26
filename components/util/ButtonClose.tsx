import ButtonBase from './ButtonBase.tsx';

interface ButtonCloseProps {
  onButtonClick: () => void;
  label: string;
  // sm, md, lg, xl, 2xl - same as Tailwind sizes
  size?: string;
  className?: string;
}

export default function ButtonClose({ label, onButtonClick, size, className }: ButtonCloseProps) {
  const fontSize = size ? `text-${size}` : "text-sm";

  return (
      <ButtonBase
          label={label}
          onButtonClick={onButtonClick}
          classStyle={`rounded-md border border-transparent bg-white px-4 py-2 ${fontSize} font-medium text-red-600 shadow-sm hover:bg-red-600 hover:text-white transition ease-in-out focus:outline-none ${className}`}
      />
  );
}