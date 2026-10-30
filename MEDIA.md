# Last Seen: story, rooms, and unlockables

## The story

Over five months, four young adults have vanished from crowded events around the county. A county fair during the fireworks. A concert at another church when the lights dropped. A football game at halftime. A food truck night downtown in September while the band played. Every time, three things. The victim disappears in a moment when everyone is looking somewhere else. The family gets a photo of the victim, taken from across the room, seconds before. The victim's phone sends one text: "I'm okay. I chose this. Don't look for me." A small silver star is left where they were last seen. All four came back forty-eight hours later, unharmed, no memory. The news calls it the Forty-Eight Hours case.

Emily photographs events. She shot two of them freelance and found the same hooded figure in the background of both, phone at chest height, pointed at the person who would vanish minutes later. She sent it to a detective. The detective was polite. Then an unknown number started messaging her. It knew her IHOP order. It knew her mailbox. It said: "You look at everything. Nobody else does. That is why it is you."

She told Will first. Will told her to keep it between them, not even MM, and let him handle it. He didn't believe her. She kept everything on five devices anyway, and every time the number told her where it was, she checked where each leader was.

Friday, October 30, the lights go out for eight seconds for the carnival reveal. That's all it takes. Her camera is in the grass by the side door, next to a star. The photo and the text arrive from her own number.

The taker is Annee. She has spent her life being the person nobody looks at, so she takes the people everyone looks at, from rooms full of people looking the wrong way, and sends back a photo to prove she was standing right there. Emily is the first person who ever looked back. "You are the one I keep."

The victim's phone stays on for one hour, within a mile, then goes dark. The kids have until 9:00. Emily is in the room under the baptistery (change `CROSSING_PLACE` in `src/content/rooms.ts` to a real room). She walks in at the end when they solve it.

## The intro video

1. News montage. Four anchors, four events, the same three details each time. Victims and places stay unnamed.
2. Emily in the dark. Breathing, a scrape. "Where am I. Where am I going. Somebody. What is happening." Quiet.
3. The detective, unnamed. "Emily had been messaging me for three weeks. I didn't take her seriously enough. In every case the victim's phone stayed on for one hour, within a mile. Then it went dark. Every other victim came back. Emily saw who it was. The last message to her phone said: you are the one I keep. It is 8:05. We have until 9. Her devices are on the laptops in this building. She was watching all of you. Now you watch for her."
4. Five faces, one line each. Zulmarie, who drove her here, stood right next to her, and says she hasn't talked to her since Wednesday. Winston, who holds the only keys to that side door. Gabriel, who was at two of the four events and has a silver star on his backpack. Pastor Will, who Emily told first and who told her to stay quiet. Annee, who was standing at the end of the back row by the side aisle.

The back row, from the side aisle in: Annee, Zulmarie, Emily, Winston, Will, Gabriel. Carlos is behind the camera. MM and Melo are in the media room running the blackout. Every interrogation and every text matches this.

## How the rooms work

Every laptop is one of Emily's devices. Each has the shared JTP CORE LEADERS chat, Emily's private thread with one suspect, a slice of the Unknown thread and the detective thread for a date range, and her notes to herself. Her first note tells the kids the job: five names, prove who it isn't.

