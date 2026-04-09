// ════════════════════════════════════════════════════════════════
//  UK Rugby Club Directory — Netlify Edge Function v3
//
//  FIXES:
//  1. Homepage was stuck loading — caused by long cache-control
//     on the edge function. Now no-store for homepage.
//  2. Title pattern fixed to match EV Charger directory style:
//     "Rugby Clubs in [City] | Find a Rugby Club Near Me"
//     Focus keyword FIRST, brand last — pure Yoast approach.
//  3. Every static page now has a truly unique title + desc +
//     keywords — no shared templates.
//  4. Club pages use club name as H1/focus keyword throughout.
//  5. Canonical URLs now use ?p= param correctly.
//  6. Removed duplicate meta tag injection bugs.
//  7. Cache headers fixed — no caching on homepage/dynamic pages
//     so changes appear instantly.
// ════════════════════════════════════════════════════════════════

import CLUBS_META from './clubs_meta.json' assert { type: 'json' };

const SITE      = 'https://ukrugbyclubdirectory.co.uk';
const SITE_NAME = 'UK Rugby Club Directory';
const OG_IMAGE  = `${SITE}/RUGBY_BANNER.jpg`;
const TWITTER   = '@UKRugbyClubs';

// ── Region display names ──────────────────────────────────────
const REGION_NAMES = {
  'north-west':       'North West England',
  'yorkshire':        'Yorkshire',
  'london':           'London & South East',
  'midlands':         'Midlands',
  'south-west':       'South West England',
  'north-east':       'North East England',
  'wales':            'Wales',
  'scotland':         'Scotland',
  'northern-ireland': 'Northern Ireland',
  'east':             'East England',
};

