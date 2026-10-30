# Last Seen

Portal for the "Last Seen" escape room. Each room's laptop is one of Emily's devices, opened to her messaging app. Photos, videos and voice memos are locked until participants enter the codes hidden in the room.

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
| `/room/room-1/staff` | Overseer | PIN-protected. Shows the codes, force-unlocks or locks each media item, and clears the room for the next group. |
| `/screen` | Main LED | Emily's lock screen for the first puzzle. A hidden, always-focused input: the kids type the code and it validates itself on the last digit. Wrong shakes and clears, right plays the unlock animation and holds. Reload to reset. |
| `/signal` | Side LEDs | Emily's phone signal with a countdown to the moment it goes dark. Starts paused at the full duration. Space starts/pauses, R resets, Up/Down add or remove a minute (Shift for five). `?minutes=75` sets the duration, default 60. Survives a refresh. At zero the dot turns red and the rings stop. |

Unlock state lives in the laptop's `localStorage`, so a refresh keeps progress and "Clear room" wipes it. Nothing is shared between laptops and there is no backend.

## Editing the story

Everything is in [src/content/rooms.ts](src/content/rooms.ts):

- One entry per room. `device` is the label shown in the app, `suspect` is whose private thread lives there. Messages `from: 'me'` are Emily and render on the right.
- The Unknown thread and the detective thread are written once in full, each message tagged with a `day`, and sliced per device by date range. JTP CORE LEADERS is shared as is.
- `CROSSING_PLACE` at the top is where Emily is being held. Change it to a real room.
- Profile pictures are in [src/content/people.ts](src/content/people.ts). Put image files in `public/media/avatars/` and set each person's path. Anyone without one gets coloured initials.
- Every photo, video or voice memo carries its own `code`. Matching ignores case and spaces. Codes must be unique across the whole game; the app throws on startup if two items share one. Media without a `code` is visible from the start.
- Media files go in `public/media/room-N/` and are referenced by path. Keep videos at 720p.
- `staffPin` at the top is the PIN for the staff pages. `screenCode` is the code for the main LED lock screen.

The placeholder photos and audio tones in `public/media` are there so the app runs end to end. Replace them with real files.

## Deploy

Static site. Push to GitHub and import the repo in Vercel or Netlify with the defaults (build `npm run build`, output `dist`). `vercel.json` and `public/_redirects` handle the SPA routing on each host.

## On the day

1. Open the room URL on each laptop in Chrome kiosk or full-screen mode.
2. Between groups, the overseer goes to the staff URL, enters the PIN, and taps "Clear room".
