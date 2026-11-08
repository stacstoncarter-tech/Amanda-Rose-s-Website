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
- Release-specific browser QA PASS: 1363px desktop shows six loaded circular photos and three live shopping products; 800px tablet has three columns; 390px mobile has two columns; circles remain square with 50% radius and no text/page overflow. Protected deployment verification pending.
- Existing banner persistence limitations are outside this design release; no banner implementation changes are included.

## Release

- GitHub PR, merge and production deployment: pending.
- Rollback: prior production deployment dpl_E744dV8AG2HDcrvjvMMjc2aftboL.
