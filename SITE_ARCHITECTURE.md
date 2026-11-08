# Amanda Rose approved site architecture

Approved by Stacston Carter on 2026-11-08. This is the required structure for all future public pages.

## Homepage and hubs

- Homepage: index.html. Preserve its header, banner, approved artwork, and circular category design.
- Shopping hub: shop.html.
- Entertainment: content.html (Watch Now), mini-series.html, delores.html, beauty.html (Beauty Life), fashion.html, unbox.html.
- Editorial: journal.html (The Rose Journal).
- Faith and community: community.html and faith.html.
- Directory: explore.html; quick social links: links.html; public navigation index: sitemap.html.

## Shopping hierarchy

shop.html → departments.html → department.html?department=ID → category.html?department=ID&category=ID → optional &subcategory=SLUG → product.html?id=EXISTING_RECORD_ID → external retailer.

Other discovery paths converge on the same product ID:
- brands.html → brand.html?brand=SLUG → product.
- deals.html → discount-codes.html or deals.html?type=sales|freebies|exclusive → product.
- collections.html → collection.html?collection=favorites|shop-my-videos|shop-the-look|seasonal|gift-guides → product.
- Content/story → explicitly featured product; product → explicitly related content.

`rose-site-map.js` is the canonical department/category/subcategory taxonomy. `rose-shopping.js` is the single shopping renderer. Do not copy renderers or create duplicate product records for different discovery paths.

## Classification and content relationships

Existing published records remain in Supabase. No schema or records were modified for this release. `shopping-curation.json` is versioned curation keyed by existing record ID:

```json
{
  "products": {
    "EXISTING_PRODUCT_ID": {
      "brand": "Brand name",
      "department": "fashion",
      "shopping_category": "clothing",
      "subcategory": "Activewear",
      "collections": ["shop-the-look"],
      "related_content_ids": ["EXISTING_CONTENT_ID"],
      "deal_type": "sales"
    }
  },
  "content": {
    "EXISTING_CONTENT_ID": {"product_ids": ["EXISTING_PRODUCT_ID"]}
  }
}
```

Keep both directions of explicit content/product relationships in sync. Assign collections, deals, and featured relationships only when supported by the content; never imply Amanda reviewed or featured an unrelated product. New products appear in All Finds and their existing broad department immediately. Add precise classification here when publishing a product. New brands derive from published records, with explicit brand names preferred over hostname fallback. Empty categories show honest empty states, not invented products. Existing expired/unpublished records never appear.

Content views reuse the existing published-content renderer and video player. Journal selects articles; category hubs select the existing category; Unbox, Mini-Series, and Delores currently use explicit title/description matching. Use descriptive titles for these series. `content.html?item=ID` opens one published item, including full article description. Category shopping links are discovery suggestions, not claims that a specific product appeared in a video.

## Mandatory rules for every future page

1. Place the page in this sitemap; link from its parent and provide a route back.
2. Use shared header, taxonomy, navigation, and applicable renderer. Preserve header design.
3. Include breadcrumbs, a descriptive page title, accessible controls, responsive layouts, and clear loading/empty/error states.
4. Content with featured products links to canonical product IDs; products link back to the relevant content. Use broad related-shopping links only when explicit product relationships are unavailable.
5. Keep brand codes separate from product uploads, with an obvious route between them.
6. Never fabricate stock, prices, sales, discounts, reviews, or collections. Preserve retailer tracking URLs.
7. Validate local destinations, JavaScript syntax, mobile overflow, filtering, canonical product links, and preserved homepage header/banner before release.
8. Update this document, the public sitemap, and IMPLEMENTATION_STATUS.md when approved structure changes. Any departure requires the user's approval.
