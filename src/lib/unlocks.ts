import { useCallback, useState } from 'react'
import type { MediaKind } from '../content/types'

const key = (roomSlug: string) => `last-seen:${roomSlug}:unlocked`

function read(roomSlug: string): MediaKind[] {
  try {
    const raw = localStorage.getItem(key(roomSlug))
    return raw ? (JSON.parse(raw) as MediaKind[]) : []
  } catch {
    return []
  }
}

function write(roomSlug: string, kinds: MediaKind[]) {
  try {
    localStorage.setItem(key(roomSlug), JSON.stringify(kinds))
  } catch {
    // ignore
  }
}

/** Which media kinds are currently unlocked for a room. Persisted per laptop in localStorage. */
export function useUnlocks(roomSlug: string) {
  // Callers remount this hook with key={roomSlug}, so initial state is enough.
  const [unlocked, setUnlocked] = useState<MediaKind[]>(() => read(roomSlug))

  const update = useCallback(
    (next: MediaKind[]) => {
      write(roomSlug, next)
      setUnlocked(next)
    },
    [roomSlug],
  )

  const unlock = useCallback((kind: MediaKind) => {
    const current = read(roomSlug)
    if (!current.includes(kind)) update([...current, kind])
  }, [roomSlug, update])

  const lock = useCallback((kind: MediaKind) => {
    update(read(roomSlug).filter((k) => k !== kind))
  }, [roomSlug, update])

  const reset = useCallback(() => update([]), [update])

  return { unlocked, unlock, lock, reset }
}

export function normalizeCode(input: string) {
  return input.replace(/\s+/g, '').toUpperCase()
}
