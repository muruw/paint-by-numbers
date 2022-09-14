import UploadFileView from "./UploadFileView.tsx";
import { UploadImage } from "../islands/Homepage.tsx";
import { Signal } from "@preact/signals";

interface ComponentProps {
  imageState: Signal<UploadImage>;
}

export default function ImageView({ imageState }: ComponentProps) {
  return <UploadFileView imageState={imageState} />;
}
