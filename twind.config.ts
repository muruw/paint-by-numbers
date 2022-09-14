import { Options } from "$fresh/plugins/twind.ts";
import { apply } from "twind";

export default {
  selfURL: import.meta.url,
  preflight: {
    body: apply`bg-gradient-to-r from-indigo-800 to-indigo-900`,
  },
} as Options;
