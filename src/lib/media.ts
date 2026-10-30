import type { Chat, GameContent, MediaAttachment, Message, Room } from '../content/types'
import { normalizeCode } from './unlocks'

export interface MediaItem {
  chat: Chat
  message: Message
  media: MediaAttachment
  /** Normalized code, or undefined for media that is always visible. */
  code?: string
}

/** Every media item on a device, in chat order. */
export function listMedia(room: Room): MediaItem[] {
  const out: MediaItem[] = []
  for (const chat of room.chats) {
    for (const message of chat.messages) {
      if (message.media) {
        out.push({ chat, message, media: message.media, code: message.media.code ? normalizeCode(message.media.code) : undefined })
      }
    }
  }
  return out
}

/** Only the items that need a code. */
export function lockedMedia(room: Room): (MediaItem & { code: string })[] {
  return listMedia(room).filter((m): m is MediaItem & { code: string } => !!m.code)
}

/**
 * Throws if the same code appears on two different media items anywhere in
 * the game. Shared chats appear on every device, so the same message carrying
 * the same code on several rooms is fine.
 */
export function assertUniqueCodes(content: GameContent) {
  const seen = new Map<string, string>()
  for (const room of content.rooms) {
    for (const item of lockedMedia(room)) {
      const where = `${item.chat.id}/${item.message.id}`
      const prev = seen.get(item.code)
      if (prev && prev !== where) {
        throw new Error(`Unlock code "${item.code}" is used twice: ${prev} and room ${room.id} ${where}`)
      }
      seen.set(item.code, where)
    }
  }
}
