import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SignalRings } from '../components/Signal'

/**
 * Secondary LED screens. Emily's phone signal with a countdown to the moment
 * it goes dark. Starts paused at the full duration so the kids see the clock
 * before it moves.
 *
 * Keyboard (nothing on screen tells the kids this):
 *   Space        start / pause
 *   R            reset to the full duration
 *   Up / Down    add or remove 1 minute
 *   Shift+Up/Dn  add or remove 5 minutes
 *
 * ?minutes=75 sets the duration. Default 60. State survives a refresh.
 */

const KEY = 'last-seen:signal'

type Timer = { endsAt: number | null; remainingMs: number; total: number }

function load(totalMs: number): Timer {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const t = JSON.parse(raw) as Timer
      if (t.total === totalMs) return t
    }
  } catch {
    // ignore
  }
  return { endsAt: null, remainingMs: totalMs, total: totalMs }
}

function save(t: Timer) {
  try {
    localStorage.setItem(KEY, JSON.stringify(t))
  } catch {
    // ignore
  }
}

function remaining(t: Timer, now: number) {
  return Math.max(0, t.endsAt ? t.endsAt - now : t.remainingMs)
}

function format(ms: number) {
  const s = Math.ceil(ms / 1000)
  const m = Math.floor(s / 60)
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

export function SignalPage() {
  const [params] = useSearchParams()
  const minutes = Math.max(1, Number(params.get('minutes')) || 60)
  const totalMs = minutes * 60_000

  const [timer, setTimer] = useState<Timer>(() => load(totalMs))
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(id)
  }, [])

  useEffect(() => save(timer), [timer])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = timer
      const left = remaining(t, Date.now())
      const step = (e.shiftKey ? 5 : 1) * 60_000
      if (e.code === 'Space') {
        e.preventDefault()
        if (t.endsAt) setTimer({ ...t, endsAt: null, remainingMs: left })
        else if (left > 0) setTimer({ ...t, endsAt: Date.now() + left })
      } else if (e.key === 'r' || e.key === 'R') {
        setTimer({ endsAt: null, remainingMs: totalMs, total: totalMs })
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        const next = Math.max(0, left + (e.key === 'ArrowUp' ? step : -step))
        setTimer(t.endsAt ? { ...t, endsAt: Date.now() + next } : { ...t, remainingMs: next })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [timer, totalMs])

  const left = remaining(timer, now)
  const lost = left === 0
  const running = !!timer.endsAt && !lost
  const urgent = !lost && left <= 5 * 60_000

  return (
    <div className="h-full w-full bg-black text-white select-none overflow-hidden flex flex-col items-center justify-center gap-[4vh]">
      <SignalRings lost={lost} size="34vh" />

      <div className="text-center">
        <div className={`text-[3.4vh] tracking-wide ${lost ? 'text-red-400' : 'text-white/70'}`}>
          {lost ? "Emily's phone went dark" : "Emily's phone · Signal active"}
        </div>
        <div
          className={`mt-[1vh] text-[22vh] leading-none font-light tabular-nums tracking-tight ${
            lost ? 'text-red-500' : urgent ? 'text-red-400' : 'text-white'
          }`}
          style={urgent ? { animation: 'signal-blink 1s ease-in-out infinite' } : undefined}
        >
          {format(left)}
        </div>
        <div className="mt-[1vh] text-[3vh] text-white/50">{lost ? 'Last seen within 1 mile of this building' : 'until the signal is lost'}</div>
      </div>

      <div className="absolute bottom-[4vh] text-[2.4vh] tracking-[0.3em] uppercase text-white/25">
        Zulmarie · Winston · Gabriel · Will · Annee
      </div>

      {/* Tiny operator cue: dim dot bottom-right while paused. */}
      {!running && !lost && <span className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-white/20" />}

      <style>{`@keyframes signal-blink{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
    </div>
  )
}
