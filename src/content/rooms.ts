import type { Chat, GameContent, Message } from './types'

/**
 * All story content lives here. Edit freely.
 *
 * Story: Friday Oct 30, the carnival reveal. During the group photo blackout,
 * Emily disappears. Annee (keys, runs the carnival) and Julen (Smash n' Go,
 * her partner) framed Emily for emptying the carnival account. Emily is in the
 * back room of the Smash n' Go commissary.
 *
 * - "me" is the laptop owner for that room. Shared chats are built per owner
 *   so the owner's own messages render on the right.
 * - Media files go in /public/media/room-N/ and are referenced by path.
 * - Codes are matched case-insensitively with spaces removed.
 *
 * Texting styles (the fake Emily text breaks hers):
 * - Emily: all lowercase, no periods, calls him "will".
 * - Annee: capitals and periods, never contractions.
 * - Zulmarie, Melo, Gabriel: lowercase, casual.
 * - Winston, Will, MM, Julen: capitals, short.
 */

// ---------------------------------------------------------------------------
// Shared chats. Every laptop in the chat sees the same messages.
// ---------------------------------------------------------------------------

const LEADERS: Message[] = [
  { id: 'l1', from: 'Will', time: 'Mon 6:45 PM', text: 'Leaders meeting at 7:30. Annee has the carnival budget ready. Come with questions.' },
  { id: 'l2', from: 'Annee', time: 'Mon 7:02 PM', text: 'Budget is printed. Zu and I split the vendors. Emily, you are on flyers and photos, and you will pay the vendor invoices from the carnival account. Gabriel is adding you tonight.' },
  { id: 'l3', from: 'Emily', time: 'Mon 7:04 PM', text: 'on it' },
  { id: 'l4', from: 'Melo', time: 'Mon 10:31 PM', text: 'practice recording is up for whoever wants it' },
  { id: 'l5', from: 'MM', time: 'Mon 10:40 PM', text: 'Thank you all. Good practice. Get some sleep.' },
  { id: 'l6', from: 'Will', time: 'Thu 9:40 PM', text: 'Tomorrow is the carnival reveal. Zulmarie is getting everyone up for a photo at 7:55. Leaders in the back row. Nobody leaves early.' },
  { id: 'l7', from: 'Carlos', time: 'Thu 9:42 PM', text: "I'm taking it. Everyone smile for once." },
  { id: 'l8', from: 'Emily', time: 'Fri 6:48 PM', text: 'will can i talk to you after service tonight. just us' },
  { id: 'l9', from: 'Will', time: 'Fri 6:51 PM', text: 'Of course.' },
  { id: 'l10', from: 'Zulmarie', time: 'Fri 7:52 PM', text: 'PHOTO IN 3 MIN. everyone to the stage' },
  { id: 'l11', from: 'MM', time: 'Fri 8:04 PM', text: 'Where is Emily? She was right next to me.' },
  { id: 'l12', from: 'Winston', time: 'Fri 8:06 PM', text: 'Side door is open. It was closed at 7:30. I checked.' },
  { id: 'l13', from: 'Emily', time: 'Fri 8:09 PM', text: "I'm sorry. I took it. Tell Pastor Will I'm sorry. Don't look for me." },
  { id: 'l14', from: 'Annee', time: 'Fri 8:10 PM', text: 'Took what??' },
  { id: 'l15', from: 'Zulmarie', time: 'Fri 8:10 PM', text: 'emily call me right now' },
  { id: 'l16', from: 'Annee', time: 'Fri 8:13 PM', text: 'I just opened the carnival account. It is empty. Everything for tomorrow was in there. The truck, the rentals, the movie. All of it.' },
  { id: 'l17', from: 'MM', time: 'Fri 8:14 PM', text: 'That is not how Emily texts. Not once in two years. And she has never called him Pastor Will. I am not accepting that message.' },
  { id: 'l18', from: 'Will', time: 'Fri 8:15 PM', text: 'I am calling the police. Until they get here nobody leaves this building. Carlos, the laptops in the media room. Are they still signed in from Monday?' },
  { id: 'l19', from: 'Carlos', time: 'Fri 8:16 PM', text: 'Every one of them.' },
]

