import type { GameContent } from './types'

/**
 * All story content lives here. Edit freely.
 *
 * - "me" is the laptop owner for that room (the suspect overseeing it).
 * - Media files go in /public/media/room-N/ and are referenced by path.
 * - Codes are matched case-insensitively with spaces removed.
 */
export const content: GameContent = {
  staffPin: '2468',
  rooms: [
    {
      id: 1,
      slug: 'room-1',
      owner: 'Annee',
      codes: { photo: '4471', video: 'LAKESIDE', audio: '0917' },
      chats: [
        {
          id: 'emily',
          title: 'Emily',
          subtitle: '+1 (555) 014-2201',
          messages: [
            { id: 'm1', from: 'Emily', time: 'Thu 7:12 PM', text: 'hey, are you coming to leaders meeting tomorrow?' },
            { id: 'm2', from: 'me', time: 'Thu 7:15 PM', text: 'yeah. can we talk after though? just us' },
            { id: 'm3', from: 'Emily', time: 'Thu 7:15 PM', text: 'of course. everything ok?' },
            { id: 'm4', from: 'me', time: 'Thu 7:20 PM', media: { kind: 'photo', src: '/media/room-1/placeholder-photo.svg', caption: 'this is where we hung out last weekend' } },
            { id: 'm5', from: 'Emily', time: 'Thu 7:21 PM', text: 'who are those people?' },
            { id: 'm6', from: 'me', time: 'Thu 7:30 PM', media: { kind: 'audio', src: '/media/room-1/placeholder-audio.wav' } },
            { id: 'm7', from: 'me', time: 'Fri 11:02 PM', text: 'come to the lake saturday. they want to meet you' },
            { id: 'm8', from: 'Emily', time: 'Fri 11:40 PM', text: 'idk annee. that didnt sound like you' },
            { id: 'm9', from: 'me', time: 'Fri 11:41 PM', media: { kind: 'video', src: '/media/room-1/placeholder-video.mp4', caption: 'see? its fun' } },
          ],
        },
        {
          id: 'group',
          title: 'Youth Leaders',
          subtitle: '6 people',
          messages: [
            { id: 'g1', from: 'Pastor Dan', time: 'Mon 8:00 AM', text: 'Reminder: leaders meeting Friday at 6.' },
            { id: 'g2', from: 'Emily', time: 'Mon 8:14 AM', text: 'I\'ll be there!' },
            { id: 'g3', from: 'me', time: 'Mon 9:30 AM', text: 'same' },
            { id: 'g4', from: 'Marcus', time: 'Mon 9:32 AM', text: 'Can someone bring the speaker?' },
          ],
        },
      ],
    },
    {
      id: 2,
      slug: 'room-2',
      owner: 'Marcus',
      codes: { photo: '1130', video: 'CHAPEL', audio: '7788' },
      chats: [
        {
          id: 'emily',
          title: 'Emily',
          messages: [
            { id: 'm1', from: 'Emily', time: 'Sat 2:05 PM', text: 'have you talked to annee lately? she seems different' },
            { id: 'm2', from: 'me', time: 'Sat 2:30 PM', text: 'a little. why?' },
            { id: 'm3', from: 'Emily', time: 'Sat 2:31 PM', media: { kind: 'photo', src: '/media/room-2/placeholder-photo.svg' } },
            { id: 'm4', from: 'me', time: 'Sat 2:45 PM', media: { kind: 'video', src: '/media/room-2/placeholder-video.mp4' } },
            { id: 'm5', from: 'Emily', time: 'Sat 2:50 PM', media: { kind: 'audio', src: '/media/room-2/placeholder-audio.wav' } },
          ],
        },
      ],
    },
    {
      id: 3,
      slug: 'room-3',
      owner: 'Sarah',
      codes: { photo: '5502', video: 'SUNDAY', audio: '3141' },
      chats: [
        {
          id: 'emily',
          title: 'Emily',
          messages: [
            { id: 'm1', from: 'me', time: 'Sun 10:10 AM', text: 'you weren\'t at service today. everything ok?' },
            { id: 'm2', from: 'Emily', time: 'Sun 1:22 PM', media: { kind: 'photo', src: '/media/room-3/placeholder-photo.svg' } },
            { id: 'm3', from: 'Emily', time: 'Sun 1:23 PM', media: { kind: 'video', src: '/media/room-3/placeholder-video.mp4' } },
            { id: 'm4', from: 'Emily', time: 'Sun 1:25 PM', media: { kind: 'audio', src: '/media/room-3/placeholder-audio.wav' } },
          ],
        },
      ],
    },
    {
      id: 4,
      slug: 'room-4',
      owner: 'Jordan',
      codes: { photo: '8823', video: 'BRIDGE', audio: '6060' },
      chats: [
        {
          id: 'emily',
          title: 'Emily',
          messages: [
            { id: 'm1', from: 'Emily', time: 'Mon 11:48 PM', text: 'can i call you?' },
            { id: 'm2', from: 'me', time: 'Tue 7:02 AM', text: 'sorry, just saw this. what happened?' },
            { id: 'm3', from: 'Emily', time: 'Tue 7:30 AM', media: { kind: 'audio', src: '/media/room-4/placeholder-audio.wav' } },
            { id: 'm4', from: 'Emily', time: 'Tue 7:31 AM', media: { kind: 'photo', src: '/media/room-4/placeholder-photo.svg' } },
            { id: 'm5', from: 'Emily', time: 'Tue 7:33 AM', media: { kind: 'video', src: '/media/room-4/placeholder-video.mp4' } },
          ],
        },
      ],
    },
    {
      id: 5,
      slug: 'room-5',
      owner: 'Priya',
      codes: { photo: '2290', video: 'LANTERN', audio: '4455' },
      chats: [
        {
          id: 'emily',
          title: 'Emily',
          messages: [
            { id: 'm1', from: 'me', time: 'Wed 6:15 PM', text: 'annee said you two were going somewhere saturday?' },
            { id: 'm2', from: 'Emily', time: 'Wed 6:40 PM', text: 'she keeps asking. i dont know those people' },
            { id: 'm3', from: 'Emily', time: 'Wed 6:41 PM', media: { kind: 'photo', src: '/media/room-5/placeholder-photo.svg' } },
            { id: 'm4', from: 'me', time: 'Wed 6:50 PM', media: { kind: 'video', src: '/media/room-5/placeholder-video.mp4' } },
            { id: 'm5', from: 'Emily', time: 'Sat 11:58 PM', media: { kind: 'audio', src: '/media/room-5/placeholder-audio.wav' } },
          ],
        },
      ],
    },
  ],
}

export function findRoom(slug: string | undefined) {
  return content.rooms.find((r) => r.slug === slug)
}
