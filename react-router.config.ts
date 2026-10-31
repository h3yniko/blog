import { join } from "node:path";
import { matchPath } from "react-router";
import { loadEnv } from "vite";
import { pages } from "./app/routes";
import { generateSitemap } from "./app/modules/sitemap";
import type { Config } from "@react-router/dev/config";
import { recipes } from "./app/modules/recipes";
import { links } from "./app/modules/content";

const dynamicPaths = [
  ...recipes.map((recipe) => `/recipes/${recipe.slug}`),
  ...(["post", "project"] as const).flatMap((type) => {
    const count = links.filter((link) => link.type === type).length;
    return Array.from(
      { length: Math.max(1, Math.ceil(count / 15)) },
      (_unused, index) => `${type === "project" ? "/projects" : "/posts"}/pages/${index + 1}`,
    );
  }),
];

export default {
  ssr: false,
  prerender: ({ getStaticPaths }) => [...getStaticPaths(), ...dynamicPaths],
  buildEnd: async ({ reactRouterConfig, viteConfig }) => {
    const env = { ...loadEnv(viteConfig.mode, viteConfig.envDir, ""), ...process.env };
    const paths = pages
      .filter((page) => page.sitemap)
      .flatMap(({ path }) =>
        path.includes(":") ? dynamicPaths.filter((url) => matchPath(path, url)) : [path],
      );
    await generateSitemap(
      join(reactRouterConfig.buildDirectory, "client"),
      env.VITE_HOST_URL ?? viteConfig.env.VITE_HOST_URL,
      paths,
    );
  },
} satisfies Config;
