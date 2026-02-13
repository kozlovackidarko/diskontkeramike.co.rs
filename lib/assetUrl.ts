const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function assetUrl(path: string): string {
  if (!path || !base) return path
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`
}
