/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Logo() {
    return (
        <div class={tw`flex h-full justify-center items-center text-white`}>
            <p class={tw`text-4xl`}>LOGO</p>
        </div>
    );
}