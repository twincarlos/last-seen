import { AVATARS, colorFor, initials } from '../content/people'

const SIZE = { sm: 'w-7 h-7 text-[11px]', lg: 'w-11 h-11 text-lg' }

/** Profile picture for a person, or an initials placeholder. */
export function Avatar({ name, size = 'sm', className = '' }: { name: string; size?: 'sm' | 'lg'; className?: string }) {
  const src = AVATARS[name]
  const base = `${SIZE[size]} rounded-full shrink-0 select-none ${className}`
  if (src) return <img src={src} alt={name} title={name} className={`${base} object-cover`} draggable={false} />
  return (
    <div title={name} className={`${base} flex items-center justify-center font-semibold text-white`} style={{ backgroundColor: colorFor(name) }}>
      {initials(name)}
    </div>
  )
}
