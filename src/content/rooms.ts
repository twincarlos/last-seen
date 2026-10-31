import type { Chat, GameContent, Message } from './types'

/**
 * All story content lives here. Edit freely.
 *
 * Story: four young adults have vanished from crowded events around the
 * county in five months, each during a moment when everyone was looking the
 * wrong way. Each time the family got a photo of the victim taken seconds
 * before, the victim's phone sent "I'm okay. I chose this. Don't look for
 * me.", and a small silver star was left where they were last seen. All four
 * came back 48 hours later with no memory. The news calls it the Forty-Eight
 * Hours case.
 *
 * Emily photographs events. She found the same hooded figure in the
 * background of two of them, sent it to a detective, and then an unknown
 * number started messaging her. She told Will first; he told her to keep it
 * quiet. She spread everything across her five devices and quietly checked
 * where each leader was every time the number told her where it was. She was
 * going to tell Will everything after service on Friday Oct 30. The lights
 * went out for eight seconds for the carnival reveal and she was taken.
 *
 * The taker is Annee. The victim's phone stays on for one hour, within a
 * mile, then goes dark. Emily saw the face. "You are the one I keep."
 *
 * Every room is one of Emily's devices. Each device holds:
 * - a slice of the Unknown thread and of the detective thread (date ranges),
 * - Emily's private thread with ONE suspect (equal weight, five suspects),
 * - the shared JTP CORE LEADERS chat,
 * - Emily's notes to herself.
 *
 * Four devices each quietly clear one suspect: Unknown was somewhere at a
 * time that leader provably wasn't. The fifth device (Annee's thread) clears
 * nobody. It holds the "where" and the things the other rooms' tells point
 * back to (the mug, the word "Always.").
 *
 * - "me" is Emily on every device.
 * - Media files go in /public/media/room-N/ and are referenced by path.
 * - Every media item carries its own unlock code. Five per room, all unique
 *   across the game (main.tsx throws on a duplicate). Matched
 *   case-insensitively with spaces removed. Media without a code is open
 *   from the start (the taker's photo in the group chat).
 *
 * Texting styles (the fake 8:09 PM text breaks Emily's):
 * - Emily: lowercase, no periods, calls him "will".
 * - Unknown and Annee: capitals and periods, no contractions. Both say "Always."
 *   Unknown never refers to itself as he or she.
 * - Detective: short, formal, no small talk.
 * - Zulmarie, Gabriel, Melo: lowercase, casual. Winston, Will, MM: proper.
 */

/** Where Emily is being held during the hour. Change this to a real room in your building. */
export const CROSSING_PLACE = 'the room under the baptistery'

type Dated = Message & { day: number }

/** Keep only messages whose day (MDD, e.g. 1012 = Oct 12) falls in the range. */
function slice(all: Dated[], from: number, to: number): Message[] {
  return all.filter((m) => m.day >= from && m.day <= to).map(({ day: _day, ...m }) => m)
}

const cap = (s: string) => s[0].toUpperCase() + s.slice(1)

// ---------------------------------------------------------------------------
// Unknown. The taker's messages to Emily. Split across the five devices.
// ---------------------------------------------------------------------------

