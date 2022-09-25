import UploadFileView from "./upload_image/UploadFileView.tsx";
import { UploadImage } from "../islands/Homepage.tsx";
import { Signal } from "@preact/signals";

interface ComponentProps {
  imageState: Signal<UploadImage>;
}

export default function ImageUploadView({ imageState }: ComponentProps) {
  return <UploadFileView imageState={imageState} />;
}
