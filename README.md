# Wei Qiao — Academic Homepage

Personal academic website: https://weiii-qiao.github.io/

Adapted from [w-r-s/academic-homepage-template](https://github.com/w-r-s/academic-homepage-template).

## Local preview

Run from this directory:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Then visit http://127.0.0.1:8080/ . No package installation or build step is required for local preview.

## Editing

- `index.html`: profile, four news items, sixteen publications, experience, awards, Scholar and ORCID links.
- `profile.css`: responsive layout; paper images are 220px wide and keep their original proportions.
- `profile.js`: Selected is the default filter (five papers); author expansion, copy controls, and back-to-top.
- `stylesheet.css`: base template styling and local font declarations.
- `images/paper/`: original extracted PNG figures and lossless WebP versions used for thumbnails.
- `images/wei-qiao.jpg`: profile photo, cropped for display using CSS.
- `fonts/OFL.txt`: Lato font license.

A publication image is optional. Add an image or an image link with class `paper-image-link` before `paper-content` within its `paper-layout`. Omit that element entirely for a text-only entry. Linked figures open their original PNG in a new tab.

The existing GitHub Pages workflow deploys updates to `main`. Legacy `person.html`, `publication.html`, and `experience.html` links redirect to the corresponding homepage section.

## Figure sources

Figures are extracted from the author's papers. Page numbers are PDF-file page numbers, starting at 1. No labels, graph structure, or results have been changed.

| Paper | Figure | PDF page | Displayed content |
| --- | --- | --- | --- |
| Cutting the Fuse | 3 | 5 | Counterfactual edge interventions |
| Forge | 1b | 3 | Cocktail-party analogy |
| Slot | 5 | 7 | RL-guided graph neighbor selection |
| SauronEyes | 4 | 8 | Overlapping attack clusters |
| Chaos | 2 | 6 | Compact framework |

## Profiles

- [Google Scholar](https://scholar.google.com/citations?user=_OFu_KEAAAAJ&hl=en)
- [ORCID](https://orcid.org/0000-0003-1561-9466)

The About biography supports English / 中文. The language choice is remembered locally when browser storage is available; the copy-bio button copies the visible language. Publications, News, Experience, Awards and navigation retain their original content. Figure links have a slim border and 6px inset, keeping their 220px overall width and intrinsic image height.
