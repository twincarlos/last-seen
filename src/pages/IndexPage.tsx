import { Link } from 'react-router-dom'
import { content } from '../content/rooms'

/** Setup page for whoever is configuring the laptops. Not linked from anywhere else. */
export function IndexPage() {
  return (
    <div className="min-h-full flex items-start justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold">Last Seen · Setup</h1>
        <p className="text-sm text-neutral-400">Open the room link on each laptop. The staff link resets the room between groups.</p>
        <ul className="divide-y divide-neutral-800 rounded-lg border border-neutral-800 overflow-hidden">
          <li className="flex items-center gap-3 px-4 py-3 bg-[#121214]">
            <div className="flex-1">
              <div className="font-medium">Main LED screen</div>
              <div className="text-xs text-neutral-500">
                Lock screen. Code: <span className="font-mono text-neutral-300">{content.screenCode}</span>
              </div>
            </div>
            <Link to="/screen" className="rounded-md bg-[#0a84ff] px-3 py-1 text-sm font-semibold">Open</Link>
          </li>
          <li className="flex items-center gap-3 px-4 py-3 bg-[#121214]">
            <div className="flex-1">
              <div className="font-medium">Side LED screens</div>
              <div className="text-xs text-neutral-500">Signal countdown. Space start/pause · R reset · Up/Down ±1 min (Shift ±5)</div>
            </div>
            <Link to="/signal" className="rounded-md bg-[#0a84ff] px-3 py-1 text-sm font-semibold">Open</Link>
          </li>
          {content.rooms.map((r) => (
            <li key={r.slug} className="flex items-center gap-3 px-4 py-3 bg-[#121214]">
              <div className="flex-1">
                <div className="font-medium">Room {r.id} · {r.device}</div>
                <div className="text-xs text-neutral-500">Thread with {r.suspect}</div>
              </div>
              <Link to={`/room/${r.slug}`} className="rounded-md bg-[#0a84ff] px-3 py-1 text-sm font-semibold">Open</Link>
              <Link to={`/room/${r.slug}/staff`} className="rounded-md border border-neutral-700 px-3 py-1 text-sm">Clear</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
