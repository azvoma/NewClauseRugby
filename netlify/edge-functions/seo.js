// ════════════════════════════════════════════════════════════════
//  UK Rugby Club Directory — Netlify Edge Function
//  File: netlify/edge-functions/seo.js
//
//  Intercepts every page request and injects fully unique,
//  Yoast-style SEO into <head> BEFORE the browser receives it.
//
//  Every page gets its own:
//    - <title>              (Focus Keyword first, like Yoast)
//    - <meta name="description">
//    - <meta name="keywords">
//    - <meta name="robots">
//    - <link rel="canonical">
//    - <meta property="og:*">  (Open Graph for Facebook/LinkedIn)
//    - <meta name="twitter:*"> (Twitter Card)
//    - <script type="application/ld+json"> (Schema.org)
//    - geo.* tags for location pages
//
//  URL structure (path-based, real URLs):
//    /                       Homepage
//    /rugby-union            Rugby Union directory
//    /rugby-league           Rugby League directory
//    /rugby-joints           Business directory
//    /club/[slug]            Individual club profile
//    /contact-us             Contact page
//    /register               Register a club
//    /privacy-policy         Privacy policy
//    /terms-of-service       Terms
//    /cookie-policy          Cookie policy
//
//  Club SEO uses the CLUB NAME as the primary focus keyword,
//  exactly as Yoast recommends.
// ════════════════════════════════════════════════════════════════

import CLUBS_META from './clubs_meta.json' assert { type: 'json' };

const SITE      = 'https://ukrugbyclubdirectory.co.uk';
const SITE_NAME = 'The Rugby Club Directory';
const OG_IMAGE  = `${SITE}/og-social-share.jpg`;
const TWITTER   = '@RugbyClubDir';

// ── Yoast-style title builder ─────────────────────────────────
// Pattern: [Focus Keyword] - [Secondary] | [Site Name]
function yoastTitle(focus, secondary, siteName) {
  siteName = siteName || SITE_NAME;
  if (secondary) return `${focus} - ${secondary} | ${siteName}`;
  return `${focus} | ${siteName}`;
}

