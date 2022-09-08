import Logo from "../components/Logo.tsx";
import UploadFileView from "../components/UploadFileView.tsx";
import BannerWrapper from "../islands/BannerWrapper.tsx";

export default function Home() {
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <BannerWrapper />
            <div className="flex h-screen justify-center items-center container h-4/6">
                <div className="text-center container h-full border-solid border-2 border-indigo-900 shadow-2xl">
                    <Logo />
                </div>
                <div className="container h-full border-solid border-2 border-indigo-900 shadow-2xl bg-[#e7e5e4]">
                    <UploadFileView />
                </div>
            </div>
        </div>
    );
}
