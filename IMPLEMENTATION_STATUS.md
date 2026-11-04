# Amanda Rose website — implementation and verification ledger

Updated: 2026-11-04. This ledger is the source of truth; a Vercel READY status is **not** proof of visual correctness.

## Current state
| Requirement | Implemented | Tested | Deployed | Visually verified |
| --- | --- | --- | --- | --- |
| Shared renderer imported by Studio and homepage | NO | FAIL (architecture gate) | NO | NO |
| Identical 1600 × 582 canvas and typography | PARTIAL; two implementations | NOT VERIFIED | Previous patches deployed | NO |
| Nine-sector offsets, colors, shadows, overlay, CTA | PARTIAL | NOT VERIFIED | Previous patches deployed | NO |
| Database save/read-back and homepage refresh | PARTIAL | NOT VERIFIED | Previous patches deployed | NO |
| Compact neutral controls below artwork | IMPLEMENTED IN CSS | NOT VERIFIED | Previous patches deployed | NO |
| Automated visual regression | NOT IMPLEMENTED | NOT RUN | NO | NO |
| Repo rules, specification, status ledger | YES | File existence confirmed | Documentation branch only | N/A |
| Architecture CI gate | YES | Expected to FAIL until renderer consolidated | Documentation branch only | N/A |

## Open blocker
The live homepage uses `rose-banner-public.js` and Studio uses `rose-banner-admin.js` with distinct DOM and style construction. CSS overrides cannot establish equivalence. Replace both rendering paths with one imported renderer; do not ship additional positioning patches.

## Required next implementation
1. Preserve production main SHA and existing Supabase records; implement in a feature branch.
2. Extract pure `rose-banner-renderer.js` with a single `renderBanner(record, target)` and uniform canvas scale.
3. Both public and editor import/call the same renderer; remove legacy duplicate DOM styling.
4. Add browser visual regression fixtures and screenshot comparisons for all acceptance cases from BANNER_SYSTEM_SPEC.md.
5. Run CI, verify persistence against test data, review screenshots, then merge and deploy. Never mark FIXED before evidence.

## Verification log
- 2026-11-04: Existing AGENTS.md and BANNER_SYSTEM_SPEC.md inspected. Both already describe required architecture.
- 2026-11-04: Safeguards established on `safeguards/banner-quality-gates`; CI architecture test intentionally rejects the current two-renderer implementation.
- No production changes, no database writes, no visual verification claimed for this safeguards work.

## How to update this ledger
For each change record commit SHA, tested commands, PASS/FAIL, screenshots or artifact links, deployed URL/state, and unresolved defects. Do not replace FAIL with PASS merely because a deployment succeeded.
