import type { MediaKind, Message } from '../content/types'
import { MediaBubble } from './MediaBubble'

export function MessageBubble({ message, unlocked, showSender }: { message: Message; unlocked: MediaKind[]; showSender: boolean }) {
  const mine = message.from === 'me'
  const isMedia = !!message.media
  const isUnlockedMedia = isMedia && unlocked.includes(message.media!.kind)

  const bubbleColor = mine ? 'bg-[#0a84ff] text-white' : 'bg-[#26262a] text-neutral-100'
  const radius = mine ? 'rounded-[18px] rounded-br-[4px]' : 'rounded-[18px] rounded-bl-[4px]'

  return (
    <div className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
      {showSender && !mine && <span className="ml-3 mb-0.5 text-[11px] text-neutral-500">{message.from}</span>}
      <div className={`max-w-[75%] overflow-hidden ${radius} ${isUnlockedMedia && message.media!.kind === 'photo' ? '' : bubbleColor}`}>
        {message.media ? (
          <MediaBubble media={message.media} unlocked={isUnlockedMedia} mine={mine} />
        ) : (
          <p className="px-3.5 py-2 text-[15px] leading-snug whitespace-pre-wrap">{message.text}</p>
        )}
      </div>
      {message.time && <span className={`mt-0.5 text-[10px] text-neutral-600 ${mine ? 'mr-1' : 'ml-1'}`}>{message.time}</span>}
    </div>
  )
}
