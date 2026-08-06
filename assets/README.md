# assets

## The case study photos

`example/1.jpg` through `example/6.jpg` are the photos shown in panel 01. They are
plain `<img>` tags in `index.html`, so they work over HTTP and straight off the disk.

To change them, drop new files in and edit the `.gallery` list in `index.html`.

## The advertisement video

`advertisement.mp4` is the finished advertisement, shown in the frame in panel 02
with a download link beneath it. 19.5 seconds, H.264 video with AAC audio, 720×1280.
It carries a voiceover over music.

To replace it, overwrite the file under the same name. Nothing else to change. To
use a different filename or format, change `VIDEO_PATH` at the top of `app.js`.

**Sound:** the video has audio and the player is muted by nothing — it simply does
not autoplay. Do not add `autoplay`, and do not add `muted` to make autoplay work:
either one turns a room's first impression into a surprise, and a muted autoplay
would hide that the ad has a voiceover at all.

**Format:** it must be H.264 in MP4. Phones record HEVC, and that is what arrives
over Messages or AirDrop — Safari plays it, other browsers frequently do not, so a
file straight off a phone will show a blank frame to half the room. macOS converts
without any extra software installed:

```bash
avconvert --source new.mov --output advertisement.mp4 \
  --preset Preset1280x720 --replace
```

The preset name is a bounding box, not a target: a 720×1280 portrait video already
fits inside it and comes out unscaled. Expect the file to grow, since H.264 is less
efficient than the HEVC it replaces.

**Shape:** the frame is set to 9:16 to match the portrait source footage. A video of
a different shape will sit letterboxed inside it. Change `data-ratio` on `.frame` in
`index.html`, and section D and the meta strip alongside it, if the size changes.

**If the frame reads "Your advertisement"** the file is missing or the browser could
not decode it. That empty state is now a fallback rather than the expected state, and
an HEVC file is the usual cause.

## The logo

`logo.png` is the header mark and the favicon: the bird from the supplied artwork,
196×176, on a transparent background. The wordmark that sits under the bird in the
original file is deliberately not here — the header already sets "East 2 West" and
"Marketing Agency" as text, so including it would print the name twice.

It is sized in CSS by height (44px in the header, 36px on narrow screens) with
`width: auto`, so it keeps its proportions. The file is roughly four times that tall
so it stays sharp on high-density displays.

To replace it, keep the transparent background: the mark sits on `--paper` in the
header but on `--panel` elsewhere, and a baked-in white background would show as a
pale block against the tint.
