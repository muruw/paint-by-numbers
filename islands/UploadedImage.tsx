import { UploadImage } from "./Homepage.tsx";
import { Signal } from "@preact/signals";
import ButtonSubmit from "../components/util/ButtonSubmit.tsx";
import SvgGeneratorModal from "../components/upload_image/SvgGeneratorModal.tsx";
import { useState } from "preact/hooks";

interface ComponentProps {
  imageState: Signal<UploadImage>;
}

interface ModalProps {
  showModal: any;
  closeModal: () => void;
  imageSrc: string;
}

export default function UploadedImage({ imageState }: ComponentProps) {
  const [showModal, setShowModal] = useState(false);

  const generateImage = () => {
    console.log("Started the generation of image");
    setShowModal(true);
  };

  return (
    <div class="flex flex-col justify-center relative h-3/4 border-dotted border-2 border-gray-400">
      <img
        src={imageState.value.imageSrc}
        alt="User's uploaded image"
        className="max-h-full m-2 z-0 object-contain opacity-50 "
      />
      <ButtonSubmit
        label="Process image"
        onButtonClick={generateImage}
        className="absolute self-center"
      />
      {showSvgGeneratorModal({
        showModal: showModal,
        closeModal: () => setShowModal(false),
        imageSrc: imageState.value.imageSrc,
      })}
    </div>
  );
}

function showSvgGeneratorModal(
  { showModal, closeModal, imageSrc }: ModalProps,
) {
  if (showModal) {
    return <SvgGeneratorModal closeModal={closeModal} imageSrc={imageSrc} />;
  }
  return null;
}
