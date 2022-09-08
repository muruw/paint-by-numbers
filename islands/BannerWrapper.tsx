import Banner from "../components/util/Banner.tsx";
import { useSignal } from "@preact/signals";

export default function BannerWrapper() {
    const showBanner = useSignal(true);

    const handleClose = (): void => {
        showBanner.value = !showBanner.value;
    }

    return (
        <div className="flex justify-center items-center container">
            {showBanner.value && (
                <Banner message={"Like the page? Give us feedback on how we could improve!"} mobileViewMessage={"Leave us feedback!"} close={handleClose} />)}
        </div>
    );
}
