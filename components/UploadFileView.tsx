import DragAndDropUpload from "../islands/DragAndDropUpload.tsx";

export default function UploadFileView() {
    return (
        <div class="flex flex-col h-full p-8">
            <p class="text-2xl py-4">Upload your file</p>
            <DragAndDropUpload />
            <p class="py-2 text-sm">By using our website you agree to our <u className="text-red-600">Terms of Service</u> and <u className="text-red-600">Privacy Police</u>
            </p>
        </div>
    );
}