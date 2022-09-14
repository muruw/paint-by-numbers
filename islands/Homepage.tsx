import BannerWrapper from "./BannerWrapper.tsx";
import Logo from "../components/Logo.tsx";
import { signal } from "@preact/signals";
import ImageView from "../components/ImageView.tsx";

export interface UploadImage {
  imageVisual: string;
  imageFile: string;
}

export default function Homepage() {
  const uploadedImageState = signal<UploadImage>({
    imageFile: "",
    imageVisual: "",

  });

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <BannerWrapper />
      <div className="flex h-screen justify-center items-center container h-4/6 shadow-2xl border-indigo-900 border-solid border-2">
        <div className="text-center container h-full ">
          <Logo imageState={uploadedImageState} />
        </div>
        <div className="container h-full bg-[#e7e5e4]">
          <ImageView imageState={uploadedImageState} />
        </div>
      </div>
    </div>
  );
}