const UNKNOWN: Dated[] = [
  { day: 928, id: 'u1', from: 'Unknown', time: 'Mon Sep 28, 11:02 PM', text: 'You look at everything. Nobody else does. That is why it is you.' },
  { day: 928, id: 'u2', from: 'me', time: 'Mon Sep 28, 11:10 PM', text: 'who is this' },
  { day: 928, id: 'u3', from: 'Unknown', time: 'Mon Sep 28, 11:11 PM', text: 'The person in the back of your photos. You found two. There are more.' },
  { day: 928, id: 'u4', from: 'me', time: 'Mon Sep 28, 11:15 PM', text: 'what do you want' },
  { day: 928, id: 'u5', from: 'Unknown', time: 'Mon Sep 28, 11:16 PM', text: 'For you to keep looking. You are the only one who does.' },
  { day: 1002, id: 'u6', from: 'Unknown', time: 'Fri Oct 2, 11:40 PM', text: 'You were at IHOP tonight. Chocolate chip. No whipped cream. You looked tired.' },
  { day: 1002, id: 'u7', from: 'me', time: 'Fri Oct 2, 11:42 PM', text: 'were you there' },
  { day: 1002, id: 'u8', from: 'Unknown', time: 'Fri Oct 2, 11:42 PM', text: 'I am there every Friday. So are you.' },
  { day: 1009, id: 'u9', from: 'me', time: 'Fri Oct 9, 11:55 PM', text: 'the people on the news. was that you' },
  { day: 1009, id: 'u10', from: 'Unknown', time: 'Fri Oct 9, 11:58 PM', text: 'They all came back. Nobody even thanked me.' },
  { day: 1012, id: 'u11', from: 'Unknown', time: 'Mon Oct 12, 8:20 PM', text: 'Cannot talk tonight. Practice. I can hear her singing from here.' },
  { day: 1012, id: 'u12', from: 'me', time: 'Mon Oct 12, 8:22 PM', text: 'youre at church right now' },
  { day: 1012, id: 'u13', from: 'Unknown', time: 'Mon Oct 12, 8:22 PM', text: 'Nobody looks at me.' },

  { day: 1015, id: 'u14', from: 'Unknown', time: 'Thu Oct 15, 6:30 PM', text: 'Check your mailbox.' },
  { day: 1015, id: 'u15', from: 'me', time: 'Thu Oct 15, 6:48 PM', media: { kind: 'photo', src: '/media/room-2/1130-2.jpg', caption: 'how do you know where i live', code: '1130' } },
  { day: 1015, id: 'u16', from: 'Unknown', time: 'Thu Oct 15, 6:49 PM', text: 'I know everything about you. That is not a threat. That is the point.' },
  { day: 1015, id: 'u17', from: 'Unknown', time: 'Thu Oct 15, 7:45 PM', text: 'Service is long tonight. I am counting how many times you check your phone. Four.' },
  { day: 1015, id: 'u18', from: 'me', time: 'Thu Oct 15, 7:46 PM', text: 'youre in here' },
  { day: 1015, id: 'u19', from: 'Unknown', time: 'Thu Oct 15, 7:46 PM', text: 'Five.' },
  { day: 1015, id: 'u19b', from: 'Unknown', time: 'Thu Oct 15, 7:47 PM', media: { kind: 'photo', src: '/media/room-2/5190-2.png', caption: 'Six.', code: '5190' } },

  { day: 1019, id: 'u20', from: 'Unknown', time: 'Mon Oct 19, 9:06 PM', media: { kind: 'photo', src: '/media/room-3/5502-3.jpg', caption: 'Your star. You get it when I take you.', code: '5502' } },
  { day: 1019, id: 'u21', from: 'me', time: 'Mon Oct 19, 9:10 PM', text: 'take me where' },
  { day: 1019, id: 'u22', from: 'Unknown', time: 'Mon Oct 19, 9:10 PM', text: 'Somewhere nobody looks.' },
  { day: 1020, id: 'u23', from: 'me', time: 'Tue Oct 20, 7:14 PM', text: 'what are you doing right now' },
  { day: 1020, id: 'u24', from: 'Unknown', time: 'Tue Oct 20, 7:15 PM', text: 'Home. Blanket, tea, no lights but the TV. You?' },
  { day: 1020, id: 'u25', from: 'me', time: 'Tue Oct 20, 7:16 PM', text: 'watching winston yell at 8th graders' },
  { day: 1020, id: 'u26', from: 'Unknown', time: 'Tue Oct 20, 7:16 PM', text: 'Sounds loud. I like quiet.' },

  { day: 1022, id: 'u27', from: 'Unknown', time: 'Thu Oct 22, 9:40 PM', text: 'Friday after service, go to IHOP like always. I want to watch you not knowing which one of them I am.' },
  { day: 1022, id: 'u28', from: 'me', time: 'Thu Oct 22, 9:41 PM', text: 'one of who' },
  { day: 1022, id: 'u29', from: 'Unknown', time: 'Thu Oct 22, 9:41 PM', text: 'The people at your table. You trust all of them. That is your one weakness.' },
  { day: 1023, id: 'u30', from: 'Unknown', time: 'Fri Oct 23, 10:41 PM', media: { kind: 'photo', src: '/media/room-4/7034-4.jpg', caption: 'You did not even notice me watching you.', code: '7034' } },
  { day: 1023, id: 'u31', from: 'me', time: 'Fri Oct 23, 10:42 PM', text: 'are you still here' },
  { day: 1023, id: 'u32', from: 'Unknown', time: 'Fri Oct 23, 10:42 PM', text: 'Always.' },
  { day: 1023, id: 'u33', from: 'me', time: 'Fri Oct 23, 11:05 PM', text: 'i looked at everyone tonight. i still dont know' },
  { day: 1023, id: 'u34', from: 'Unknown', time: 'Fri Oct 23, 11:06 PM', text: 'I know. I watched you look.' },

  { day: 1025, id: 'u35', from: 'Unknown', time: 'Sun Oct 25, 9:05 PM', text: 'I am at the church. Just me and the stage. Practicing what I will say to you.' },
  { day: 1025, id: 'u35b', from: 'Unknown', time: 'Sun Oct 25, 9:06 PM', media: { kind: 'photo', src: '/media/room-5/9163-5.jpg', caption: 'Somewhere nobody looks.', code: '9163' } },
  { day: 1025, id: 'u36', from: 'me', time: 'Sun Oct 25, 9:12 PM', text: 'how did you get in' },
  { day: 1025, id: 'u37', from: 'Unknown', time: 'Sun Oct 25, 9:12 PM', text: 'I have had a key for a year. Nobody counts the keys.' },
  { day: 1028, id: 'u38', from: 'me', time: 'Wed Oct 28, 11:30 PM', text: 'i told the police' },
  { day: 1028, id: 'u39', from: 'Unknown', time: 'Wed Oct 28, 11:31 PM', text: 'You told them three weeks ago. They did nothing. I was counting on that.' },
  { day: 1028, id: 'u40', from: 'me', time: 'Wed Oct 28, 11:33 PM', text: 'why me' },
  { day: 1028, id: 'u41', from: 'Unknown', time: 'Wed Oct 28, 11:34 PM', text: 'The others never saw me. You did. You are the one I keep.' },
  { day: 1029, id: 'u42', from: 'Unknown', time: 'Thu Oct 29, 10:04 PM', text: `Friday. 7:59. Eight seconds of dark. For one hour you will be closer than anyone thinks to look. ${cap(CROSSING_PLACE)}. Nobody has opened it since the renovation. After the hour, you will be somewhere else.` },
  { day: 1029, id: 'u43', from: 'me', time: 'Thu Oct 29, 10:20 PM', text: 'im telling will tomorrow. all of it' },
  { day: 1029, id: 'u44', from: 'Unknown', time: 'Thu Oct 29, 10:21 PM', text: 'Tell him. He did not believe you the first time.' },
  { day: 1030, id: 'u45', from: 'Unknown', time: 'Fri Oct 30, 6:50 PM', text: 'I saw your message to Will.' },
  { day: 1030, id: 'u46', from: 'me', time: 'Fri Oct 30, 6:53 PM', text: 'its not about you' },
  { day: 1030, id: 'u47', from: 'Unknown', time: 'Fri Oct 30, 6:53 PM', text: 'Everything is about me now. 7:59.' },
  { day: 1030, id: 'u48', from: 'Unknown', time: 'Fri Oct 30, 7:58 PM', text: 'Smile for the picture.' },
]

// ---------------------------------------------------------------------------
// The detective. Emily's tip thread. Split across the five devices.
// ---------------------------------------------------------------------------

