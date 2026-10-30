import type { Chat, Room } from '../content/types'
import { MEDIA_LABEL } from '../content/types'
import { lockedMedia } from '../lib/media'
import { Avatar } from './Avatar'
import { AudioIcon, LockIcon, PhotoIcon, UnlockIcon, VideoIcon } from './Icons'

const KIND_ICON = { photo: PhotoIcon, video: VideoIcon, audio: AudioIcon }

/** A chat with more than one sender besides "me" (or none at all) gets a generic icon, not a person's picture. */
function isGroup(chat: Chat) {
  const others = new Set(chat.messages.map((m) => m.from).filter((f) => f !== 'me'))
  return others.size !== 1
}

function preview(chat: Chat) {
  const last = chat.messages[chat.messages.length - 1]
  if (!last) return ''
  if (last.media) return `${last.from === 'me' ? 'You sent' : 'Sent'} a ${MEDIA_LABEL[last.media.kind].toLowerCase()}`
  return last.text ?? ''
}

export function ChatList({ room, activeId, onSelect, unlocked }: { room: Room; activeId: string; onSelect: (id: string) => void; unlocked: string[] }) {
  const items = lockedMedia(room)
  const openCount = items.filter((m) => unlocked.includes(m.code)).length

  return (
    <aside className="w-[300px] shrink-0 flex flex-col border-r border-neutral-800 bg-[#0e0e10]">
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-xs text-neutral-500 mt-0.5">{room.device}</p>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {room.chats.map((chat) => {
          const active = chat.id === activeId
          return (
            <button
              key={chat.id}
              onClick={() => onSelect(chat.id)}
              className={`w-full text-left px-4 py-3 flex gap-3 items-center ${active ? 'bg-[#0a84ff] text-white' : 'hover:bg-neutral-900'}`}
            >
              {isGroup(chat) ? (
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-lg shrink-0 ${active ? 'bg-white/20' : 'bg-neutral-700'}`}>
                  {chat.title.charAt(0)}
                </div>
              ) : (
                <Avatar name={chat.title} size="lg" />
              )}
              <div className="min-w-0">
                <div className="font-semibold truncate">{chat.title}</div>
                <div className={`text-sm truncate ${active ? 'text-white/80' : 'text-neutral-500'}`}>{preview(chat)}</div>
              </div>
            </button>
          )
        })}
      </nav>
      <div className="border-t border-neutral-800 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] uppercase tracking-wider text-neutral-500">Locked media</p>
          <p className={`text-xs ${openCount === items.length ? 'text-emerald-400' : 'text-neutral-400'}`}>
            {openCount} of {items.length} unlocked
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {items.map((m) => {
            const open = unlocked.includes(m.code)
            const Icon = KIND_ICON[m.media.kind]
            return (
              <li
                key={m.code}
                title={`${MEDIA_LABEL[m.media.kind]} · ${open ? 'Unlocked' : 'Locked'}`}
                className={`flex items-center gap-1 rounded-full border px-2 py-1 text-xs ${open ? 'border-emerald-500/50 text-emerald-400' : 'border-neutral-700 text-neutral-400'}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {open ? <UnlockIcon className="w-3.5 h-3.5" /> : <LockIcon className="w-3.5 h-3.5" />}
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
