import {
  useEffect,
  useRef,
  useState,
} from "https://esm.sh/stable/preact@10.10.6/deno/hooks.js";
import {
  Signal,
} from "https://esm.sh/v94/@preact/signals@1.0.3/X-ZS8q/deno/signals.js";
import { UploadImage } from "./Homepage.tsx";

interface SvgGeneratorProps {
  imageState: Signal<UploadImage>;
}
const DEFAULT_CANVAS_SIZE = { width: 500, height: 500 };

export default function SvgGeneratorField({ imageState }: SvgGeneratorProps) {
  const canvas = useRef();

  const [imageValState, setImageValState] = useState({
    width: 500,
    height: 500,
  });

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    const img = new Image();
    img.src = imageState.value.image;

    img.onload = () => {
      setImageValState({ width: img.naturalWidth, height: img.naturalHeight });
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
