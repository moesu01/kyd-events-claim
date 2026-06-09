/** BrowserRouter basename derived from Vite `base` (no trailing slash). */
export function getRouterBasename() {
  const base = import.meta.env.BASE_URL
  if (base === '/') return undefined
  return base.replace(/\/$/, '')
}