const DETECTIVE: Dated[] = [
  { day: 1002, id: 'd1', from: 'me', time: 'Fri Oct 2, 9:30 PM', text: 'hi. i called the tip line last week about the missing people. i take photos at events. i think the same person is in two of my pictures' },
  { day: 1002, id: 'd2', from: 'me', time: 'Fri Oct 2, 9:31 PM', media: { kind: 'photo', src: '/media/room-1/2306-1.png', caption: 'county fair in june. food truck night downtown two weeks ago. same hoodie. same phone. same spot behind the person who went missing', code: '2306' } },
  { day: 1003, id: 'd3', from: 'Detective', time: 'Sat Oct 3, 10:15 AM', media: { kind: 'audio', src: '/media/room-1/0917-1.wav', code: '0917' } },
  { day: 1003, id: 'd4', from: 'Detective', time: 'Sat Oct 3, 10:16 AM', text: 'Keep sending me what you have. Do not approach anyone.' },
  { day: 1009, id: 'd5', from: 'me', time: 'Fri Oct 9, 11:20 PM', text: 'someone has been messaging me. they know what i order. they know where i was tonight' },
  { day: 1010, id: 'd6', from: 'Detective', time: 'Sat Oct 10, 8:02 AM', text: 'Send me the number.' },
  { day: 1010, id: 'd7', from: 'me', time: 'Sat Oct 10, 8:30 AM', text: 'it changes every time' },

  { day: 1015, id: 'd8', from: 'me', time: 'Thu Oct 15, 7:00 PM', text: 'they left a silver star in my mailbox. like the ones on the news' },
  { day: 1015, id: 'd9', from: 'Detective', time: 'Thu Oct 15, 7:20 PM', text: 'Do not touch it. I will send someone to collect it tomorrow.' },
  { day: 1016, id: 'd10', from: 'me', time: 'Fri Oct 16, 12:10 AM', text: 'they were in my church tonight. during service. they counted how many times i looked at my phone. they sent me a picture of the back of my head' },
  { day: 1016, id: 'd11', from: 'Detective', time: 'Fri Oct 16, 7:45 AM', text: 'Who was in the building.' },
  { day: 1016, id: 'd12', from: 'me', time: 'Fri Oct 16, 7:50 AM', text: 'everyone. its church' },
  { day: 1016, id: 'd12b', from: 'Detective', time: 'Fri Oct 16, 4:30 PM', media: { kind: 'photo', src: '/media/room-2/6271-2.jpg', caption: 'The four from the other scenes. Yours is identical.', code: '6271' } },
  { day: 1016, id: 'd12c', from: 'me', time: 'Fri Oct 16, 4:41 PM', text: 'so im next' },
  { day: 1016, id: 'd12d', from: 'Detective', time: 'Fri Oct 16, 4:42 PM', text: 'You are on a list. So am I now. Keep your phone on.' },

  { day: 1019, id: 'd13', from: 'me', time: 'Mon Oct 19, 9:15 PM', text: 'they just sent me a picture of a star. they said its mine' },
  { day: 1019, id: 'd14', from: 'Detective', time: 'Mon Oct 19, 9:16 PM', text: 'Emily. Where are you right now.' },
  { day: 1019, id: 'd15', from: 'me', time: 'Mon Oct 19, 9:16 PM', text: 'home' },
  { day: 1019, id: 'd16', from: 'Detective', time: 'Mon Oct 19, 9:17 PM', text: 'Stay there. Lock the door. I am calling you.' },
  { day: 1021, id: 'd17', from: 'Detective', time: 'Wed Oct 21, 4:00 PM', text: 'The star from your mailbox came back clean. No prints. Whoever this is wears gloves.' },

  { day: 1023, id: 'd18', from: 'me', time: 'Fri Oct 23, 11:10 PM', text: 'they were at ihop tonight. they took a picture of me in the parking lot from across the lot' },
  { day: 1023, id: 'd19', from: 'Detective', time: 'Fri Oct 23, 11:12 PM', text: 'Did you see them.' },
  { day: 1023, id: 'd20', from: 'me', time: 'Fri Oct 23, 11:13 PM', text: 'i saw a hoodie by the corner of the building. every leader at my church has that hoodie' },
  { day: 1024, id: 'd21', from: 'Detective', time: 'Sat Oct 24, 9:00 AM', media: { kind: 'audio', src: '/media/room-4/4807-4.wav', code: '4807' } },
  { day: 1024, id: 'd21b', from: 'Detective', time: 'Sat Oct 24, 9:01 AM', text: 'Make the list.' },
  { day: 1024, id: 'd22', from: 'me', time: 'Sat Oct 24, 9:10 AM', text: 'i already started' },

  { day: 1029, id: 'd23', from: 'me', time: 'Thu Oct 29, 10:25 PM', text: 'they told me when. friday 7:59. during the blackout for the reveal' },
  { day: 1029, id: 'd24', from: 'Detective', time: 'Thu Oct 29, 10:26 PM', text: 'I am working on getting a car there. Do not stand near a door. Do not be alone.' },
  { day: 1030, id: 'd25', from: 'me', time: 'Fri Oct 30, 6:40 PM', text: 'im telling my pastor everything after service' },
  { day: 1030, id: 'd26', from: 'Detective', time: 'Fri Oct 30, 6:41 PM', text: 'Good. Call me after.' },
  { day: 1030, id: 'd26b', from: 'Detective', time: 'Fri Oct 30, 7:40 PM', media: { kind: 'audio', src: '/media/room-5/3579-5.wav', code: '3579' } },
  { day: 1030, id: 'd27', from: 'Detective', time: 'Fri Oct 30, 8:30 PM', text: 'Emily. Call me.' },
  { day: 1030, id: 'd28', from: 'Detective', time: 'Fri Oct 30, 8:41 PM', text: 'Emily.' },
]

// ---------------------------------------------------------------------------
// JTP CORE LEADERS. Shared, identical on every device.
// ---------------------------------------------------------------------------

