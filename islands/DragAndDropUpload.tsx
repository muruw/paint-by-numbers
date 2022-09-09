import { useSignal } from "@preact/signals";


export default function DragAndDropUpload() {
    const uploadedFile = useSignal("");

    const handleFileUpload = (e: any) => {
        uploadedFile.value = e.target.value;
    }

    return (
        <div class="relative h-3/4 border-dotted border-2 border-gray-400
                    hover:bg-indigo-800 hover:text-white transition ease-in-out">
            <input class="absolute w-full h-full cursor-pointer opacity-0" type="file" value={uploadedFile.value} onChange={handleFileUpload}/>
            <div class="flex flex-col justify-center items-center h-full">
                <p className="text-xl">Drag & Drop</p>
                <p className="text-sm">or <u className="text-red-600 hover:text-red-900">Browse</u></p>
                <span class="success">
                    {uploadedFile.value}
                </span>
            </div>
        </div>
    )
}