/**
 * Profile pictures. Put files in /public/media/avatars/ and set the path here.
 * Anyone without a path gets an initials placeholder in a colour derived
 * from their name, so the same person always looks the same.
 */
export const AVATARS: Record<string, string | undefined> = {
  Emily: undefined, // '/media/avatars/emily.jpg'
  Annee: undefined,
  Zulmarie: undefined,
  Melo: undefined,
  Winston: undefined,
  Gabriel: undefined,
  Will: undefined,
  MM: undefined,
  Carlos: undefined,
  // Outsiders. Leave as initials, or give them a silhouette.
  Unknown: undefined,
  Detective: undefined,
}

/** Names whose initials shouldn't be derived from the first letters. */
const INITIALS_OVERRIDE: Record<string, string> = {
  MM: 'MM',
}

export function initials(name: string) {
  if (INITIALS_OVERRIDE[name]) return INITIALS_OVERRIDE[name]
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const PALETTE = ['#7c5cff', '#ff7a59', '#2bb3a0', '#e0557c', '#4f8cff', '#d6a93b', '#8a6bbf', '#3fa65b', '#c45d9a', '#5b8def']

/** Deterministic colour for a name. */
export function colorFor(name: string) {
  let h = 0
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return PALETTE[h % PALETTE.length]
}
