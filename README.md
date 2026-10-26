# Last Seen

Portal for the "Last Seen" escape room. Each room's laptop opens a messaging app showing one leader's conversations. Photos, videos and voice memos are locked until participants enter the codes hidden in the room.

The story, the five rooms, and every unlockable with its recording script are in [MEDIA.md](MEDIA.md).

## Run locally

```sh
npm install
npm run dev
```

## Pages

| URL | Who | Purpose |
| --- | --- | --- |
| `/` | You | Setup page listing every room with its links. |
| `/room/room-1` … `/room/room-5` | Participants | The messaging app for that laptop. |
| `/room/room-1/staff` | Overseer | PIN-protected. Shows the codes, force-unlocks or locks each media type, and clears the room for the next group. |

Unlock state lives in the laptop's `localStorage`, so a refresh keeps progress and "Clear room" wipes it. Nothing is shared between laptops and there is no backend.

## Editing the story

Everything is in [src/content/rooms.ts](src/content/rooms.ts):

- One entry per room. `owner` is whose laptop it is. Messages `from: 'me'` render on the right.
- The three shared chats (JTP CORE LEADERS, 4707 Carnival Committee, Carnival Setup) are written once at the top and rebuilt per owner so that owner's messages render as `me`.
- `codes` holds one code per media type (`photo`, `video`, `audio`). Matching ignores case and spaces. One code unlocks every item of that type in the room.
- Media files go in `public/media/room-N/` and are referenced by path. Keep videos at 720p.
- `staffPin` at the top is the PIN for the staff pages.

The placeholder photos and audio tones in `public/media` are there so the app runs end to end. Replace them with real files.

## Deploy

Static site. Push to GitHub and import the repo in Vercel or Netlify with the defaults (build `npm run build`, output `dist`). `vercel.json` and `public/_redirects` handle the SPA routing on each host.

## On the day

1. Open the room URL on each laptop in Chrome kiosk or full-screen mode.
2. Between groups, the overseer goes to the staff URL, enters the PIN, and taps "Clear room".
