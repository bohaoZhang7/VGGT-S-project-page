# Colalab Project Page

This repository contains a static academic project homepage. The page is built with plain HTML, CSS, and JavaScript, so most project-specific content can be replaced by editing `index.html` and swapping files under `static/`.

## Local Preview

Run a local static server from the repository root:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Avoid opening `index.html` directly with `file://`, because some browser behavior can differ from a normal web server.

## Main Files

- `index.html`: Main page content, including title, authors, buttons, media, text sections, tables, and citation.
- `static/css/index.css`: Page styling, layout, hero animation, typography, resource buttons, carousel, and responsive behavior.
- `static/js/index.js`: Carousel behavior, BibTeX copy button, scroll-to-top button, and hero collapse behavior.
- `cologo/cologo.png`: Logo shown in the animated hero section.
- `static/images/`: Image assets used in teaser and section figures.
- `static/videos/`: Video assets used in the carousel and page media.
- `static/pdfs/`: Paper or supplementary PDF files.

## Replace Text Content

Most visible text is in `index.html`.

Update these common placeholders:

- Page title: search for `Project Title:`.
- Team name: search for `Project Team`.
- Author names: search for `First Author`, `Second Author`, etc.
- Institutions: search for `Institution One`, `Institution Two`, etc.
- Main description: edit the first paragraph after the media carousel.
- Section text: edit the paragraphs under `The Model`, `The Data`, and `The Results`.
- Citation text: edit the BibTeX block inside `<pre id="bibtex-code">`.

Also update metadata in the `<head>` section:

- `<meta name="title">`
- `<meta name="description">`
- `<meta name="keywords">`
- OpenGraph tags such as `og:title`, `og:description`, and `og:image`
- Twitter tags such as `twitter:title`, `twitter:description`, and `twitter:image`

## Replace Resource Buttons

The resource buttons are in the `resource-grid` block in `index.html`.

Current buttons:

- `Paper`
- `Supplementary`
- `Code`
- `Weights`
- `Datasets`

For each button, update the `href` value:

```html
<a href="YOUR_LINK_HERE" target="_blank" class="resource-card">
```

The icons use Iconify:

```html
<iconify-icon class="resource-icon resource-icon-paper" icon="academicons:arxiv"></iconify-icon>
```

