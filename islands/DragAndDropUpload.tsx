import { Signal } from "@preact/signals";
import { UploadImage } from "./Homepage.tsx";

interface ComponentProps {
  imageState: Signal<UploadImage>;
}

export default function DragAndDropUpload({ imageState }: ComponentProps) {
  const handleFileUpload = (e: any) => {
    const [file] = e.target.files;
    imageState.value = {
      file: e.target.value,
      imageSrc: URL.createObjectURL(file),
    };
  };

  return (
    <div class="relative h-3/4 border-dotted border-2 border-gray-400
                    hover:bg-indigo-800 hover:text-white transition ease-in-out">
      <input
        class="absolute w-full h-full cursor-pointer opacity-0"
        type="file"
        accept=".png, .jpeg, .jpg"
        value={imageState.value.file}
        onChange={handleFileUpload}
      />
      <div class="flex flex-col justify-center items-center h-full">
        <p className="text-xl">Drag & Drop</p>
        <p className="text-sm">
          or <u className="text-red-600 hover:text-red-900">Browse</u>
        </p>
        <p class="text-success">
          {imageState.value.file}
        </p>
      </div>
    </div>
  );
}
