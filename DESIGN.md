# DESIGN.md

Design system for the client platform. Every value below lives in `styles.css` as a
custom property. Change it there, not inline.

## Color

Strategy: **Restrained.** White surface, one dark blue accent carrying under 10% of
the page, neutrals tinted toward the accent hue so nothing reads as dead grey.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#ffffff` | Page surface |
| `--panel` | `#f7f8fa` | Secondary neutral layer: dropzone, output stage, meta strip |
| `--ink` | `#101a26` | Primary text, headings, values |
| `--ink-2` | `#5a6572` | Labels, secondary text, help copy (5.5:1 on paper) |
| `--ink-3` | `#8a939e` | Disabled and faint text only. Never body copy |
| `--rule` | `#d8dde3` | Hairline borders, 1px |
| `--rule-strong` | `#b6bec7` | Dashed empty-state borders, input borders on hover |
| `--navy` | `#12386b` | Accent: primary button, focus ring, active state, step numbers |
| `--navy-deep` | `#0d2a51` | Accent hover/active |
| `--navy-tint` | `#eef2f7` | Selected background, progress track fill |
| `--danger` | `#8f2c2c` | Invalid file errors only |

The accent is reserved for primary action, current selection, focus, and state
indication. It is never decoration.

## Typography

One family: the native system stack. Fixed rem scale, ratio ~1.2. No fluid clamps.

| Token | Size | Use |
|---|---|---|
| `--t-xs` | 0.6875rem | Uppercase micro-labels, `0.08em` tracking, weight 600 |
| `--t-sm` | 0.8125rem | Help text, meta values, buttons |
| `--t-base` | 0.9375rem | Inputs, body |
| `--t-md` | 1.125rem | Panel titles |
| `--t-lg` | 1.5rem | Brand name |
| `--t-xl` | 2rem | Step numerals |

Chinese text uses the same stack with `PingFang SC` and `Noto Sans SC` ahead of the
Latin faces so it never falls back to a serif.

## Shape

`border-radius: 0` globally, enforced by the reset. No exceptions, including inputs,
buttons, thumbnails, and the video frame.

No `box-shadow` anywhere. Depth comes from 1px hairlines and the panel tint.

No gradients. No `backdrop-filter`.

## Spacing

4 / 8 / 12 / 16 / 24 / 32 / 48 / 64. Panels use 32 inside, 24 between field groups,
12 between a label and its control. Rhythm varies deliberately; the gap above a
section rule is always larger than the gap below it.

## Layout

Single screen, two panels. `5fr / 7fr` above 960px, stacked below. The output panel
gets the wider column because the 16:9 frame needs the width. A single shared 1px
rule separates them; panels do not float as cards.

## Components

Every interactive element ships default, hover, focus-visible, active, and disabled.
Focus is a 2px `--navy` outline at 2px offset, square.

Buttons: 1px border, square, uppercase `--t-xs`. Primary is filled navy; secondary is
navy text on paper with a navy border; both flip to `--navy-deep` on hover.

## Motion

160ms `cubic-bezier(0.22, 1, 0.36, 1)` on color and border transitions only. The
processing progress bar animates width. Nothing else moves. No page-load choreography.

## Copy

The interface carries no instructional, explanatory, or reassuring prose. Labels
name things; they do not teach. There are no help lines under fields, no subtitles
under panel titles, no hints in empty states, and no notes about how the demo works.

Two exceptions, both factual rather than explanatory: the accepted file formats and
limits under the upload box, and error messages, which appear only after something
goes wrong.

## Bans specific to this project

- Rounded corners of any radius.
- Gradients, shadows, glass.
- Inventing a logo. The placeholder square stays until artwork exists.
- Marketing copy inside the tool.
- Help text, hints, tooltips, or any sentence that explains the interface to the
  user. If a control needs a sentence to be understood, relabel the control.