| Room | Device | Thread with | Slice | What the room does |
| --- | --- | --- | --- | --- |
| 1 | Emily's laptop | Gabriel | Sep 28 to Oct 13 | Clears Gabriel. Unknown was at worship practice Mon Oct 12 at 8:20. Gabriel isn't in the band and sent a photo from his friend's game at 8:18. Red herring: he was at two of the four events and has a silver star keychain. Emily's two background photos, her method video, the detective's first voicemail. |
| 2 | Emily's phone backup | Will | Oct 14 to Oct 17 | Clears Will. Unknown messaged from inside the sanctuary during Thursday service Oct 15 at 7:45 and sent a photo of the back of Emily's head with Will at the pulpit in the distance. Will is also on the live stream. Red herring: Will's voice memo telling her not to tell MM, "I am praying about it," and he has keys. The detective confirms the mailbox star is real. |
| 3 | Emily's tablet | Winston | Oct 18 to Oct 21 | Clears Winston. Unknown was home Tue Oct 20 at 7:15. Winston sent a video from the gym at 7:08 running sports night. Red herring: the leaders hoodie on Emily's doorbell camera, the keys memo, and a lit window at the church Sunday night when Emily thought she saw his truck. Unknown's star photo with the mug at the edge. |
| 4 | Emily's school laptop | Zulmarie | Oct 22 to Oct 24 | Clears Zulmarie. Unknown photographed Emily in the IHOP parking lot Fri Oct 23 at 10:41 and Zulmarie is standing next to her in the photo. Red herring: she drove Emily, reset her passcode, and tells Will tonight she hasn't talked to Emily since Wednesday. Unknown says "Always." |
| 5 | Emily's media room login | Annee | Oct 25 to tonight | Clears nobody. Unknown shows the place and names the hour. Annee's thread has the same mug and the same "Always." Emily's last video. |

Nothing in room 5 points at Annee by itself. The mug only matters if you saw room 3. "Always." only matters if you saw room 4. Four rooms each remove a name. The fifth is where the last name stops being deniable.

Melo is in the story as the booth: she runs the live stream, builds the blackout cue, and is in the IHOP list. She's never on a suspect list.

## Unlockables

Five locked items per room, each with its own code. No code is used twice anywhere in the game, and the app refuses to start if one is. Codes are placeholders; change them in `src/content/rooms.ts` on the media item itself. Replace the placeholder files in `public/media/` with real ones, keeping the same filenames or updating the `src` paths.

Numbers are photos and voice memos, words are videos. None of the numbers are dates or times from the chats, so they can't be guessed.

### Open from the start

| In chat | What to make |
| --- | --- |
| JTP CORE LEADERS, from Emily's number, 8:08 PM | The taker's photo. The back row of the group photo, Emily in it, taken from the side aisle at floor level, seconds before the blackout. Shoot it from where Annee stands during the real photo. No code: it arrived on everyone's phone, so every laptop shows it. |

### Room 1: Emily's laptop (Gabriel)

| Code | Type | In chat | What to make |
| --- | --- | --- | --- |
| `4471` | Photo | Gabriel | Red herring. Emily's photo of Gabriel's backpack with a small silver star keychain on the zipper, Thu Oct 8. He says it came from the lost and found about a month ago. |
| `6642` | Photo | Gabriel | Clears Gabriel. His photo from the bleachers, Mon Oct 12, 8:18 PM, captioned "HE HIT A THREE." A gym, a scoreboard with the clock showing, kids in the stands. Blurry is fine. Two minutes later Unknown is at worship practice. |
| `2306` | Photo | Detective | Emily's evidence. Two of her event photos side by side: the county fair in June and the downtown food truck night in mid-September, two weeks before she messages the detective. Neither is a church event, and neither is the Oct 31 carnival. In the background of each, the same hooded figure with a phone at chest height, behind the person who went missing. Use the leaders hoodie. |
| `PRACTICE` | Video | Notes to self | Emily, 20 seconds, Tue Oct 13, 12:15 AM, her room. "Ok. It's Monday night. They just messaged me from practice. They said they could hear Zu singing from where they were. So they were in that room tonight. I wasn't. That's the first real thing I know. Every time they tell me where they are, I'm going to check where everyone else was. That's how I find them." |
| `0917` | Voice memo | Detective | The detective, Sat Oct 3, 10:15 AM, 20 seconds, tired and polite. "This is the detective you spoke with on the tip line. I got your photos. I'll be honest with you. A hoodie at a fair is not much. But I've got four families and nothing, so keep sending me what you have, and do not go looking for this person yourself." |

