// Resolves root-relative paths (e.g. '/photos/x.jpg') against Vite's base URL,
// so they still work when the site is deployed under a subpath (GitHub Pages).
export function withBase(path) {
  if (!path) return path
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return base + path
}
