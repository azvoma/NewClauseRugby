# UK Rugby Club Directory

The source for [ukrugbyclubdirectory.co.uk](https://ukrugbyclubdirectory.co.uk/) — a directory of 773+ rugby union clubs, rugby league teams and rugby businesses across England, Scotland, Wales and Northern Ireland.

## Stack

Plain static site, no build step:

- `index.html` — single-page shell with `.pg` sections per route
- `app.js` — hash-based SPA router, club rendering, filters, map, wishlist
- `clubs_data.js` — `CSV_CLUBS` array (club records loaded at runtime)
- `style.css` — site styles
- `badges/` — club crest images
- `netlify/edge-functions/seo.js` — Deno edge function that injects per-page `<title>`, meta and JSON-LD on every HTML request; reads `clubs_meta.json` for club-page SEO
- `netlify.toml` — edge function config, clean-URL redirects, cache headers
- `sitemap.xml`, `robots.txt` — SEO basics

## Local development

Because there's no build step, any static file server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Note: the Netlify edge function (server-side SEO injection) won't run under a plain static server. To exercise it locally, use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify dev
```

## Deploying

Pushing to the `main` branch on GitHub deploys automatically to Netlify if the repo is connected. `netlify.toml` handles configuration; no environment variables are required.

## Routing

The site uses clean URLs (`/club/leicester-tigers`, `/region/yorkshire`, etc.) that are rewritten via `netlify.toml` to the SPA shell with a `?p=` query param. The edge function reads `?p=` and injects the correct SEO before the HTML streams to the user.

## License

All club names, crests and trademarks belong to their respective owners.