### Room 2: Emily's phone backup (Will)

| Code | Type | In chat | What to make |
| --- | --- | --- | --- |
| `1130` | Photo | Unknown | Emily's photo of the silver star token sitting inside her mailbox. Thu Oct 15, 6:48 PM. |
| `5190` | Photo | Unknown | Clears Will. The taker's photo, Thu Oct 15, 7:47 PM, captioned "Six." Taken from the back doorway of the sanctuary: the back of Emily's head a few rows ahead, her phone lit in her hand, and far away at the front, Will at the pulpit, small but recognisable. Nobody else identifiable. Whoever took this was standing, in the room, behind her, while Will preached. |
| `6271` | Photo | Detective | The detective's photo, Fri Oct 16, 4:30 PM. Four silver stars in four evidence bags on a desk, each bag with a handwritten label. Captioned "The four from the other scenes. Yours is identical." This is how the kids know Emily's star is the real thing. |
| `LIVESTREAM` | Video | Notes to self | 15 seconds of the Thursday Oct 15 live stream, timestamp burned in, 7:45 PM. Will mid-sermon at the pulpit, both hands on it, no phone anywhere. The congregation visible in the wide shot if you can. |
| `7788` | Voice memo | Will | Red herring. Will, Mon Oct 5, 10:10 PM, low and firm. "Emily. It's Will. Listen to me. Do not send those pictures to anybody else. Not the group. Not MM. If you're right, we do not want this in a group chat. If you're wrong, we do not want it anywhere. Let me handle it." |

### Room 3: Emily's tablet (Winston)

| Code | Type | In chat | What to make |
| --- | --- | --- | --- |
| `5502` | Photo | Unknown | The star, Mon Oct 19, 9:06 PM, lying on a dark table top. No hand, no sleeve, no face. At the edge of the frame, half cut off, a mug of tea. Pick a mug nobody could mistake: a colour, a chip, a pattern, a word on it. The same mug sits at the edge of Annee's photo in room 5. Emily's note under it says to look at everything in the picture, not just the star. |
| `HOODIE` | Video | Winston | Red herring and clue. Emily's doorbell camera, 10 seconds, Thu Oct 15, 6:31 PM, dusk. A figure in the JTP leaders hoodie, hood up, walks to the mailbox, drops something in, walks off. Face never visible, build ambiguous. |
| `3141` | Voice memo | Winston | Winston, Thu Oct 15, 9:02 PM, 12 seconds, flat. "Four keys. Me, Will, MM, and the one in the office. That's it. If you think there's a fifth one out there, you tell me, because that is my problem, not yours." |
| `CONES` | Video | Winston | Clears Winston. His video, Tue Oct 20, 7:08 PM, 8 seconds, handheld in the gym. A pan across thirty kids running drills, Gabriel setting out cones, Winston's voice over it: "Thirty of them. One of me. Come take pictures." The gym clock in frame if you can. Seven minutes later Unknown is home with a blanket and the TV. |
| `9312` | Photo | Winston | Red herring. Emily's photo from the road, Sun Oct 25, 9:30 PM. The church at night, lot dark, one window lit on the side of the building, and at the far end of the lot under the light a vehicle you cannot make out. She asks Winston if that's his truck. He says his truck is in his driveway and asks who is at the church. Somebody was. |

### Room 4: Emily's school laptop (Zulmarie)

All three photos get shot in one trip to the IHOP parking lot at night. Nobody has to go inside.

