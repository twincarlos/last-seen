/** Expanding rings around a glowing dot. Green while live, red and still when lost. */
export function SignalRings({ lost = false, size = '30vh' }: { lost?: boolean; size?: string }) {
  const color = lost ? 'border-red-500' : 'border-emerald-400'
  const dot = lost ? 'bg-red-500 shadow-[0_0_40px_10px_rgba(239,68,68,.6)]' : 'bg-emerald-400 shadow-[0_0_40px_10px_rgba(52,211,153,.6)]'
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {!lost &&
        [0, 1, 2].map((i) => (
          <span
            key={i}
            className={`absolute inset-0 rounded-full border-2 ${color}`}
            style={{ animation: `signal-ring 2.4s ease-out ${i * 0.8}s infinite` }}
          />
        ))}
      <span className={`relative w-[20%] h-[20%] rounded-full ${dot}`} />
      <style>{`@keyframes signal-ring{0%{transform:scale(.4);opacity:.9}100%{transform:scale(3);opacity:0}}`}</style>
    </div>
  )
}
