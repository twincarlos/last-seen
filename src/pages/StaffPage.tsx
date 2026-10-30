import { useState, type FormEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { content, findRoom } from '../content/rooms'
import { MEDIA_LABEL } from '../content/types'
import { lockedMedia } from '../lib/media'
import { useUnlocks } from '../lib/unlocks'

const SESSION_KEY = 'last-seen:staff'

function isAuthed() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function StaffPage() {
  const { slug } = useParams()
  const room = findRoom(slug)
  const [authed, setAuthed] = useState(isAuthed)
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  if (!room) return <Navigate to="/" replace />

  function submit(e: FormEvent) {
    e.preventDefault()
    if (pin === content.staffPin) {
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        // ignore
      }
      setAuthed(true)
    } else {
      setError(true)
      setPin('')
    }
  }

  if (!authed) {
    return (
      <Shell title={`Staff · ${room.device}`}>
        <form onSubmit={submit} className="space-y-3">
          <label className="block text-sm text-neutral-400">Staff PIN</label>
          <input
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            autoFocus
            className="w-full rounded-lg bg-[#1c1c1f] border border-neutral-700 px-3 py-2 text-lg tracking-widest outline-none focus:border-[#0a84ff]"
          />
          {error && <p className="text-sm text-red-400">Wrong PIN</p>}
          <button className="w-full rounded-lg bg-[#0a84ff] py-2 font-semibold">Continue</button>
        </form>
      </Shell>
    )
  }

  return <StaffControls key={room.slug} slug={room.slug} />
}

function StaffControls({ slug }: { slug: string }) {
  const room = findRoom(slug)!
  const { unlocked, unlock, lock, reset } = useUnlocks(room.slug)
  const [confirming, setConfirming] = useState(false)
  const items = lockedMedia(room)

  return (
    <Shell title={`Staff · ${room.device} (${room.suspect})`}>
      <section className="space-y-2">
        <h2 className="text-sm uppercase tracking-wider text-neutral-500">Media status</h2>
        <ul className="divide-y divide-neutral-800 rounded-lg border border-neutral-800 overflow-hidden">
          {items.map((m) => {
            const open = unlocked.includes(m.code)
            const sender = m.message.from === 'me' ? room.owner : m.message.from
            return (
              <li key={m.code} className="flex items-center gap-3 px-4 py-3 bg-[#121214]">
                <div className="flex-1 min-w-0">
                  <div className="font-medium">
                    {MEDIA_LABEL[m.media.kind]} · {m.chat.title}
                  </div>
                  <div className="text-xs text-neutral-500 truncate">
                    {sender}
                    {m.message.time ? ` · ${m.message.time}` : ''}
                  </div>
                  <div className="text-xs text-neutral-500">
                    Code: <span className="font-mono text-neutral-300">{m.media.code}</span>
                  </div>
                </div>
                <span className={`text-sm ${open ? 'text-emerald-400' : 'text-neutral-400'}`}>{open ? 'Unlocked' : 'Locked'}</span>
                <button
                  onClick={() => (open ? lock(m.code) : unlock(m.code))}
                  className="rounded-md border border-neutral-700 px-3 py-1 text-sm hover:bg-neutral-800"
                >
                  {open ? 'Lock' : 'Unlock'}
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm uppercase tracking-wider text-neutral-500">Next group</h2>
        {confirming ? (
          <div className="flex gap-2">
            <button
              onClick={() => {
                reset()
                setConfirming(false)
              }}
              className="flex-1 rounded-lg bg-red-600 py-3 font-semibold"
            >
              Yes, clear this room
            </button>
            <button onClick={() => setConfirming(false)} className="rounded-lg border border-neutral-700 px-4 py-3">
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            disabled={unlocked.length === 0}
            className="w-full rounded-lg bg-red-600 py-3 font-semibold disabled:opacity-40"
          >
            Clear room (lock everything)
          </button>
        )}
        <p className="text-xs text-neutral-500">Locks all media on this laptop so the next group starts fresh.</p>
      </section>

      <Link to={`/room/${room.slug}`} className="block text-center rounded-lg bg-[#0a84ff] py-3 font-semibold">
        Back to Messages
      </Link>
    </Shell>
  )
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-full flex items-start justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-xl font-bold">{title}</h1>
        {children}
      </div>
    </div>
  )
}
