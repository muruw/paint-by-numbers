import { useSignal } from "@preact/signals";


export default function DragAndDropUpload() {
    const uploadedFile = useSignal("");
    const img = useSignal("");

    const handleFileUpload = (e: any) => {
        uploadedFile.value = e.target.value;
        const [file] = e.target.files;
        img.value = URL.createObjectURL(file);
    }

    return (
        <div class="relative h-3/4 border-dotted border-2 border-gray-400
                    hover:bg-indigo-800 hover:text-white transition ease-in-out">
            <input class="absolute w-full h-full cursor-pointer opacity-0" type="file" accept=".png, .jpeg, .jpg"
                   value={uploadedFile.value} onChange={handleFileUpload}/>
            <div class="flex flex-col justify-center items-center h-full">
                <p className="text-xl">Drag & Drop</p>
                <p className="text-sm">or <u className="text-red-600 hover:text-red-900">Browse</u></p>
                <p class="text-success">
                    {uploadedFile.value}
                </p>
                {!!img.value && (<img src={img.value} alt="asd" />)}
            </div>
        </div>
    )
}