import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ChatList } from '../components/ChatList'
import { CodeEntry } from '../components/CodeEntry'
import { Conversation } from '../components/Conversation'
import { findRoom } from '../content/rooms'
import { useUnlocks } from '../lib/unlocks'

export function RoomPage() {
  const { slug } = useParams()
  const room = findRoom(slug)
  if (!room) return <Navigate to="/" replace />
  return <RoomView key={room.slug} slug={room.slug} />
}

function RoomView({ slug }: { slug: string }) {
  const room = findRoom(slug)!
  const { unlocked, unlock } = useUnlocks(room.slug)
  const [activeId, setActiveId] = useState(room.chats[0]?.id ?? '')
  const chat = room.chats.find((c) => c.id === activeId) ?? room.chats[0]

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex min-h-0">
        <ChatList room={room} activeId={chat?.id ?? ''} onSelect={setActiveId} unlocked={unlocked} />
        {chat ? (
          <Conversation chat={chat} unlocked={unlocked} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-neutral-500">No conversations</div>
        )}
      </div>
      <CodeEntry room={room} unlocked={unlocked} onUnlock={unlock} />
    </div>
  )
}
