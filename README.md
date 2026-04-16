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
