import ButtonBase from "./ButtonBase.tsx";

interface ButtonSubmitProps {
  onButtonClick: () => void;
  label: string;
  // sm, md, lg, xl, 2xl - same as Tailwind sizes
  size?: string;
  className?: string;
}

export default function ButtonSubmit(
  { label, onButtonClick, size, className }: ButtonSubmitProps,
) {
  const fontSize = size ? `text-${size}` : "text-sm";

  return (
    <ButtonBase
      label={label}
      onButtonClick={onButtonClick}
      classStyle={`rounded-md border border-transparent bg-white px-4 py-2 ${fontSize} font-medium text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white transition ease-in-out focus:outline-none ${className}`}
    />
  );
}
