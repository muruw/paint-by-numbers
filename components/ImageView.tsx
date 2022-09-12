import UploadFileView from "./UploadFileView.tsx";
import {UploadImage} from "../islands/Homepage.tsx";
import {Signal} from "@preact/signals";

interface ComponentProps {
    imageState: Signal<UploadImage>
}

export default function ImageView({imageState} : ComponentProps) {
    if (imageState.value.imageVisual)
        return (
            <div class="flex flex-col h-full p-8">
                <img src={imageState.value.imageVisual} alt="User's uploaded image" class="h-full w-full"/>
            </div>
        )

    return (
        <UploadFileView imageState={imageState}/>
    );
}