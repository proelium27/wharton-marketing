# assets

## The case study photos

`example/1.jpg` through `example/6.jpg` are the photos shown in panel 01. They are
plain `<img>` tags in `index.html`, so they work over HTTP and straight off the disk.

To change them, drop new files in and edit the `.gallery` list in `index.html`.

## The advertisement video

Put your finished advertisement here, named exactly:

```
advertisement.mp4
```

That is it. Nothing else to change. The page looks for this file on load and shows it
in the frame in panel 02, with a download link beneath. Until the file exists the
frame reads **"Your advertisement"**, which is the intended state for now.

To use a different filename or format, change `VIDEO_PATH` at the top of `app.js`.

**Format:** MP4 with H.264 video and AAC audio plays in every browser. A `.webm`
file also works if you change `VIDEO_PATH` to match.

**Shape:** the frame is set to 9:16 to match the portrait source footage. A video of
a different shape will sit letterboxed inside it. Change `data-ratio` on `.frame` in
`index.html`, and section D and the meta strip alongside it, if the size changes.

**Note:** the **Load a video file** button in the frame is a temporary convenience
for previewing before the file is committed. Once `advertisement.mp4` is in the
repository the button never appears, and the marked block in `app.js` can be deleted.

## The logo

There is no logo file yet. The header shows a bordered square reading `LOGO`.
When you have one, drop `logo.svg` here and replace the `.brand-mark` block in
`index.html` with an `<img>` tag. The placeholder is marked with a comment.
