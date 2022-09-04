import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup, apply } from "twind";

export * from "twind";
export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  preflight: {
    body: apply`bg-gradient-to-r from-indigo-800 to-indigo-900`,
  },
};
if (IS_BROWSER) setup(config);