// ── Static page SEO definitions ──────────────────────────────
// Modelled on what Yoast would produce: focus keyword leads title & desc
const STATIC_PAGES = {

  '/': {
    focusKw:   'Rugby Near Me',
    title:     'Rugby Near Me - Find a Rugby Club Near You | The Rugby Club Directory',
    desc:      'Rugby near me - find a rugby club in your area with the UK\'s most comprehensive rugby club directory. Search rugby clubs near me across England, Scotland, Wales and Northern Ireland. Find a rugby club today.',
    keywords:  'rugby near me, find a rugby club, rugby clubs near me, rugby club near me, local rugby clubs, rugby union near me, rugby league near me, find rugby clubs, rugby teams near me, rugby club directory UK, grassroots rugby, junior rugby clubs, women\'s rugby near me',
    robots:    'index, follow',
    ogType:    'website',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE}/#website`,
          url: `${SITE}/`,
          name: 'The Rugby Club Directory',
          description: 'The UK\'s most comprehensive rugby club directory',
          potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: `${SITE}/search?q={search_term_string}` },
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@type': 'Organization',
          '@id': `${SITE}/#organization`,
          name: 'The Rugby Club Directory',
          url: `${SITE}/`,
          logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
          contactPoint: { '@type': 'ContactPoint', email: 'andrew@therugbyclubdirectory.co.uk', contactType: 'customer service' }
        },
        {
          '@type': 'WebPage',
          '@id': `${SITE}/#homepage`,
          url: `${SITE}/`,
          name: 'Rugby Near Me - Find a Rugby Club Near You',
          description: 'The UK\'s most comprehensive rugby club directory connecting players with clubs across all four nations.',
          isPartOf: { '@id': `${SITE}/#website` }
        }
      ]
    }
  },

  '/rugby-union': {
    focusKw:   'Rugby Union Clubs UK',
    title:     'Rugby Union Clubs UK - Find London Rugby Teams & Local Clubs Near You | The Rugby Club Directory',
    desc:      'Find rugby union clubs UK-wide including London rugby teams, Premiership clubs and grassroots union teams. Search rugby union clubs near me from elite to community level across England, Scotland, Wales and Northern Ireland.',
    keywords:  'rugby union clubs UK, rugby union near me, London rugby teams, rugby union clubs near me, Premiership rugby clubs, grassroots rugby union, rugby union England, rugby union Wales, rugby union Scotland, find a rugby union club, amateur rugby union, women\'s rugby union, junior rugby union clubs',
    robots:    'index, follow',
    ogType:    'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE}/rugby-union#collectionpage`,
      url: `${SITE}/rugby-union`,
      name: 'Rugby Union Clubs UK Directory',
      description: 'Complete directory of rugby union clubs across the UK including London rugby teams, Premiership clubs and grassroots community teams',
      isPartOf: { '@id': `${SITE}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Rugby Union', item: `${SITE}/rugby-union` }
        ]
      }
    }
  },

  '/rugby-league': {
    focusKw:   'Rugby League Teams Near Me',
    title:     'Rugby League Clubs UK - Find Teams Near You from Super League to Grassroots | The Rugby Club Directory',
    desc:      'Find rugby league teams near me with our UK-wide directory. Search rugby league clubs near me from Super League champions to community grassroots teams. Discover rugby league teams UK-wide by location or club name.',
    keywords:  'rugby league teams near me, rugby league clubs near me, Super League clubs, rugby league UK, rugby league teams UK, find rugby league clubs, rugby league near me, community rugby league, rugby league Yorkshire, rugby league Lancashire, rugby league Merseyside, Cumbria rugby league, women\'s rugby league',
    robots:    'index, follow',
    ogType:    'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE}/rugby-league#collectionpage`,
      url: `${SITE}/rugby-league`,
      name: 'Rugby League Clubs UK Directory',
      description: 'Complete directory of rugby league clubs across the UK from Super League to community grassroots level',
      isPartOf: { '@id': `${SITE}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Rugby League', item: `${SITE}/rugby-league` }
        ]
      }
    }
  },

  '/rugby-joints': {
    focusKw:   'Rugby Businesses UK',
    title:     'Rugby Businesses UK - Suppliers, Kit Manufacturers & Services | The Rugby Club Directory',
    desc:      'Find rugby businesses UK-wide including kit suppliers, equipment manufacturers, coaching services and rugby governing bodies. Connect with businesses that support rugby clubs near me and the wider rugby community.',
    keywords:  'rugby businesses UK, rugby equipment suppliers, rugby kit manufacturers, rugby coaching services, rugby suppliers, rugby governing bodies, RFU, WRU, SRU, rugby sports medicine, rugby media, rugby sponsorship, rugby trade directory UK',
    robots:    'index, follow',
    ogType:    'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE}/rugby-joints#collectionpage`,
      url: `${SITE}/rugby-joints`,
      name: 'Rugby Businesses UK Directory',
      description: 'Directory of rugby businesses, suppliers, kit manufacturers and services across the UK',
      isPartOf: { '@id': `${SITE}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Rugby Joints', item: `${SITE}/rugby-joints` }
        ]
      }
    }
  },

  '/contact-us': {
    focusKw:   'Contact The Rugby Club Directory',
    title:     'Contact The Rugby Club Directory UK - Get In Touch With Our Team | The Rugby Club Directory',
    desc:      'Contact The Rugby Club Directory UK team. Update your club listing, register a new club, report an error or make an enquiry. We respond to all messages within 24-48 hours. Email: andrew@therugbyclubdirectory.co.uk',
    keywords:  'contact rugby club directory, rugby club listing update, register rugby club, rugby directory enquiry, The Rugby Club Directory contact, uk rugby directory support',
    robots:    'index, follow',
    ogType:    'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${SITE}/contact-us#contactpage`,
      url: `${SITE}/contact-us`,
      name: 'Contact The Rugby Club Directory',
      description: 'Get in touch with The Rugby Club Directory UK team',
      isPartOf: { '@id': `${SITE}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Contact Us', item: `${SITE}/contact-us` }
        ]
      }
    }
  },

  '/register': {
    focusKw:   'Register Your Rugby Club',
    title:     'Register Your Rugby Club - Free Listing for UK Rugby Clubs | The Rugby Club Directory',
    desc:      'Register your rugby club for free on The Rugby Club Directory UK. Get your own profile page, appear in rugby near me searches and connect with players in your area. Free registration for all UK rugby clubs.',
    keywords:  'register rugby club, add rugby club to directory, free rugby club listing, rugby club profile, list my rugby club, rugby club registration UK, get found in rugby near me, rugby club directory listing',
    robots:    'index, follow',
    ogType:    'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE}/register#webpage`,
      url: `${SITE}/register`,
      name: 'Register Your Rugby Club - Free Listing',
      description: 'Free rugby club registration on The Rugby Club Directory UK',
      isPartOf: { '@id': `${SITE}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Register', item: `${SITE}/register` }
        ]
      }
    }
  },

  '/privacy-policy': {
    focusKw:   'Privacy Policy',
    title:     'Privacy Policy - The Rugby Club Directory UK | Data Protection & GDPR',
    desc:      'Read The Rugby Club Directory UK privacy policy. We are committed to protecting your personal data in full compliance with UK GDPR and the Data Protection Act 2018.',
    keywords:  'The Rugby Club Directory privacy policy, rugby directory data protection, GDPR rugby website, personal data rugby club directory',
    robots:    'noindex, follow',
    ogType:    'website',
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', url: `${SITE}/privacy-policy`, name: 'Privacy Policy - The Rugby Club Directory' }
  },

  '/terms-of-service': {
    focusKw:   'Terms of Service',
    title:     'Terms of Service - The Rugby Club Directory UK | Terms & Conditions',
    desc:      'Read the terms of service for The Rugby Club Directory UK. These terms govern your use of therugbyclubdirectory.co.uk and our club listing directory services.',
    keywords:  'The Rugby Club Directory terms of service, rugby directory terms and conditions, rugby club directory legal',
    robots:    'noindex, follow',
    ogType:    'website',
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', url: `${SITE}/terms-of-service`, name: 'Terms of Service - The Rugby Club Directory' }
  },

  '/cookie-policy': {
    focusKw:   'Cookie Policy',
    title:     'Cookie Policy - The Rugby Club Directory UK | How We Use Cookies',
    desc:      'Read the cookie policy for The Rugby Club Directory UK. Learn how we use essential, analytics and preference cookies to improve your browsing experience.',
    keywords:  'The Rugby Club Directory cookie policy, cookies rugby directory, how we use cookies rugby website',
    robots:    'noindex, follow',
    ogType:    'website',
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', url: `${SITE}/cookie-policy`, name: 'Cookie Policy - The Rugby Club Directory' }
  }
};

// ── Club page SEO generator ───────────────────────────────────
// Focus keyword = Club Name (Yoast primary keyword)
// Title, desc, keywords all built around club name + location
function clubSeo(slug, club) {
  const name    = club.name;
  const type    = club.type === 'union'   ? 'Rugby Union'
                : club.type === 'league'  ? 'Rugby League'
                : 'Rugby Business';
  const city    = club.city    || '';
  const county  = club.county  || '';
  const country = club.country || 'England';
  const region  = club.region  || '';
  const desc    = (club.desc   || '').slice(0, 155).trimEnd();
  const rating  = club.rating  || '';
  const lat     = club.lat     || '';
  const lng     = club.lng     || '';

  const loc     = [city, county].filter(Boolean).join(', ');
  const fullLoc = [city, county, country].filter(Boolean).join(', ');

  // Geo region code
  const geoRegion = country === 'Scotland'        ? 'GB-SCT'
                  : country === 'Wales'            ? 'GB-WLS'
                  : country === 'Northern Ireland' ? 'GB-NIR'
                  : 'GB-ENG';

  // ── Focus keyword: Club Name (Yoast style — keyword first in title) ──
  const focusKw = name;

  // ── Title: [Club Name] - [Type] Club in [City] | Site ──
  const title = loc
    ? `${name} - ${type} Club in ${loc} | The Rugby Club Directory`
    : `${name} - ${type} Club | The Rugby Club Directory`;

  // ── Meta description: club name prominent, location, description snippet ──
  const metaDesc = `${name} is a ${type.toLowerCase()} club based in ${fullLoc}. ${desc}${desc.endsWith('.') ? '' : '.'} Find contact details, directions and club information.`;

  // ── Keywords: club name leads, then location variants ──
  const keywords = [
    name,                                              // Primary: Club Name
    `${name} rugby club`,                              // Club Name + rugby club
    `${name} ${city}`,                                 // Club Name + city
    `${type.toLowerCase()} clubs ${city}`,             // Type + city
    `${type.toLowerCase()} clubs ${county}`,           // Type + county
    `rugby near me ${city}`,                           // Rugby near me + city
    `find a rugby club ${city}`,                       // Find a rugby club + city
    `rugby clubs near me ${county}`,                   // Near me + county
    `${type.toLowerCase()} ${country}`,                // Type + country
    `${city} rugby`,                                   // City + rugby
    `${county} rugby clubs`,                           // County + rugby clubs
    country + ' rugby clubs',                          // Country + rugby clubs
    type.toLowerCase() + ' club directory',            // Type + directory
    'rugby near me',                                   // Generic
    'The Rugby Club Directory'                         // Brand
  ].filter(Boolean).join(', ');

  // ── Schema.org: SportsOrganization (most specific type) ──
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    '@id': `${SITE}/club/${slug}#sportsorg`,
    name,
    sport: 'Rugby',
    description: desc || `${name} is a ${type.toLowerCase()} club in ${fullLoc}.`,
    url: `${SITE}/club/${slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city || undefined,
      addressRegion: county || undefined,
      addressCountry: 'GB'
    },
    ...(lat && lng ? { geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng } } : {}),
    ...(rating ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: rating, bestRating: '5', worstRating: '1', reviewCount: '10' } } : {}),
    parentOrganization: { '@type': 'SportsOrganization', name: 'The Rugby Club Directory', url: SITE },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: type === 'Rugby Business' ? 'Rugby Joints' : type, item: `${SITE}/${type === 'Rugby Union' ? 'rugby-union' : type === 'Rugby League' ? 'rugby-league' : 'rugby-joints'}` },
        { '@type': 'ListItem', position: 3, name, item: `${SITE}/club/${slug}` }
      ]
    }
  };

  return {
    focusKw, title, desc: metaDesc, keywords,
    canonical: `${SITE}/club/${slug}`,
    robots: 'index, follow',
    ogType: 'article',
    geoRegion,
    geoPlace: fullLoc,
    geoPos:   lat && lng ? `${lat};${lng}` : '',
    icbm:     lat && lng ? `${lat}, ${lng}` : '',
    schema
  };
}

// ── Build complete <head> injection HTML ──────────────────────
function buildHeadTags(seo) {
  const e = s => String(s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const canonical = seo.canonical || SITE;
  const ogImg     = seo.ogImage   || OG_IMAGE;
  const schemaStr = typeof seo.schema === 'string' ? seo.schema : JSON.stringify(seo.schema, (k,v) => v === undefined ? undefined : v);

  return `<!-- ✅ SEO by Netlify Edge Function — unique per page -->
<title>${e(seo.title)}</title>
<meta name="description" content="${e(seo.desc)}">
<meta name="keywords" content="${e(seo.keywords)}">
<meta name="robots" content="${e(seo.robots || 'index, follow')}">
<meta name="author" content="The Rugby Club Directory">
<meta name="application-name" content="The Rugby Club Directory">
<meta name="theme-color" content="#1a3c6e">
${seo.geoRegion ? `<meta name="geo.region" content="${e(seo.geoRegion)}">` : ''}
${seo.geoPlace  ? `<meta name="geo.placename" content="${e(seo.geoPlace)}">` : ''}
${seo.geoPos    ? `<meta name="geo.position" content="${e(seo.geoPos)}">` : ''}
${seo.icbm      ? `<meta name="ICBM" content="${e(seo.icbm)}">` : ''}
<link rel="canonical" href="${e(canonical)}">
<meta property="og:site_name" content="The Rugby Club Directory">
<meta property="og:type" content="${e(seo.ogType || 'website')}">
<meta property="og:title" content="${e(seo.title)}">
<meta property="og:description" content="${e(seo.desc)}">
<meta property="og:url" content="${e(canonical)}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${e(seo.title)}">
<meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="${TWITTER}">
<meta name="twitter:title" content="${e(seo.title)}">
<meta name="twitter:description" content="${e(seo.desc)}">
<meta name="twitter:image" content="${ogImg}">
<script type="application/ld+json">${schemaStr}</script>`.trim();
}

// ── Main edge function handler ────────────────────────────────
export default async function handler(request, context) {
  const url      = new URL(request.url);
  const path     = url.pathname.replace(/\/$/, '') || '/';

  // ── Fetch the original response from Netlify ──
  const response = await context.next();
  const ct       = response.headers.get('content-type') || '';
  if (!ct.includes('text/html')) return response;

  let html = await response.text();
  let seo;

  // ── Route: individual club page /club/[slug] ──────────────
  if (path.startsWith('/club/')) {
    const slug = path.replace('/club/', '');
    const club = CLUBS_META[slug];

    if (club) {
      seo = clubSeo(slug, club);
    } else {
      // Club not in meta lookup — fallback title at minimum
      seo = {
        title:    `Rugby Club Profile | The Rugby Club Directory`,
        desc:     `Find this rugby club on The Rugby Club Directory UK. View contact details, location and club information.`,
        keywords: `rugby club, find a rugby club, rugby near me, The Rugby Club Directory`,
        canonical: `${SITE}${path}`,
        robots:   'index, follow',
        ogType:   'website',
        schema:   { '@context': 'https://schema.org', '@type': 'WebPage', url: `${SITE}${path}`, name: 'Rugby Club Profile' }
      };
    }

  // ── Route: static pages ───────────────────────────────────
  } else {
    const staticSeo = STATIC_PAGES[path] || STATIC_PAGES['/'];
    seo = {
      ...staticSeo,
      canonical: `${SITE}${path === '/' ? '' : path}`
    };
  }

  // ── Inject SEO into <head> ────────────────────────────────
  const headTags = buildHeadTags(seo);

  // Remove ALL existing title, meta, and canonical tags from head
  // so we don't get duplicates
  html = html
    // Remove existing <title>
    .replace(/<title>[^<]*<\/title>/gi, '')
    // Remove existing meta description, keywords, robots, author, application-name,
    // geo.*, og:*, twitter:*, theme-color
    .replace(/<meta\s+(?:name|property)="(?:description|keywords|robots|author|application-name|theme-color|geo\.[a-z.]+|ICBM|og:[a-z:]+|twitter:[a-z:]+)[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+(?:property|name)="(?:og:[^"]+|twitter:[^"]+)"[^>]*>/gi, '')
    // Remove existing canonical
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '')
    // Remove existing ld+json schema scripts
    .replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    // Now insert fresh tags right after <head>
    .replace(/(<head[^>]*>)/, `$1\n${headTags}\n`);

  return new Response(html, {
    status: response.status,
    headers: {
      ...Object.fromEntries(response.headers),
      'content-type': 'text/html; charset=utf-8',
      'x-seo-injected': 'true',
      'cache-control': path.startsWith('/club/')
        ? 'public, max-age=3600, stale-while-revalidate=86400'
        : 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}

export const config = { path: '/*' };