| Code | Type | In chat | What to make |
| --- | --- | --- | --- |
| `1899` | Photo | Zulmarie | Emily's photo on the way in, Fri Oct 23, 10:04 PM, captioned "pancake crew." The other eight leaders under the IHOP sign, goofing. Everyone is in it, including Annee, Melo, MM and Carlos. Faces to names for the kids, and it puts the whole table there. It clears nobody. |
| `7034` | Photo | Unknown | Clears Zulmarie. The taker's photo, 10:41 PM, from across the parking lot, zoomed in, a little shaky. Emily and Zulmarie standing by Zulmarie's car, Emily looking down at her phone, Zulmarie right next to her, both clearly identifiable. Anyone else is a shoulder, a back, or out of frame. Zulmarie is in the picture, so she is not holding the phone. |
| `8823` | Photo | Zulmarie | Emily's photo through the windshield, 10:44 PM, from the passenger seat. The corner of the IHOP building, a figure in the leaders hoodie, hood up, phone at chest height, pointed at the lot. Nobody else in frame. Captioned to Zulmarie, who is still outside: "get in the car. dont turn around. corner of the building, phone up." |
| `6060` | Voice memo | Zulmarie | Emily, 11:00 PM, alone in her room, quiet. "Zu. Someone took a picture of us in the parking lot tonight. From across the lot. You were standing right next to me when it came in, so I know it wasn't you. I'm telling you so one person knows I'm not crazy. Don't say anything to anyone." |
| `4807` | Voice memo | Detective | The detective, Sat Oct 24, 9:00 AM, 20 seconds, awake now. "Then it's one of them. The hoodie means it's someone from your church. So here's what you do. Every time this person tells you where they are, you write down where each one of them was. One by one. That's how we do it. And Emily. I'm putting a car on your street at night. Don't wave at it." |

### Room 5: Emily's media room login (Annee)

| Code | Type | In chat | What to make |
| --- | --- | --- | --- |
| `9163` | Photo | Unknown | The place. Sun Oct 25, 9:06 PM, captioned "Somewhere nobody looks." Inside the dark church, a phone flashlight on the door to the room under the baptistery, or whatever `CROSSING_PLACE` really is. Shoot it so a kid who knows the building would recognise it on a second look but not a first. This is where they find her. |
| `2290` | Photo | Annee | Annee's photo, Thu Oct 29, 9:30 PM, captioned "New song for Sunday. You will like this one." A handwritten chord chart on her kitchen table, pen on top, and at the edge of the frame, the same mug from room 3. No hands, no face. She tells Emily she writes every night, kitchen table, tea, nobody around. |
| `LANTERN` | Video | Notes to self | Emily, 20 seconds, Fri Oct 30, 6:55 PM, phone propped in the media room, face close to the camera, calm. "If you're watching this, I'm gone, and I didn't choose it. I didn't walk anywhere. It's one of the five. I've been talking to all of them. Everything I have is spread across my stuff. Look at where they were, and where everyone else was. Find them. Then find me." |
| `4455` | Voice memo | Annee | Annee, warm, 10 seconds, Fri Oct 30, 6:52 PM. "Hey. Saw your message to Will. Whatever it is, you can tell me first. You know that. Always." |
| `3579` | Voice memo | Detective | The detective, Fri Oct 30, 7:40 PM, 12 seconds, driving. "Emily, it's me. I'm on the road, twenty minutes out. Stay in the light. Stay next to people. I will find you when I get there." Nineteen minutes later the lights go out. |

## Props that repeat

- The silver star: Gabriel's keychain, Emily's mailbox, the four evidence bags, Unknown's table, next to her camera tonight.
- The leaders hoodie: both background photos, the doorbell video, the corner of the IHOP building.
- The mug: at the edge of Unknown's star photo in room 3, at the edge of Annee's chord chart in room 5. One real mug, two photos. Don't let it appear anywhere else.

## Texting styles

The fake 8:09 PM text breaks Emily's style. Keep these consistent if you edit anything.

- **Emily**: all lowercase, no periods, calls him "will".
- **Unknown and Annee**: capitals and periods, no contractions. Both say "Always." Unknown never calls itself he or she, and Emily only ever says "they".
- **Detective**: short, formal, no small talk, no name.
- **Zulmarie, Gabriel, Melo**: lowercase, casual.
- **Winston, Will, MM**: capitals, short sentences.
