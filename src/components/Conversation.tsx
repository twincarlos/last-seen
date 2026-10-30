import { useEffect, useRef } from 'react'
import type { Chat } from '../content/types'
import { MessageBubble } from './MessageBubble'

export function Conversation({ chat, unlocked, me }: { chat: Chat; unlocked: string[]; me: string }) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const isGroup = new Set(chat.messages.map((m) => m.from).filter((f) => f !== 'me')).size > 1

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [chat.id, unlocked])

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="h-14 shrink-0 border-b border-neutral-800 bg-[#121214] flex flex-col justify-center px-5">
        <div className="font-semibold">{chat.title}</div>
        {chat.subtitle && <div className="text-xs text-neutral-500">{chat.subtitle}</div>}
      </header>
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
        {chat.messages.map((m) => (
          <MessageBubble key={m.id} message={m} unlocked={unlocked} showSender={isGroup} me={me} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