const LEADERS: Message[] = [
  { id: 'l1', from: 'Will', time: 'Mon Oct 12, 6:30 PM', text: 'Leaders meeting 7:30, practice after. Gabriel, enjoy your friend\'s game.' },
  { id: 'l2', from: 'Gabriel', time: 'Mon Oct 12, 6:32 PM', text: 'GO WARRIORS' },
  { id: 'l3', from: 'MM', time: 'Mon Oct 12, 10:15 PM', text: 'Good practice. Go home.' },
  { id: 'l4', from: 'Will', time: 'Thu Oct 15, 5:00 PM', text: 'Service tonight. I am preaching the whole hour, so Zulmarie has the opening set. Melo, we are live streaming, check the feed.' },
  { id: 'l5', from: 'Melo', time: 'Thu Oct 15, 5:03 PM', text: 'feed is up. dont trip on the cable this time' },
  { id: 'l6', from: 'Winston', time: 'Tue Oct 20, 5:00 PM', text: 'Sports night 5:30. Gabriel, you are on cones.' },
  { id: 'l7', from: 'Gabriel', time: 'Tue Oct 20, 5:02 PM', text: 'cones is a demotion' },
  { id: 'l8', from: 'Carlos', time: 'Fri Oct 23, 9:45 PM', text: 'IHOP?' },
  { id: 'l9', from: 'Zulmarie', time: 'Fri Oct 23, 9:46 PM', text: 'in. im driving emily' },
  { id: 'l10', from: 'Melo', time: 'Fri Oct 23, 9:46 PM', text: 'in' },
  { id: 'l11', from: 'Gabriel', time: 'Fri Oct 23, 9:47 PM', text: 'in' },
  { id: 'l12', from: 'Winston', time: 'Fri Oct 23, 9:47 PM', text: 'Fine.' },
  { id: 'l13', from: 'Annee', time: 'Fri Oct 23, 9:48 PM', text: 'In.' },
  { id: 'l14', from: 'Will', time: 'Fri Oct 23, 9:49 PM', text: 'MM and I are in. Somebody save us a booth.' },
  { id: 'l15', from: 'me', time: 'Fri Oct 23, 9:49 PM', text: 'in' },
  { id: 'l16', from: 'Will', time: 'Sun Oct 25, 12:40 PM', text: 'Emily, missed you at service. Everything ok?' },
  { id: 'l17', from: 'me', time: 'Sun Oct 25, 1:10 PM', text: 'sorry. slept in' },
  { id: 'l18', from: 'Will', time: 'Mon Oct 26, 7:00 PM', text: 'Carnival reveal is Friday. Group photo at 7:55, then the blackout, then the promo. Leaders in the back row. MM and Melo run the blackout from the media room.' },
  { id: 'l19', from: 'Carlos', time: 'Mon Oct 26, 7:02 PM', text: "8 seconds of dark, then the promo hits. Trust me. I'm on the camera so I won't be in it." },
  { id: 'l20', from: 'Melo', time: 'Mon Oct 26, 7:03 PM', text: 'ill build the cue. lights and both screens' },
  { id: 'l21', from: 'Carlos', time: 'Thu Oct 29, 9:40 PM', text: "Shooting the photo tomorrow. Everyone smile for once." },
  { id: 'l22', from: 'me', time: 'Fri Oct 30, 6:48 PM', text: 'will can i talk to you after service tonight. just us' },
  { id: 'l23', from: 'Will', time: 'Fri Oct 30, 6:51 PM', text: 'Of course.' },
  { id: 'l24', from: 'Zulmarie', time: 'Fri Oct 30, 7:52 PM', text: 'PHOTO IN 3 MIN. everyone to the stage' },
  { id: 'l25', from: 'Zulmarie', time: 'Fri Oct 30, 8:04 PM', text: 'where is emily. she was right next to me' },
  { id: 'l26', from: 'Winston', time: 'Fri Oct 30, 8:06 PM', text: 'Side door is open. It was locked at 7:30.' },
  { id: 'l26b', from: 'Melo', time: 'Fri Oct 30, 8:06 PM', text: 'the cue ran exactly 8 seconds. that wasnt us' },
  { id: 'l27', from: 'MM', time: 'Fri Oct 30, 8:07 PM', text: 'I went out the side. Her camera is in the grass outside the door. There is a little silver star next to it.' },
  { id: 'l28', from: 'me', time: 'Fri Oct 30, 8:08 PM', media: { kind: 'photo', src: '/media/shared/placeholder-photo.svg' } },
  { id: 'l29', from: 'me', time: 'Fri Oct 30, 8:09 PM', text: "I'm okay. I chose this. Don't look for me." },
  { id: 'l30', from: 'Will', time: 'Fri Oct 30, 8:11 PM', text: 'That is the case from the news. The photo. The text. The star.' },
  { id: 'l31', from: 'MM', time: 'Fri Oct 30, 8:12 PM', text: 'That is not how Emily texts. Not once in two years. I am not accepting that.' },
  { id: 'l32', from: 'Zulmarie', time: 'Fri Oct 30, 8:12 PM', text: 'emily call me right now' },
  { id: 'l33', from: 'Annee', time: 'Fri Oct 30, 8:13 PM', text: 'Emily, what does that mean??' },
  { id: 'l34', from: 'Will', time: 'Fri Oct 30, 8:18 PM', text: 'Zulmarie. When did you last talk to Emily?' },
  { id: 'l35', from: 'Zulmarie', time: 'Fri Oct 30, 8:19 PM', text: 'wednesday. bible study' },
  { id: 'l36', from: 'Will', time: 'Fri Oct 30, 8:20 PM', text: 'Annee. You were at the end of the row by the side aisle. Did you see anything?' },
  { id: 'l37', from: 'Annee', time: 'Fri Oct 30, 8:21 PM', text: 'I was looking at the camera like everyone else.' },
  { id: 'l38', from: 'Carlos', time: 'Fri Oct 30, 8:22 PM', text: "Her bag is here. Laptop, tablet, charger, everything. She didn't take anything. There's a detective's card in the front pocket." },
  { id: 'l39', from: 'Will', time: 'Fri Oct 30, 8:23 PM', text: 'Then she did not leave. Call that number. Nobody leaves this building. Carlos, get her devices. All of them.' },
  { id: 'l40', from: 'Carlos', time: 'Fri Oct 30, 8:24 PM', text: 'On it.' },
]

