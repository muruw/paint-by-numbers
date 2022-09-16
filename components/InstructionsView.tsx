import ImageIcon from "./util/icons/ImageIcon.tsx";
import BrushIcon from "./util/icons/BrushIcon.tsx";
import LoadingIcon from "./util/icons/LoadingIcon.tsx";

export default function InstructionsView() {
  const iconSize = { width: "16", height: "16" };

  return (
    <div>
      <div className="flex flex-row py-8">
        <ImageIcon size={iconSize} />
        <p className="text-2xl self-center p-2">Upload you image</p>
      </div>
      <div className="flex flex-row py-8">
        <LoadingIcon size={iconSize} />
        <p className="text-2xl self-center p-2">
          Generate a paintable version of your image
        </p>
      </div>
      <div className="flex flex-row py-8">
        <BrushIcon size={iconSize} />
        <p className="text-2xl self-center p-2">Place your order</p>
      </div>
    </div>
  );
}