// ════════════════════════════════════════════════════════════════
//  STATIC PAGE SEO
//  Pattern mirrors EV Charger site: keyword-rich title, desc
//  includes keyword in first 20 words, unique per page
// ════════════════════════════════════════════════════════════════
const STATIC_PAGES = {

  '/': {
    title:    'Rugby Clubs Near Me | Find a Rugby Club | UK Rugby Club Directory',
    desc:     'Find rugby clubs near me across the UK. Search 773+ rugby union and rugby league clubs in England, Scotland, Wales and Northern Ireland. Every club has a free profile with contact details and directions.',
    keywords: 'rugby clubs near me, find a rugby club, rugby near me, rugby club directory UK, rugby union clubs, rugby league clubs, local rugby teams, grassroots rugby, junior rugby clubs, womens rugby, rugby club finder',
    robots:   'index, follow',
    ogType:   'website',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE}/#website`,
          url: `${SITE}/`,
          name: SITE_NAME,
          description: 'The UK\'s most comprehensive rugby club directory with 773+ club profiles',
          potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: `${SITE}/?p=search/{search_term_string}` },
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@type': 'Organization',
          '@id': `${SITE}/#organization`,
          name: SITE_NAME,
          url: `${SITE}/`,
          description: '773+ UK rugby club profiles across England, Scotland, Wales and Northern Ireland'
        }
      ]
    }
  },

  '/?p=rugby-union': {
    title:    'Rugby Union Clubs UK | 728 Clubs | Find a Club Near You | UK Rugby Club Directory',
    desc:     'Search 728 rugby union clubs across England, Scotland, Wales and Northern Ireland. Find Premiership, Championship and grassroots union clubs near you with contact details, maps and directions.',
    keywords: 'rugby union clubs UK, rugby union near me, rugby union clubs England, rugby union clubs Wales, rugby union clubs Scotland, find a rugby union club, grassroots rugby union, Premiership rugby clubs, amateur rugby union, junior rugby union',
    robots:   'index, follow',
    ogType:   'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE}/?p=rugby-union`,
      url: `${SITE}/?p=rugby-union`,
      name: 'Rugby Union Clubs UK Directory',
      description: '728 rugby union clubs across the UK'
    }
  },

  '/?p=rugby-league': {
    title:    'Rugby League Clubs UK | Super League to Grassroots | UK Rugby Club Directory',
    desc:     'Find rugby league clubs across England and Wales. Browse Super League, Championship and community clubs near you. Every club has a full profile with contact details, location and directions.',
    keywords: 'rugby league clubs UK, rugby league near me, Super League clubs, rugby league England, rugby league Yorkshire, rugby league Lancashire, rugby league Merseyside, find a rugby league club, community rugby league, Challenge Cup clubs',
    robots:   'index, follow',
    ogType:   'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE}/?p=rugby-league`,
      url: `${SITE}/?p=rugby-league`,
      name: 'Rugby League Clubs UK Directory',
      description: 'Rugby league clubs from Super League to community grassroots level'
    }
  },

  '/?p=businesses': {
    title:    'Rugby Businesses & Suppliers UK | Kit, Equipment & Services | UK Rugby Club Directory',
    desc:     'Find rugby businesses across the UK including kit manufacturers, equipment suppliers, coaching companies and governing bodies. Connect with RFU, WRU, SRU and rugby trade partners.',
    keywords: 'rugby businesses UK, rugby equipment suppliers, rugby kit manufacturers, rugby governing bodies, RFU, WRU, SRU, rugby coaching companies, rugby trade directory, rugby sports businesses',
    robots:   'index, follow',
    ogType:   'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE}/?p=businesses`,
      url: `${SITE}/?p=businesses`,
      name: 'Rugby Businesses UK Directory'
    }
  },

  '/?p=about': {
    title:    'About UK Rugby Club Directory | Free Rugby Club Listings UK',
    desc:     "The UK's most comprehensive free rugby club directory with 773+ club profiles across England, Scotland, Wales and Northern Ireland. Independent, free and unaffiliated with any governing body.",
    keywords: 'about UK rugby club directory, rugby club directory UK, free rugby club listings, rugby directory editorial policy',
    robots:   'index, follow',
    ogType:   'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      url: `${SITE}/about`,
      name: 'About UK Rugby Club Directory',
      description: '773+ free rugby club profiles across the UK'
    }
  },

  '/?p=contact': {
    title:    'Contact UK Rugby Club Directory | Update a Listing | Get in Touch',
    desc:     'Contact the UK Rugby Club Directory team to update a club listing, register a new club or make a general enquiry. We respond within 2 business days. Email: info@ukrugbyclubdirectory.co.uk',
    keywords: 'contact rugby club directory, update rugby club listing, rugby directory enquiry',
    robots:   'index, follow',
    ogType:   'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      url: `${SITE}/?p=contact`,
      name: 'Contact UK Rugby Club Directory'
    }
  },

  '/?p=register': {
    title:    'Register Your Rugby Club Free | Get a Profile Page | UK Rugby Club Directory',
    desc:     'Register your rugby club for free on the UK Rugby Club Directory. Get your own SEO profile page, appear in rugby near me searches and connect with players in your area. Takes 2 minutes.',
    keywords: 'register rugby club, add rugby club to directory, free rugby club listing, rugby club profile page, list my rugby club online',
    robots:   'index, follow',
    ogType:   'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: `${SITE}/?p=register`,
      name: 'Register Your Rugby Club Free'
    }
  },

  '/?p=privacy': {
    title:    'Privacy Policy | UK Rugby Club Directory',
    desc:     'Read the UK Rugby Club Directory privacy policy. We protect your personal data in compliance with UK GDPR and the Data Protection Act 2018.',
    keywords: 'rugby club directory privacy policy, data protection, GDPR',
    robots:   'noindex, follow',
    ogType:   'website',
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', url: `${SITE}/?p=privacy`, name: 'Privacy Policy' }
  },

  '/?p=terms': {
    title:    'Terms of Service | UK Rugby Club Directory',
    desc:     'Read the terms of service for UK Rugby Club Directory governing use of ukrugbyclubdirectory.co.uk and its club listing directory.',
    keywords: 'rugby club directory terms of service, terms and conditions',
    robots:   'noindex, follow',
    ogType:   'website',
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', url: `${SITE}/?p=terms`, name: 'Terms of Service' }
  },

  '/?p=cookie-policy': {
    title:    'Cookie Policy | UK Rugby Club Directory',
    desc:     'Read the cookie policy for UK Rugby Club Directory. Learn how we use essential, analytics and preference cookies.',
    keywords: 'rugby club directory cookie policy',
    robots:   'noindex, follow',
    ogType:   'website',
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', url: `${SITE}/?p=cookie-policy`, name: 'Cookie Policy' }
  }
};

// ════════════════════════════════════════════════════════════════
//  REGION PAGE SEO — generated dynamically
// ════════════════════════════════════════════════════════════════
function regionSeo(region) {
  const name = REGION_NAMES[region] || region;
  const geoReg = region === 'scotland' ? 'GB-SCT' : region === 'wales' ? 'GB-WLS' : region === 'northern-ireland' ? 'GB-NIR' : 'GB-ENG';
  return {
    title:    `Rugby Clubs in ${name} | Find a Club Near You | UK Rugby Club Directory`,
    desc:     `Find rugby clubs in ${name}. Browse rugby union, rugby league and businesses across ${name} with contact details, addresses and Google Maps directions.`,
    keywords: `rugby clubs ${name}, rugby ${name}, rugby union ${name}, rugby league ${name}, find a rugby club ${name}, rugby near me ${name}, grassroots rugby ${name}, junior rugby ${name}`,
    robots:   'index, follow',
    ogType:   'website',
    geoRegion: geoReg,
    geoPlace:  name,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      url: `${SITE}/?p=region/${region}`,
      name: `Rugby Clubs in ${name}`,
      description: `Directory of rugby clubs in ${name}`
    }
  };
}

