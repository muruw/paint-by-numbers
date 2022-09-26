import ButtonSubmit from "../util/ButtonSubmit.tsx";
import SvgGeneratorCanvas from "../../islands/SvgGeneratorCanvas.tsx";
import ButtonClose from '../util/ButtonClose.tsx';

interface ComponentProps {
  closeModal: () => void;
  imageSrc: string;
}

export default function SvgGeneratorModal(
  { closeModal, imageSrc }: ComponentProps,
) {
  const getImage = (imgSrc: string) => {
    const img = new Image();
    img.src = imgSrc;
    return img;
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h2 className="text-2xl font-semibold">
                Generate paintable version of your image
              </h2>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeModal}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <SvgGeneratorCanvas image={getImage(imageSrc)} />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <ButtonSubmit label="Generate" onButtonClick={() => console.log("generate")} />
              <ButtonClose label="Close" onButtonClick={closeModal} className="mx-2"></ButtonClose>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
