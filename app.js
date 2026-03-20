'use strict';
// ════════════════════════════════════════════════════════════════
//  UK RUGBY CLUB DIRECTORY — app.js
//  Hash-based SPA: #home | #rugby-union | #club/slug | etc.
//  773 clubs from CSV + hardcoded featured elite clubs
//  Each club page: unique SEO, full profile, nearby clubs, map
// ════════════════════════════════════════════════════════════════

// ── HARDCODED ELITE / FEATURED CLUBS ─────────────────────────────
const ELITE = [
  {id:1,name:'Leicester Tigers',type:'union',country:'England',region:'midlands',city:'Leicester',county:'Leicestershire',desc:'One of England\'s most decorated rugby clubs with 10 Premiership titles. Founded in 1880, playing at Welford Road Stadium. A cornerstone of English rugby with legendary players and a remarkable trophy-laden history.',website:'https://www.leicestertigers.com',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Leicester_Tigers_logo.svg/150px-Leicester_Tigers_logo.svg.png',featured:true,rating:'4.6',phone:'+44 116 319 8888',email:'enquiries@tigers.co.uk',address:'Aylestone Rd, Leicester LE2 7TR',lat:'52.6186',lng:'-1.1341',slug:'leicester-tigers'},
  {id:2,name:'Saracens',type:'union',country:'England',region:'london',city:'London',county:'Greater London',desc:'Multiple Premiership and European Champions Cup winners. Based at StoneX Stadium, Saracens are one of the most successful clubs in the history of English and European rugby union.',website:'https://www.saracens.com',logo:'https://upload.wikimedia.org/wikipedia/en/3/3f/Saracens_F.C._Logo.svg',featured:true,rating:'4.5',phone:'+44 208 455 8181',email:'',address:'StoneX Stadium, Greenlands Lane, London NW4 1RL',lat:'51.5865',lng:'-0.2326',slug:'saracens'},
  {id:3,name:'Harlequins',type:'union',country:'England',region:'london',city:'Twickenham',county:'Greater London',desc:'One of rugby\'s founding clubs based at The Stoop. Famous for distinctive quartered jerseys and free-flowing attacking rugby. Multiple Premiership title winners with a loyal London fanbase.',website:'https://www.quins.co.uk',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/Harlequins_crest.svg/150px-Harlequins_crest.svg.png',featured:true,rating:'4.5',phone:'+44 208 410 6000',email:'',address:'The Stoop, Langhorn Drive, Twickenham TW2 7SX',lat:'51.4513',lng:'-0.3398',slug:'harlequins'},
  {id:4,name:'Northampton Saints',type:'union',country:'England',region:'midlands',city:'Northampton',county:'Northamptonshire',desc:'Premiership club at Franklin\'s Gardens with passionate support and rich heritage in English rugby. Founded in 1880, the Saints have been Premiership champions and consistent European contenders.',website:'https://www.northamptonsaints.co.uk',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Northampton_Saints_Logo.svg/150px-Northampton_Saints_Logo.svg.png',featured:true,rating:'4.4',phone:'+44 1604 751543',email:'',address:"Franklin's Gardens, Weedon Road, Northampton NN5 5BG",lat:'52.2443',lng:'-0.9126',slug:'northampton-saints'},
  {id:5,name:'Bath Rugby',type:'union',country:'England',region:'south-west',city:'Bath',county:'Somerset',desc:'Historic club at the Recreation Ground in the heart of Bath city centre. Multiple Premiership and European champions. One of England\'s most storied and successful rugby clubs.',website:'https://www.bathrugby.com',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Bath_Rugby_crest.svg/150px-Bath_Rugby_crest.svg.png',featured:true,rating:'4.4',phone:'+44 1225 325200',email:'',address:'Recreation Ground, Bath BA2 6PW',lat:'51.3808',lng:'-2.3601',slug:'bath-rugby'},
  {id:6,name:'Exeter Chiefs',type:'union',country:'England',region:'south-west',city:'Exeter',county:'Devon',desc:'Premiership champions at Sandy Park. Remarkable rise from National One to England\'s elite. Back-to-back Premiership and Champions Cup winners with passionate Devon support.',website:'https://www.exeterchiefs.co.uk',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Exeter_Chiefs_new_logo_2022.png/150px-Exeter_Chiefs_new_logo_2022.png',featured:true,rating:'4.6',phone:'+44 1392 411243',email:'',address:'Sandy Park, Exeter EX2 7NN',lat:'50.7230',lng:'-3.4895',slug:'exeter-chiefs'},
  {id:7,name:'Gloucester Rugby',type:'union',country:'England',region:'south-west',city:'Gloucester',county:'Gloucestershire',desc:'The Cherry and Whites at iconic Kingsholm. West Country club with fervent support and consistent top-flight Premiership pedigree for over a century of competitive rugby.',website:'https://www.gloucesterrugby.co.uk',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Gloucester_Rugby_%282018%29_logo.svg/150px-Gloucester_Rugby_%282018%29_logo.svg.png',featured:true,rating:'4.3',phone:'+44 1452 872000',email:'',address:'Kingsholm Road, Gloucester GL1 3AX',lat:'51.8696',lng:'-2.2421',slug:'gloucester-rugby'},
  {id:8,name:'Bristol Bears',type:'union',country:'England',region:'south-west',city:'Bristol',county:'Bristol',desc:'Premiership rugby at Ashton Gate Stadium. Ambitious club known for attacking play and a rapidly growing fanbase. One of the best-supported clubs in the South West of England.',website:'https://www.bristolbears.co.uk',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Bristol_Bears_logo.svg/150px-Bristol_Bears_logo.svg.png',featured:true,rating:'4.3',phone:'+44 117 963 0542',email:'',address:'Ashton Gate Stadium, Bristol BS3 2EJ',lat:'51.4400',lng:'-2.6200',slug:'bristol-bears'},
  {id:9,name:'Sale Sharks',type:'union',country:'England',region:'north-west',city:'Sale',county:'Greater Manchester',desc:'North West England\'s flagship Premiership club. The Sharks play at AJ Bell Stadium with a fiercely loyal Greater Manchester fanbase and a strong tradition in English rugby.',website:'https://www.salesharks.com',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Sale_Sharks_badge.svg/150px-Sale_Sharks_badge.svg.png',featured:true,rating:'4.3',phone:'+44 161 283 1861',email:'',address:'AJ Bell Stadium, Salford M5 5LJ',lat:'53.4872',lng:'-2.2913',slug:'sale-sharks'},
  {id:10,name:'Newcastle Falcons',type:'union',country:'England',region:'north-east',city:'Newcastle',county:'Tyne and Wear',desc:'The North East\'s professional rugby union club at Kingston Park. The Falcons have been champions and consistent performers, bringing top-level rugby to the passionate North East rugby community.',website:'https://www.newcastle-falcons.co.uk',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Newcastle_Falcons_badge.svg/150px-Newcastle_Falcons_badge.svg.png',featured:true,rating:'4.2',phone:'+44 191 214 5588',email:'',address:'Kingston Park, Newcastle NE13 8AF',lat:'55.0427',lng:'-1.6983',slug:'newcastle-falcons'},
  {id:11,name:'Cardiff RFC',type:'union',country:'Wales',region:'wales',city:'Cardiff',county:'South Glamorgan',desc:'One of the oldest and most famous rugby clubs in the world. The Cardiff Blue and Blacks have played at Cardiff Arms Park since 1876, beating the All Blacks in 1953.',website:'https://www.cardiffrfc.com',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Cardiff_RFC_logo.svg/150px-Cardiff_RFC_logo.svg.png',featured:true,rating:'4.4',phone:'+44 29 2082 6000',email:'',address:'Cardiff Arms Park, Cardiff CF10 1JA',lat:'51.4782',lng:'-3.1832',slug:'cardiff-rfc'},
  {id:12,name:'Edinburgh Rugby',type:'union',country:'Scotland',region:'scotland',city:'Edinburgh',county:'Lothian',desc:'Professional rugby union club representing Edinburgh and the Scottish Borders. Play at Murrayfield Stadium with a rich history in the URC (United Rugby Championship).',website:'https://www.edinburghrugby.org',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Edinburgh_Rugby_logo.svg/150px-Edinburgh_Rugby_logo.svg.png',featured:true,rating:'4.3',phone:'+44 131 346 5000',email:'',address:'Scottish Gas Murrayfield Stadium, Edinburgh EH12 5PJ',lat:'55.9466',lng:'-3.2415',slug:'edinburgh-rugby'},
  {id:13,name:'Glasgow Warriors',type:'union',country:'Scotland',region:'scotland',city:'Glasgow',county:'Lanarkshire',desc:'Professional rugby club at Scotstoun Stadium. The Warriors are one of the most successful clubs in Pro14/URC history with passionate support across Glasgow and the West of Scotland.',website:'https://www.glasgowwarriors.org',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Glasgow_Warriors_logo.svg/150px-Glasgow_Warriors_logo.svg.png',featured:true,rating:'4.4',phone:'+44 141 959 5555',email:'',address:'Scotstoun Stadium, 72 Danes Dr, Glasgow G14 9HD',lat:'55.8751',lng:'-4.3501',slug:'glasgow-warriors'},
  // League
  {id:50,name:'Leeds Rhinos',type:'league',country:'England',region:'yorkshire',city:'Leeds',county:'West Yorkshire',desc:'The most successful Super League club of the modern era. Eight Grand Final wins, multiple Challenge Cup victories, and home of legends Kevin Sinfield and Rob Burrow. Based at Headingley Stadium.',website:'https://www.leedsrhinos.com',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Leeds_Rhinos_badge.svg/150px-Leeds_Rhinos_badge.svg.png',featured:true,rating:'4.5',phone:'+44 113 278 6181',email:'',address:'Headingley Stadium, Leeds LS6 3BR',lat:'53.8194',lng:'-1.5797',slug:'leeds-rhinos'},
  {id:51,name:'Wigan Warriors',type:'league',country:'England',region:'north-west',city:'Wigan',county:'Greater Manchester',desc:'The most decorated club in rugby league history. Record Challenge Cup wins and multiple championship titles spanning over a century of rugby league greatness at the DW Stadium.',website:'https://www.wiganwarriors.com',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Wigan_Warriors_Badge_2019.svg/150px-Wigan_Warriors_Badge_2019.svg.png',featured:true,rating:'4.6',phone:'+44 1942 774000',email:'',address:'DW Stadium, Loire Drive, Wigan WN5 0UZ',lat:'53.5509',lng:'-2.6349',slug:'wigan-warriors'},
  {id:52,name:'St Helens RFC',type:'league',country:'England',region:'north-west',city:'St Helens',county:'Merseyside',desc:'Consecutive Super League champions and one of the most successful clubs in rugby league history. Playing at the Totally Wicked Stadium with a passionate and loyal fanbase.',website:'https://www.saintsrlfc.com',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/St_Helens_RFC_badge.svg/150px-St_Helens_RFC_badge.svg.png',featured:true,rating:'4.6',phone:'+44 1744 455052',email:'',address:'Totally Wicked Stadium, St Helens WA9 3AL',lat:'53.4427',lng:'-2.7463',slug:'st-helens-rfc'},
  {id:53,name:'Warrington Wolves',type:'league',country:'England',region:'north-west',city:'Warrington',county:'Cheshire',desc:'Historic Super League club at the Halliwell Jones Stadium. Multiple Challenge Cup winners with an impressive squad and an ambitious vision for the future of Warrington rugby league.',website:'https://www.warringtonwolves.com',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Warrington_Wolves_badge.svg/150px-Warrington_Wolves_badge.svg.png',featured:true,rating:'4.4',phone:'+44 1925 248888',email:'',address:'Halliwell Jones Stadium, Warrington WA2 7NE',lat:'53.4045',lng:'-2.5551',slug:'warrington-wolves'},
  {id:54,name:'Castleford Tigers',type:'league',country:'England',region:'yorkshire',city:'Castleford',county:'West Yorkshire',desc:'West Yorkshire Super League club with a passionate local fanbase. The Tigers have been consistent performers at the top level and are known for their exciting fast-paced style of play.',website:'https://www.castlefordtigers.com',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Castleford_Tigers.svg/150px-Castleford_Tigers.svg.png',featured:true,rating:'4.4',phone:'+44 1977 552674',email:'',address:'The Jungle, Wheldon Road, Castleford WF10 2SD',lat:'53.7250',lng:'-1.3510',slug:'castleford-tigers'},
  // Businesses
  {id:100,name:'England Rugby (RFU)',type:'business',country:'England',region:'london',city:'Twickenham',county:'Greater London',desc:'The official Rugby Football Union governing body for rugby union in England. Responsible for community and elite rugby development, including the England national team at Twickenham Stadium.',website:'https://www.englandrugby.com',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/England_rugby_union_badge.svg/150px-England_rugby_union_badge.svg.png',featured:true,rating:'',phone:'+44 208 892 2000',email:'',address:'Twickenham Stadium, 200 Whitton Road, Twickenham TW2 7BA',lat:'51.4559',lng:'-0.3415',slug:'england-rugby-rfu'},
  {id:101,name:'Gilbert Rugby',type:'business',country:'England',region:'east',city:'Cambridge',county:'Cambridgeshire',desc:'Official ball supplier to the Rugby World Cup and major competitions worldwide. The world\'s premier rugby equipment manufacturer since 1823, supplying balls to top international teams and clubs.',website:'https://www.gilbertrugby.com',logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Gilbert_Rugby.svg/150px-Gilbert_Rugby.svg.png',featured:true,rating:'',phone:'',email:'',address:'Cambridge, UK',lat:'52.2053',lng:'0.1218',slug:'gilbert-rugby'},
  {id:102,name:'Welsh Rugby Union',type:'business',country:'Wales',region:'wales',city:'Cardiff',county:'South Wales',desc:'Governing body for rugby union in Wales. Responsible for club, regional and international rugby development, and overseeing the Wales national team at the Principality Stadium, Cardiff.',website:'https://www.wru.wales',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Welsh_Rugby_Union.svg/150px-Welsh_Rugby_Union.svg.png',featured:true,rating:'',phone:'+44 29 2082 2474',email:'',address:'Principality Stadium, Cardiff CF10 1NS',lat:'51.4782',lng:'-3.1826',slug:'welsh-rugby-union'},
  {id:103,name:'Scottish Rugby Union',type:'business',country:'Scotland',region:'scotland',city:'Edinburgh',county:'Lothian',desc:'Governing body for rugby union in Scotland. Oversees all club, district and international rugby and administers the Scotland national team at Murrayfield, Edinburgh.',website:'https://www.scottishrugby.org',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Scottish_Rugby_Union_badge.svg/150px-Scottish_Rugby_Union_badge.svg.png',featured:true,rating:'',phone:'+44 131 346 5000',email:'',address:'Scottish Gas Murrayfield, Edinburgh EH12 5PJ',lat:'55.9466',lng:'-3.2415',slug:'scottish-rugby-union'},
];

// ── BUILD FULL DB ─────────────────────────────────────────────────
const DB = [...ELITE];
const seenNames = new Set(ELITE.map(c => c.name.toLowerCase().trim()));
const slugMap = {};
ELITE.forEach(c => { slugMap[c.slug] = c; });

if (typeof CSV_CLUBS !== 'undefined') {
  CSV_CLUBS.forEach(r => {
    const name = (r[1] || '').trim();
    if (!name || seenNames.has(name.toLowerCase())) return;
    seenNames.add(name.toLowerCase());
    const club = {
      id:r[0], name, type:r[2]||'union', country:r[3]||'England', region:r[4]||'england',
      city:r[5]||'', county:r[6]||'', desc:r[7]||`Rugby club based in ${r[5]||'the UK'}.`,
      website:r[8]||'', phone:r[9]||'', email:r[10]||'', logo:r[11]||'',
      lat:r[12]||'', lng:r[13]||'', rating:r[14]||'', slug:r[15]||'',
      address:r[16]||'', featured:false
    };
    DB.push(club);
    if (club.slug) slugMap[club.slug] = club;
  });
}

console.log(`✓ Directory: ${DB.length} clubs | ${DB.filter(c=>c.logo).length} with logos`);

// ── COUNT INIT ────────────────────────────────────────────────────
(function(){
  const u=DB.filter(c=>c.type==='union').length;
  const l=DB.filter(c=>c.type==='league').length;
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  set('h-total',DB.length); set('sn-total',DB.length);
  set('h-union',u); set('h-league',l);
  set('cat-u-cnt',u); set('cat-l-cnt',l);
  set('uf-all',u);
  ['England','Wales','Scotland','Northern Ireland'].forEach((n,i)=>{
    set(['uf-eng','uf-wal','uf-sco','uf-ni'][i], DB.filter(c=>c.type==='union'&&c.country===n).length);
  });
})();

// ════════════════════════════════════════════════════════════════
//  HASH ROUTING
//  Supports both:
//    #club/slug   (user navigation — hash never sent to server)
//    ?p=club/slug (crawler-friendly — edge function reads this)
//  go() sets the hash for instant client-side navigation AND
//  pushes a ?p= history state so crawlers can read the URL.
// ════════════════════════════════════════════════════════════════
function route() {
  // Prefer ?p= param (set by go()) over hash (for direct loads)
  const urlP  = new URLSearchParams(location.search).get('p') || '';
  const hashP = location.hash.replace('#','');
  const raw   = urlP || hashP || 'home';
  const parts = raw.split('/');
  const page  = parts[0];
  const param = parts.slice(1).join('/');
  document.querySelectorAll('.pg').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nl').forEach(l=>l.classList.remove('act'));

  if (page === 'club' && param) {
    renderClubPage(param);
    showPg('pg-club');
  } else if (page === 'rugby-union')  { showPg('pg-rugby-union');  initDir('union','','',''); }
  else if (page === 'rugby-league')   { showPg('pg-rugby-league'); initDir('league','','',''); }
  else if (page === 'businesses')     { showPg('pg-businesses');   initBiz(); }
  else if (page === 'region' && param){ showPg('pg-region');       loadRegion(param); }
  else if (page === 'search' && param){ showPg('pg-search');       execSearch(decodeURIComponent(param)); }
  else if (page === 'contact')        { showPg('pg-contact');
    setMeta(
      'Contact Us – UK Rugby Club Directory | Get in Touch',
      'Contact the UK Rugby Club Directory team. Update a club listing, report an error, make a general enquiry or ask about registering your rugby club on our free UK-wide directory.',
      'contact UK rugby club directory, rugby club listing enquiry, update rugby club details, rugby directory contact, rugby club registration enquiry',
      '#contact',
      {"@context":"https://schema.org","@type":"ContactPage","name":"Contact UK Rugby Club Directory","url":"https://ukrugbyclubdirectory.co.uk/#contact"}
    );
  }
  else if (page === 'register')       { showPg('pg-register');
    setMeta(
      'Register Your Rugby Club Free – Get Your Own Profile Page | UK Rugby Club Directory',
      'Register your rugby club for free on the UK\'s leading rugby directory. Get your own SEO profile page, reach local players searching rugby near me, and update your contact details instantly.',
      'register rugby club, add rugby club to directory, free rugby club listing, rugby club profile page, rugby club registration UK, list my rugby club online, get found by rugby players',
      '#register',
      {"@context":"https://schema.org","@type":"WebPage","name":"Register Your Rugby Club Free","description":"Free registration for UK rugby clubs to get their own profile page","url":"https://ukrugbyclubdirectory.co.uk/#register"}
    );
  }
  else if (page === 'privacy')        { showPg('pg-privacy');
    setMeta(
      'Privacy Policy – UK Rugby Club Directory | Data Protection & GDPR',
      'Read the UK Rugby Club Directory privacy policy. We are committed to protecting your personal data in compliance with UK GDPR and the Data Protection Act 2018.',
      'UK rugby club directory privacy policy, data protection, GDPR rugby website, personal data rugby directory',
      '#privacy',
      {"@context":"https://schema.org","@type":"WebPage","name":"Privacy Policy – UK Rugby Club Directory","url":"https://ukrugbyclubdirectory.co.uk/#privacy"},
      {robots:'noindex,follow'}
    );
  }
  else if (page === 'terms')          { showPg('pg-terms');
    setMeta(
      'Terms of Service – UK Rugby Club Directory | Terms & Conditions',
      'Read the terms of service for the UK Rugby Club Directory. These terms govern use of ukrugbyclubdirectory.co.uk and its club listing directory.',
      'UK rugby club directory terms of service, terms and conditions rugby directory, rugby website legal',
      '#terms',
      {"@context":"https://schema.org","@type":"WebPage","name":"Terms of Service – UK Rugby Club Directory","url":"https://ukrugbyclubdirectory.co.uk/#terms"},
      {robots:'noindex,follow'}
    );
  }
  else if (page === 'cookie-policy')  { showPg('pg-cookie-policy');
    setMeta(
      'Cookie Policy – UK Rugby Club Directory | How We Use Cookies',
      'Read the cookie policy for UK Rugby Club Directory. Learn how we use essential, analytics and preference cookies to improve your experience on ukrugbyclubdirectory.co.uk.',
      'UK rugby club directory cookie policy, cookies rugby website, how we use cookies',
      '#cookie-policy',
      {"@context":"https://schema.org","@type":"WebPage","name":"Cookie Policy – UK Rugby Club Directory","url":"https://ukrugbyclubdirectory.co.uk/#cookie-policy"},
      {robots:'noindex,follow'}
    );
  }
  else {
    showPg('pg-home'); updateNavAct('home');
    setMeta(
      'Rugby Near Me – Find a Rugby Club | UK Rugby Club Directory',
      'Find a rugby club near you. Search 773 rugby union clubs, rugby league teams and rugby businesses across England, Scotland, Wales and Northern Ireland. Every club has its own free profile page.',
      'rugby near me, find a rugby club, rugby clubs near me, rugby union clubs UK, rugby league clubs UK, local rugby teams, grassroots rugby, junior rugby clubs, women\'s rugby, rugby club directory UK, amateur rugby, rugby union England, rugby union Wales, rugby union Scotland',
      '#home',
      {"@context":"https://schema.org","@graph":[
        {"@type":"WebSite","@id":"https://ukrugbyclubdirectory.co.uk/#website","url":"https://ukrugbyclubdirectory.co.uk/","name":"UK Rugby Club Directory","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://ukrugbyclubdirectory.co.uk/#search/{search_term_string}"},"query-input":"required name=search_term_string"}},
        {"@type":"Organization","name":"UK Rugby Club Directory","url":"https://ukrugbyclubdirectory.co.uk/","description":"The UK's most comprehensive rugby club directory with 773 individual club profile pages"},
        {"@type":"WebPage","@id":"https://ukrugbyclubdirectory.co.uk/#homepage","url":"https://ukrugbyclubdirectory.co.uk/","name":"Rugby Near Me – Find a Rugby Club","description":"Find 773 rugby clubs across the UK with individual profile pages"}
      ]},
      {geoRegion:'GB', geoPlacename:'United Kingdom'}
    );
  }

  window.scrollTo({top:0,behavior:'smooth'});
}

function showPg(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}
function updateNavAct(id) {
  const el = document.getElementById('nl-'+id);
  if (el) el.classList.add('act');
}
function go(path) {
  // Set hash for instant client-side routing
  location.hash = path;
  // Also push ?p= to URL so Netlify edge function can read it for SEO
  const url = new URL(location.href);
  url.searchParams.set('p', path);
  history.replaceState(null, '', url.toString());
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);

// ════════════════════════════════════════════════════════════════
//  SEO — Dynamic meta tag injection per page/club
//  Handles: title, description, keywords, robots, canonical,
//           og:*, twitter:*, author, geo.*, schema JSON-LD
// ════════════════════════════════════════════════════════════════
const SITE_NAME = 'UK Rugby Club Directory';
const SITE_URL  = 'https://ukrugbyclubdirectory.co.uk';
const SITE_OG_IMG = 'https://ukrugbyclubdirectory.co.uk/og-image.jpg';

function setMeta(title, desc, keywords, url, schema, opts) {
  opts = opts || {};
  document.title = title;

  // Helper — find or create a meta/link tag
  function tag(sel, createAttrs) {
    let el = document.querySelector(sel);
    if (!el) {
      el = document.createElement(createAttrs.tag || 'meta');
      delete createAttrs.tag;
      Object.entries(createAttrs).forEach(([k,v]) => el.setAttribute(k,v));
      document.head.appendChild(el);
    }
    return el;
  }
  function setName(name, content) { tag(`meta[name="${name}"]`,{name}).setAttribute('content', content); }
  function setProp(prop, content) { tag(`meta[property="${prop}"]`,{property:prop}).setAttribute('content', content); }
  function setLink(rel, href)     { tag(`link[rel="${rel}"]`,{tag:'link',rel}).setAttribute('href', href); }

  const fullUrl = SITE_URL + '/' + url;
  const robots  = opts.robots || 'index,follow';
  const author  = opts.author || SITE_NAME;
  const ogImg   = opts.ogImg  || SITE_OG_IMG;
  const ogType  = opts.ogType || 'website';

  // ── Core tags ──
  setName('description',    desc);
  setName('keywords',       keywords);
  setName('robots',         robots);
  setName('author',         author);
  setName('application-name', SITE_NAME);
  setLink('canonical',      fullUrl);

  // ── Geographic / locale ──
  if (opts.geoRegion)   setName('geo.region',   opts.geoRegion);
  if (opts.geoPlacename)setName('geo.placename', opts.geoPlacename);
  if (opts.geoPos)      setName('geo.position',  opts.geoPos);
  if (opts.icbm)        setName('ICBM',          opts.icbm);

  // ── Open Graph ──
  setProp('og:site_name',   SITE_NAME);
  setProp('og:type',        ogType);
  setProp('og:title',       title);
  setProp('og:description', desc);
  setProp('og:url',         fullUrl);
  setProp('og:image',       ogImg);
  setProp('og:locale',      'en_GB');

  // ── Twitter Card ──
  setName('twitter:card',        'summary_large_image');
  setName('twitter:title',       title);
  setName('twitter:description', desc);
  setName('twitter:image',       ogImg);
  setName('twitter:site',        '@UKRugbyClubs');

  // ── Schema.org JSON-LD ──
  let schemaEl = document.getElementById('dyn-schema');
  if (!schemaEl) { schemaEl = document.createElement('script'); schemaEl.id='dyn-schema'; schemaEl.type='application/ld+json'; document.head.appendChild(schemaEl); }
  // Clean undefined values before stringify
  schemaEl.textContent = JSON.stringify(schema, (k,v) => v === undefined ? undefined : v);
}

// ════════════════════════════════════════════════════════════════
//  CLUB PROFILE PAGE
// ════════════════════════════════════════════════════════════════
function renderClubPage(slug) {
  const c = slugMap[slug];
  if (!c) { document.getElementById('pg-club').innerHTML = '<div class="con sec"><h2>Club not found</h2><p><a href="#home">← Back to home</a></p></div>'; return; }

  const tl = c.type==='union'?'Rugby Union':c.type==='league'?'Rugby League':'Rugby Business';
  const tc = c.type;
  const nation = c.country;
  const loc = [c.city, c.county, c.country].filter(Boolean).join(', ');

  // ── SEO ──
  const pageTitle = `${c.name} – ${tl} Club in ${c.city||c.county}, ${nation} | UK Rugby Club Directory`;
  const pageDesc  = `${c.name} is a ${tl.toLowerCase()} club based in ${loc}. ${c.desc.slice(0,110).trimEnd()}. Find address, phone, email, directions and more.`;
  const pageKw    = [
    c.name,
    `${c.name} rugby club`,
    `${tl.toLowerCase()} club ${c.city}`,
    `rugby ${c.city}`,
    `rugby ${c.county}`,
    `rugby near me ${c.city}`,
    `${c.type} clubs ${nation}`,
    `${c.type} clubs ${c.region}`,
    c.city + ' rugby',
    c.county + ' rugby clubs',
    nation + ' rugby clubs',
    'find a rugby club',
    'rugby near me',
    SITE_NAME
  ].filter(Boolean).join(', ');
  const pageUrl = `#club/${slug}`;

  const schema = {
    "@context":"https://schema.org",
    "@type":"SportsOrganization",
    "name":c.name,
    "sport":"Rugby",
    "description":c.desc,
    "address":{"@type":"PostalAddress","streetAddress":c.address||undefined,"addressLocality":c.city,"addressRegion":c.county,"addressCountry":"GB"},
    "url":c.website&&c.website.startsWith('http')?c.website:`https://ukrugbyclubdirectory.co.uk/${pageUrl}`,
    "telephone":c.phone||undefined,
    "email":c.email||undefined,
    "logo":c.logo||undefined,
    "aggregateRating":c.rating?{"@type":"AggregateRating","ratingValue":c.rating,"bestRating":"5","worstRating":"1","reviewCount":"10"}:undefined,
    "sameAs":c.website&&c.website.startsWith('http')?[c.website]:undefined,
    "geo":c.lat&&c.lng?{"@type":"GeoCoordinates","latitude":c.lat,"longitude":c.lng}:undefined
  };

  const geoOpts = c.lat && c.lng ? {
    geoRegion:   nation==='Scotland'?'GB-SCT':nation==='Wales'?'GB-WLS':nation==='Northern Ireland'?'GB-NIR':'GB-ENG',
    geoPlacename: [c.city, c.county, nation].filter(Boolean).join(', '),
    geoPos:  `${c.lat};${c.lng}`,
    icbm:    `${c.lat}, ${c.lng}`,
    ogType:  'place'
  } : {};

  setMeta(pageTitle, pageDesc, pageKw, pageUrl, schema, geoOpts);

  // ── NEARBY CLUBS ──
  const nearby = DB.filter(x => x.id !== c.id && (x.region===c.region||x.country===c.country) && x.type===c.type).slice(0,6);

  // ── STARS ──
  const stars = c.rating ? renderStars(parseFloat(c.rating)) : '';

  // ── LOGO ──
  const logoHtml = c.logo
    ? `<div class="club-crest"><img src="${c.logo}" alt="${c.name} badge" onerror="this.parentNode.innerHTML='<div class=club-crest-ph>${ballSvg()}</div>'"></div>`
    : `<div class="club-crest"><div class="club-crest-ph">${ballSvg()}</div></div>`;

  // ── MAP ──
  const mapHtml = c.lat && c.lng
    ? `<div class="map-box" onclick="window.open('https://www.google.com/maps/search/${encodeURIComponent(c.name)}/@${c.lat},${c.lng},15z','_blank')">
        <div class="map-ph-ico">🗺️</div>
        <div class="map-ph-txt">${c.address||loc}</div>
        <div class="map-ph-lnk">View on Google Maps →</div>
       </div>`
    : `<div class="map-box"><div class="map-ph-ico">📍</div><div class="map-ph-txt">Location not available</div></div>`;

  // ── NEARBY HTML ──
  const nearbyHtml = nearby.length
    ? `<div class="nearby-grid">${nearby.map(n=>`
        <div class="nearby-card" onclick="go('club/${n.slug}')">
          <div class="nc-logo">${n.logo?`<img src="${n.logo}" alt="${n.name}" loading="lazy" onerror="this.style.display='none'">`:'⚽'}</div>
          <div><span class="nc-nm">${n.name}</span><span class="nc-loc">📍 ${n.city||n.county}</span></div>
        </div>`).join('')}</div>`
    : '<p style="color:var(--grey);font-size:.88rem">No nearby clubs found.</p>';

  const html = `
    <!-- CLUB HERO -->
    <div class="club-hero">
      <div class="con">
        <nav class="bc" style="padding-top:4px">
          <a onclick="go('home')">Home</a><span class="bc-sep">›</span>
          <a onclick="go('rugby-${c.type==='business'?'businesses':c.type}')">
            ${c.type==='union'?'Rugby Union':c.type==='league'?'Rugby League':'Businesses'}
          </a><span class="bc-sep">›</span>
          <a onclick="go('region/${c.region}')">${(()=>{const m={'north-west':'North West','yorkshire':'Yorkshire','london':'London & SE','midlands':'Midlands','south-west':'South West','north-east':'North East','east':'East England','wales':'Wales','scotland':'Scotland','northern-ireland':'N. Ireland','england':'England'};return m[c.region]||c.country;})()}</a>
          <span class="bc-sep">›</span><span style="color:var(--gold)">${c.name}</span>
        </nav>
        <div class="club-hero-in">
          ${logoHtml}
          <div class="club-hero-info">
            <div class="club-tags">
              <span class="club-tag ${tc}">${tl}</span>
              <span class="club-tag country">🏴 ${nation}</span>
              ${c.rating?`<span class="club-tag rated">⭐ ${c.rating}/5</span>`:''}
            </div>
            <h1>${c.name}</h1>
            <div class="club-meta">
              ${c.city?`<span class="cm-item"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>${loc}</span>`:''}
              ${c.phone?`<span class="cm-item"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.69A2 2 0 012 .89h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>${c.phone}</span>`:''}
            </div>
            <div class="club-actions">
              ${c.website&&c.website.startsWith('http')?`<a href="${c.website}" target="_blank" rel="noopener" class="btn-red">🌐 Visit Website</a>`:''}
              ${c.phone?`<a href="tel:${c.phone}" class="btn-out">📞 Call Club</a>`:''}
              ${c.email?`<a href="mailto:${c.email}" class="btn-out">✉️ Email</a>`:''}
              ${c.lat&&c.lng?`<a href="https://www.google.com/maps/search/${encodeURIComponent(c.name)}/@${c.lat},${c.lng},15z" target="_blank" rel="noopener" class="btn-out">📍 Directions</a>`:''}
            </div>
          </div>
        </div>
      </div>

      <div class="club-tab-bar">
        <div class="con"><div class="ctabs">
          <button class="ctab active" onclick="swClubTab('ctp-overview',this)">📋 Overview</button>
          <button class="ctab" onclick="swClubTab('ctp-contact',this)">📞 Contact & Location</button>
          <button class="ctab" onclick="swClubTab('ctp-nearby',this)">🏟️ Nearby Clubs</button>
          <button class="ctab" onclick="swClubTab('ctp-share',this)">📤 Share</button>
        </div></div>
      </div>
    </div>

    <!-- TAB: OVERVIEW -->
    <div id="ctp-overview" class="ctpanel active">
      <div class="con">
        <div class="cp-layout">
          <div>
            <div class="info-card">
              <div class="ic-head">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                About ${c.name}
              </div>
              <div class="ic-body" style="padding:20px">
                <p class="about-txt">${c.desc}</p>
                ${c.website&&c.website.startsWith('http')?`<p style="margin-top:10px"><a href="${c.website}" target="_blank" rel="noopener" style="color:var(--red);font-weight:600">Visit official website →</a></p>`:''}
              </div>
            </div>

            ${c.rating?`
            <div class="info-card">
              <div class="ic-head">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Google Rating
              </div>
              <div class="ic-body" style="padding:20px">
                <div style="display:flex;align-items:center;gap:12px">
                  <span class="rating-num">${c.rating}</span>
                  <div>${renderStars(parseFloat(c.rating))}<span class="rating-lbl">Based on Google Reviews</span></div>
                </div>
              </div>
            </div>`:''}

            <div class="info-card">
              <div class="ic-head">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                Club Details
              </div>
              <div class="ic-body">
                <div class="ic-row">
                  <div class="ic-ico"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(-30 12 12)"/><line x1="12" y1="7" x2="12" y2="17"/></svg></div>
                  <div><span class="ic-lbl">Sport Type</span><span class="ic-val">${tl}</span></div>
                </div>
                <div class="ic-row">
                  <div class="ic-ico"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                  <div><span class="ic-lbl">Location</span><span class="ic-val">${loc}</span></div>
                </div>
                ${c.address?`<div class="ic-row">
                  <div class="ic-ico"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg></div>
                  <div><span class="ic-lbl">Address</span><span class="ic-val">${c.address}</span></div>
                </div>`:''}
                ${c.phone?`<div class="ic-row">
                  <div class="ic-ico"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.4 3.12A2 2 0 012 .89h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg></div>
                  <div><span class="ic-lbl">Phone</span><span class="ic-val"><a href="tel:${c.phone}">${c.phone}</a></span></div>
                </div>`:''}
                ${c.email?`<div class="ic-row">
                  <div class="ic-ico"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg></div>
                  <div><span class="ic-lbl">Email</span><span class="ic-val"><a href="mailto:${c.email}">${c.email}</a></span></div>
                </div>`:''}
                ${c.website&&c.website.startsWith('http')?`<div class="ic-row">
                  <div class="ic-ico"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></div>
                  <div><span class="ic-lbl">Website</span><span class="ic-val"><a href="${c.website}" target="_blank" rel="noopener">${c.website.replace('https://','').replace('http://','').replace(/\/$/,'')}</a></span></div>
                </div>`:''}
              </div>
            </div>
          </div>

          <div>
            ${mapHtml}
            <div style="margin-top:20px">
              <div class="info-card">
                <div class="ic-head">📍 Quick Info</div>
                <div class="ic-body" style="padding:14px 18px">
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:.84rem">
                    <div><span style="color:var(--grey);display:block;font-size:.72rem;text-transform:uppercase;letter-spacing:.5px;margin-bottom:2px">Nation</span><strong>${nation}</strong></div>
                    <div><span style="color:var(--grey);display:block;font-size:.72rem;text-transform:uppercase;letter-spacing:.5px;margin-bottom:2px">Type</span><strong>${tl}</strong></div>
                    ${c.rating?`<div style="grid-column:1/-1"><span style="color:var(--grey);display:block;font-size:.72rem;text-transform:uppercase;letter-spacing:.5px;margin-bottom:2px">Rating</span><strong>⭐ ${c.rating} / 5 (Google)</strong></div>`:''}
                  </div>
                </div>
              </div>
              <div style="margin-top:12px">
                <a onclick="go('register')" style="display:block;background:var(--off);border:2px dashed var(--gl);border-radius:var(--rl);padding:16px;text-align:center;cursor:pointer;transition:var(--t)" onmouseover="this.style.borderColor='var(--red)'" onmouseout="this.style.borderColor='var(--gl)'">
                  <div style="font-size:1.3rem;margin-bottom:6px">🏉</div>
                  <div style="font-family:var(--fd);font-size:.82rem;font-weight:700;color:var(--navy);text-transform:uppercase;letter-spacing:.5px">Own this club?</div>
                  <div style="font-size:.78rem;color:var(--grey);margin-top:3px">Update your listing for free</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB: CONTACT -->
    <div id="ctp-contact" class="ctpanel">
      <div class="con">
        <div class="cp-layout">
          <div>
            <div class="info-card">
              <div class="ic-head"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>Contact ${c.name}</div>
              <div class="ic-body">
                ${c.phone?`<div class="ic-row"><div class="ic-ico">📞</div><div><span class="ic-lbl">Phone</span><span class="ic-val"><a href="tel:${c.phone}">${c.phone}</a></span></div></div>`:''}
                ${c.email?`<div class="ic-row"><div class="ic-ico">✉️</div><div><span class="ic-lbl">Email</span><span class="ic-val"><a href="mailto:${c.email}">${c.email}</a></span></div></div>`:''}
                ${c.website&&c.website.startsWith('http')?`<div class="ic-row"><div class="ic-ico">🌐</div><div><span class="ic-lbl">Website</span><span class="ic-val"><a href="${c.website}" target="_blank" rel="noopener">${c.website}</a></span></div></div>`:''}
                ${c.address?`<div class="ic-row"><div class="ic-ico">📍</div><div><span class="ic-lbl">Address</span><span class="ic-val">${c.address}</span></div></div>`:''}
              </div>
            </div>
          </div>
          <div>${mapHtml}</div>
        </div>
      </div>
    </div>

    <!-- TAB: NEARBY -->
    <div id="ctp-nearby" class="ctpanel">
      <div class="con">
        <h2 style="font-family:var(--fd);font-size:1.5rem;font-weight:700;color:var(--navy);text-transform:uppercase;margin-bottom:20px">Nearby Rugby Clubs</h2>
        ${nearbyHtml}
      </div>
    </div>

    <!-- TAB: SHARE -->
    <div id="ctp-share" class="ctpanel">
      <div class="con" style="max-width:600px">
        <h2 style="font-family:var(--fd);font-size:1.5rem;font-weight:700;color:var(--navy);text-transform:uppercase;margin-bottom:16px">Share ${c.name}</h2>
        <p style="font-size:.9rem;color:var(--grey);margin-bottom:20px">Help other rugby fans and players find this club by sharing the listing.</p>
        <div class="share-row">
          <button class="share-btn share-tw" onclick="window.open('https://twitter.com/intent/tweet?text=Find ${encodeURIComponent(c.name)} on the UK Rugby Club Directory&url=https://ukrugbyclubdirectory.co.uk/%23club/${c.slug}','_blank')">🐦 Twitter</button>
          <button class="share-btn share-fb" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=https://ukrugbyclubdirectory.co.uk/%23club/${c.slug}','_blank')">📘 Facebook</button>
          <button class="share-btn share-cp" onclick="navigator.clipboard.writeText('https://ukrugbyclubdirectory.co.uk/#club/${c.slug}').then(()=>this.textContent='✓ Copied!')">📋 Copy Link</button>
        </div>
        <div style="margin-top:24px;background:var(--off);border-radius:var(--rl);padding:16px;border:1px solid var(--gl)">
          <p style="font-size:.8rem;color:var(--grey);margin-bottom:6px;font-weight:600;text-transform:uppercase;letter-spacing:.5px">Direct Link</p>
          <code style="font-size:.84rem;color:var(--navy);word-break:break-all">https://ukrugbyclubdirectory.co.uk/#club/${c.slug}</code>
        </div>
      </div>
    </div>

    <!-- RELATED CLUBS -->
    <div class="sec bg-off">
      <div class="con">
        <div class="sh"><div class="ey">More Rugby</div><h2>More Clubs in ${c.country}</h2></div>
        <div class="cg3">${DB.filter(x=>x.id!==c.id&&x.country===c.country&&x.type===c.type).slice(0,6).map(clubCard).join('')}</div>
      </div>
    </div>`;

  document.getElementById('pg-club').innerHTML = html;
}

function swClubTab(id, btn) {
  document.querySelectorAll('.ctab').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.ctpanel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function renderStars(r) {
  let html = '<div class="stars-row">';
  for (let i=1;i<=5;i++) html += `<span class="star${i>r?' empty':''}">★</span>`;
  html += '</div>'; return html;
}

function ballSvg() {
  return `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(-30 12 12)"/><line x1="12" y1="7" x2="12" y2="17"/><line x1="7.5" y1="9.5" x2="16.5" y2="14.5"/></svg>`;
}

// ════════════════════════════════════════════════════════════════
//  HERO SLIDESHOW
// ════════════════════════════════════════════════════════════════
let slideI = 0;
setInterval(() => setSlide((slideI+1)%3), 5500);
function setSlide(i) {
  document.querySelectorAll('.hsl').forEach((s,j)=>s.classList.toggle('active',j===i));
  document.querySelectorAll('.hd').forEach((d,j)=>d.classList.toggle('active',j===i));
  slideI = i;
}

// ════════════════════════════════════════════════════════════════
//  SMART FUZZY SEARCH
// ════════════════════════════════════════════════════════════════
function fuzzy(text, q) {
  if (!text||!q) return false;
  text=text.toLowerCase(); q=q.toLowerCase();
  if (text.includes(q)) return true;
  if (q.length<3) return false;
  let qi=0;
  for (let i=0;i<text.length&&qi<q.length;i++) if(text[i]===q[qi]) qi++;
  return qi===q.length;
}

const srchIn = document.getElementById('si');
const acBox  = document.getElementById('ac');

srchIn.addEventListener('input', function() {
  const q=this.value.trim(), tf=document.getElementById('stype').value;
  if (q.length<2) { acBox.classList.remove('open'); return; }
  const res = DB.filter(c=>{
    if(tf&&c.type!==tf) return false;
    return fuzzy(c.name,q)||fuzzy(c.city,q)||fuzzy(c.county,q)||fuzzy(c.country,q);
  }).slice(0,9);
  acBox.innerHTML = res.length
    ? res.map(c=>`
      <div class="aci" onclick="go('club/${c.slug}')">
        <div class="aci-logo">${c.logo?`<img src="${c.logo}" alt="" loading="lazy" onerror="this.style.display='none'">`:'🏉'}</div>
        <div class="aci-info">
          <span class="aci-n">${c.name}</span>
          <span class="aci-l">📍 ${c.city}${c.county?', '+c.county:''}</span>
        </div>
        <span class="aci-t ${c.type}">${c.type==='union'?'Union':c.type==='league'?'League':'Biz'}</span>
      </div>`).join('')
    : `<div class="ac-empty">No results for "<strong>${q}</strong>"</div>`;
  acBox.classList.add('open');
});

document.addEventListener('click', e=>{ if(!e.target.closest('#sw')) acBox.classList.remove('open'); });
srchIn.addEventListener('keydown', e=>{ if(e.key==='Escape') acBox.classList.remove('open'); if(e.key==='Enter') doSearch(); });

function doSearch() {
  const q = srchIn.value.trim();
  if (!q) return;
  acBox.classList.remove('open');
  go('search/' + encodeURIComponent(q));
}

function execSearch(q) {
  const tf = document.getElementById('stype').value;
  const res = DB.filter(c=>{
    if(tf&&c.type!==tf) return false;
    return fuzzy(c.name,q)||fuzzy(c.city,q)||fuzzy(c.county,q)||c.country.toLowerCase().includes(q.toLowerCase());
  });
  document.getElementById('sr-h1').textContent = `Results for "${q}"`;
  document.getElementById('sr-sub').textContent = `${res.length} rugby club${res.length!==1?'s':''} found`;
  document.getElementById('sr-list').innerHTML = res.length ? res.map(clubCard).join('') : emptyState();
  setMeta(
    `"${q}" Rugby Clubs – Search Results | UK Rugby Club Directory`,
    `Found ${res.length} rugby club${res.length!==1?'s':''} matching "${q}". Search the UK Rugby Club Directory for rugby union, rugby league and businesses near you.`,
    `${q} rugby clubs, ${q} rugby, rugby clubs near ${q}, find rugby near me, rugby club search UK, ${q} rugby union, ${q} rugby league`,
    `#search/${encodeURIComponent(q)}`,
    {"@context":"https://schema.org","@type":"SearchResultsPage","name":`Search: ${q}`,"url":`https://ukrugbyclubdirectory.co.uk/#search/${encodeURIComponent(q)}`},
    {robots:'noindex,follow'}
  );
}

// ════════════════════════════════════════════════════════════════
//  REGION PAGE
// ════════════════════════════════════════════════════════════════
const REGION_NAMES = {'north-west':'North West England','yorkshire':'Yorkshire','london':'London & South East','midlands':'Midlands','south-west':'South West England','north-east':'North East England','wales':'Wales','scotland':'Scotland','northern-ireland':'Northern Ireland','east':'East England','east-midlands':'East Midlands','england':'England','south':'South England'};

function loadRegion(region) {
  const name = REGION_NAMES[region]||region;
  const list = DB.filter(c=>region==='wales'?c.country==='Wales':region==='scotland'?c.country==='Scotland':region==='northern-ireland'?c.country==='Northern Ireland':region==='england'?c.country==='England':c.region===region);
  document.getElementById('rgn-bc').textContent = name;
  document.getElementById('rgn-h1').textContent = `Rugby Clubs in ${name}`;
  document.getElementById('rgn-sub').textContent = `Discover ${list.length} rugby clubs across ${name}.`;
  document.getElementById('rgn-cnt').textContent = list.length;
  document.getElementById('rgn-list').innerHTML = list.length ? list.map(clubCard).join('') : emptyState();
  document.querySelectorAll('.mr').forEach(r=>r.classList.remove('sel'));
  const mr = document.getElementById('mr-'+region); if(mr) mr.classList.add('sel');
  document.querySelectorAll('.rt').forEach(t=>t.classList.remove('active'));
  const rt = document.querySelector(`.rt[data-r="${region}"]`); if(rt) rt.classList.add('active');
  const regionKw = [
    `rugby clubs ${name}`,
    `rugby ${name}`,
    `rugby union ${name}`,
    `rugby league ${name}`,
    `find a rugby club ${name}`,
    `rugby near me ${name}`,
    `grassroots rugby ${name}`,
    `junior rugby ${name}`,
    `women's rugby ${name}`,
    name + ' rugby clubs directory',
    'UK rugby club directory'
  ].join(', ');

  setMeta(
    `Rugby Clubs in ${name} – Find Local Rugby Near Me | UK Rugby Club Directory`,
    `Find ${list.length} rugby clubs in ${name}. Browse rugby union, rugby league and businesses across ${name}. View full club profiles with contact details, maps and directions.`,
    regionKw,
    `#region/${region}`,
    {"@context":"https://schema.org","@type":"CollectionPage","name":`Rugby Clubs in ${name}`,"description":`Directory of ${list.length} rugby clubs in ${name}`,"url":`https://ukrugbyclubdirectory.co.uk/#region/${region}`,"numberOfItems":list.length},
    {geoRegion: region==='scotland'?'GB-SCT':region==='wales'?'GB-WLS':region==='northern-ireland'?'GB-NIR':'GB-ENG', geoPlacename: name}
  );
}

// ════════════════════════════════════════════════════════════════
//  DIRECTORY PAGINATION
// ════════════════════════════════════════════════════════════════
const PER = 24;
const S = { union:{list:[],page:1}, league:{list:[],page:1} };

function getClubs(type,country,region,q) {
  return DB.filter(c=>{
    if(c.type!==type) return false;
    if(country&&c.country!==country) return false;
    if(region&&c.region!==region) return false;
    if(q){const lq=q.toLowerCase();return c.name.toLowerCase().includes(lq)||c.city.toLowerCase().includes(lq)||(c.county||'').toLowerCase().includes(lq);}
    return true;
  });
}

function initDir(type,country,region,q) {
  S[type]={list:getClubs(type,country,region,q),page:1};
  renderDir(type);
  const pfx=type==='union'?'u':'l';
  const rc=document.getElementById(pfx+'-cnt'); if(rc) rc.textContent=S[type].list.length;
  const ph=document.getElementById(pfx+'-ph-cnt'); if(ph) ph.textContent=S[type].list.length;
  if(type==='union') setMeta(
    'UK Rugby Union Club Directory – Find a Club Near You | UK Rugby Club Directory',
    `Search ${S[type].list.length} rugby union clubs across England, Scotland, Wales and Northern Ireland. Find your local club, view full profiles, contact details and get directions.`,
    'rugby union clubs UK, rugby union near me, rugby union England, rugby union Wales, rugby union Scotland, find a rugby union club, grassroots rugby union, premiership rugby, amateur rugby union, UK rugby club directory',
    '#rugby-union',
    {"@context":"https://schema.org","@type":"CollectionPage","name":"UK Rugby Union Club Directory","description":"Directory of rugby union clubs across the UK","url":"https://ukrugbyclubdirectory.co.uk/#rugby-union","numberOfItems":S[type].list.length}
  );
  if(type==='league') setMeta(
    'UK Rugby League Club Directory – Super League & Community Clubs | UK Rugby Club Directory',
    `Search ${S[type].list.length} rugby league clubs across England and Wales. Browse Super League, Championship and community clubs with full profiles, contact details and locations.`,
    'rugby league clubs UK, rugby league near me, Super League clubs, rugby league England, rugby league Wales, community rugby league, find a rugby league club, Challenge Cup clubs, rugby league directory',
    '#rugby-league',
    {"@context":"https://schema.org","@type":"CollectionPage","name":"UK Rugby League Club Directory","description":"Directory of rugby league clubs across the UK","url":"https://ukrugbyclubdirectory.co.uk/#rugby-league","numberOfItems":S[type].list.length}
  );
}

function renderDir(type) {
  const st=S[type]; const slice=st.list.slice((st.page-1)*PER,st.page*PER);
  const pfx=type==='union'?'u':'l';
  const listEl=document.getElementById(pfx+'-list'); const pagEl=document.getElementById(pfx+'-pag');
  if(listEl) listEl.innerHTML=slice.length?slice.map(clubCard).join(''):emptyState();
  if(!pagEl) return;
  const pages=Math.ceil(st.list.length/PER);
  if(pages<=1){pagEl.innerHTML='';return;}
  let html='';
  for(let i=1;i<=Math.min(pages,10);i++) html+=`<button class="pb${i===st.page?' active':''}" onclick="pgGo('${type}',${i})">${i}</button>`;
  if(pages>10) html+=`<span class="pb dots">… ${pages} pages</span>`;
  pagEl.innerHTML=html;
}

function pgGo(type,page){
  S[type].page=page; renderDir(type);
  const el=document.getElementById('pg-rugby-'+type); if(el) el.scrollIntoView({behavior:'smooth'});
}

function filt(type,country,region,btn){
  btn.closest('.ds-b').querySelectorAll('.fb').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const q=document.getElementById((type==='union'?'u':'l')+'-srch')?.value||'';
  initDir(type,country,region,q);
}

function srchDir(type,q){
  const st=S[type]; initDir(type,'','',q);
}

function initBiz(){
  const list=DB.filter(c=>c.type==='business');
  document.getElementById('b-list').innerHTML=list.length?list.map(clubCard).join(''):emptyState();
  const ph=document.getElementById('b-ph-cnt'); if(ph) ph.textContent=list.length;
  setMeta(
    'UK Rugby Business Directory – Suppliers, Kit & Governing Bodies | UK Rugby Club Directory',
    `Browse ${list.length} rugby businesses across the UK including equipment suppliers, kit manufacturers, coaching companies and governing bodies. Find official rugby trade partners and organisations.`,
    'rugby business directory UK, rugby equipment suppliers, rugby kit manufacturers, rugby governing bodies, RFU, WRU, SRU, rugby coaching companies, rugby trade, rugby union businesses',
    '#businesses',
    {"@context":"https://schema.org","@type":"CollectionPage","name":"UK Rugby Business Directory","description":"Directory of rugby businesses, suppliers and governing bodies across the UK","url":"https://ukrugbyclubdirectory.co.uk/#businesses","numberOfItems":list.length}
  );
}

// ════════════════════════════════════════════════════════════════
//  FEATURED TABS
// ════════════════════════════════════════════════════════════════
function renderFeatured(){
  const sets=[['feat-u',DB.filter(c=>c.type==='union'&&c.featured).slice(0,8)],['feat-l',DB.filter(c=>c.type==='league'&&c.featured).slice(0,8)],['feat-b',DB.filter(c=>c.type==='business'&&c.featured).slice(0,8)]];
  sets.forEach(([id,list])=>{ const el=document.getElementById(id); if(el) el.innerHTML=list.map(clubCard).join(''); });
}

function swTab(tab,btn){
  document.querySelectorAll('.ttb').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tp').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tp-'+tab)?.classList.add('active');
}

// ════════════════════════════════════════════════════════════════
//  CLUB CARD (links to profile page)
// ════════════════════════════════════════════════════════════════
function clubCard(c) {
  const tc=c.type==='union'?'union':c.type==='league'?'league':'business';
  const tl=c.type==='union'?'Rugby Union':c.type==='league'?'Rugby League':'Business';
  const logoH=c.logo?`<img class="cc-logo" src="${c.logo}" alt="${c.name} badge" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`:'';
  const phShow=c.logo?'style="display:none"':'';
  const ratH=c.rating?`<div class="cc-rat"><svg fill="${parseFloat(c.rating)>=4?'var(--gold)':'none'}" stroke="var(--gold)" stroke-width="1.5" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>${c.rating}</div>`:'<div></div>';
  return `<div class="club-card" onclick="go('club/${c.slug}')" role="link" tabindex="0" aria-label="View ${c.name} profile" onkeydown="if(event.key==='Enter')go('club/${c.slug}')">
    <div class="cc-head">${c.featured?'<span class="cc-feat">⭐ Featured</span>':''}${logoH}<div class="cc-ph" ${phShow}>${ballSvg()}</div></div>
    <div class="cc-body">
      <span class="type-b ${tc}">${tl}</span>
      <div class="cc-nm">${c.name}</div>
      <div class="cc-loc"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>${c.city}${c.county?', '+c.county:''}</div>
      <p class="cc-desc">${c.desc}</p>
    </div>
    <div class="cc-foot">${ratH}<span class="cc-view">View Profile <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div>
  </div>`;
}

function ballSvg(){return `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(-30 12 12)"/><line x1="12" y1="7" x2="12" y2="17"/></svg>`;}
function emptyState(){return `<div class="empty"><span class="empty-ico">🔍</span><h3>No Clubs Found</h3><p>Try adjusting your search or filter.</p></div>`;}

// ════════════════════════════════════════════════════════════════
//  MAP TOOLTIPS
// ════════════════════════════════════════════════════════════════
const mtt = document.getElementById('mtt');
document.querySelectorAll('.mr').forEach(r=>{
  r.addEventListener('mouseenter',e=>{
    const reg=r.getAttribute('data-r'), name=r.getAttribute('data-n');
    const cnt=DB.filter(c=>reg==='wales'?c.country==='Wales':reg==='scotland'?c.country==='Scotland':reg==='northern-ireland'?c.country==='Northern Ireland':c.region===reg).length;
    mtt.textContent=`${name}: ${cnt} clubs`; mtt.classList.add('vis');
  });
  r.addEventListener('mousemove',e=>{
    const rect=document.getElementById('mapw').getBoundingClientRect();
    mtt.style.left=(e.clientX-rect.left+12)+'px'; mtt.style.top=(e.clientY-rect.top-34)+'px';
  });
  r.addEventListener('mouseleave',()=>mtt.classList.remove('vis'));
  r.addEventListener('click',()=>go('region/'+r.getAttribute('data-r')));
});

// ════════════════════════════════════════════════════════════════
//  MOBILE NAV
// ════════════════════════════════════════════════════════════════
function openMob(){document.getElementById('mobnav').classList.add('open');document.body.style.overflow='hidden';}
function closeMob(){document.getElementById('mobnav').classList.remove('open');document.body.style.overflow='';}

// ════════════════════════════════════════════════════════════════
//  SCROLL TOP
// ════════════════════════════════════════════════════════════════
window.addEventListener('scroll',()=>document.getElementById('st').classList.toggle('show',window.scrollY>400));

// ════════════════════════════════════════════════════════════════
//  COOKIE
// ════════════════════════════════════════════════════════════════
function setCk(v){try{localStorage.setItem('ukrc_cc',v);}catch(e){}document.getElementById('cb').classList.add('hide');}
try{if(localStorage.getItem('ukrc_cc'))document.getElementById('cb').classList.add('hide');}catch(e){}

// ════════════════════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════════════════════
renderFeatured();