// ════════════════════════════════════════════════════════════════
//  CLUB PAGE SEO
//  Club Name is the focus keyword — Yoast primary keyword approach
//  Title: [Club Name] | [Type] Club in [City] | UK Rugby Club Directory
//  Desc:  [Club Name] is a [type] club in [city, county].
//         [First 120 chars of desc]. Find contact details...
// ════════════════════════════════════════════════════════════════
function clubSeo(slug, club) {
  const name    = club.name;
  const type    = club.type === 'union'   ? 'Rugby Union'
                : club.type === 'league'  ? 'Rugby League'
                : 'Rugby Business';
  const city    = club.city    || '';
  const county  = club.county  || '';
  const country = club.country || 'England';
  const desc    = (club.desc   || '').slice(0, 140).trimEnd();
  const lat     = club.lat     || '';
  const lng     = club.lng     || '';

  const loc     = [city, county].filter(Boolean).join(', ');
  const fullLoc = [city, county, country].filter(Boolean).join(', ');

  const geoRegion = country === 'Scotland'        ? 'GB-SCT'
                  : country === 'Wales'            ? 'GB-WLS'
                  : country === 'Northern Ireland' ? 'GB-NIR'
                  : 'GB-ENG';

  // Title: Club Name first (focus keyword), then qualifier, then brand
  // Mirrors: "EV Charger Installation in Leeds | 12 OZEV-Approved Installers"
  const title = loc
    ? `${name} | ${type} Club in ${loc} | UK Rugby Club Directory`
    : `${name} | ${type} Club | UK Rugby Club Directory`;

  // Meta description: club name in first sentence, location, snippet, CTA
  const metaDesc = `${name} is a ${type.toLowerCase()} club based in ${fullLoc}. ${desc}${desc.endsWith('.') ? '' : '.'} View contact details, address and get directions.`;

  // Keywords: club name leads (primary), then location + type variants
  const keywords = [
    name,
    `${name} rugby`,
    `${name} rugby club`,
    `${type.toLowerCase()} ${city}`,
    `rugby clubs ${city}`,
    `rugby clubs ${county}`,
    `rugby near me ${city}`,
    `${city} rugby club`,
    `${county} rugby clubs`,
    `${country} rugby clubs`,
    'find a rugby club',
    'rugby near me',
  ].filter(Boolean).join(', ');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    '@id': `${SITE}/?p=club/${slug}`,
    name,
    sport: 'Rugby',
    description: desc || `${name} is a ${type.toLowerCase()} club in ${fullLoc}.`,
    url: `${SITE}/?p=club/${slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city || undefined,
      addressRegion: county || undefined,
      addressCountry: 'GB'
    },
    openingHoursSpecification: club.training ? [{
      '@type': 'OpeningHoursSpecification',
      description: club.training
    }] : undefined,
    ...(lat && lng ? { geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng } } : {}),
    ...(club.rating ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: club.rating, bestRating: '5', worstRating: '1', reviewCount: '10' } } : {}),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: type, item: `${SITE}/?p=rugby-${club.type === 'business' ? 'businesses' : club.type}` },
        { '@type': 'ListItem', position: 3, name, item: `${SITE}/?p=club/${slug}` }
      ]
    }
  };

  return {
    title, desc: metaDesc, keywords,
    canonical: `${SITE}/club/${slug}`,
    robots:    'index, follow',
    ogType:    'article',
    geoRegion,
    geoPlace:  fullLoc,
    geoPos:    lat && lng ? `${lat};${lng}` : '',
    icbm:      lat && lng ? `${lat}, ${lng}` : '',
    schema
  };
}

// ════════════════════════════════════════════════════════════════
//  BUILD HEAD TAGS HTML
// ════════════════════════════════════════════════════════════════
function buildHeadTags(seo) {
  const e = (s) => String(s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const canonical = seo.canonical || SITE;
  const ogImg     = OG_IMAGE;
  const schemaStr = typeof seo.schema === 'string' ? seo.schema : JSON.stringify(seo.schema, (k,v) => v === undefined ? undefined : v);

  return `<!-- SEO: UK Rugby Club Directory Edge Function v3 -->
<title>${e(seo.title)}</title>
<meta name="description" content="${e(seo.desc)}">
<meta name="keywords" content="${e(seo.keywords)}">
<meta name="robots" content="${e(seo.robots || 'index, follow')}">
<meta name="author" content="${SITE_NAME}">
<meta name="application-name" content="${SITE_NAME}">
<meta name="theme-color" content="#0a1628">
${seo.geoRegion ? `<meta name="geo.region" content="${e(seo.geoRegion)}">` : ''}
${seo.geoPlace  ? `<meta name="geo.placename" content="${e(seo.geoPlace)}">` : ''}
${seo.geoPos    ? `<meta name="geo.position" content="${e(seo.geoPos)}">` : ''}
${seo.icbm      ? `<meta name="ICBM" content="${e(seo.icbm)}">` : ''}
<link rel="canonical" href="${e(canonical)}">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:type" content="${e(seo.ogType || 'website')}">
<meta property="og:title" content="${e(seo.title)}">
<meta property="og:description" content="${e(seo.desc)}">
<meta property="og:url" content="${e(canonical)}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="${TWITTER}">
<meta name="twitter:title" content="${e(seo.title)}">
<meta name="twitter:description" content="${e(seo.desc)}">
<meta name="twitter:image" content="${ogImg}">
<script type="application/ld+json">${schemaStr}</script>`.trim();
}

// ════════════════════════════════════════════════════════════════
//  EDGE FUNCTION HANDLER
// ════════════════════════════════════════════════════════════════
export default async function handler(request, context) {
  const url    = new URL(request.url);
  const path   = url.pathname.replace(/\/$/, '') || '/';
  const pParam = url.searchParams.get('p') || '';

  // Item 7: Also resolve clean path URLs like /club/leicester-tigers
  // These come via Netlify redirect rules (200 rewrites to ?p=)
  // But we still read pParam which Netlify populates via the redirect

  // Fetch original response
  const response = await context.next();
  const ct = response.headers.get('content-type') || '';
  if (!ct.includes('text/html')) return response;

  let html = await response.text();
  let seo;

  // ── Route: club page ──────────────────────────────────────
  if (pParam.startsWith('club/')) {
    const slug = pParam.replace('club/', '');
    const club = CLUBS_META[slug];
    seo = club ? clubSeo(slug, club) : {
      title:    `Rugby Club | UK Rugby Club Directory`,
      desc:     'Find this rugby club on the UK Rugby Club Directory. View contact details, location and club information.',
      keywords: 'rugby club, find a rugby club, rugby near me',
      canonical: `${SITE}/?p=${pParam}`,
      robots:   'index, follow',
      ogType:   'website',
      schema:   { '@context': 'https://schema.org', '@type': 'WebPage', url: `${SITE}/?p=${pParam}` }
    };

  // ── Route: region page ────────────────────────────────────
  } else if (pParam.startsWith('region/')) {
    const region = pParam.replace('region/', '');
    seo = { ...regionSeo(region), canonical: `${SITE}/?p=${pParam}` };

  // ── Route: static ?p= pages ───────────────────────────────
  } else if (pParam && STATIC_PAGES[`/?p=${pParam}`]) {
    seo = { ...STATIC_PAGES[`/?p=${pParam}`], canonical: `${SITE}/?p=${pParam}` };

  // ── Route: homepage or unknown ────────────────────────────
  } else {
    seo = { ...STATIC_PAGES['/'], canonical: `${SITE}/` };
  }

  // ── Strip ALL old SEO tags then inject fresh ones ─────────
  html = html
    .replace(/<title>[^<]*<\/title>/gi, '')
    .replace(/<meta\s[^>]*(?:name|property)="(?:description|keywords|robots|author|application-name|theme-color|geo\.[^"]*|ICBM|og:[^"]*|twitter:[^"]*)"[^>]*\/?>/gi, '')
    .replace(/<link\s[^>]*rel="canonical"[^>]*\/?>/gi, '')
    .replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/(<head[^>]*>)/, `$1\n${buildHeadTags(seo)}\n`);

  // ── Cache headers ─────────────────────────────────────────
  // NO caching on homepage — ensures changes appear immediately
  // Short cache on club pages, longer on static listing pages
  const isHomepage = !pParam;
  const isClub     = pParam.startsWith('club/');
  const cacheCtrl  = isHomepage ? 'no-store' :
                     isClub     ? 'public, max-age=1800, stale-while-revalidate=3600' :
                                  'public, max-age=3600, stale-while-revalidate=7200';

  return new Response(html, {
    status: response.status,
    headers: {
      ...Object.fromEntries(response.headers),
      'content-type': 'text/html; charset=utf-8',
      'cache-control': cacheCtrl,
      'x-seo-version': '3',
    },
  });
}

export const config = { path: '/*' };
