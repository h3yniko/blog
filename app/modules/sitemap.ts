import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function generateSitemap(directory: string, host: string, paths: string[]) {
  const base = new URL(host);
  if (!["https:", "http:"].includes(base.protocol)) {
    throw new Error("Sitemap host must use HTTP or HTTPS");
  }
  const entries = [...new Set(paths)].map((path) => {
    if (!path.startsWith("/") || path.startsWith("//") || /[:*?#]/.test(path)) {
      throw new Error(`Invalid sitemap path: ${path}`);
    }
    return `  <url><loc>${escapeXml(new URL(path, base).href)}</loc></url>`;
  });
  await mkdir(directory, { recursive: true });
  await writeFile(
    join(directory, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`,
  );
  await writeFile(
    join(directory, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", base).href}\n`,
  );
}
