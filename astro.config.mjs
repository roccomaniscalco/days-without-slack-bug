import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import db from "@astrojs/db";
import vercel from "@astrojs/vercel/serverless";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    db(),
    tailwind(),
    solidJs(),
    icon({
      include: {
        heroicons: [
          "trophy-16-solid",
          "calendar-days-16-solid",
          "hashtag-16-solid",
        ],
      },
    }),
  ],
  output: "server",
  adapter: vercel(),
});