const COMMITTEE: Message[] = [
  { id: 'c1', from: 'Annee', time: 'Tue 4:10 PM', text: 'Reveal plan for Friday. Zu gets everyone up for the photo at 7:55. Carlos counts down. On three, full blackout, lights and both screens, with a sound hit. Eight seconds. Then the screens come back with the carnival promo. Melo, can you build that cue?' },
  { id: 'c2', from: 'Melo', time: 'Tue 4:14 PM', text: 'a blackout in a room full of teenagers. sure. love that for us' },
  { id: 'c3', from: 'Annee', time: 'Tue 4:15 PM', text: 'Make it timed so nobody has to be at the booth. I want all of us in the picture.' },
  { id: 'c4', from: 'Zulmarie', time: 'Tue 4:20 PM', text: "i'll load it on the booth laptop tonight. melo send me the sound" },
  { id: 'c5', from: 'Melo', time: 'Tue 4:22 PM', text: "sent. it's cue 14. nobody touch anything else" },
  { id: 'c6', from: 'Gabriel', time: 'Thu 5:48 PM', text: 'random q. emily asked me to pull the edit history on the carnival account. is something wrong with it?' },
  { id: 'c7', from: 'Annee', time: 'Thu 5:50 PM', text: "Nothing I know of. She is probably double checking the Smash n' Go invoice, I asked her to. Thanks G." },
  { id: 'c8', from: 'Zulmarie', time: 'Thu 5:51 PM', text: "she hasn't said anything to me" },
  { id: 'c9', from: 'Annee', time: 'Fri 8:21 PM', text: 'If any of you heard anything from Emily this week that I do not know about, I need it now. Will is going to ask.' },
]

const SETUP: Message[] = [
  { id: 's1', from: 'Winston', time: 'Tue 6:05 PM', text: 'New side door code for Saturday load in: 1983. Do not share it outside this chat. It goes back to the old code Sunday.' },
  { id: 's2', from: 'Annee', time: 'Tue 6:08 PM', text: 'Sent it to Julen for the truck. He will be here Saturday at 8.' },
  { id: 's3', from: 'Winston', time: 'Tue 6:09 PM', text: 'I said this chat.' },
  { id: 's4', from: 'Annee', time: 'Tue 6:09 PM', text: 'He has to get in somehow, Winston.' },
  { id: 's5', from: 'Gabriel', time: 'Tue 6:12 PM', text: "got it. i'll be at the side door at 8" },
  { id: 's6', from: 'Zulmarie', time: 'Tue 6:13 PM', text: 'same' },
  { id: 's7', from: 'Winston', time: 'Fri 8:07 PM', text: 'Side door was opened from outside at 7:59 with the load in code. Which one of you.' },
  { id: 's8', from: 'Gabriel', time: 'Fri 8:08 PM', text: 'i was in the photo??' },
  { id: 's9', from: 'Zulmarie', time: 'Fri 8:08 PM', text: 'i was literally taking the photo. with carlos' },
  { id: 's10', from: 'Annee', time: 'Fri 8:09 PM', text: 'We were all in the photo, Winston.' },
]

/** Re-label the owner's messages as "me" so they render on the right. */
function asOwner(owner: string, messages: Message[]): Message[] {
  return messages.map((m) => (m.from === owner ? { ...m, from: 'me' } : m))
}

const leaders = (owner: string): Chat => ({ id: 'leaders', title: 'JTP CORE LEADERS', subtitle: '9 people', messages: asOwner(owner, LEADERS) })
const committee = (owner: string): Chat => ({ id: 'committee', title: '4707 Carnival Committee', subtitle: '4 people', messages: asOwner(owner, COMMITTEE) })
const setup = (owner: string): Chat => ({ id: 'setup', title: 'Carnival Setup', subtitle: '4 people', messages: asOwner(owner, SETUP) })

// ---------------------------------------------------------------------------
// Rooms
// ---------------------------------------------------------------------------

