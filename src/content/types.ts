export type MediaKind = 'photo' | 'video' | 'audio'

export const MEDIA_KINDS: MediaKind[] = ['photo', 'video', 'audio']

export const MEDIA_LABEL: Record<MediaKind, string> = {
  photo: 'Photo',
  video: 'Video',
  audio: 'Voice memo',
}

export interface MediaAttachment {
  kind: MediaKind
  /** Path under /public, e.g. "/media/room-1/park.jpg" */
  src: string
  /** Optional caption shown under the media once unlocked. */
  caption?: string
  /**
   * Unlock code for this one item. Case-insensitive, whitespace ignored.
   * Must be unique across the whole game. Leave it out for media that is
   * visible from the start.
   */
  code?: string
}

export interface Message {
  id: string
  /** Sender's display name. Use "me" for the laptop owner (renders on the right). */
  from: string
  /** Free-form time label, e.g. "Fri 9:41 PM". */
  time?: string
  text?: string
  media?: MediaAttachment
}

export interface Chat {
  id: string
  /** Contact or group name shown in the chat list. */
  title: string
  /** Shown under the title in the header, e.g. a phone number or "3 people". */
  subtitle?: string
  messages: Message[]
}

export interface Room {
  id: number
  slug: string
  /** Whose messages render as "me". Every device is Emily's. */
  owner: string
  /** Shown in the app header, e.g. "Emily's phone backup". */
  device: string
  /** The leader whose private thread lives on this device. Used by the setup and staff pages. */
  suspect: string
  chats: Chat[]
}

export interface GameContent {
  /** PIN for the hidden /room/:slug/staff page. */
  staffPin: string
  /** Code the kids type on the main LED screen page (/screen) to unlock Emily's phone. */
  screenCode: string
  rooms: Room[]
}
