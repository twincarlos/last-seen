import type { Message } from '../content/types'
import { isUnlocked } from '../lib/unlocks'
import { Avatar } from './Avatar'
import { MediaBubble } from './MediaBubble'

export function MessageBubble({
  message,
  unlocked,
  showSender,
  me,
}: {
  message: Message
  /** Normalized codes entered on this laptop. */
  unlocked: string[]
  showSender: boolean
  /** Display name of the device owner, used for the avatar on "me" messages. */
  me: string
}) {
  const mine = message.from === 'me'
  const sender = mine ? me : message.from
  const isUnlockedMedia = !!message.media && isUnlocked(message.media, unlocked)

  const bubbleColor = mine ? 'bg-[#0a84ff] text-white' : 'bg-[#26262a] text-neutral-100'
  const radius = mine ? 'rounded-[18px] rounded-br-[4px]' : 'rounded-[18px] rounded-bl-[4px]'

  return (
    <div className={`flex items-end gap-2 ${mine ? 'flex-row-reverse' : ''}`}>
      <Avatar name={sender} className="mb-4" />
      <div className={`flex flex-col min-w-0 max-w-[75%] ${mine ? 'items-end' : 'items-start'}`}>
        {showSender && !mine && <span className="ml-3 mb-0.5 text-[11px] text-neutral-500">{message.from}</span>}
        <div className={`overflow-hidden ${radius} ${isUnlockedMedia && message.media!.kind === 'photo' ? '' : bubbleColor}`}>
          {message.media ? (
            <MediaBubble media={message.media} unlocked={isUnlockedMedia} mine={mine} />
          ) : (
            <p className="px-3.5 py-2 text-[15px] leading-snug whitespace-pre-wrap">{message.text}</p>
          )}
        </div>
        {message.time && <span className={`mt-0.5 text-[10px] text-neutral-600 ${mine ? 'mr-1' : 'ml-1'}`}>{message.time}</span>}
      </div>
    </div>
  )
}
