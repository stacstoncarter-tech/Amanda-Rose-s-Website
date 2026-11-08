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

# Approved site architecture implementation — 2026-11-08

- IMPLEMENTED: Shop & Save hub; departments, category/subcategory views, alphabetical brand directory and brand views; deals and existing discount-code page; curated collection directory/views; canonical product/offer details; Explore, community, and complete public sitemap.
- IMPLEMENTED: Dedicated Beauty Life, Fashion, Faith, Journal, Unbox, Mini-Series, and Delores routes using shared rose-content.js and existing media player. Existing homepage cards and categories now link to their dedicated pages. Existing content gets relevant department shopping links; explicit product/content IDs are supported through shopping-curation.json.
- Future-page rules persisted in AGENTS.md and SITE_ARCHITECTURE.md; taxonomy centralized in rose-site-map.js. Current products classified by existing IDs, including Halara clothing presentation corrected from Beauty to Fashion without database writes.
- TESTED PASS: scripts/check-site.py validates local HTML references, all 20 inline/external root JavaScript units, unchanged homepage header/banner HTML and protected banner/editor/header CSS assets. Public data reads returned 200: 8 product records, 4 code records, 3 content records. No schema, records, auth, or admin tools changed.
- TESTED PASS: browser at 1363px: hub, four departments, Fashion (8), Activewear (2), brands, Aerie (2), deals (4), favorites (5), collection directory, empty skincare, missing-product recovery, Explore, sitemap, community. Search + Halara brand filter = one matching product; retailer tracking URL preserved on product details. All checked desktop pages have no horizontal overflow.
- TESTED PASS: content hub displays 3 published videos; Fashion displays 2 with shopping links; Beauty, Faith, Journal, Unbox, Mini-Series, and Delores show honest empty states for current records.
- VISUALLY VERIFIED: desktop shopping hub and 390px embedded mobile viewport (single-column grid, no overflowing main content). Further responsive checks and release evidence recorded below.
- Limitations: collections/series without curated published content remain empty. Precise category, collection, deal, and featured-content relationships are versioned in shopping-curation.json; new admin classification controls are not included. No full authenticated admin or banner-persistence regression claimed; those modules are unchanged.
- DEPLOYED: pending preview verification and release. Rollback production remains dpl_9HFaD3M64pcaAdbRSwXz6NqhQA1R.
- Additional responsive QA PASS: 390px embedded mobile viewports for shopping, product, Fashion content, and Activewear category; 800px tablet shopping viewport. All main containers have scrollWidth equal to clientWidth; mobile grid is one column, tablet two columns. Shared content renderer retested after extraction (Fashion: 2 cards).