To choose a different icon, search icons at [Iconify](https://icon-sets.iconify.design/) and replace the `icon="..."` value.

## Replace Logo

Replace:

```text
cologo/cologo.png
```

Keep the same file name if you do not want to edit HTML. If you use a different path, update this line in `index.html`:

```html
<img src="cologo/cologo.png" alt="" class="hero-logo-image">
```

## Replace Images

Images are referenced in `index.html`, mostly under `static/images/`.

Common image references:

- `static/images/carousel1.jpg`
- `static/images/carousel2.jpg`
- `static/images/carousel3.jpg`
- `static/images/carousel4.jpg`

You can either replace those files with your own images using the same names, or update the `src` paths in `index.html`.

Example:

```html
<img src="static/images/your_method_figure.jpg" alt="Method overview" class="section-figure section-figure-wide">
```

Use descriptive `alt` text for accessibility and search indexing.

## Replace Videos

Carousel videos are in the `media-carousel-track` block in `index.html`.

Current video paths include:

- `static/videos/carousel1.mp4`
- `static/videos/carousel2.mp4`
- `static/videos/carousel3.mp4`
- `static/videos/banner_video.mp4`

Replace the files directly, or update the `<source>` path:

```html
<source src="static/videos/your_demo.mp4" type="video/mp4">
```

For best browser compatibility:

- Use `.mp4` with H.264 encoding.
- Keep videos compressed for fast loading.
- Keep `muted`, `loop`, and `playsinline` if the video should autoplay.

## Replace YouTube Embed

The embedded video iframe is in `index.html`.

Replace the YouTube video ID in:

```html
src="https://www.youtube.com/embed/JkaxUblCGz0"
```

For example, if your YouTube URL is:

```text
https://www.youtube.com/watch?v=YOUR_VIDEO_ID
```

Use:

```html
src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
```

## Replace PDFs

Put paper and supplementary PDFs in:

```text
static/pdfs/
```

Then update the resource button links in `index.html`, for example:

```html
<a href="static/pdfs/paper.pdf" target="_blank" class="resource-card">
```

## Edit Tables

The result tables are in the `The Results` section of `index.html`.

Look for:

```html
<table class="results-table results-table-compact">
```

and:

```html
<table class="results-table results-table-wide">
```

Replace row labels, column labels, and numbers with your own results. Keep the existing classes if you want to preserve the current styling.

## Edit Citation

Update the BibTeX block in `index.html`:

```html
<pre id="bibtex-code"><code>@inproceedings{project2026,
  title={Project Title: An Open-Source Generalist Research Project},
  author={First Author and Second Author and Third Author and Fourth Author},
  booktitle={Conference Name},
  year={2026},
  url={https://your-project-page.example}
}</code></pre>
```

The `Copy` button automatically copies the content inside `bibtex-code`.

## Adjust Layout And Style

Most layout settings are in `static/css/index.css`.

Useful variables and selectors:

- `--content-measure`: Controls the width of main text, figures, tables, and citation blocks.
- `.publication-title-cola`: Controls the title inside the cola hero area.
- `.hero-logo-shell`: Controls the logo size in the hero.
- `.cola-surface`: Controls the height and placement of the cola area.
- `.bubble-*`: Controls bubble position, size, color, speed, and delay.
- `.resource-card .resource-icon`: Controls resource icon size.
- `.section-title`: Controls section heading typography.
- `.body-paragraph`: Controls main paragraph typography.
- `.media-carousel`: Controls the video carousel layout.

## Add Or Remove Carousel Items

Each carousel item looks like this:

```html
<article class="media-tile" data-carousel-slide>
  <video autoplay muted loop playsinline preload="metadata">
    <source src="static/videos/carousel1.mp4" type="video/mp4">
  </video>
  <span class="media-speed-badge">2x</span>
</article>
```

To add a new item, duplicate one `article` block and update the video path.

To remove an item, delete the full `article` block.

The carousel dots and left/right loop behavior are generated by `static/js/index.js`.

## Replace Interactive Data And Results Blocks

The Data section includes a Plotly-powered 3D scatter placeholder:

```html
<div id="tsne-plot" class="tsne-plot"></div>
```

Update `setupTsnePlot()` in `static/js/index.js` to replace the synthetic clusters with your own embedding coordinates. Each trace can represent a dataset split, task family, robot setup, or model rollout group.

The Results section has two interactive blocks:

- `data-metrics-dashboard`: tabbed metric bars for success, generalization, and efficiency.
- `data-demo-gallery`: a looping demo gallery for qualitative videos.

To change the metrics, edit the `datasets` object inside `setupMetricsDashboard()` in `static/js/index.js`.

To change gallery videos, edit the `<article class="demo-card" data-demo-card>` blocks in `index.html` and point each `<source>` to your own files under `static/videos/`.

## Edit Or Replace The Model Architecture Diagram

The Model section uses an editable architecture diagram instead of a flat image. The diagram is in `index.html`:

```html
<div class="model-architecture" data-model-architecture>
  <div class="model-architecture-canvas system-architecture">
    ...
  </div>
</div>
```

It is built from two layers:

- HTML modules: `.system-panel-*` and `.system-chip-*`
- SVG line layers: `.system-architecture-lines` for the full diagram and `.system-model-lines` for the inside of `Q_model`

### Move Or Resize Modules

Module positions are controlled in `static/css/index.css`.

Main modules:

```css
.system-panel-train { left: 4%; width: 19%; }
.system-panel-model { left: 28%; width: 44%; }
.system-panel-test  { left: 77%; width: 19%; }

.system-panel {
  top: 9%;
  height: 50%;
}
```

Bottom modules:

```css
.system-chip {
  bottom: 9%;
  width: 19.5%;
}

.system-chip-advantage { left: 30.1%; }
.system-chip-feedback  { left: 53.4%; }
```

Change `left`, `top`, `bottom`, `width`, `height`, and `min-height` to move or resize each box. Keep module backgrounds opaque if you do not want flow lines to show through the boxes.

### Move The Outer Flow Lines

The outer flow lines are in `index.html` inside:

```html
<svg class="system-architecture-lines" viewBox="0 0 1200 560">
```

This means line coordinates use an internal coordinate system from `x=0..1200` and `y=0..560`.

Current important anchor points:

- `P_train` bottom center: approximately `(162, 330)`
- `Q_model` left edge center: approximately `(336, 170)`
- `Q_model` right edge center: approximately `(864, 170)`
- `P_test` left edge center: approximately `(924, 170)`
- `P_test` bottom center: approximately `(1038, 330)`
- `Stage Advantage` left/right centers: approximately `(362, 454)` and `(596, 454)`
- `DAgger Feedback` left/right centers: approximately `(641, 454)` and `(875, 454)`

Edit each path's `d` value to move a line:

```html
<path class="system-line system-line-main system-line-data" d="M276 170 H336"></path>
<path class="system-line system-line-main system-line-inference" d="M864 170 H924"></path>
<path class="system-line system-line-green" d="M162 330 C176 402 284 454 362 454"></path>
<path class="system-line system-line-green" d="M596 454 H641"></path>
<path class="system-line system-line-feedback" d="M875 454 C978 442 1024 384 1038 330"></path>
```

SVG path syntax used here:

- `M x y`: move to a point
- `H x`: horizontal line to `x`
- `C x1 y1 x2 y2 x y`: cubic curve ending at `(x, y)`

To connect a line to a module, stop the path at the module edge or center point, rather than drawing through the module.

### Move The Internal `Q_model` Lines

Inside the `Q_model` panel, the internal line layer is:

```html
<svg class="system-model-lines" viewBox="0 0 540 188">
```

The visible module grid under it is controlled by:

```css
.system-model-grid {
  inset: 5.75rem 2rem 2rem;
  grid-template-columns:
    minmax(4.8rem, 0.9fr)
    minmax(5.6rem, 1.08fr)
    minmax(2.7rem, 0.62fr)
    minmax(7rem, 1.34fr);
}
```

Current internal arrows:

```html
<path class="system-line system-line-src" d="M112 47 H154"></path>
<path class="system-line system-line-src" d="M112 94 H154"></path>
<path class="system-line system-line-src" d="M112 141 H154"></path>
<path class="system-line system-line-purple" d="M254 47 C304 48 328 88 380 94"></path>
<path class="system-line system-line-purple system-line-delay" d="M254 141 C304 140 328 100 380 94"></path>
```

Use `.system-line-src` for `SRC -> Q` arrows. Use `.system-line-purple` for animated `Q_i -> Q_mix` injection lines.

### Change Flow Colors And Animation

Line styles are in `static/css/index.css`:

```css
.system-line-main
.system-line-src
.system-line-purple
.system-line-green
.system-line-feedback
```

The moving dash effect comes from:

```css
animation: architecture-flow 1.7s linear infinite;
```

Change `stroke`, `stroke-width`, `stroke-dasharray`, or `animation` to adjust line color, thickness, dash spacing, and speed.

### Use LaTeX In The Diagram

MathJax is loaded in `index.html`, so labels can use inline LaTeX:

```html
<span class="system-formula">\(Q_{\mathrm{model}}\)</span>
<small>\(\hat{A}_t = r_t + \gamma V(s_{t+1}) - V(s_t)\)</small>
```

If a formula is clipped, make the containing module wider/taller or reduce the formula size with CSS, for example:

```css
.system-chip mjx-container {
  font-size: 76% !important;
}
```

### Replace With Your Own Architecture

Recommended editable workflow:

1. Duplicate the current `.system-architecture` block in `index.html` as a backup.
2. Replace the module text or add/remove module sections:

```html
<section class="system-panel system-panel-encoder">...</section>
```

3. Add matching CSS for the new module position:

```css
.system-panel-encoder {
  left: 18%;
  width: 22%;
  top: 12%;
  height: 38%;
}
```

4. Update `<svg class="system-architecture-lines">` paths so arrows stop at the new module edges.
5. If the center panel has internal modules, update `.system-model-grid` and `<svg class="system-model-lines">` together so the visual boxes and arrows share the same layout.

Fast replacement workflow:

1. Export your own architecture as `static/images/model-architecture.svg` or `.png`.
2. Replace the content inside `.model-architecture-canvas` with:

```html
<img src="static/images/model-architecture.svg" alt="Model architecture diagram" class="section-figure section-figure-wide">
```

3. If you still want animated flow lines, keep an absolutely positioned SVG layer above or below the image and draw paths on top of it.

Inline SVG workflow:

1. Export your diagram as inline SVG from Figma, Illustrator, PowerPoint, or Inkscape.
2. Paste it inside `.model-architecture-canvas`.
3. Add animation classes to paths:

```html
<path class="system-line system-line-purple" d="..."></path>
<path class="system-line system-line-feedback" d="..."></path>
```

Use inline SVG when you need animated or individually styled modules. Use a flat PNG/JPG only when you do not need editable nodes or animated paths.

## Replace The Interactive Method Diagram

The interactive method diagram is the block marked with:

```html
<div class="method-diagram-scroll" data-method-diagram>
```

It contains two synchronized parts:

- The visual diagram in `.method-diagram-stage`
- The horizontal step cards in `.method-scroll-steps`

The current demo uses four steps:

```text
data -> model -> deployment -> feedback
```

Each diagram node uses:

```html
data-method-node="data"
```

Each arrow/path uses:

```html
data-method-link="data"
```

Each text step uses:

```html
data-method-step="data"
```

These names must match. When the active step is `data`, the JavaScript highlights:

- `[data-method-node="data"]`
- `[data-method-link="data"]`
- `[data-method-step="data"]`

### Using Your Own SVG

Yes, you can provide a new SVG architecture diagram and make it interactive, but the SVG needs to be prepared with named layers or IDs.

Recommended workflow:

1. Draw the architecture in Figma, Illustrator, PowerPoint, or Inkscape.
2. Export it as inline SVG, not only as a flat `.png`.
3. Give each major module a stable ID or data attribute, for example:

```html
<g data-method-node="encoder">...</g>
<path data-method-link="encoder" d="..."></path>
```

4. Add matching text cards:

```html
<article class="method-step" data-method-step="encoder">
  <span>Step 1</span>
  <h3>Encoder</h3>
  <p>Describe this part of the architecture.</p>
</article>
```

5. Add a matching color theme in `static/js/index.js` inside `stepThemes`:

```js
encoder: {
  color: "#35a7ff",
  soft: "rgba(53, 167, 255, 0.12)",
  shadow: "rgba(53, 167, 255, 0.16)"
}
```

The current JavaScript will automatically synchronize the SVG, arrows, and step cards as long as the `data-method-*` names match.

### Important SVG Notes

- A flat image cannot be individually highlighted unless it is manually split into layers.
- Inline SVG is best because CSS and JavaScript can directly target its nodes and paths.
- If you only have a PNG/JPG, use it as a background and place transparent HTML/SVG hotspots on top.
- Keep node names lowercase and simple, such as `data`, `encoder`, `policy`, `decoder`.
- Keep arrow paths separate from node groups, so arrows can animate independently.

## Publish With GitHub Pages

After pushing this repository to GitHub:

1. Open the repository on GitHub.
2. Go to `Settings`.
3. Open `Pages`.
4. Select the branch you want to publish, usually `main` or `master`.
5. Select the root folder `/`.
6. Save and wait for GitHub Pages to deploy.

## Asset Tips

- Compress large images before uploading.
- Keep videos short and compressed.
- Prefer `.jpg` or `.webp` for photos and `.png` for transparent graphics.
- Keep file names simple, lowercase, and without spaces.
- Remove unused large assets before publishing.
