# Amanda Rose website — implementation and verification ledger

Updated: 2026-11-04. This ledger is the source of truth; a Vercel READY status is **not** proof of visual correctness.

## Current state
| Requirement | Implemented | Tested | Deployed | Visually verified |
| --- | --- | --- | --- | --- |
| Shared renderer imported by Studio and homepage | YES on development branch | Syntax PASS; architecture CI pending | NO production release | NO |
| Identical 1600 × 582 canvas and typography | SHARED RENDERER IMPLEMENTED | Browser visual comparison pending | NO production release | NO |
| Nine-sector offsets, colors, shadows, overlay, CTA | PARTIAL | NOT VERIFIED | Previous patches deployed | NO |
| Database save/read-back and homepage refresh | PARTIAL | NOT VERIFIED | Previous patches deployed | NO |
| Compact neutral controls below artwork | IMPLEMENTED IN CSS | NOT VERIFIED | Previous patches deployed | NO |
| Automated visual regression | NOT IMPLEMENTED | NOT RUN | NO | NO |
| Repo rules, specification, status ledger | YES | File existence confirmed | Documentation branch only | N/A |
| Architecture CI gate | YES | Pending GitHub Actions execution | Development branch only | N/A |

## Open blocker
The branch now uses one shared renderer for both surfaces. Remaining blockers: browser pixel comparison has not been run; production Supabase save/read-back has not been verified; mobile and desktop screenshots have not been reviewed.

## Required next implementation
1. Expand visual fixtures to cover all nine sectors, empty content, offsets, shadows, colors and image crop.
2. Run GitHub CI and inspect real browser screenshots at desktop and mobile widths.
3. Verify persistence against test data without modifying existing banners.
4. Merge and deploy only after checks pass. Never mark FIXED before evidence.

## Verification log
- 2026-11-04: Existing AGENTS.md and BANNER_SYSTEM_SPEC.md inspected. Both already describe required architecture.
- 2026-11-04: Safeguards established on `safeguards/banner-quality-gates`; CI architecture test intentionally rejects the current two-renderer implementation.
- Development branch: shared renderer implemented and both pages wired to it; legacy comparison stylesheet removed from both pages.
- JavaScript syntax checks executed for renderer, editor, and homepage: PASS.
- Browser visual regression and real database persistence: NOT RUN / NOT VERIFIED.
- No production changes, no database writes, no visual verification claimed.

## How to update this ledger
For each change record commit SHA, tested commands, PASS/FAIL, screenshots or artifact links, deployed URL/state, and unresolved defects. Do not replace FAIL with PASS merely because a deployment succeeded.
