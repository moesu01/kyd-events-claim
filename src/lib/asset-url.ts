/** Prefix public asset paths for GitHub Pages base URL support. */
export function assetUrl(path: string) {
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${normalized}`
}
