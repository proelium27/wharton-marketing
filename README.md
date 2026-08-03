# East to West — Marketing Agency

A one-screen showcase of how the agency works, built for a Wharton Global Youth
Program business-plan pitch.

East to West rebrands small Chinese businesses for the American market. The page
shows the exchange: on the left, what a client provides (product photos, their
Chinese business name and tagline, their industry, the video size they need); on the
right, the advertisement the team hands back.

**This page does not make advertisements.** People do. Submitting a brief
acknowledges it, nothing more. There is deliberately no progress bar and no
rendering sequence, because the agency is not an ad generator.

No backend, no build step, no dependencies. Three files.

## Run it

Double-clicking `index.html` works for everything except the automatic video lookup.
To get that too, serve the folder over HTTP:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## The example

The site opens with a worked example already filled in: six truck photos, a business
name, a tagline, an industry, and a target platform. The photos ship in
`assets/example/`, so the example looks identical on anyone's computer with nothing
uploaded and no network calls beyond this site.

Everything about it lives in the `EXAMPLE` block at the top of `app.js`. Pressing
**Reset** returns to it rather than emptying the form, so the demo cannot be left
blank for the next person.

The business name and tagline there are placeholder wording chosen to suit the
photos. Replace them with the real client's.

## Add your video

Put your finished ad at `assets/advertisement.mp4`. The example then shows it
already playing on open. Until that file exists the output panel shows a labelled
empty video slot, and the **Load a video file** button previews any file from your
computer.

Details in [`assets/README.md`](assets/README.md).

## Still a placeholder

The name is set. The logo is not.

The header shows a bordered square reading `LOGO`, marked with a comment in
`index.html`. When you have artwork, drop `logo.svg` into `assets/` and replace the
`.brand-mark` block with an `<img>`. Search for `PLACEHOLDER` to find it.

The name appears in three places if you ever change it: the page `<title>`, the
header `.brand-name`, and the footer. The words "Marketing Agency" underneath the
name are translated, so they live in `app.js` under the `brandRole` key rather than
in the HTML.

## What is here

| File | Purpose |
|---|---|
| `index.html` | Structure. Every string carries a `data-i18n` key |
| `styles.css` | All design tokens live at the top in `:root` |
| `app.js` | Uploads, validation, bilingual copy, output states |
| `PRODUCT.md` | Who this is for, tone, anti-references |
| `DESIGN.md` | Color, type, spacing, and component rules |

## Notes for the pitch

- **Bilingual.** The EN / 中文 toggle in the header switches the entire interface.
  That is the value proposition made clickable: the client is spoken to in Chinese,
  the ad is built for English-speaking customers.
- **Aspect ratio is live.** Picking 9:16 in section D reshapes the output frame
  immediately, before anything is generated. Good thing to demonstrate.
- **Nothing is uploaded.** Images are read with `URL.createObjectURL` and stay in
  the browser. Safe to demo on any machine, works with no internet connection.
- **States worth showing:** empty, drag-over, an oversized or non-image file
  rejected, the four-step processing sequence, and the delivered video.
