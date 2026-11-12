# MUSE MOTION STUDIO

One global repo for rendering every video style. Each style lives in its own folder under `styles/`, as a self-contained Remotion project. One workflow renders any of them.

## Layout

```
styles/
  vintage-scrapbook/   <- the first style (1080x1920, 30fps, 810 frames)
  diorama-kertas/      <- add a folder per style
  kinetic-type/
  papercut/
.github/workflows/render-remotion.yml
```

## Render a video

1. Open the **Actions** tab → **Render Remotion Video** → **Run workflow**.
2. Pick the `style` folder and the `composition` inside it.
3. Download the MP4 artifact within 14 days (artifacts expire after that).

The workflow verifies the render with ffprobe: a missing, too-short, or black MP4 fails the job instead of passing silently.

## Add a style

Add a folder under `styles/` with a working Remotion project (`package.json`, `src/index.ts`, and a `package-lock.json` — the lock file is required for the npm cache). No workflow change is needed.
