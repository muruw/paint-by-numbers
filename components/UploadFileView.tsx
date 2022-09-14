import DragAndDropUpload from "../islands/DragAndDropUpload.tsx";
import { Signal } from "@preact/signals";
import { UploadImage } from "../islands/Homepage.tsx";

interface ComponentProps {
  imageState: Signal<UploadImage>;
}

export default function UploadFileView({ imageState }: ComponentProps) {
  return (
    <div class="flex flex-col h-full p-8">
      <p class="text-2xl py-4">Upload your file</p>
      <DragAndDropUpload imageState={imageState} />
      <p class="py-2 text-sm">
        By using our website you agree to our{" "}
        <u className="text-red-600">Terms of Service</u> and{" "}
        <u className="text-red-600">Privacy Police</u>
      </p>
    </div>
  );
}