// ---------------------------------------------------------------------------
// Chat builders
// ---------------------------------------------------------------------------

const unknown = (from: number, to: number, through: string): Chat => ({
  id: 'unknown',
  title: 'Unknown',
  subtitle: `No caller ID · synced through ${through}`,
  messages: slice(UNKNOWN, from, to),
})

const detective = (from: number, to: number, through: string): Chat => ({
  id: 'detective',
  title: 'Detective',
  subtitle: `Tip line · synced through ${through}`,
  messages: slice(DETECTIVE, from, to),
})

const leaders: Chat = { id: 'leaders', title: 'JTP CORE LEADERS', subtitle: '9 people', messages: LEADERS }

const notes = (messages: Message[]): Chat => ({ id: 'notes', title: 'Notes to self', subtitle: 'Only you', messages })

// ---------------------------------------------------------------------------
// Rooms. One of Emily's devices each.
// ---------------------------------------------------------------------------

export const content: GameContent = {
  staffPin: '2468',
  // Typed on the main LED screen (/screen) after the spotlight. Matched like the room codes.
  screenCode: '5817',
  rooms: [
    // -----------------------------------------------------------------------
    // Room 1. Emily's laptop. Thread with Gabriel. Sep 28 to Oct 13.
    // Clears Gabriel: Unknown was at worship practice Mon Oct 12 at 8:20.
    // Gabriel isn't in the band and was at his friend's game.
    // Red herring: his silver star keychain, and he was at two of the events.
    // Holds Emily's two background photos and the detective's first voicemail.
    // Media: keychain photo 4471, game photo 6642, evidence photo 2306,
    // method video PRACTICE, detective voicemail 0917.
    // -----------------------------------------------------------------------
    {
      id: 1,
      slug: 'room-1',
      owner: 'Emily',
      device: "Emily's laptop",
      suspect: 'Gabriel',
      chats: [
        leaders,
        {
          id: 'gabriel',
          title: 'Gabriel',
          messages: [
            { id: 'g1', from: 'me', time: 'Thu Oct 1, 8:10 PM', text: 'random. were you at the fair in june' },
            { id: 'g2', from: 'Gabriel', time: 'Thu Oct 1, 8:14 PM', text: 'yeah?? everyone was. why' },
            { id: 'g3', from: 'me', time: 'Thu Oct 1, 8:14 PM', text: 'and food truck night downtown in september' },
            { id: 'g4', from: 'Gabriel', time: 'Thu Oct 1, 8:15 PM', text: 'yes emily i go to things. is this about the missing people thing. because that was the fair and food truck night right' },
            { id: 'g5', from: 'me', time: 'Thu Oct 1, 8:16 PM', text: 'no' },
            { id: 'g6', from: 'me', time: 'Thu Oct 8, 9:20 PM', media: { kind: 'photo', src: '/media/room-1/4471-1.jpg', caption: "where'd you get this", code: '4471' } },
            { id: 'g7', from: 'Gabriel', time: 'Thu Oct 8, 9:24 PM', text: 'lost and found box at church. been in there forever. cool right' },
            { id: 'g8', from: 'me', time: 'Thu Oct 8, 9:24 PM', text: 'how long is forever' },
            { id: 'g9', from: 'Gabriel', time: 'Thu Oct 8, 9:25 PM', text: 'idk. a month? why do you care about my keychain' },
            { id: 'g10', from: 'me', time: 'Mon Oct 12, 7:50 PM', text: 'you skipping practice' },
            { id: 'g11', from: 'Gabriel', time: 'Mon Oct 12, 7:51 PM', text: 'not in the band emily lol. my friends game tonight' },
            { id: 'g12', from: 'Gabriel', time: 'Mon Oct 12, 8:18 PM', media: { kind: 'photo', src: '/media/room-1/6642-1.jpg', caption: 'HE HIT A THREE', code: '6642' } },
            { id: 'g13', from: 'me', time: 'Mon Oct 12, 8:19 PM', text: 'lol ok' },
            { id: 'g14', from: 'me', time: 'Thu Oct 15, 8:30 PM', text: 'do you have a key to the church' },
            { id: 'g15', from: 'Gabriel', time: 'Thu Oct 15, 8:33 PM', text: 'no?? winston and the pastors. why' },
            { id: 'g16', from: 'me', time: 'Thu Oct 15, 8:33 PM', text: 'no reason' },
            { id: 'g17', from: 'Gabriel', time: 'Thu Oct 29, 10:41 PM', text: 'you ok? you keep looking at everyone like youre counting them' },
            { id: 'g18', from: 'me', time: 'Thu Oct 29, 10:41 PM', text: 'after friday' },
            { id: 'g19', from: 'Gabriel', time: 'Fri Oct 30, 7:50 PM', text: "where are you, photo's starting" },
            { id: 'g20', from: 'me', time: 'Fri Oct 30, 7:51 PM', text: 'coming' },
          ],
        },
        unknown(901, 1013, 'Oct 13'),
        detective(901, 1013, 'Oct 13'),
        notes([
          { id: 'x1', from: 'me', time: 'Tue Oct 13, 12:10 AM', text: 'the person in my photos is one of us. they know practice, they know ihop, they know my house.' },
          { id: 'x2', from: 'me', time: 'Tue Oct 13, 12:11 AM', text: 'five people it could be. zu. winston. gabriel. will. annee.' },
          { id: 'x3', from: 'me', time: 'Tue Oct 13, 12:12 AM', text: 'im keeping everything on every device. if something happens to me nobody can delete all of it.' },
          { id: 'x4', from: 'me', time: 'Tue Oct 13, 12:15 AM', media: { kind: 'video', src: '/media/room-1/PRACTICE-1.mp4', code: 'PRACTICE' } },
          { id: 'x5', from: 'me', time: 'Tue Oct 13, 12:18 AM', text: "prove who it isn't." },
        ]),
      ],
    },

    // -----------------------------------------------------------------------
    // Room 2. Emily's phone backup. Thread with Will. Oct 14 to Oct 17.
    // Clears Will: Unknown messaged Emily from inside the sanctuary during
    // Thursday service Oct 15 at 7:45. Will was on stage preaching, on the
    // live stream. Red herring: Will told her to keep it from MM and let him
    // handle it, and he has keys.
    // Media: mailbox photo 1130, Unknown's photo from behind Emily 5190,
    // detective's evidence-bag photo 6271, live stream clip LIVESTREAM,
    // Will's voice memo 7788.
    // -----------------------------------------------------------------------
    {
      id: 2,
      slug: 'room-2',
      owner: 'Emily',
      device: "Emily's phone backup",
      suspect: 'Will',
      chats: [
        leaders,
        {
          id: 'will',
          title: 'Will',
          messages: [
            { id: 'p1', from: 'me', time: 'Mon Oct 5, 9:40 PM', text: 'will i need to show you something. its about the missing people on the news. i think theyve been at our stuff' },
            { id: 'p2', from: 'Will', time: 'Mon Oct 5, 9:52 PM', text: 'Emily. Slow down. Show me what you have.' },
            { id: 'p3', from: 'me', time: 'Mon Oct 5, 9:53 PM', text: 'i sent two photos to a detective. the same person is behind two of the victims. and now someone is texting me' },
            { id: 'p4', from: 'Will', time: 'Mon Oct 5, 10:10 PM', media: { kind: 'audio', src: '/media/room-2/7788-2.ogg', code: '7788' } },
            { id: 'p5', from: 'me', time: 'Mon Oct 5, 10:14 PM', text: 'ok' },
            { id: 'p6', from: 'me', time: 'Fri Oct 9, 11:30 PM', text: 'did you call anyone' },
            { id: 'p7', from: 'Will', time: 'Sat Oct 10, 7:15 AM', text: 'I am praying about it. Please do not bring this to the group. Or to MM. Not yet.' },
            { id: 'p8', from: 'me', time: 'Sat Oct 10, 7:20 AM', text: 'why not mm' },
            { id: 'p9', from: 'Will', time: 'Sat Oct 10, 7:22 AM', text: 'Because she will take it seriously, and I am not ready for what that means.' },
            { id: 'p10', from: 'Will', time: 'Wed Oct 14, 8:00 PM', text: 'Emily, I need you to stop. You are scaring yourself. Come see me after service tomorrow and we will talk like adults.' },
            { id: 'p11', from: 'me', time: 'Wed Oct 14, 8:30 PM', text: 'ok' },
            { id: 'p12', from: 'me', time: 'Fri Oct 16, 12:15 AM', text: 'they were in the room tonight. during your sermon. they were counting how many times i looked at my phone' },
            { id: 'p13', from: 'Will', time: 'Fri Oct 16, 7:30 AM', text: 'I was looking at the whole room for an hour. I did not see anything. Emily, please.' },
            { id: 'p14', from: 'me', time: 'Tue Oct 27, 6:00 PM', text: 'how many keys to the building are there' },
            { id: 'p15', from: 'Will', time: 'Tue Oct 27, 6:40 PM', text: 'Four. Why are you asking me about keys.' },
            { id: 'p16', from: 'Will', time: 'Fri Oct 30, 6:52 PM', text: 'After service. My office. Just us. I promise I will listen this time.' },
            { id: 'p17', from: 'me', time: 'Fri Oct 30, 6:55 PM', text: 'ok' },
            { id: 'p18', from: 'Will', time: 'Fri Oct 30, 8:14 PM', text: 'Emily. Answer me.' },
          ],
        },
        unknown(1014, 1017, 'Oct 17'),
        detective(1014, 1017, 'Oct 17'),
        notes([
          { id: 'x1', from: 'me', time: 'Thu Oct 15, 7:02 PM', text: 'the star came to my house. they know where i live.' },
          { id: 'x2', from: 'me', time: 'Fri Oct 16, 12:30 AM', text: 'thursday 7:45. they were in the room, behind me. who was on stage. who wasnt.' },
          { id: 'x3', from: 'me', time: 'Fri Oct 16, 12:40 AM', media: { kind: 'video', src: '/media/room-2/LIVESTREAM-2.mp4', caption: 'live stream. 7:45 pm.', code: 'LIVESTREAM' } },
          { id: 'x4', from: 'me', time: 'Fri Oct 16, 12:45 AM', text: 'will told me not to tell mm. i dont know what that means yet.' },
        ]),
      ],
    },

    // -----------------------------------------------------------------------
    // Room 3. Emily's tablet. Thread with Winston. Oct 18 to Oct 21.
    // Clears Winston: Unknown was home in the dark Tue Oct 20 at 7:10.
    // Winston was running sports night. Red herring: the leaders hoodie on
    // Emily's doorbell camera, the keys, and his truck at church Sunday night.
    // Holds Unknown's star photo: the mug at the edge of the frame.
    // Media: star photo 5502, doorbell photo HOODIE, keys memo 3141,
    // sports night video CONES, church-at-night photo 9312.
    // -----------------------------------------------------------------------
    {
      id: 3,
      slug: 'room-3',
      owner: 'Emily',
      device: "Emily's tablet",
      suspect: 'Winston',
      chats: [
        leaders,
        {
          id: 'winston',
          title: 'Winston',
          messages: [
            { id: 'w1', from: 'me', time: 'Thu Oct 15, 7:10 PM', media: { kind: 'photo', src: '/media/room-3/HOODIE-3.jpg', caption: 'is this you', code: 'HOODIE' } },
            { id: 'w2', from: 'Winston', time: 'Thu Oct 15, 7:31 PM', text: 'No. Why would I be at your house.' },
            { id: 'w3', from: 'me', time: 'Thu Oct 15, 7:32 PM', text: "that's your hoodie" },
            { id: 'w4', from: 'Winston', time: 'Thu Oct 15, 7:33 PM', text: 'That is the leaders hoodie. All nine of us got one. Gabriel sleeps in his.' },
            { id: 'w5', from: 'me', time: 'Thu Oct 15, 8:40 PM', text: 'how many keys to the church are there' },
            { id: 'w6', from: 'Winston', time: 'Thu Oct 15, 9:02 PM', media: { kind: 'audio', src: '/media/room-3/3141-3.ogg', code: '3141' } },
            { id: 'w7', from: 'me', time: 'Thu Oct 15, 9:05 PM', text: 'just curious' },
            { id: 'w8', from: 'Winston', time: 'Thu Oct 15, 9:05 PM', text: 'Nobody is just curious about keys.' },
            { id: 'w9', from: 'Winston', time: 'Tue Oct 20, 7:08 PM', media: { kind: 'video', src: '/media/room-3/placeholder-video-2.mp4', caption: 'Running drills. 8th graders are animals. Come take pictures.', code: 'CONES' } },
            { id: 'w10', from: 'me', time: 'Tue Oct 20, 7:15 PM', text: 'next week' },
            { id: 'w11', from: 'me', time: 'Sun Oct 25, 9:30 PM', media: { kind: 'photo', src: '/media/room-3/9312-3.jpg', caption: 'you at church right now?', code: '9312' } },
            { id: 'w12', from: 'Winston', time: 'Sun Oct 25, 9:41 PM', text: 'No. Why.' },
            { id: 'w13', from: 'me', time: 'Sun Oct 25, 9:42 PM', text: 'thought i saw your truck in the lot' },
            { id: 'w14', from: 'Winston', time: 'Sun Oct 25, 9:42 PM', text: 'My truck is in my driveway. Who is at the church.' },
            { id: 'w15', from: 'me', time: 'Sun Oct 25, 9:43 PM', text: 'nobody. my mistake' },
            { id: 'w16', from: 'Winston', time: 'Fri Oct 30, 7:30 PM', text: 'Doors are locked for the night. Will wants leaders in the back row for the photo at 7:55. Do not be late.' },
            { id: 'w17', from: 'me', time: 'Fri Oct 30, 7:31 PM', text: 'ok' },
          ],
        },
        unknown(1018, 1021, 'Oct 21'),
        detective(1018, 1021, 'Oct 21'),
        notes([
          { id: 'x1', from: 'me', time: 'Mon Oct 19, 9:20 PM', text: 'they sent a picture of my star on their table. look at everything in that picture. not just the star.' },
          { id: 'x2', from: 'me', time: 'Tue Oct 20, 7:20 PM', text: 'tuesday 7:10. they were home. who was at sports night.' },
        ]),
      ],
    },

    // -----------------------------------------------------------------------
    // Room 4. Emily's school laptop. Thread with Zulmarie. Oct 22 to Oct 24.
    // Clears Zulmarie: Unknown photographed Emily in the IHOP parking lot
    // Fri Oct 23 at 10:41. Zulmarie is standing next to Emily in the photo,
    // so she can't be holding the camera.
    // Red herring: she drove Emily, knows her passcode, and tells Will tonight
    // she hasn't talked to Emily since Wednesday. Unknown says "Always."
    // Media: group photo under the sign 1899, Unknown's parking lot photo
    // 7034, Emily's corner-of-the-building photo 8823, Emily's memo to
    // Zulmarie 6060, detective's voice memo 4807.
    // -----------------------------------------------------------------------
    {
      id: 4,
      slug: 'room-4',
      owner: 'Emily',
      device: "Emily's school laptop",
      suspect: 'Zulmarie',
      chats: [
        leaders,
        {
          id: 'zulmarie',
          title: 'Zulmarie',
          messages: [
            { id: 'z1', from: 'me', time: 'Wed Oct 21, 9:00 PM', text: 'good study tonight' },
            { id: 'z2', from: 'Zulmarie', time: 'Wed Oct 21, 9:02 PM', text: 'the girls love you. you know that right' },
            { id: 'z3', from: 'me', time: 'Wed Oct 21, 9:02 PM', text: 'ok' },
            { id: 'z4', from: 'Zulmarie', time: 'Wed Oct 21, 9:05 PM', text: 'also i changed your passcode back to your birthday because you kept locking yourself out. youre welcome' },
            { id: 'z5', from: 'Zulmarie', time: 'Fri Oct 23, 9:50 PM', text: 'im parked out front. get in' },
            { id: 'z5b', from: 'me', time: 'Fri Oct 23, 10:04 PM', media: { kind: 'photo', src: '/media/room-4/1899-4.jpeg', caption: 'pancake crew', code: '1899' } },
            { id: 'z5c', from: 'Zulmarie', time: 'Fri Oct 23, 10:05 PM', text: 'SEND THAT TO THE GROUP' },
            { id: 'z5d', from: 'me', time: 'Fri Oct 23, 10:05 PM', text: 'later' },
            { id: 'z6', from: 'me', time: 'Fri Oct 23, 10:44 PM', media: { kind: 'photo', src: '/media/room-4/8823-4.jpg', caption: 'get in the car. dont turn around. corner of the building, phone up', code: '8823' } },
            { id: 'z7', from: 'Zulmarie', time: 'Fri Oct 23, 10:45 PM', text: 'who is that' },
            { id: 'z8', from: 'me', time: 'Fri Oct 23, 10:45 PM', text: 'i dont know. drive' },
            { id: 'z9', from: 'me', time: 'Fri Oct 23, 11:00 PM', media: { kind: 'audio', src: '/media/room-4/6060-4.ogg', code: '6060' } },
            { id: 'z10', from: 'Zulmarie', time: 'Fri Oct 23, 11:04 PM', text: 'emily what is going on. call me' },
            { id: 'z11', from: 'me', time: 'Fri Oct 23, 11:05 PM', text: 'not tonight. i promise im ok' },
            { id: 'z12', from: 'me', time: 'Sat Oct 24, 2:15 PM', text: 'random. do you have a key to the church' },
            { id: 'z13', from: 'Zulmarie', time: 'Sat Oct 24, 2:20 PM', text: 'no?? i barely have a key to my own house. ask winston. why' },
            { id: 'z14', from: 'me', time: 'Sat Oct 24, 2:20 PM', text: 'nothing' },
            { id: 'z15', from: 'Zulmarie', time: 'Thu Oct 29, 11:15 PM', text: "you've been weird for a month. im your best friend. talk to me" },
            { id: 'z16', from: 'me', time: 'Thu Oct 29, 11:20 PM', text: 'friday. after service. i promise' },
            { id: 'z17', from: 'Zulmarie', time: 'Fri Oct 30, 7:52 PM', text: 'PHOTO. get up here' },
          ],
        },
        unknown(1022, 1024, 'Oct 24'),
        detective(1022, 1024, 'Oct 24'),
        notes([
          { id: 'x1', from: 'me', time: 'Fri Oct 23, 11:30 PM', text: 'they were in the parking lot. they took a picture of me. whoever is standing in that picture is not them.' },
          { id: 'x2', from: 'me', time: 'Fri Oct 23, 11:31 PM', text: 'they said always. who says always.' },
        ]),
      ],
    },

    // -----------------------------------------------------------------------
    // Room 5. Emily's media room login. Thread with Annee. Oct 25 to tonight.
    // Clears nobody. Holds the "where" and the hour, plus the things the other
    // rooms' tells point back to: Annee's mug, and Annee saying "Always."
    // Media: Unknown's photo of the place 9163, Annee's kitchen table photo
    // 2290, Annee's voice memo 4455, Emily's last voice memo LANTERN, detective's
    // voicemail 3579.
    // -----------------------------------------------------------------------
    {
      id: 5,
      slug: 'room-5',
      owner: 'Emily',
      device: "Emily's media room login",
      suspect: 'Annee',
      chats: [
        leaders,
        {
          id: 'annee',
          title: 'Annee',
          messages: [
            { id: 'a1', from: 'me', time: 'Sat Oct 24, 1:30 PM', text: 'didnt see you much at ihop last night' },
            { id: 'a2', from: 'Annee', time: 'Sat Oct 24, 1:36 PM', text: 'I was there. End of the table by the window. You never looked over once. You looked busy.' },
            { id: 'a3', from: 'me', time: 'Sat Oct 24, 1:36 PM', text: 'busy how' },
            { id: 'a4', from: 'Annee', time: 'Sat Oct 24, 1:37 PM', text: 'Busy thinking. Always.' },
            { id: 'a5', from: 'Annee', time: 'Sun Oct 25, 12:50 PM', text: 'You were not at service. Everything ok?' },
            { id: 'a6', from: 'me', time: 'Sun Oct 25, 1:12 PM', text: 'slept in' },
            { id: 'a7', from: 'Annee', time: 'Sun Oct 25, 1:13 PM', text: 'You never sleep in.' },
            { id: 'a8', from: 'me', time: 'Tue Oct 27, 6:00 PM', text: 'do you have a key to the church' },
            { id: 'a9', from: 'Annee', time: 'Tue Oct 27, 6:08 PM', text: 'No. Why would I? Winston has the keys.' },
            { id: 'a10', from: 'me', time: 'Tue Oct 27, 6:08 PM', text: 'everyone says that' },
            { id: 'a11', from: 'Annee', time: 'Thu Oct 29, 9:30 PM', media: { kind: 'photo', src: '/media/room-5/2290-5.jpg', caption: 'New song for Sunday. You will like this one.', code: '2290' } },
            { id: 'a12', from: 'me', time: 'Thu Oct 29, 9:34 PM', text: 'you write at home?' },
            { id: 'a13', from: 'Annee', time: 'Thu Oct 29, 9:35 PM', text: 'Every night. Kitchen table, tea, nobody around. It is the only quiet I get.' },
            { id: 'a14', from: 'Annee', time: 'Fri Oct 30, 6:52 PM', media: { kind: 'audio', src: '/media/room-5/4455-5.mp4', code: '4455' } },
            { id: 'a15', from: 'me', time: 'Fri Oct 30, 6:55 PM', text: 'after service. i promise' },
            { id: 'a16', from: 'Annee', time: 'Fri Oct 30, 7:50 PM', text: 'Come stand by me for the photo. End of the row, by the aisle.' },
            { id: 'a17', from: 'Annee', time: 'Fri Oct 30, 8:11 PM', text: 'Emily please answer me.' },
            { id: 'a18', from: 'Annee', time: 'Fri Oct 30, 8:17 PM', text: 'Please.' },
          ],
        },
        unknown(1025, 1031, 'tonight'),
        detective(1025, 1031, 'tonight'),
        notes([
          { id: 'x1', from: 'me', time: 'Sun Oct 25, 9:45 PM', text: 'they have a key to the church. nobody is supposed to have a key.' },
          { id: 'x2', from: 'me', time: 'Fri Oct 30, 6:55 PM', media: { kind: 'audio', src: '/media/room-5/LANTERN-5.ogg', code: 'LANTERN' } },
          { id: 'x3', from: 'me', time: 'Fri Oct 30, 6:57 PM', text: 'telling will after service. all of it.' },
        ]),
      ],
    },
  ],
}

export function findRoom(slug: string | undefined) {
  return content.rooms.find((r) => r.slug === slug)
}
