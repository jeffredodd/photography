/**
 * Base path for the app (e.g. /photography on GitHub Pages).
 * Set NEXT_PUBLIC_BASE_PATH in the build so image and asset URLs are correct.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return basePath ? `${basePath}${normalized}` : normalized;
}
