# [ COMPANY NAME ] — Client Platform

Frontend demo for a marketing agency that rebrands small Chinese businesses for the
American market. Built for a Wharton Global Youth Program business-plan pitch.

A client uploads product photos, enters their Chinese business name and tagline,
picks an industry and a target platform, and receives a finished advertising video.

No backend, no build step, no dependencies. Three files.

## Run it

Double-clicking `index.html` works for everything except the automatic video lookup.
To get that too, serve the folder over HTTP:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Add your video

Put your finished ad at `assets/advertisement.mp4`. It plays automatically after the
form is submitted. Until then the output panel shows a labelled empty video slot,
and the **Load a video file** button lets you preview any file from your computer.

Details in [`assets/README.md`](assets/README.md).

## Replace the placeholders

Both the name and the logo are deliberately unfinished and bracketed so nobody
mistakes them for a decision.

| Placeholder | Where |
|---|---|
| `[ COMPANY NAME ]` | `index.html` — page `<title>`, header `.brand-name`, footer |
| `LOGO` square | `index.html` — the `.brand-mark` block, marked with a comment |

Search for `[ COMPANY NAME ]` and `PLACEHOLDER` to find every spot.

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
