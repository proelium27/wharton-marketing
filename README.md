# East to West — Marketing Agency

A one-screen case study of how the agency works, built for a Wharton Global Youth
Program business-plan pitch.

East to West rebrands small Chinese businesses for the American market. The page
shows one complete instance of the exchange: on the left, what a client provided
(product photos, their Chinese business name and tagline, their industry, the video
size they needed); on the right, the advertisement the team handed back.

**It is a case study, not a tool.** There is nothing to fill in and nothing to
submit. The page makes no advertisements; people do. The only interactive control is
the EN / 中文 toggle.

No backend, no build step, no dependencies. Three files.

## Run it

Double-click `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
```

## Add the advertisement

Put the finished ad at `assets/advertisement.mp4`. It then fills the frame in panel
02 automatically, with a download link beneath it.

Until that file exists, the frame shows **"Your advertisement"** and a temporary
**Load a video file** button for previewing a file from your computer. Delete the
marked block in `app.js` to remove that control once the real video is committed.

Details in [`assets/README.md`](assets/README.md).

## Change the case study

All of it is plain markup in `index.html`:

| What | Where |
|---|---|
| The six photos | `assets/example/1.jpg` … `6.jpg`, listed in the `.gallery` list |
| Business name and tagline | The two `.value` elements in section B |
| Industry | Section C, and the matching cell in the meta strip |
| Video size | Section D, the meta strip, and `data-ratio` on `.frame` |

If you change the video size, update `data-ratio` on `.frame` to match, or the
advertisement will sit letterboxed inside the wrong shape. Valid values are `16:9`,
`1:1`, `4:5`, and `9:16`.

Text that appears in both languages lives in the `COPY` block in `app.js`, keyed by
the `data-i18n` attributes. The client's own Chinese wording is deliberately not
translated: it stays in Chinese in both modes, because it is the brand as it exists
today rather than interface text.

## Still a placeholder

The logo. The header shows a bordered square reading `LOGO`, marked with a comment in
`index.html`. Drop `logo.svg` into `assets/` and replace the `.brand-mark` block.

The business name and tagline in the case study are placeholder wording chosen to
suit the truck photos, not a real client's copy.

## What is here

| File | Purpose |
|---|---|
| `index.html` | The case study. All content lives here |
| `styles.css` | Design tokens at the top in `:root` |
| `app.js` | Language switching and the advertisement |
| `PRODUCT.md` | Who this is for, tone, and the no-automation rule |
| `DESIGN.md` | Color, type, spacing, and component rules |
