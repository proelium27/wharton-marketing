# assets

## The advertisement video

Put your finished advertisement here, named exactly:

```
advertisement.mp4
```

That is it. Nothing else to change. When someone fills in the form and presses
**Generate advertisement**, the page looks for this file and plays it in the output
frame. Until the file exists, the output panel shows a labelled empty video slot,
which is the intended state for now.

To use a different filename or format, change `VIDEO_PATH` at the top of `app.js`.

**Format:** MP4 with H.264 video and AAC audio plays in every browser. A `.webm`
file also works if you change `VIDEO_PATH` to match.

**Note:** browsers block local file reads over `file://`, so the automatic lookup
only works when the page is served over HTTP (see the README in the project root).
When you open `index.html` directly by double-clicking it, use the **Load a video
file** button in the output panel instead. That works everywhere.

## The logo

There is no logo file yet. The header shows a bordered square reading `LOGO`.
When you have one, drop `logo.svg` here and replace the `.brand-mark` block in
`index.html` with an `<img>` tag. The placeholder is marked with a comment.
