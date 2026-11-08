# Approved homepage release — 2026-11-08

The user approved public release of the shopping highlights and circular photographic category navigation.

## Scope

- White shopping box, thin black border, original supplied floral logo, original-resolution Halara/Aerie product imagery.
- Six category photographs in circles with a 2px black stroke, six across desktop / three across tablet / two across mobile. No pink background gradient. Existing category labels, descriptions, and destinations retained.
- Changes are based on production branch 679595de1a0c1c544808a51d0e1bec49512d5cf9. Existing header, banner renderer/editor, carousel styling, admin code, and database records are preserved. Earlier development banner work remains separate.
- Files: index.html, rose-shopping-highlights.css, rose-explore.css, three artwork assets, and this ledger.

## Validation

- IMPLEMENTED: approved design ported to a clean checkout of current main.
- TESTED PASS: header and banner HTML byte comparisons; banner scripts/editor/CSS and global header files byte-identical to main; all homepage inline and root JS syntax checks. No data writes.
- Previously reviewed design at 1363/800/390 widths passed image, geometry, white-background, overflow, and category navigation checks.
- Release-specific browser QA PASS: 1363px desktop shows six loaded circular photos and three live shopping products; 800px tablet has three columns; 390px mobile has two columns; circles remain square with 50% radius and no text/page overflow. Protected deployment verification PASS: dpl_E1ajDLqR3xmmX8YQYVqQzd17uJaV READY; homepage HTTP 200 and source matches.
- Existing banner persistence limitations are outside this design release; no banner implementation changes are included.

## Release

- GitHub PR #2 merged: https://github.com/stacstoncarter-tech/Amanda-Rose-s-Website/pull/2. Release commit d0e506fa23789b873484a7c0ebc453756ea05524. Merged tree exactly matches the validated source tree dec32081d8fc7e3a9474f31fdec7369ba19827e8.
- Production deployment dpl_9HFaD3M64pcaAdbRSwXz6NqhQA1R READY. Canonical site https://amanda-rose-website.vercel.app/ points to this deployment.
- Production homepage, category CSS and shopping CSS return HTTP 200 and match validated source. Browser opens the canonical public URL without sign-in; confirms six circular photos, all photos loaded, original 2414px Halara and 1400px Aerie product images loaded, no category gradient and no page overflow.
- Existing header and banner files remain unchanged from the previous production source. No issue found in the checked release flow; no full admin/persistence verification is claimed.
- IMPLEMENTED, TESTED, DEPLOYED and VISUALLY VERIFIED for the shopping/category design release. Earlier banner-development PR #1 is unchanged.
- Follow-up commit for this evidence changes documentation only.
- Rollback: prior production deployment dpl_E744dV8AG2HDcrvjvMMjc2aftboL.
