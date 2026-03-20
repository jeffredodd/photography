/**
 * Base path for the app (empty for custom domain, e.g. mossygiraffe.com).
 * Set NEXT_PUBLIC_BASE_PATH in the build if a subpath is needed.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return basePath ? `${basePath}${normalized}` : normalized;
}
