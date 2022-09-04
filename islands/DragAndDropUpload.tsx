/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function DragAndDropUpload() {
    return (
        <div class={tw`flex flex-col h-3/4 justify-center items-center border-dotted border-2 border-gray-400`}>
            <p class={tw`text-xl`}>Drag & Drop</p>
            <p class={tw`text-sm`}>or <u class={tw`text-red-600`}>Browse</u></p>
        </div>
    )
}