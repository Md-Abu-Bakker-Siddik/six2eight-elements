# Six2eight Elements

WordPress plugin that ships **matching UI for Elementor and Gutenberg**: a vertical **Project Steps** timeline and a **Transformation** section with before/after comparison and a center-mode carousel. Shared styles and scripts keep both implementations visually aligned.

---

## Language policy

All **plugin-authored** strings (PHP `__()` / `_e()` copy, block titles, defaults, comments in source files, and this README) are **English only**. No Bengali or other locale text is bundled in the shipped plugin. Site content in the database may be any language.

---

## Requirements

| Item | Version |
|------|---------|
| WordPress | **6.0+** |
| PHP | **7.4+** |
| Elementor | **Optional** — widgets register only when Elementor is active |

---

## Installation

1. Copy the `six2eight-elements` folder into `wp-content/plugins/`.
2. In **Plugins → Installed Plugins**, activate **Six2eight Elements**.
3. No separate settings screen — features appear in the block inserter and in Elementor.

---

## What’s Included

### Gutenberg (block editor)

| Block name | Namespace | Purpose |
|------------|-----------|---------|
| **Six2eight Project Steps** | `six2eight/project-steps` | Accent + main heading, vertical timeline with numbered steps, RichText per step, active/inactive states |
| **Six2eight Transformation Slider** | `six2eight/transformation-slider` | Headline + subheadline, multiple before/after slides, draggable divider, optional nav (counter + arrows), autoplay support |

- Supports **wide** and **full** alignment and block **spacing** (margin/padding).
- **Project Steps** editor stylesheet (`editor.css`) keeps controls readable on dark backgrounds.
- Empty **accent** / **main** headings are omitted on the frontend; in the editor they appear when the block is selected so you can add copy.

### Elementor

| Widget | Slug | Purpose |
|--------|------|---------|
| **S2E Project Steps** | `s2e-project-steps` | Same timeline pattern via repeater fields |
| **S2E Transformation Slider** | `s2e-transformation-slider` | Same carousel + compare UI |

- Category: **Six2eight Elements** (`six2eight-elements`).
- Responsive controls for layout, padding, typography, step spacing, slider frame, etc.
- Widgets declare `get_style_depends()` / `get_script_depends()` so Elementor loads the same shared assets as the blocks.

---

## Shared Assets

| Asset | Handle / path | Role |
|-------|-----------------|------|
| Styles | `six2eight-elements-css` → `assets/css/style.css` | Layout, tokens, responsive rules (including Elementor flex fixes on small viewports) |
| Script | `six2eight-elements-js` → `assets/js/script.js` | Compare drag, carousel strip, autoplay |
| Fonts | `six2eight-elements-fonts` | Google Fonts: **Cormorant Garamond** + **Manrope** (registered in `includes/class-assets.php`) |

CSS custom properties (examples): `--s2e-font-sans`, `--s2e-font-serif`, `--s2e-brand-navy`, `--s2e-steps-item-gap`, transformation frame/radius tokens.

Assets load **only when** a Six2eight block is rendered (frontend) or in the block editor / Elementor preview when needed.

---

## Recommended Page Structure

**Project Steps (dark section)**  
Use a **Group** or Elementor **section** with dark background. For a two-column hero: **Columns** — image left, **Project Steps** block/widget right.

**Transformation (light section)**  
Separate **Group** / section with light background; place the **Transformation Slider** block/widget full width inside it.

For Elementor on very narrow screens, use **section full width** and **column 100%** on mobile so flex layouts do not leave side gutters.

---

## Development

### Block JavaScript

Source lives under each block’s `src/` folder. After changing `edit.js`, `save.js`, or `index.js`:

```bash
cd blocks/project-steps
npm install
npm run build
```

```bash
cd blocks/transformation-slider
npm install
npm run build
```

Committed sites should include the generated `build/` output (or run the build in CI before deploy).

Block builds use `webpack.config.js` with **no source maps** so client zips stay smaller; editor behavior is unchanged.

### Packaging for a client (small zip)

The repo root `.distignore` lists folders that are not needed on a live site (`node_modules`, block `src/`, lockfiles, maps, etc.). If you use [WP-CLI](https://wp-cli.org/) with the [dist-archive](https://developer.wordpress.org/cli/commands/dist-archive/) command, from `wp-content/plugins` run:

```bash
wp dist-archive six2eight-elements six2eight-elements.zip
```

That produces a zip the client can upload under **Plugins → Add New → Upload**. Without WP-CLI, zip the same paths manually and omit anything listed in `.distignore`.

### PHP-only changes

Updating `includes/*.php`, `widgets/*.php`, or `assets/css/style.css` does not require `npm run build`.

---

## Project Layout

```text
six2eight-elements/
├── six2eight-elements.php      # Bootstrap, constants, hooks
├── README.md
├── includes/
│   ├── class-assets.php        # Registers fonts, shared CSS/JS
│   ├── class-blocks.php        # Registers Gutenberg blocks, editor enqueue
│   └── class-elementor.php     # Elementor category + widget registration
├── widgets/
│   ├── class-s2e-project-steps.php
│   └── class-s2e-transformation-slider.php
├── assets/
│   ├── css/style.css
│   └── js/script.js
└── blocks/
    ├── project-steps/
    │   ├── block.json
    │   ├── editor.css
    │   ├── src/
    │   └── build/               # Compiled editor script
    └── transformation-slider/
        ├── block.json
        ├── src/
        └── build/
```

`node_modules/` under each block is for local development only and should not be deployed to production if you exclude dev dependencies.

---

## Version

Plugin header and `S2E_ELEMENTS_VERSION`: **1.0.0**.

---

## Credits

**Six2eight** — custom elements for marketing and portfolio layouts using Elementor and/or the block editor.

For questions about extending the plugin or commercial use, contact the project maintainer (Six2eight LLC).
