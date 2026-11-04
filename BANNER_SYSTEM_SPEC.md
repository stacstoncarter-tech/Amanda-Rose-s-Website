# Banner System — authoritative specification

Status: TARGET ARCHITECTURE, NOT YET IMPLEMENTED. Do not confuse this document with a completion report.

## Single source of truth
Banner Studio and the homepage must import the SAME renderer module, with the SAME banner record and decoded design settings. The editor supplies a container scale; it must not duplicate DOM structure, fonts, sizing, background positioning, overlays, or button styles. Render on one logical 1600 × 582 canvas, scaled uniformly to fit. Image cropping uses the same cover/center algorithm in both locations.

## Data and content
- Preserve existing Supabase rose_home_banners records and existing image URLs.
- Internal banner_name is editable metadata, distinct from public title/headline.
- Public fields: small heading, headline, subtitle, button label and destination. Empty content is empty in both views; never inject placeholders.
- Existing serialized design settings in background_css must be supported or migrated losslessly and reversibly.
- Editor Save must await a successful database response, read back the record, compare persisted values, and show saved/unsaved/saving/error status accurately.
- Homepage must display the latest active saved records, with clear fetch-error handling and no stale-cache ambiguity.

## Controls
- Independently position small heading, headline, subtitle and button in any of nine sectors.
- Each element has X and Y offsets with 0 centered; negative moves left/up and positive moves right/down.
- Each element has independent font size, color, and text shadow (where supported). Headlines use Bodoni Moda. Font loading must be consistent in both views.
- Overlay grey color/opacity, headline and subtitle text windows, button foreground/background, and button padding are applied identically.
- Text windows must support wrapping and long strings without clipping or drifting between editor and homepage.
- Carousel controls must be BELOW the artwork, compact, black/grey, with circular dots and unstretched previous/next and play/pause buttons.

## UI
- Saved banners in compact horizontal row.
- Preview on left, banner information dropdown on right, compact appearance/typography dropdowns below, responsive on narrow screens.
- Preview is a scaled instance of the actual renderer, not a lookalike.

## Acceptance tests (all required)
1. Given the same saved record, studio and homepage DOM/computed styles for text, image, overlay and button match at the same 1600 × 582 logical canvas.
2. Automated screenshot comparison of studio preview and homepage banner, normalized to identical dimensions, passes for at least: empty text, long headline/subtitle, all nine sectors, nonzero X/Y offsets, custom colors, opacity, shadow, and CTA settings.
3. At desktop and mobile viewport sizes, all elements retain proportional positions and readable scaling; no unexpected clipping.
4. Saving a modified banner persists settings, survives refresh, and appears on the homepage without stale data.
5. Slideshow controls remain outside artwork and are neutral black/grey with fixed dimensions.
6. Existing banners, uploads, products, and admin features continue working.

Until these checks are actually executed and recorded as PASS, status is NOT VERIFIED. A successful build or Vercel READY status is not a visual test.
