import type { Chat, MediaKind, Room } from '../content/types'
import { MEDIA_KINDS, MEDIA_LABEL } from '../content/types'
import { AudioIcon, LockIcon, PhotoIcon, UnlockIcon, VideoIcon } from './Icons'

const KIND_ICON = { photo: PhotoIcon, video: VideoIcon, audio: AudioIcon }

function preview(chat: Chat) {
  const last = chat.messages[chat.messages.length - 1]
  if (!last) return ''
  if (last.media) return `${last.from === 'me' ? 'You sent' : 'Sent'} a ${MEDIA_LABEL[last.media.kind].toLowerCase()}`
  return last.text ?? ''
}

export function ChatList({ room, activeId, onSelect, unlocked }: { room: Room; activeId: string; onSelect: (id: string) => void; unlocked: MediaKind[] }) {
  return (
    <aside className="w-[300px] shrink-0 flex flex-col border-r border-neutral-800 bg-[#0e0e10]">
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-xs text-neutral-500 mt-0.5">{room.owner}'s laptop</p>
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
              <div className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-lg shrink-0 ${active ? 'bg-white/20' : 'bg-neutral-700'}`}>
                {chat.title.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-semibold truncate">{chat.title}</div>
                <div className={`text-sm truncate ${active ? 'text-white/80' : 'text-neutral-500'}`}>{preview(chat)}</div>
              </div>
            </button>
          )
        })}
      </nav>
      <div className="border-t border-neutral-800 px-4 py-3">
        <p className="text-[11px] uppercase tracking-wider text-neutral-500 mb-2">Media</p>
        <ul className="space-y-1.5">
          {MEDIA_KINDS.map((k) => {
            const open = unlocked.includes(k)
            const Icon = KIND_ICON[k]
            return (
              <li key={k} className={`flex items-center gap-2 text-sm ${open ? 'text-emerald-400' : 'text-neutral-400'}`}>
                <Icon className="w-4 h-4" />
                <span className="flex-1">{MEDIA_LABEL[k]}s</span>
                {open ? <UnlockIcon className="w-4 h-4" /> : <LockIcon className="w-4 h-4" />}
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
