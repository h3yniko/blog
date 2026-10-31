import type { RouteConfig } from "@react-router/dev/routes";

export interface Page {
  path: string;
  file: string;
  sitemap: boolean;
  id?: string;
}

export const pages: Page[] = [
  { path: "/", file: "routes/home.tsx", sitemap: true },
  { path: "/recipes", file: "routes/recipes.tsx", sitemap: false },
  { path: "/recipes/:slug", file: "routes/recipe.tsx", sitemap: false },
  { path: "/checklists", file: "routes/checklists.tsx", sitemap: false },
  {
    path: "/checklists/travel-by-train",
    file: "routes/checklists/travel-by-train.tsx",
    sitemap: false,
  },
  {
    path: "/posts/pages/:page",
    file: "routes/home.tsx",
    id: "paginated-posts",
    sitemap: true,
  },
  {
    path: "/projects/pages/:page",
    file: "routes/home.tsx",
    id: "paginated-projects",
    sitemap: true,
  },
  { path: "/rss.xml", file: "routes/rss.tsx", sitemap: false },
];

export default pages.map(({ path, file, id }) =>
  path === "/" ? { file, index: true } : { path, file, ...(id && { id }) },
) satisfies RouteConfig;
