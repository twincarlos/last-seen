import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { SignalRings } from '../components/Signal'
import { content } from '../content/rooms'
import { normalizeCode } from '../lib/unlocks'

type Phase = 'locked' | 'wrong' | 'unlocking' | 'unlocked'

/**
 * Full-screen page for the laptop driving the main LED. Black lock screen,
 * a hidden input that is always focused, one dot per character of the code.
 * It validates by itself once the last dot fills, no Enter needed.
 * Wrong: shake and clear. Right: unlock animation,
 * then it holds until someone puts the video up or reloads the page.
 */
export function ScreenPage() {
  const [value, setValue] = useState('')
  const [phase, setPhase] = useState<Phase>('locked')
  const inputRef = useRef<HTMLInputElement>(null)

  const focus = useCallback(() => {
    if (phase === 'unlocked' || phase === 'unlocking') return
    inputRef.current?.focus({ preventScroll: true })
  }, [phase])

  // Keep the hidden input focused no matter what gets clicked or tabbed.
  useEffect(() => {
    focus()
    const id = setInterval(focus, 500)
    window.addEventListener('focus', focus)
    document.addEventListener('visibilitychange', focus)
    document.addEventListener('pointerdown', focus)
    return () => {
      clearInterval(id)
      window.removeEventListener('focus', focus)
      document.removeEventListener('visibilitychange', focus)
      document.removeEventListener('pointerdown', focus)
    }
  }, [focus])

  const expected = normalizeCode(content.screenCode)

  function check(code: string) {
    if (phase !== 'locked' || !code) return
    if (code === expected) {
      setPhase('unlocking')
      setTimeout(() => setPhase('unlocked'), 1400)
    } else {
      setPhase('wrong')
      setTimeout(() => {
        setValue('')
        setPhase('locked')
      }, 600)
    }
  }

  // Validate as soon as the typed code is as long as the real one. No Enter needed.
  function onChange(raw: string) {
    if (phase !== 'locked') return
    const code = normalizeCode(raw).slice(0, expected.length)
    setValue(code)
    if (code.length === expected.length) setTimeout(() => check(code), 150)
  }

  // Enter still works if someone presses it early.
  function submit(e: FormEvent) {
    e.preventDefault()
    check(normalizeCode(value))
  }

  const dots = normalizeCode(value).length

  return (
    <div className="h-full w-full bg-black text-white select-none overflow-hidden relative" onClick={focus}>
      <form onSubmit={submit}>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          aria-label="Code"
          className="absolute opacity-0 w-px h-px -left-[9999px]"
        />
      </form>

      {phase !== 'unlocked' ? (
        <LockScreen dots={dots} total={expected.length} wrong={phase === 'wrong'} unlocking={phase === 'unlocking'} />
      ) : (
        <Unlocked />
      )}

      <style>{`
        @keyframes screen-shake{10%,90%{transform:translateX(-4px)}20%,80%{transform:translateX(8px)}30%,50%,70%{transform:translateX(-12px)}40%,60%{transform:translateX(12px)}}
        @keyframes screen-pop{0%{transform:scale(1)}50%{transform:scale(1.35)}100%{transform:scale(1)}}
        @keyframes screen-fade-up{0%{opacity:0;transform:translateY(24px)}100%{opacity:1;transform:translateY(0)}}
        @keyframes screen-open{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.6)}}
        @keyframes screen-blink{0%,100%{opacity:1}50%{opacity:.25}}
        @keyframes screen-flash{0%{opacity:0}15%{opacity:1}100%{opacity:0}}
      `}</style>
    </div>
  )
}

/** Real wall clock, ticking once a second. */
function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

function LockScreen({ dots, total, wrong, unlocking }: { dots: number; total: number; wrong: boolean; unlocking: boolean }) {
  const count = total
  const now = useClock()
  const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).replace(/\s?[AP]M$/i, '')
  const date = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
  return (
    <div
      className="h-full flex flex-col items-center justify-center gap-12"
      style={unlocking ? { animation: 'screen-open 1.4s ease-in forwards' } : undefined}
    >
      <div className="text-center space-y-2">
        <div className="text-[13vh] leading-none font-light tracking-tight tabular-nums">{time}</div>
        <div className="text-[3vh] text-white/60">{date}</div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <LockIcon open={unlocking} />
        <div className={`text-[3vh] tracking-wide ${wrong ? 'text-red-400' : 'text-white/80'}`}>
          {wrong ? 'Wrong Passcode' : unlocking ? 'Unlocked' : "Emily's Phone · Enter Passcode"}
        </div>
        <div className="flex gap-5" style={wrong ? { animation: 'screen-shake 0.6s' } : undefined}>
          {Array.from({ length: count }).map((_, i) => {
            const filled = i < dots
            return (
              <span
                key={i}
                className={`block w-[2.4vh] h-[2.4vh] rounded-full border-2 transition-colors duration-150 ${
                  wrong ? 'border-red-400' : 'border-white'
                } ${filled ? (wrong ? 'bg-red-400' : unlocking ? 'bg-emerald-400 border-emerald-400' : 'bg-white') : 'bg-transparent'}`}
                style={filled && i === dots - 1 && !wrong ? { animation: 'screen-pop 0.18s' } : undefined}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function LockIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-[7vh] h-[7vh] transition-colors ${open ? 'text-emerald-400' : 'text-white/80'}`} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      {open ? <path d="M8 10.5V7a4 4 0 0 1 8 0" strokeLinecap="round" /> : <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" strokeLinecap="round" />}
    </svg>
  )
}

function Unlocked() {
  return (
    <div className="h-full flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-emerald-400" style={{ animation: 'screen-flash 1.2s ease-out forwards' }} />

      <SignalRings />



      <div className="relative text-center mt-10 space-y-3" style={{ animation: 'screen-fade-up 0.8s ease-out 0.6s both' }}>
        <div className="text-[6vh] font-semibold tracking-tight">Emily's phone is online</div>
        <div className="text-[3.2vh] text-white/70">Last seen · within 1 mile of this building</div>
        <div className="text-[3.2vh] text-emerald-400 tabular-nums" style={{ animation: 'screen-blink 1.6s ease-in-out infinite' }}>
          Signal active
        </div>
      </div>
    </div>
  )
}
