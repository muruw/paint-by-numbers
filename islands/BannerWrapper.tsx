/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Banner from "../components/util/Banner.tsx";
import { useState } from "https://esm.sh/stable/preact@10.10.0/deno/hooks.js";

export default function BannerWrapper() {
    const [state, setState] = useState({
        closed: false
    });
    const handleClose = () => {
        setState({...state, closed: !state.closed});
    }

    return (
        <div className={tw`flex justify-center items-center container`}>
            {!state.closed && (
                <Banner message={"Like the page? Give us feedback on how we could improve!"} mobileViewMessage={"Leave us feedback!"} close={handleClose} />)}
        </div>
    );
}
