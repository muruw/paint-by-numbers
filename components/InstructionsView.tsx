import ImageIcon from "./util/icons/ImageIcon.tsx";
import BrushIcon from "./util/icons/BrushIcon.tsx";
import LoadingIcon from "./util/icons/LoadingIcon.tsx";

export default function InstructionsView() {
  const iconSize = { width: "12", height: "12" };

  return (
    <div className="flex flex-col h-full justify-center items-center text-white space-y-8">
      <div className="flex flex-row">
        <ImageIcon size={iconSize} />
        <p className="text-xl self-center p-2">Upload you image</p>
      </div>
      <div className="flex flex-row">
        <LoadingIcon size={iconSize} />
        <p className="text-xl self-center p-2">
          Generate a paintable version of your image
        </p>
      </div>
      <div className="flex flex-row">
        <BrushIcon size={iconSize} />
        <p className="text-xl self-center p-2">Place your order</p>
      </div>
    </div>
  );
}
