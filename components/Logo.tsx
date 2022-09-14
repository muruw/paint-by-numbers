import { Signal } from "@preact/signals";
import { UploadImage } from "../islands/Homepage.tsx";
import ButtonSubmit from "./util/ButtonSubmit.tsx";

interface LogoProps {
  imageState: Signal<UploadImage>;
}

export default function Logo({ imageState }: LogoProps) {
  const renderView = () => {
    return (!imageState.value.imageVisual
      ? <p className="text-4xl">LOGO</p>
      : (
        <ButtonSubmit
          onButtonClick={() => console.log("Click!")}
          label="Generate image"
          size="md"
        />
      ));
  };

  return (
    <div class="flex flex-col h-full justify-center items-center text-white">
      {renderView()}
    </div>
  );
}
