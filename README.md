# East 2 West — Marketing Agency

A one-screen case study of how the agency works, built for a Wharton Global Youth
Program business-plan pitch.

East 2 West rebrands small Chinese businesses for the American market. The page
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
| Business name and tagline | The two `.value` elements in section B, and the brand cell in the meta strip |
| Industry | Section C, and the matching cell in the meta strip |
| Video size | Section D, the meta strip, and `data-ratio` on `.frame` |
| The naming work | The `.naming` block in panel 02: the Chinese name, the word-for-word rendering, and the delivered name |

If you change the video size, update `data-ratio` on `.frame` to match, or the
advertisement will sit letterboxed inside the wrong shape. Valid values are `16:9`,
`1:1`, `4:5`, and `9:16`.

Text that appears in both languages lives in the `COPY` block in `app.js`, keyed by
the `data-i18n` attributes. Two kinds of wording are deliberately left out of it and
hardcoded in `index.html` instead, because they are content rather than interface:
the client's Chinese name and tagline, which stay Chinese in both modes because they
are the brand as it exists today, and the English word-for-word, delivered name, and
delivered tagline, which stay English in both modes because the English brand is the
thing being sold.

## The worked example

The case study runs on one name, 鑫达重汽, and the whole argument for the service is
in the gap between two ways of putting it into English.

Word for word it comes out as **Prosperity-Gold Reach Heavy Automobile**. That is not
a strawman — it is close to what machine translation actually returns, and to an
English-speaking buyer it reads as either nonsense or a scam. The Chinese name is
meanwhile completely respectable and signals exactly the right things at home: 鑫 is
prosperity through wealth, three 金 stacked, and it is extremely common in company
names; 达 is to reach or attain; 重汽 is the ordinary industry suffix for heavy
vehicles.

What was delivered is **XINDA Trucks**, with the tagline *Built to haul. Built to
last.* It keeps the pinyin, because buyers meet it on documents and parts anyway;
drops 鑫, because nothing in English carries it; and uses the plain category word.

**None of that reasoning is printed on the page, and it should not be.** Panel 02
shows the characters, the word-for-word rendering, and the delivered name, and
nothing else. The pinyin and the sense of each character are explained out loud by
whoever is presenting. Do not add a gloss, a romanisation, or an annotation back
into that section.

The tagline on the input side, 载得动，跑得远, is wording chosen to suit the truck
photos rather than a real client's copy.

## What is here

| File | Purpose |
|---|---|
| `index.html` | The case study. All content lives here |
| `styles.css` | Design tokens at the top in `:root` |
| `app.js` | Language switching and the advertisement |
| `PRODUCT.md` | Who this is for, tone, and the no-automation rule |
| `DESIGN.md` | Color, type, spacing, and component rules |
