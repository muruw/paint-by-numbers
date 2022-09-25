import { UploadImage } from "./Homepage.tsx";
import { Signal } from "@preact/signals";
import ButtonSubmit from "../components/util/ButtonSubmit.tsx";

interface ComponentProps {
  imageState: Signal<UploadImage>;
}

export default function UploadedImage({ imageState }: ComponentProps) {
  const generateImage = () => {
    console.log("Started the generation of image");
  };

  return (
    <div class="flex flex-col justify-center relative h-3/4 border-dotted border-2 border-gray-400">
      <img
        src={imageState.value.image}
        alt="User's uploaded image"
        className="max-h-full m-2 z-0 object-contain opacity-50 "
      />
      <ButtonSubmit label="Process image" onButtonClick={generateImage} className="absolute self-center"/>
    </div>
  );
}
