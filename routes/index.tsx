/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <div class={tw`flex h-screen justify-center items-center`}>
        <div class={tw`flex items-center container h-4/6`}>
            <div className={tw`text-center container md h-full bg-red-400`}>
                Vasak
            </div>
            <div className={tw`text-center container md h-full bg-yellow-400`}>
                Parem
            </div>
        </div>
    </div>
  );
}
