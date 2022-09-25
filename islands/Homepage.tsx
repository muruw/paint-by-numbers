import BannerWrapper from "./BannerWrapper.tsx";
import HomepageLeftView from "../components/HomepageLeftView.tsx";
import { signal } from "@preact/signals";
import ImageUploadView from "../components/ImageUploadView.tsx";

export interface UploadImage {
  image: string;
  file: string;
}

export default function Homepage() {
  const uploadedImageState = signal<UploadImage>({
    file: "",
    image: "",
  });

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <BannerWrapper />
      <div className="flex h-screen justify-center items-center container h-4/6 shadow-2xl border-indigo-900 border-solid border-2">
        <div className="text-center container h-full ">
          <HomepageLeftView />
        </div>
        <div className="container h-full bg-[#e7e5e4]">
          <ImageUploadView imageState={uploadedImageState} />
        </div>
      </div>
    </div>
  );
}
