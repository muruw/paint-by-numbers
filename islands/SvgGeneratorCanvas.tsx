import { useEffect, useRef } from "preact/hooks";

interface SvgGeneratorProps {
  imageSrc: string;
}

const DEFAULT_CANVAS_SIZE = { width: 500, height: 500 };

export default function SvgGeneratorCanvas({ imageSrc }: SvgGeneratorProps) {
  const canvas = useRef();

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      context.drawImage(
        img,
        0,
        0,
        DEFAULT_CANVAS_SIZE.width,
        DEFAULT_CANVAS_SIZE.height,
      );
    };
  }, []);
  return (
    <canvas
      ref={canvas}
      width={DEFAULT_CANVAS_SIZE.width}
      height={DEFAULT_CANVAS_SIZE.height}
      className="max-h-full m-2"
    />
  );
}
