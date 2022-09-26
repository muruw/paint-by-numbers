import { Signal } from "@preact/signals";
import { UploadImage } from "../../islands/Homepage.tsx";
import UploadedImage from "../../islands/UploadedImage.tsx";
import DragAndDropUpload from "../../islands/DragAndDropUpload.tsx";

interface UploadFileViewContentProps {
  imageState: Signal<UploadImage>;
}

export default function UploadFileViewContent(
  { imageState }: UploadFileViewContentProps,
) {
  if (imageState.value.imageSrc) {
    return <UploadedImage imageState={imageState} />;
  }
  return <DragAndDropUpload imageState={imageState} />;
}
