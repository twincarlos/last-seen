import { useState, type FormEvent } from 'react'
import type { MediaKind, Room } from '../content/types'
import { MEDIA_KINDS, MEDIA_LABEL } from '../content/types'
import { normalizeCode } from '../lib/unlocks'
import { LockIcon } from './Icons'

type Feedback = { tone: 'ok' | 'bad' | 'info'; text: string } | null

export function CodeEntry({ room, unlocked, onUnlock }: { room: Room; unlocked: MediaKind[]; onUnlock: (kind: MediaKind) => void }) {
  const [value, setValue] = useState('')
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [shake, setShake] = useState(false)

  const allUnlocked = MEDIA_KINDS.every((k) => unlocked.includes(k))

  function submit(e: FormEvent) {
    e.preventDefault()
    const code = normalizeCode(value)
    if (!code) return
    const match = MEDIA_KINDS.find((k) => normalizeCode(room.codes[k]) === code)
    setValue('')
    if (!match) {
      setFeedback({ tone: 'bad', text: 'Incorrect code' })
      setShake(true)
      setTimeout(() => setShake(false), 400)
    } else if (unlocked.includes(match)) {
      setFeedback({ tone: 'info', text: `${MEDIA_LABEL[match]}s are already unlocked` })
    } else {
      onUnlock(match)
      setFeedback({ tone: 'ok', text: `${MEDIA_LABEL[match]}s unlocked` })
    }
    setTimeout(() => setFeedback(null), 2500)
  }

  const toneClass = feedback?.tone === 'ok' ? 'text-emerald-400' : feedback?.tone === 'bad' ? 'text-red-400' : 'text-neutral-400'

  return (
    <form onSubmit={submit} className="border-t border-neutral-800 bg-[#121214] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className={`flex-1 flex items-center gap-2 rounded-full bg-[#1c1c1f] border border-neutral-700 px-4 py-2 ${shake ? 'animate-[shake_0.4s]' : ''}`}>
          <LockIcon className="w-4 h-4 text-neutral-500" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={allUnlocked ? 'All media unlocked' : 'Enter a code to unlock media'}
            disabled={allUnlocked}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-neutral-500 disabled:opacity-60 tracking-widest"
          />
        </div>
        <button
          type="submit"
          disabled={allUnlocked || !value.trim()}
          className="rounded-full bg-[#0a84ff] px-4 py-2 text-sm font-semibold disabled:opacity-40"
        >
          Unlock
        </button>
      </div>
      <div className={`h-5 mt-1 text-xs ${toneClass}`} aria-live="polite">{feedback?.text ?? ''}</div>
      <style>{`@keyframes shake{10%,90%{transform:translateX(-2px)}20%,80%{transform:translateX(4px)}30%,50%,70%{transform:translateX(-6px)}40%,60%{transform:translateX(6px)}}`}</style>
    </form>
  )
}
