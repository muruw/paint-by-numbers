/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import DragAndDropUpload from "../islands/DragAndDropUpload.tsx";

export default function UploadFileView() {
    return (
        <div class={tw`flex flex-col h-full p-8`}>
            <p class={tw`text-2xl py-4`}>Upload your file</p>
            <DragAndDropUpload />
            <p class={tw`py-2 text-sm`}>By using our website you agree to our <u className={tw`text-red-600`}>Terms of Service</u> and <u className={tw`text-red-600`}>Privacy Police</u>
            </p>
        </div>
    );
}