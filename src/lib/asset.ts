// ---------------------------------------------------------------------------
// `next/image` and `next/link` pick up next.config's basePath automatically,
// but raw <img src="/..."> does not. On GitHub Pages the site is served from
// /bitebook, so every hand-written public path has to be prefixed or it 404s.
// ---------------------------------------------------------------------------

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** Prefixes a public-folder path. Leaves blob:, data: and absolute URLs alone. */
export function asset(path: string): string {
  return path.startsWith('/') ? `${BASE_PATH}${path}` : path
}