export const content: GameContent = {
  staffPin: '2468',
  rooms: [
    // -----------------------------------------------------------------------
    // Room 1: Annee. The villain. Looks like the most worried person in the
    // building. Her Julen thread is bland vendor talk until you read it twice.
    // -----------------------------------------------------------------------
    {
      id: 1,
      slug: 'room-1',
      owner: 'Annee',
      codes: { photo: '4471', video: 'HARVEST', audio: '0917' },
      chats: [
        committee('Annee'),
        {
          id: 'emily',
          title: 'Emily',
          messages: [
            { id: 'e1', from: 'me', time: 'Mon 9:58 PM', text: "Gabriel added you to the carnival account. Can you pay the Smash n' Go invoice tomorrow? Deposit plus the minimum. It is in the invoices folder." },
            { id: 'e2', from: 'Emily', time: 'Mon 10:01 PM', text: 'ok. the account number on the invoice is different from the quote he sent will. same guy?' },
            { id: 'e3', from: 'me', time: 'Mon 10:03 PM', text: 'He updated it. Trucks change banks all the time. You are good.' },
            { id: 'e4', from: 'Emily', time: 'Tue 1:14 PM', text: 'paid' },
            { id: 'e5', from: 'me', time: 'Tue 1:15 PM', text: 'You are the best. Flyers look amazing by the way.' },
            { id: 'e6', from: 'Emily', time: 'Thu 9:02 PM', text: 'can i ask you something tomorrow before service' },
            { id: 'e7', from: 'me', time: 'Thu 9:05 PM', text: 'Always. Everything ok?' },
            { id: 'e8', from: 'Emily', time: 'Thu 9:06 PM', text: 'yeah. just a question' },
            { id: 'e9', from: 'me', time: 'Fri 8:11 PM', text: 'Emily please answer me. Whatever happened, we can fix it.' },
            { id: 'e10', from: 'me', time: 'Fri 8:17 PM', text: 'Please.' },
          ],
        },
        leaders('Annee'),
        setup('Annee'),
        {
          id: 'julen',
          title: 'Julen',
          subtitle: "Smash n' Go",
          messages: [
            { id: 'j1', from: 'Julen', time: 'Mon 2:30 PM', text: 'Quote is with your pastor.' },
            { id: 'j2', from: 'me', time: 'Mon 8:33 PM', text: 'Invoice updated. Send it to Emily, not Will.' },
            { id: 'j3', from: 'Julen', time: 'Tue 1:20 PM', text: 'Paid. Your photographer is fast.' },
            { id: 'j4', from: 'me', time: 'Tue 1:22 PM', text: 'That is why I picked her.' },
            { id: 'j5', from: 'Julen', time: 'Thu 6:02 PM', text: 'Problem?' },
            { id: 'j6', from: 'me', time: 'Thu 6:04 PM', text: 'A small one. Handled Friday.' },
            { id: 'j7', from: 'Julen', time: 'Thu 6:10 PM', media: { kind: 'photo', src: '/media/room-1/placeholder-photo.svg', caption: 'Found this on their old page. Should I worry?' } },
            { id: 'j8', from: 'me', time: 'Thu 6:12 PM', text: 'Nobody looks at old photos.' },
            { id: 'j9', from: 'Julen', time: 'Fri 5:30 PM', media: { kind: 'video', src: '/media/room-1/placeholder-video.mp4', caption: 'Ready.' } },
            { id: 'j10', from: 'me', time: 'Fri 7:41 PM', media: { kind: 'audio', src: '/media/room-1/placeholder-audio.wav' } },
            { id: 'j11', from: 'Julen', time: 'Fri 8:03 PM', text: 'Out.' },
          ],
        },
      ],
    },

    // -----------------------------------------------------------------------
    // Room 2: Zulmarie. Looks the guiltiest: loaded the blackout cue, shares
    // the carnival account, lied to Will about when she last heard from Emily.
    // Holds Emily's last real words.
    // -----------------------------------------------------------------------
    {
      id: 2,
      slug: 'room-2',
      owner: 'Zulmarie',
      codes: { photo: '1130', video: 'MIRROR', audio: '7788' },
      chats: [
        {
          id: 'will',
          title: 'Will',
          messages: [
            { id: 'w1', from: 'Will', time: 'Fri 8:18 PM', text: 'Zulmarie. When did you last hear from Emily?' },
            { id: 'w2', from: 'me', time: 'Fri 8:19 PM', text: 'wednesday. bible study' },
            { id: 'w3', from: 'Will', time: 'Fri 8:19 PM', text: 'You are sure.' },
            { id: 'w4', from: 'me', time: 'Fri 8:20 PM', text: 'yes' },
            { id: 'w5', from: 'Will', time: 'Fri 8:24 PM', text: 'Melo says the blackout was a cue you loaded. We will talk about why I am hearing that from Melo.' },
          ],
        },
        committee('Zulmarie'),
        {
          id: 'emily',
          title: 'Emily',
          messages: [
            { id: 'z1', from: 'Emily', time: 'Wed 9:12 PM', media: { kind: 'photo', src: '/media/room-2/placeholder-photo.svg', caption: 'look at the truck. harvest fest 2019. different name on it, same guy. julen told will he started last year' } },
            { id: 'z2', from: 'me', time: 'Wed 9:15 PM', text: 'where did you even get this' },
            { id: 'z3', from: 'Emily', time: 'Wed 9:15 PM', text: 'their old church page. i archive everything zu you know this' },
            { id: 'z4', from: 'Emily', time: 'Wed 9:16 PM', text: 'and look who got cut off on the right. thats a hand on his shoulder' },
            { id: 'z5', from: 'me', time: 'Wed 9:20 PM', text: 'ok thats weird but hes a food truck. tell will' },
            { id: 'z6', from: 'Emily', time: 'Wed 9:21 PM', text: 'not yet. the invoice account changed and im the one who paid it. if im wrong i look crazy. if im right i look guilty' },
            { id: 'z7', from: 'me', time: 'Wed 9:22 PM', text: 'emily' },
            { id: 'z8', from: 'Emily', time: 'Wed 9:22 PM', text: 'dont say anything to annee or the committee. please. let me be sure first' },
            { id: 'z9', from: 'Emily', time: 'Thu 8:40 PM', media: { kind: 'video', src: '/media/room-2/placeholder-video.mp4', caption: 'hes in the lot again. watch the mirror' } },
            { id: 'z10', from: 'me', time: 'Thu 8:45 PM', text: 'thats one of our lanyards' },
            { id: 'z11', from: 'Emily', time: 'Thu 8:45 PM', text: 'yep' },
            { id: 'z12', from: 'Emily', time: 'Fri 6:50 PM', media: { kind: 'audio', src: '/media/room-2/placeholder-audio.wav' } },
            { id: 'z13', from: 'me', time: 'Fri 6:55 PM', text: 'what does that mean?? what weird' },
            { id: 'z14', from: 'Emily', time: 'Fri 6:58 PM', text: 'see you at the photo' },
            { id: 'z15', from: 'me', time: 'Fri 8:05 PM', text: 'emily where are you' },
            { id: 'z16', from: 'me', time: 'Fri 8:10 PM', text: 'CALL ME' },
            { id: 'z17', from: 'me', time: 'Fri 8:16 PM', text: 'i know that wasnt you' },
          ],
        },
        leaders('Zulmarie'),
        setup('Zulmarie'),
      ],
    },

    // -----------------------------------------------------------------------
    // Room 3: Melo. Built the blackout cue. Her practice recording is the
    // quiet hero clue: the keys drop out at 8:28 Monday.
    // -----------------------------------------------------------------------
    {
      id: 3,
      slug: 'room-3',
      owner: 'Melo',
      codes: { photo: '5502', video: 'BOOTH', audio: '3141' },
      chats: [
        {
          id: 'will',
          title: 'Will',
          messages: [
            { id: 'mw1', from: 'Will', time: 'Fri 8:20 PM', text: 'Melo. The blackout. Was that you?' },
            { id: 'mw2', from: 'me', time: 'Fri 8:21 PM', text: 'it was a cue. for the reveal. the committee asked for it tuesday' },
            { id: 'mw3', from: 'Will', time: 'Fri 8:21 PM', text: 'Which committee.' },
            { id: 'mw4', from: 'me', time: 'Fri 8:22 PM', text: 'carnival. annee asked for it, zu loaded it. it was timed. nobody was at the booth' },
            { id: 'mw5', from: 'Will', time: 'Fri 8:23 PM', text: 'Timed. So nobody had to be at the booth.' },
            { id: 'mw6', from: 'me', time: 'Fri 8:23 PM', text: 'thats what she wanted. everyone in the picture' },
          ],
        },
        committee('Melo'),
        leaders('Melo'),
        {
          id: 'zulmarie',
          title: 'Zu',
          subtitle: 'Sister',
          messages: [
            { id: 'm1', from: 'me', time: 'Mon 10:30 PM', media: { kind: 'audio', src: '/media/room-3/placeholder-audio.wav', caption: 'practice recording. keys drop out around 8:28 for like ten minutes. not my mic, someone walked off' } },
            { id: 'm2', from: 'Zulmarie', time: 'Mon 10:33 PM', text: 'will only needs the vocals, its fine' },
            { id: 'm3', from: 'Zulmarie', time: 'Tue 9:52 PM', media: { kind: 'video', src: '/media/room-3/placeholder-video.mp4', caption: 'cue 14 loaded. timed for 7:59 so i can be in the picture. if this blacks out the whole church its on you' } },
            { id: 'm4', from: 'me', time: 'Tue 9:55 PM', text: 'it IS going to black out the whole church. thats the cue' },
            { id: 'm5', from: 'me', time: 'Tue 9:56 PM', media: { kind: 'photo', src: '/media/room-3/placeholder-photo.svg', caption: 'dont touch it again' } },
            { id: 'm6', from: 'me', time: 'Fri 8:06 PM', text: 'the blackout ran on time. that wasnt a glitch' },
            { id: 'm7', from: 'Zulmarie', time: 'Fri 8:07 PM', text: 'i know' },
            { id: 'm8', from: 'me', time: 'Fri 8:12 PM', text: 'did you tell will about the cue' },
            { id: 'm9', from: 'Zulmarie', time: 'Fri 8:13 PM', text: 'not yet' },
            { id: 'm10', from: 'me', time: 'Fri 8:13 PM', text: 'hes going to think it was us' },
          ],
        },
      ],
    },

    // -----------------------------------------------------------------------
    // Room 4: Winston. His door code opened the side door mid-blackout. His
    // lot camera puts the truck there, and MM's memo proves Emily didn't run.
    // -----------------------------------------------------------------------
    {
      id: 4,
      slug: 'room-4',
      owner: 'Winston',
      codes: { photo: '8823', video: 'SIDEDOOR', audio: '6060' },
      chats: [
        {
          id: 'mm',
          title: 'MM',
          messages: [
            { id: 'mm1', from: 'MM', time: 'Fri 8:25 PM', media: { kind: 'audio', src: '/media/room-4/placeholder-audio.wav' } },
            { id: 'mm2', from: 'me', time: 'Fri 8:26 PM', text: 'Do not touch it. Leave it where it is.' },
            { id: 'mm3', from: 'MM', time: 'Fri 8:26 PM', text: 'I am not touching anything. Come outside.' },
          ],
        },
        {
          id: 'will',
          title: 'Will',
          messages: [
            { id: 'ww1', from: 'Will', time: 'Fri 8:08 PM', text: 'Side door. You said it was closed.' },
            { id: 'ww2', from: 'me', time: 'Fri 8:09 PM', text: 'It was. I checked at 7:30 like always.' },
            { id: 'ww3', from: 'Will', time: 'Fri 8:09 PM', text: 'Pull the door log.' },
            { id: 'ww4', from: 'me', time: 'Fri 8:14 PM', media: { kind: 'photo', src: '/media/room-4/placeholder-photo.svg', caption: 'There. 7:59:12 PM. Side door. Opened from OUTSIDE with the load in code I set Tuesday.' } },
            { id: 'ww5', from: 'Will', time: 'Fri 8:15 PM', text: 'Who has that code?' },
            { id: 'ww6', from: 'me', time: 'Fri 8:15 PM', text: 'Me. Annee. Zulmarie. Gabriel. And the truck guy for tomorrow. Annee gave it to him.' },
            { id: 'ww7', from: 'Will', time: 'Fri 8:16 PM', text: 'And you were in the photo.' },
            { id: 'ww8', from: 'me', time: 'Fri 8:16 PM', text: 'Back row. Next to you.' },
            { id: 'ww9', from: 'me', time: 'Fri 8:22 PM', media: { kind: 'video', src: '/media/room-4/placeholder-video.mp4', caption: "Lot camera. Smash n' Go pulled in at 7:45. Load in is tomorrow. He had no reason to be here. He left at 8:03." } },
            { id: 'ww10', from: 'Will', time: 'Fri 8:23 PM', text: 'Send that to nobody else.' },
          ],
        },
        leaders('Winston'),
        {
          id: 'gabriel',
          title: 'Gabriel',
          messages: [
            { id: 'wg1', from: 'Gabriel', time: 'Tue 6:12 PM', text: "got the code. i'll be at the side door at 8 saturday" },
            { id: 'wg2', from: 'me', time: 'Tue 6:15 PM', text: 'Do not give it to anybody. Not even Carlos.' },
            { id: 'wg3', from: 'Gabriel', time: 'Thu 7:30 PM', text: 'random but emily asked me if the truck guy has a door code. told her yes. she went real quiet' },
            { id: 'wg4', from: 'me', time: 'Thu 7:35 PM', text: 'Why does she care.' },
            { id: 'wg5', from: 'Gabriel', time: 'Thu 7:36 PM', text: 'idk' },
            { id: 'wg6', from: 'Gabriel', time: 'Fri 8:11 PM', text: 'winston the door' },
            { id: 'wg7', from: 'me', time: 'Fri 8:11 PM', text: 'I know.' },
          ],
        },
        setup('Winston'),
      ],
    },

    // -----------------------------------------------------------------------
    // Room 5: Gabriel. Added Emily to the account, and his helpful question
    // tipped Annee off. Holds the edit history and the real invoice.
    // -----------------------------------------------------------------------
    {
      id: 5,
      slug: 'room-5',
      owner: 'Gabriel',
      codes: { photo: '2290', video: 'INVOICE', audio: '4455' },
      chats: [
        committee('Gabriel'),
        {
          id: 'emily',
          title: 'Emily',
          messages: [
            { id: 'ge1', from: 'me', time: 'Mon 9:55 PM', text: "you're on the carnival account now. editor. annee asked. don't buy anything fun" },
            { id: 'ge2', from: 'Emily', time: 'Mon 9:56 PM', text: 'lol ok' },
            { id: 'ge3', from: 'Emily', time: 'Thu 5:30 PM', text: 'can you pull the edit history on the account. the smash n go invoice specifically. who changed the payee and when' },
            { id: 'ge4', from: 'me', time: 'Thu 5:45 PM', text: 'gimme 10' },
            { id: 'ge5', from: 'me', time: 'Thu 5:58 PM', media: { kind: 'photo', src: '/media/room-5/placeholder-photo.svg', caption: 'payee changed mon 8:31 PM. by the committee login, not yours. thats the shared one annee and zu use' } },
            { id: 'ge6', from: 'Emily', time: 'Thu 6:00 PM', text: '8:31 monday. during practice' },
            { id: 'ge7', from: 'me', time: 'Thu 6:00 PM', text: 'yeah everyone was on stage. why' },
            { id: 'ge8', from: 'Emily', time: 'Thu 6:01 PM', text: 'everyone except me gabriel. and i paid that invoice tuesday. to the changed account' },
            { id: 'ge9', from: 'me', time: 'Thu 6:03 PM', text: 'oh' },
            { id: 'ge10', from: 'Emily', time: 'Thu 6:04 PM', text: 'please dont mention this to anyone yet. not the committee. not annee. nobody' },
            { id: 'ge11', from: 'me', time: 'Thu 6:06 PM', text: '...i kind of already asked the committee if something was wrong. like 15 min ago. im sorry' },
            { id: 'ge12', from: 'Emily', time: 'Thu 6:07 PM', text: 'ok' },
            { id: 'ge13', from: 'Emily', time: 'Thu 6:12 PM', media: { kind: 'audio', src: '/media/room-5/placeholder-audio.wav' } },
            { id: 'ge14', from: 'me', time: 'Thu 6:30 PM', media: { kind: 'video', src: '/media/room-5/placeholder-video.mp4', caption: 'original invoice vs the one you paid. different account, different name. the address at the bottom is their commissary on Dock Street' } },
            { id: 'ge15', from: 'Emily', time: 'Thu 6:31 PM', text: 'keep that somewhere safe' },
            { id: 'ge16', from: 'me', time: 'Fri 8:12 PM', text: 'emily that text wasnt you. tell me that wasnt you' },
            { id: 'ge17', from: 'me', time: 'Fri 8:20 PM', text: 'im giving will everything' },
          ],
        },
        {
          id: 'annee',
          title: 'Annee',
          messages: [
            { id: 'ga1', from: 'Annee', time: 'Mon 9:40 PM', text: 'Can you add Emily to the carnival account tonight? Editor. She is paying the vendors.' },
            { id: 'ga2', from: 'me', time: 'Mon 9:55 PM', text: 'done' },
            { id: 'ga3', from: 'Annee', time: 'Thu 5:52 PM', text: 'Hey, about the edit history Emily wanted. Can you send me what you sent her? I want to make sure it is right before Will sees it.' },
            { id: 'ga4', from: 'me', time: 'Thu 5:59 PM', text: 'sure one sec' },
            { id: 'ga5', from: 'Annee', time: 'Thu 6:00 PM', text: 'You are a lifesaver. Do not stress her about it, she overthinks.' },
            { id: 'ga6', from: 'Annee', time: 'Fri 8:19 PM', text: 'Gabriel. You added her to the account. Will is going to ask you about that. Just tell him the truth. It was my idea and you were helping.' },
          ],
        },
        leaders('Gabriel'),
        setup('Gabriel'),
      ],
    },
  ],
}

export function findRoom(slug: string | undefined) {
  return content.rooms.find((r) => r.slug === slug)
}
