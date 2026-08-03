# PRODUCT.md

## Product Purpose

A showcase of how the agency works, not a tool that does the work.

East to West rebrands small Chinese businesses for the American market. The service
is performed by people. This page exists to make that service legible in one screen:
here is what a client hands over (product photos, their Chinese brand name and
tagline, their industry, the video size they need), and here is the advertisement
the team hands back.

**The page never generates anything.** It has no automation behind it and must never
imply it does. Submitting a brief acknowledges the brief; it does not produce a file.
There is no progress bar, no rendering sequence, no language suggesting software made
the advertisement. Getting this wrong misrepresents the business as an ad generator,
which it is not.

This repository is the frontend demo used for the Wharton Global Youth Program
business-plan pitch. There is no backend. The advertisement is supplied manually.

## register

product

## Users

**Primary: the client.** Owner or marketing lead of a small Chinese business
(restaurant, tea, textiles, small-batch manufacturing) with 5 to 50 employees.
Reads Chinese first, English second or not at all. Has a phone full of product
photos and no brand assets. Has been told American customers "want something
different" but has not been told what. Cautious about spending money with a foreign
agency. Uses this once or twice per campaign, not daily.

**Secondary: the pitch audience.** Program judges and peers who will land on this
cold, with no explanation, and need to understand the business in under ten seconds.

## Tone

Plain, procedural, unembellished. The interface behaves like a form at a bank or a
customs declaration: numbered steps, clear labels, no persuasion. Trust comes from
looking like infrastructure, not like a campaign. Never sell inside the tool; the
selling already happened.

## Brand

**East to West**, a marketing agency. The name carries the whole proposition: the
client's product moves from an eastern market to a western one, and the agency is
the passage. It is set in English in both language modes, because the English brand
is the thing being sold.

The logo is not chosen yet and appears as a bordered placeholder square. Do not
invent a wordmark or icon.

White surface, one dark blue accent, hairline rules, square corners. No gradients,
no shadows, no rounded buttons, no decorative imagery.

## Anti-References

- Canva / Adobe Express: playful, rounded, gradient-heavy, template-carousel driven.
- Agency landing pages with full-bleed hero video and scroll-triggered reveals.
- AI-product marketing pages: purple-to-blue gradients, glass cards, floating orbs.
- Anything that looks like it is trying to impress the client. This is a work tool.

## Strategic Principles

1. **Bilingual is the product, not a feature.** The interface exists in English and
   Simplified Chinese because speaking to the client in Chinese while selling to the
   American market in English is the entire value proposition.
2. **The client's Chinese brand is the input, not a mistake to be corrected.** Name
   and tagline fields accept Chinese and treat it as the source of truth.
3. **One screen.** Input on the left, output on the right. No navigation, no
   marketing sections, nothing to scroll past.
4. **Every state is designed.** Empty, dragging, invalid file, brief submitted,
   delivered, and no-video-yet all have a considered treatment.
5. **Never claim automation.** No progress bars, no rendering steps, no wording that
   suggests the advertisement is produced by this page. People make the ad.
5. **Placeholders stay obviously placeholder.** Bracketed and labelled, so no one
   mistakes an unfinished asset for a decision.
