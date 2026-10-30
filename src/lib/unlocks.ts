import { useCallback, useState } from 'react'
import type { MediaAttachment } from '../content/types'

const key = (roomSlug: string) => `last-seen:${roomSlug}:unlocked`

export function normalizeCode(input: string) {
  return input.replace(/\s+/g, '').toUpperCase()
}

function read(roomSlug: string): string[] {
  try {
    const raw = localStorage.getItem(key(roomSlug))
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function write(roomSlug: string, codes: string[]) {
  try {
    localStorage.setItem(key(roomSlug), JSON.stringify(codes))
  } catch {
    // ignore
  }
}

/** Media with no code is visible from the start. */
export function isUnlocked(media: MediaAttachment, unlocked: string[]) {
  return !media.code || unlocked.includes(normalizeCode(media.code))
}

/** Which media codes have been entered on this laptop. Persisted per room in localStorage. */
export function useUnlocks(roomSlug: string) {
  // Callers remount this hook with key={roomSlug}, so initial state is enough.
  const [unlocked, setUnlocked] = useState<string[]>(() => read(roomSlug))

  const update = useCallback(
    (next: string[]) => {
      write(roomSlug, next)
      setUnlocked(next)
    },
    [roomSlug],
  )

  const unlock = useCallback(
    (code: string) => {
      const c = normalizeCode(code)
      const current = read(roomSlug)
      if (!current.includes(c)) update([...current, c])
    },
    [roomSlug, update],
  )

  const lock = useCallback(
    (code: string) => {
      const c = normalizeCode(code)
      update(read(roomSlug).filter((k) => k !== c))
    },
    [roomSlug, update],
  )

  const reset = useCallback(() => update([]), [update])

  return { unlocked, unlock, lock, reset }
}
