import { Signal } from "@preact/signals";
import { UploadImage } from "../islands/Homepage.tsx";
import InstructionsView from "./InstructionsView.tsx";

interface LogoProps {
  imageState: Signal<UploadImage>;
}

export default function HomepageLeftView({ imageState }: LogoProps) {
  return (
    <div class="flex h-full justify-center items-center text-white">
      <InstructionsView />
    </div>
  );
}
