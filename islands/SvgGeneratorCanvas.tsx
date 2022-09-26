import { useEffect, useRef } from "preact/hooks";

interface SvgGeneratorProps {
  image: any;
}

const DEFAULT_CANVAS_SIZE = { width: 550, height: 650 };

export default function SvgGeneratorCanvas({ image }: SvgGeneratorProps) {
  const canvas = useRef();

  const getWidthAndHeightForCanvas = () => {
    let h = 0;
    let w = 0;

    if (image.height > DEFAULT_CANVAS_SIZE.height) {
      h = DEFAULT_CANVAS_SIZE.height;
    }
    if (image.width > DEFAULT_CANVAS_SIZE.width) w = DEFAULT_CANVAS_SIZE.width;

    return { h, w };
  };

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    const canvasSize = getWidthAndHeightForCanvas();
    context.drawImage(
      image,
      0,
      0,
      canvasSize.w,
      canvasSize.h,
    );
  }, []);

  return (
    <>
      <canvas
        ref={canvas}
        width={getWidthAndHeightForCanvas().w}
        height={getWidthAndHeightForCanvas().h}
        className="max-h-full m-2"
      />
    </>
  );
}
