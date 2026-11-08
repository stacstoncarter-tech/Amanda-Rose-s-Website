# Amanda Rose Website — mandatory development rules

These instructions apply to every contributor or coding agent working in this repository.

## Before editing
1. Read AGENTS.md, BANNER_SYSTEM_SPEC.md, and IMPLEMENTATION_STATUS.md.
2. Inspect the actual source and identify the root cause before proposing changes.
3. State the intended outcome and the measurable acceptance tests. Preserve existing Supabase records, artwork, admin authentication, scheduling, and unrelated site features.
4. Create a recoverable Git commit or branch before any substantial refactor. Never rewrite production data to fix rendering.

## Implementation integrity
- Do not describe a patch as an architectural repair.
- If the requirement is one shared renderer, implement one shared renderer; do not add CSS overrides to simulate equivalence.
- Do not add new banner-specific !important overrides to fix positioning, wrapping, typography, or scaling. Remove conflicting legacy rules as part of the refactor.
- Preview and public homepage must consume the same saved banner data and same rendering module. Studio may scale that exact rendered canvas, not reimplement its styling.
- Do not silently narrow scope, substitute an easier task, or claim an unperformed test passed.
- Keep saved banner names distinct from public headlines; do not show placeholder text as saved content.
- No destructive database changes without explicit authorization and a recovery plan.

## Verification and release gates
- Run syntax/static checks and test all supported banner settings, including empty strings and long headlines.
- Compare preview and homepage using the same banner at the same logical dimensions, and compare desktop and mobile screenshots. Automated visual regression is the required target; until it exists, mark visual verification NOT TESTED.
- Verify save/read-back persistence and active-banner refresh independently of deployment.
- Report separate statuses: IMPLEMENTED, TESTED, DEPLOYED, VISUALLY VERIFIED. READY on Vercel means only deployment success.
- Do not claim FIXED until acceptance tests in BANNER_SYSTEM_SPEC.md pass and are recorded in IMPLEMENTATION_STATUS.md.
- Prefer preview/staging deployment before production. Production release requires passing tests; otherwise ask for explicit approval of an unverified release.
- Update IMPLEMENTATION_STATUS.md in the same work session as code changes, including failures and unresolved risks.

## Completion report
Report: files changed, commit, tests executed and results, deployment target/state, known defects, and next step. Never claim background monitoring or testing that has not been set up.

## Mandatory public site architecture (approved 2026-11-08)
- Read and follow SITE_ARCHITECTURE.md before creating or changing any public page.
- The approved sitemap is binding for all future pages: homepage → named content/community hubs and Shop & Save → departments/categories/subcategories, brands, deals, collections → one canonical product page per existing product ID → retailer.
- Use rose-site-map.js as the taxonomy and rose-shopping.js as the shared catalog renderer. Keep public sitemap.html and parent navigation current.
- Content and shopping must connect through relevant category links and, when verified, explicit featured-product relationships. Never imply an unverified product endorsement.
- Preserve the approved homepage header/banner design and existing data, artwork, admin tools, authentication, and scheduling.
