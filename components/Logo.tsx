import { Signal } from "@preact/signals";
import { UploadImage } from "../islands/Homepage.tsx";

interface LogoProps {
  imageState: Signal<UploadImage>;
}

export default function Logo({ imageState }: LogoProps) {
  return (
    <div class="flex h-full justify-center items-center text-white">
      <p className="text-4xl">LOGO</p>
    </div>
  );
}
