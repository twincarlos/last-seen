import type { MediaAttachment } from '../content/types'
import { MEDIA_LABEL } from '../content/types'
import { AudioIcon, LockIcon, PhotoIcon, VideoIcon } from './Icons'

const KIND_ICON = { photo: PhotoIcon, video: VideoIcon, audio: AudioIcon }

export function MediaBubble({ media, unlocked, mine }: { media: MediaAttachment; unlocked: boolean; mine: boolean }) {
  if (!unlocked) return <LockedMedia media={media} />

  const caption = media.caption ? (
    <p className={`px-3 py-2 text-[15px] leading-snug ${mine ? 'text-white' : 'text-neutral-100'}`}>{media.caption}</p>
  ) : null

  if (media.kind === 'photo') {
    return (
      <div className="overflow-hidden">
        <img src={media.src} alt="" className="block max-w-[320px] max-h-[360px] object-cover" draggable={false} />
        {caption}
      </div>
    )
  }
  if (media.kind === 'video') {
    return (
      <div className="overflow-hidden">
        <video src={media.src} controls preload="metadata" className="block max-w-[360px] bg-black" />
        {caption}
      </div>
    )
  }
  return (
    <div className="px-3 py-2 min-w-[260px]">
      <audio src={media.src} controls preload="metadata" className="w-full" />
      {media.caption && <p className="mt-1 text-[15px] leading-snug">{media.caption}</p>}
    </div>
  )
}

function LockedMedia({ media }: { media: MediaAttachment }) {
  const Icon = KIND_ICON[media.kind]
  const tall = media.kind !== 'audio'
  return (
    <div
      className={`relative overflow-hidden select-none ${tall ? 'w-[260px] h-[180px]' : 'w-[260px] h-[64px]'}`}
      title={`${MEDIA_LABEL[media.kind]} · Locked`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#5b6b8a_0%,#2a3245_45%,#15192a_100%)] blur-[2px] scale-110" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative h-full flex items-center justify-center gap-2 text-neutral-200">
        <LockIcon className="w-5 h-5" />
        <Icon className="w-5 h-5 opacity-80" />
        <span className="text-sm font-medium tracking-wide">{MEDIA_LABEL[media.kind]} · Locked</span>
      </div>
    </div>
  )
}
