'use strict';
// ════════════════════════════════════════════════════════════════
//  UK RUGBY CLUB DIRECTORY — app.js
//  Hash-based SPA: #home | #rugby-union | #club/slug | etc.
//  773 clubs from CSV + hardcoded featured elite clubs
//  Each club page: unique SEO, full profile, nearby clubs, map
// ════════════════════════════════════════════════════════════════

// ── HARDCODED ELITE / FEATURED CLUBS ─────────────────────────────
const ELITE = [
  {id:1,name:'Leicester Tigers',type:'union',country:'England',region:'midlands',city:'Leicester',county:'Leicestershire',desc:'One of England\'s most decorated rugby clubs with 10 Premiership titles. Founded in 1880, playing at Welford Road Stadium. A cornerstone of English rugby with legendary players and a remarkable trophy-laden history.',website:'https://www.leicestertigers.com',logo:'/badges/leicester-tigers.jpg',featured:true,rating:'4.6',phone:'+44 116 319 8888',email:'enquiries@tigers.co.uk',address:'Aylestone Rd, Leicester LE2 7TR',lat:'52.6186',lng:'-1.1341',slug:'leicester-tigers'},
  {id:2,name:'Saracens',type:'union',country:'England',region:'london',city:'London',county:'Greater London',desc:'Multiple Premiership and European Champions Cup winners. Based at StoneX Stadium, Saracens are one of the most successful clubs in the history of English and European rugby union.',website:'https://www.saracens.com',logo:'https://upload.wikimedia.org/wikipedia/en/3/3f/Saracens_F.C._Logo.svg',featured:true,rating:'4.5',phone:'+44 208 455 8181',email:'',address:'StoneX Stadium, Greenlands Lane, London NW4 1RL',lat:'51.5865',lng:'-0.2326',slug:'saracens',founded:'1876',colours:'Black & Red',league:'Gallagher Premiership',teams:'Senior XV,Women,Colts (U18),Under 16,Under 14,Minis',training:'Tue & Thu evenings (Senior), Sat mornings (Juniors)',honours:'5× Premiership Champions, 3× European Champions Cup'},
  {id:3,name:'Harlequins',type:'union',country:'England',region:'london',city:'Twickenham',county:'Greater London',desc:'One of rugby\'s founding clubs based at The Stoop. Famous for distinctive quartered jerseys and free-flowing attacking rugby. Multiple Premiership title winners with a loyal London fanbase.',website:'https://www.quins.co.uk',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/Harlequins_crest.svg/150px-Harlequins_crest.svg.png',featured:true,rating:'4.5',phone:'+44 208 410 6000',email:'',address:'The Stoop, Langhorn Drive, Twickenham TW2 7SX',lat:'51.4513',lng:'-0.3398',slug:'harlequins'},
  {id:4,name:'Northampton Saints',type:'union',country:'England',region:'midlands',city:'Northampton',county:'Northamptonshire',desc:'Premiership club at Franklin\'s Gardens with passionate support and rich heritage in English rugby. Founded in 1880, the Saints have been Premiership champions and consistent European contenders.',website:'https://www.northamptonsaints.co.uk',logo:'/badges/northampton-saints.png',featured:true,rating:'4.4',phone:'+44 1604 751543',email:'',address:"Franklin's Gardens, Weedon Road, Northampton NN5 5BG",lat:'52.2443',lng:'-0.9126',slug:'northampton-saints'},
  {id:5,name:'Bath Rugby',type:'union',country:'England',region:'south-west',city:'Bath',county:'Somerset',desc:'Historic club at the Recreation Ground in the heart of Bath city centre. Multiple Premiership and European champions. One of England\'s most storied and successful rugby clubs.',website:'https://www.bathrugby.com',logo:'/badges/bath-rugby.png',featured:true,rating:'4.4',phone:'+44 1225 325200',email:'',address:'Recreation Ground, Bath BA2 6PW',lat:'51.3808',lng:'-2.3601',slug:'bath-rugby'},
  {id:6,name:'Exeter Chiefs',type:'union',country:'England',region:'south-west',city:'Exeter',county:'Devon',desc:'Premiership champions at Sandy Park. Remarkable rise from National One to England\'s elite. Back-to-back Premiership and Champions Cup winners with passionate Devon support.',website:'https://www.exeterchiefs.co.uk',logo:'/badges/exeter-chiefs.jpg',featured:true,rating:'4.6',phone:'+44 1392 411243',email:'',address:'Sandy Park, Exeter EX2 7NN',lat:'50.7230',lng:'-3.4895',slug:'exeter-chiefs'},
  {id:7,name:'Gloucester Rugby',type:'union',country:'England',region:'south-west',city:'Gloucester',county:'Gloucestershire',desc:'The Cherry and Whites at iconic Kingsholm. West Country club with fervent support and consistent top-flight Premiership pedigree for over a century of competitive rugby.',website:'https://www.gloucesterrugby.co.uk',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Gloucester_Rugby_%282018%29_logo.svg/150px-Gloucester_Rugby_%282018%29_logo.svg.png',featured:true,rating:'4.3',phone:'+44 1452 872000',email:'',address:'Kingsholm Road, Gloucester GL1 3AX',lat:'51.8696',lng:'-2.2421',slug:'gloucester-rugby'},
  {id:8,name:'Bristol Bears',type:'union',country:'England',region:'south-west',city:'Bristol',county:'Bristol',desc:'Premiership rugby at Ashton Gate Stadium. Ambitious club known for attacking play and a rapidly growing fanbase. One of the best-supported clubs in the South West of England.',website:'https://www.bristolbears.co.uk',logo:'/badges/bristol-bears.png',featured:true,rating:'4.3',phone:'+44 117 963 0542',email:'',address:'Ashton Gate Stadium, Bristol BS3 2EJ',lat:'51.4400',lng:'-2.6200',slug:'bristol-bears'},
  {id:9,name:'Sale Sharks',type:'union',country:'England',region:'north-west',city:'Sale',county:'Greater Manchester',desc:'North West England\'s flagship Premiership club. The Sharks play at AJ Bell Stadium with a fiercely loyal Greater Manchester fanbase and a strong tradition in English rugby.',website:'https://www.salesharks.com',logo:'/badges/sale-sharks.jpg',featured:true,rating:'4.3',phone:'+44 161 283 1861',email:'',address:'AJ Bell Stadium, Salford M5 5LJ',lat:'53.4872',lng:'-2.2913',slug:'sale-sharks'},
  {id:10,name:'Newcastle Falcons',type:'union',country:'England',region:'north-east',city:'Newcastle',county:'Tyne and Wear',desc:'The North East\'s professional rugby union club at Kingston Park. The Falcons have been champions and consistent performers, bringing top-level rugby to the passionate North East rugby community.',website:'https://www.newcastle-falcons.co.uk',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Newcastle_Falcons_badge.svg/150px-Newcastle_Falcons_badge.svg.png',featured:true,rating:'4.2',phone:'+44 191 214 5588',email:'',address:'Kingston Park, Newcastle NE13 8AF',lat:'55.0427',lng:'-1.6983',slug:'newcastle-falcons'},
  {id:11,name:'Cardiff RFC',type:'union',country:'Wales',region:'wales',city:'Cardiff',county:'South Glamorgan',desc:'One of the oldest and most famous rugby clubs in the world. The Cardiff Blue and Blacks have played at Cardiff Arms Park since 1876, beating the All Blacks in 1953.',website:'https://www.cardiffrfc.com',logo:'/badges/cardiff-blues.jpg',featured:true,rating:'4.4',phone:'+44 29 2082 6000',email:'',address:'Cardiff Arms Park, Cardiff CF10 1JA',lat:'51.4782',lng:'-3.1832',slug:'cardiff-rfc'},
  {id:12,name:'Edinburgh Rugby',type:'union',country:'Scotland',region:'scotland',city:'Edinburgh',county:'Lothian',desc:'Professional rugby union club representing Edinburgh and the Scottish Borders. Play at Murrayfield Stadium with a rich history in the URC (United Rugby Championship).',website:'https://www.edinburghrugby.org',logo:'/badges/edinburgh-rugby.gif',featured:true,rating:'4.3',phone:'+44 131 346 5000',email:'',address:'Scottish Gas Murrayfield Stadium, Edinburgh EH12 5PJ',lat:'55.9466',lng:'-3.2415',slug:'edinburgh-rugby'},
  {id:13,name:'Glasgow Warriors',type:'union',country:'Scotland',region:'scotland',city:'Glasgow',county:'Lanarkshire',desc:'Professional rugby club at Scotstoun Stadium. The Warriors are one of the most successful clubs in Pro14/URC history with passionate support across Glasgow and the West of Scotland.',website:'https://www.glasgowwarriors.org',logo:'/badges/glasgow-warriors.jpg',featured:true,rating:'4.4',phone:'+44 141 959 5555',email:'',address:'Scotstoun Stadium, 72 Danes Dr, Glasgow G14 9HD',lat:'55.8751',lng:'-4.3501',slug:'glasgow-warriors'},
  // League
  {id:50,name:'Leeds Rhinos',type:'league',country:'England',region:'yorkshire',city:'Leeds',county:'West Yorkshire',desc:'The most successful Super League club of the modern era. Eight Grand Final wins, multiple Challenge Cup victories, and home of legends Kevin Sinfield and Rob Burrow. Based at Headingley Stadium.',website:'https://www.leedsrhinos.com',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Leeds_Rhinos_badge.svg/150px-Leeds_Rhinos_badge.svg.png',featured:true,rating:'4.5',phone:'+44 113 278 6181',email:'',address:'Headingley Stadium, Leeds LS6 3BR',lat:'53.8194',lng:'-1.5797',slug:'leeds-rhinos',founded:'1890',colours:'Blue & Amber',league:'Betfred Super League',teams:'Senior XIII,Women,Under 19,Under 16,Under 14',honours:'8× Super League Champions, 3× World Club Champions, 8× Challenge Cup'},
  {id:51,name:'Wigan Warriors',type:'league',country:'England',region:'north-west',city:'Wigan',county:'Greater Manchester',desc:'The most decorated club in rugby league history. Record Challenge Cup wins and multiple championship titles spanning over a century of rugby league greatness at the DW Stadium.',website:'https://www.wiganwarriors.com',logo:'/badges/wigan-warriors.jpg',featured:true,rating:'4.6',phone:'+44 1942 774000',email:'',address:'DW Stadium, Loire Drive, Wigan WN5 0UZ',lat:'53.5509',lng:'-2.6349',slug:'wigan-warriors'},
  {id:52,name:'St Helens RFC',type:'league',country:'England',region:'north-west',city:'St Helens',county:'Merseyside',desc:'Consecutive Super League champions and one of the most successful clubs in rugby league history. Playing at the Totally Wicked Stadium with a passionate and loyal fanbase.',website:'https://www.saintsrlfc.com',logo:'https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/St_Helens_RFC_badge.svg/150px-St_Helens_RFC_badge.svg.png',featured:true,rating:'4.6',phone:'+44 1744 455052',email:'',address:'Totally Wicked Stadium, St Helens WA9 3AL',lat:'53.4427',lng:'-2.7463',slug:'st-helens-rfc'},
  {id:53,name:'Warrington Wolves',type:'league',country:'England',region:'north-west',city:'Warrington',county:'Cheshire',desc:'Historic Super League club at the Halliwell Jones Stadium. Multiple Challenge Cup winners with an impressive squad and an ambitious vision for the future of Warrington rugby league.',website:'https://www.warringtonwolves.com',logo:'/badges/warrington-wolves.png',featured:true,rating:'4.4',phone:'+44 1925 248888',email:'',address:'Halliwell Jones Stadium, Warrington WA2 7NE',lat:'53.4045',lng:'-2.5551',slug:'warrington-wolves'},
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
      city:r[5]||'', county:r[6]||'', desc:(()=>{
        const d=r[7]||'';
        if(d&&!d.startsWith('Rugby club based in')) return d;
        const city=r[5]||''; const county=r[6]||''; const country=r[3]||'England';
        const type=r[2]||'union';
        const typeStr=type==='union'?'rugby union':type==='league'?'rugby league':'rugby';
        const loc=[city,county,country].filter(Boolean).join(', ');
        return `${name} is a ${typeStr} club based in ${loc}. We welcome players of all abilities from minis and juniors through to senior and veterans rugby. Contact us to find out about training times, membership and how to get involved.`;
      })(),
      website:r[8]||'', phone:r[9]||'', email:r[10]||'', logo:r[11]||'',
      lat:r[12]||'', lng:r[13]||'', rating:r[14]||'', slug:r[15]||'',
      address:r[16]||'', training:r[17]||'', teams:r[18]||'',
      founded:r[19]||'', colours:r[20]||'', league:r[21]||'',
      honours:r[22]||'', facilities:r[23]||'',
      facebook:r[24]||'', twitter:r[25]||'', instagram:r[26]||'',
      featured:false
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

// ── Geolocation distance helper ─────────────────────────────────
let userLat = null, userLng = null;
function getUserLocation() {
  if(!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(pos => {
    userLat = pos.coords.latitude;
    userLng = pos.coords.longitude;
    // Refresh any visible club cards to show distance
    document.querySelectorAll('.cc-dist').forEach(el => {
      const lat = parseFloat(el.dataset.lat);
      const lng = parseFloat(el.dataset.lng);
      if(!isNaN(lat) && !isNaN(lng)) {
        el.textContent = haversine(userLat, userLng, lat, lng).toFixed(1) + ' mi';
        el.style.display = 'flex';
      }
    });
  }, ()=>{}, {timeout:5000});
}
function haversine(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // miles
  const dLat = (lat2-lat1)*Math.PI/180;
  const dLon = (lon2-lon1)*Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
function distHtml(c) {
  if(!c.lat||!c.lng) return '';
  const dist = (userLat&&userLng) ? haversine(userLat,userLng,parseFloat(c.lat),parseFloat(c.lng)).toFixed(1)+' mi' : '';
  const show = dist ? 'display:flex' : 'display:none';
  return `<div class="cc-dist" data-lat="${c.lat}" data-lng="${c.lng}" style="${show};align-items:center;gap:3px;font-size:.72rem;color:var(--grey);margin-top:3px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${dist}</div>`;
}
// Trigger geolocation on page load
window.addEventListener('load', () => { setTimeout(getUserLocation, 1000); });


// ════════════════════════════════════════════════════════════════
//  MY CLUBS — Follow / Save clubs (localStorage)
// ════════════════════════════════════════════════════════════════
function getMyClubs(){try{return JSON.parse(localStorage.getItem('ukrc_myclubs')||'[]');}catch(e){return[];}}
function saveMyClubs(arr){try{localStorage.setItem('ukrc_myclubs',JSON.stringify(arr));}catch(e){}}
function isFollowing(slug){return getMyClubs().includes(slug);}
function toggleFollow(slug,name){
  let clubs=getMyClubs();
  if(clubs.includes(slug)){clubs=clubs.filter(s=>s!==slug);}
  else{clubs.push(slug);}
  saveMyClubs(clubs);
  // Update all follow buttons for this club
  document.querySelectorAll(`.follow-btn[data-slug="${slug}"]`).forEach(btn=>{
    const f=clubs.includes(slug);
    btn.classList.toggle('following',f);
    btn.innerHTML=f
      ?`<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> Following`
      :`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> Follow`;
  });
  renderMyClubsBar();
}
function renderMyClubsBar(){
  const bar=document.getElementById('my-clubs-bar');
  if(!bar) return;
  const clubs=getMyClubs();
  if(!clubs.length){bar.classList.remove('show');return;}
  bar.classList.add('show');
  const chips=clubs.map(slug=>{
    const c=slugMap[slug]; if(!c) return '';
    return `<span class="mc-chip" onclick="go('club/${slug}')">${c.logo?`<img src="${c.logo}" width="16" height="16" style="border-radius:3px;object-fit:contain">`:''} ${c.name}</span>`;
  }).join('');
  document.getElementById('mc-chips').innerHTML=chips;
}
window.addEventListener('load',()=>setTimeout(renderMyClubsBar,500));


// ════════════════════════════════════════════════════════════════
//  VIBE TAGS — Community rating tags per club
// ════════════════════════════════════════════════════════════════
const DEFAULT_VIBES = [
  {id:'atmos', label:'Great Atmosphere', icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>'},
  {id:'family', label:'Family Club', icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>'},
  {id:'juniors', label:'Strong Juniors', icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'},
  {id:'food', label:'Best Post-Match Food', icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>'},
  {id:'welcome', label:'Very Welcoming', icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>'},
  {id:'women', label:"Active Women's Section", icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M12 12v8M8 18h8"/></svg>'},
];

function getVibes(slug){
  try{return JSON.parse(localStorage.getItem('ukrc_vibes_'+slug)||'{}');}catch(e){return{};}
}
function voteVibe(slug,id){
  const v=getVibes(slug);
  if(v[id]) delete v[id]; else v[id]=1;
  try{localStorage.setItem('ukrc_vibes_'+slug,JSON.stringify(v));}catch(e){}
  renderVibeTags(slug);
}
function renderVibeTags(slug){
  const el=document.getElementById('vibe-tags-'+slug);
  if(!el) return;
  const v=getVibes(slug);
  el.innerHTML=DEFAULT_VIBES.map(vb=>`
    <button class="vibe-tag${v[vb.id]?' voted':''}" onclick="voteVibe('${slug}','${vb.id}')">
      <span class="vt-ico">${vb.icon}</span> ${vb.label}
    </button>`).join('');
}


// ════════════════════════════════════════════════════════════════
//  DISTANCE SORT for listing pages
// ════════════════════════════════════════════════════════════════
let distSortActive = false;
function toggleDistSort(btn){
  distSortActive = !distSortActive;
  btn.classList.toggle('active', distSortActive);
  btn.innerHTML = distSortActive
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Nearest First ✓'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Nearest First';
  if(distSortActive && !userLat){
    getUserLocation();
    setTimeout(()=>renderDir('union'), 1500);
  } else {
    renderDir('union');
  }
}

// Patch renderDir to sort by distance when active
const _origRenderDir = renderDir;

// ════════════════════════════════════════════════════════════════
//  MAP VIEW — Leaflet-based interactive club map
// ════════════════════════════════════════════════════════════════
let mapInstance = null;
let mapMarkers = [];

function initMapView(clubs){
  const container = document.getElementById('dir-map');
  if(!container) return;

  // Load Leaflet dynamically
  if(!window.L){
    const css = document.createElement('link');
    css.rel='stylesheet'; css.href='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(css);
    const s = document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    s.onload=()=>buildMap(clubs,container);
    document.head.appendChild(s);
  } else {
    buildMap(clubs, container);
  }
}

function buildMap(clubs, container){
  // Clear old map
  if(mapInstance){ mapInstance.remove(); mapInstance=null; }
  mapMarkers=[];

  mapInstance = L.map(container).setView([54.5,-3],6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'© OpenStreetMap contributors',maxZoom:18
  }).addTo(mapInstance);

  clubs.filter(c=>c.lat&&c.lng).forEach(c=>{
    const icon = L.divIcon({
      html: c.logo
        ? `<div style="width:40px;height:40px;border-radius:50%;background:#fff;border:3px solid #c8102e;box-shadow:0 2px 8px rgba(0,0,0,.25);overflow:hidden;display:flex;align-items:center;justify-content:center"><img src="${c.logo}" width="32" height="32" style="object-fit:contain" onerror="this.parentElement.innerHTML='🏉'"></div>`
        : `<div style="width:36px;height:36px;border-radius:50%;background:#0a1628;border:3px solid #c8102e;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.3);font-size:16px">🏉</div>`,
      className:'',iconSize:[40,40],iconAnchor:[20,20]
    });
    const marker = L.marker([parseFloat(c.lat),parseFloat(c.lng)],{icon})
      .addTo(mapInstance)
      .bindPopup(`<div style="min-width:180px">
        ${c.logo?`<img src="${c.logo}" width="48" height="48" style="object-fit:contain;display:block;margin:0 auto 8px;border-radius:6px">` : ''}
        <div style="font-family:Oswald,sans-serif;font-size:.9rem;font-weight:700;color:#0a1628;text-transform:uppercase;margin-bottom:4px">${c.name}</div>
        <div style="font-size:.78rem;color:#7a8c9e;margin-bottom:8px">${[c.city,c.county].filter(Boolean).join(', ')}</div>
        <button onclick="go('club/${c.slug}')" style="background:#c8102e;color:#fff;border:none;padding:6px 12px;border-radius:5px;font-size:.78rem;font-weight:600;cursor:pointer;width:100%">View Profile →</button>
      </div>`,{maxWidth:220});
    mapMarkers.push(marker);
  });
}

function toggleMapView(view){
  const listEl = document.getElementById('u-list');
  const pagEl  = document.getElementById('u-pag');
  const mapEl  = document.getElementById('map-view-container');
  document.querySelectorAll('.vt-btn').forEach(b=>b.classList.remove('active'));
  document.querySelector(`.vt-btn[data-view="${view}"]`)?.classList.add('active');

  if(view==='map'){
    if(listEl) listEl.style.display='none';
    if(pagEl)  pagEl.style.display='none';
    if(mapEl){ mapEl.classList.add('active'); initMapView(S['union'].list); }
  } else {
    if(listEl) listEl.style.display='';
    if(pagEl)  pagEl.style.display='';
    if(mapEl){ mapEl.classList.remove('active'); if(mapInstance){mapInstance.remove();mapInstance=null;} }
  }
}

// ════════════════════════════════════════════════════════════════
//  WEEKLY RESULTS AGENT
//  Fetches latest rugby results from BBC Sport & Sky Sports RSS
//  Runs on page load, caches for 6 hours, updates Results sections
// ════════════════════════════════════════════════════════════════
const RESULTS_CACHE_KEY = 'ukrc_results_v2';
const RESULTS_TTL = 6 * 60 * 60 * 1000; // 6 hours

const RUGBY_FEEDS = {
  union: [
    { name: 'BBC Sport — Rugby Union', url: 'https://feeds.bbci.co.uk/sport/rugby-union/rss.xml', source: 'BBC' },
    { name: 'Premiership Rugby', url: 'https://www.premiershiprugby.com/news/rss', source: 'Prem' },
  ],
  league: [
    { name: 'BBC Sport — Rugby League', url: 'https://feeds.bbci.co.uk/sport/rugby-league/rss.xml', source: 'BBC' },
    { name: 'Super League', url: 'https://www.superleague.co.uk/rss/news/', source: 'SL' },
  ]
};

async function fetchResultsFeed(type) {
  // Check cache first
  try {
    const cached = JSON.parse(localStorage.getItem(RESULTS_CACHE_KEY + '_' + type) || 'null');
    if (cached && (Date.now() - cached.ts < RESULTS_TTL)) {
      return cached.items;
    }
  } catch(e) {}

  // Fetch via CORS proxy (AllOrigins)
  const feeds = RUGBY_FEEDS[type] || RUGBY_FEEDS.union;
  const allItems = [];

  for (const feed of feeds.slice(0, 1)) { // 1 feed per type to avoid rate limits
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`;
      const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const json = await res.json();
      const parser = new DOMParser();
      const xml = parser.parseFromString(json.contents, 'text/xml');
      const items = [...xml.querySelectorAll('item')].slice(0, 6).map(item => ({
        title: item.querySelector('title')?.textContent || '',
        link:  item.querySelector('link')?.textContent || '#',
        date:  item.querySelector('pubDate')?.textContent || '',
        source: feed.source
      }));
      allItems.push(...items);
    } catch(e) { /* fetch failed silently */ }
  }

  if (allItems.length) {
    try {
      localStorage.setItem(RESULTS_CACHE_KEY + '_' + type, JSON.stringify({ts: Date.now(), items: allItems}));
    } catch(e) {}
  }

  return allItems;
}

async function renderResultsInProfile(slug, type) {
  const el = document.getElementById('results-feed-' + slug);
  if (!el) return;

  el.innerHTML = '<div style="text-align:center;padding:12px;color:var(--grey);font-size:.8rem">Loading latest results...</div>';

  const items = await fetchResultsFeed(type);

  if (!items.length) {
    el.innerHTML = '<div style="font-size:.78rem;color:var(--grey);text-align:center;padding:8px">Could not load live results. Check the links above.</div>';
    return;
  }

  el.innerHTML = items.map(item => {
    const d = item.date ? new Date(item.date).toLocaleDateString('en-GB', {day:'numeric',month:'short'}) : '';
    return `<a href="${item.link}" target="_blank" rel="noopener" style="display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--gl);text-decoration:none;">
      <div style="flex-shrink:0;background:var(--navy);color:#fff;font-size:.6rem;font-weight:700;padding:2px 5px;border-radius:4px;margin-top:1px">${item.source}</div>
      <div style="flex:1">
        <div style="font-size:.81rem;color:var(--navy);font-weight:500;line-height:1.4">${item.title}</div>
        ${d?`<div style="font-size:.71rem;color:var(--grey);margin-top:2px">${d}</div>`:''}
      </div>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--grey)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:3px"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </a>`;
  }).join('') + `<div style="font-size:.7rem;color:var(--grey);margin-top:8px;text-align:right">Updated every 6 hours · Source: BBC Sport</div>`;
}

const COUNTIES = {
  'yorkshire':          {name:'Yorkshire',region:'yorkshire',country:'England'},
  'surrey':             {name:'Surrey',region:'london',country:'England'},
  'kent':               {name:'Kent',region:'london',country:'England'},
  'lancashire':         {name:'Lancashire',region:'north-west',country:'England'},
  'greater-manchester': {name:'Greater Manchester',region:'north-west',country:'England'},
  'middlesex':          {name:'Middlesex',region:'london',country:'England'},
  'essex':              {name:'Essex',region:'east',country:'England'},
  'hampshire':          {name:'Hampshire',region:'south-east',country:'England'},
  'gloucestershire':    {name:'Gloucestershire',region:'south-west',country:'England'},
  'somerset':           {name:'Somerset',region:'south-west',country:'England'},
  'devon':              {name:'Devon',region:'south-west',country:'England'},
  'cornwall':           {name:'Cornwall',region:'south-west',country:'England'},
  'northamptonshire':   {name:'Northamptonshire',region:'midlands',country:'England'},
  'leicestershire':     {name:'Leicestershire',region:'midlands',country:'England'},
  'warwickshire':       {name:'Warwickshire',region:'midlands',country:'England'},
  'lincolnshire':       {name:'Lincolnshire',region:'east',country:'England'},
  'suffolk':            {name:'Suffolk',region:'east',country:'England'},
  'west-yorkshire':     {name:'West Yorkshire',region:'yorkshire',country:'England'},
  'south-yorkshire':    {name:'South Yorkshire',region:'yorkshire',country:'England'},
  'north-yorkshire':    {name:'North Yorkshire',region:'yorkshire',country:'England'},
  'glamorgan':          {name:'Glamorgan',region:'wales',country:'Wales'},
  'gwent':              {name:'Gwent',region:'wales',country:'Wales'},
  'pembrokeshire':      {name:'Pembrokeshire',region:'wales',country:'Wales'},
  'lothian':            {name:'Lothian',region:'scotland',country:'Scotland'},
  'strathclyde':        {name:'Strathclyde',region:'scotland',country:'Scotland'},
  'borders':            {name:'Scottish Borders',region:'scotland',country:'Scotland'},
};

let countyState = {clubs:[], page:1, county:'', type:'all', age:'all'};

function loadCounty(countySlug) {
  const cd = COUNTIES[countySlug];
  if(!cd) { go('home'); return; }

  const allClubs = DB.filter(c => {
    const ctyMatch = c.county && c.county.toLowerCase().includes(cd.name.toLowerCase().split(' ')[0]);
    const regionMatch = c.region === cd.region && c.country === cd.country;
    return ctyMatch || (cd.country === 'England' && regionMatch);
  });

  countyState = {clubs:allClubs, page:1, county:countySlug, type:'all', age:'all'};

  // Update page elements
  const set = (id,v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
  const setHTML = (id,v) => { const el=document.getElementById(id); if(el) el.innerHTML=v; };
  const setAttr = (id,attr,v) => { const el=document.getElementById(id); if(el) el.setAttribute(attr,v); };

  set('county-bc', cd.name);
  set('county-h1', `Rugby Clubs in ${cd.name}`);
  set('county-sub', `Find rugby union, rugby league and sports clubs across ${cd.name}.`);
  set('county-cnt', allClubs.length);
  set('county-list-cnt', allClubs.length);
  set('county-dir-title', `Rugby Clubs in ${cd.name}`);
  setAttr('county-region-bc', 'onclick', `go('region/${cd.region}')`);
  set('county-region-bc', cd.region.charAt(0).toUpperCase()+cd.region.slice(1).replace(/-/g,' '));

  // Reset filters
  document.querySelectorAll('#county-type-filters .fb, #county-age-filters .fb').forEach(b=>b.classList.remove('active'));
  document.querySelector('#county-type-filters .fb')?.classList.add('active');
  document.querySelector('#county-age-filters .fb')?.classList.add('active');

  renderCountyClubs();

  // SEO
  const kw = `rugby clubs ${cd.name}, rugby ${cd.name}, rugby union ${cd.name}, rugby league ${cd.name}, find rugby club ${cd.name}, rugby near me ${cd.name}, ${cd.name} rugby teams, junior rugby ${cd.name}, women's rugby ${cd.name}`;
  setMeta(
    `Rugby Clubs in ${cd.name} | Find a Club Near Me | UK Rugby Club Directory`,
    `Find ${allClubs.length} rugby clubs in ${cd.name}. Browse rugby union and rugby league clubs with contact details, training times and maps. Join a club near you today.`,
    kw,
    `#county/${countySlug}`,
    {"@context":"https://schema.org","@type":"CollectionPage","name":`Rugby Clubs in ${cd.name}`,"url":`https://ukrugbyclubdirectory.co.uk/#county/${countySlug}`,"description":`${allClubs.length} rugby clubs in ${cd.name}`,"numberOfItems":allClubs.length},
    {geoRegion: cd.country==='Scotland'?'GB-SCT':cd.country==='Wales'?'GB-WLS':'GB-ENG', geoPlacename: cd.name}
  );
}

function renderCountyClubs() {
  let list = [...countyState.clubs];
  if(countyState.type !== 'all') list = list.filter(c=>c.type===countyState.type);
  if(countyState.age !== 'all') {
    const age = countyState.age;
    list = list.filter(c=>{
      const tags=(c.teams||'').toLowerCase();
      if(age==='Mini') return tags.includes('mini')||tags.includes('u7')||tags.includes('u8');
      if(age==='Junior') return tags.includes('junior')||tags.includes('u11')||tags.includes('u14');
      if(age==='Women') return tags.includes('women')||tags.includes('ladies');
      if(age==='Vets') return tags.includes('vet');
      return true;
    });
  }
  const srch = (document.getElementById('county-srch')?.value||'').toLowerCase();
  if(srch) list = list.filter(c=>c.name.toLowerCase().includes(srch)||c.city.toLowerCase().includes(srch));
  const el = document.getElementById('county-clubs-list');
  if(el) el.innerHTML = list.length ? list.map(clubCard).join('') : emptyState();
  const cnt = document.getElementById('county-list-cnt');
  if(cnt) cnt.textContent = list.length;
}

function filtCounty(type,btn) {
  document.querySelectorAll('#county-type-filters .fb').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  countyState.type = type;
  renderCountyClubs();
}

function filtCountyAge(age,btn) {
  document.querySelectorAll('#county-age-filters .fb').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  countyState.age = age;
  renderCountyClubs();
}

function srchCounty(q) {
  renderCountyClubs();
}

function route() {
  // Read from clean path (Item 7) or ?p= fallback or hash
  const pathRaw = location.pathname.replace(/^\//, '');
  const urlP    = new URLSearchParams(location.search).get('p') || '';
  const hashP   = location.hash.replace('#','');
  const raw     = pathRaw && pathRaw !== '' ? pathRaw : urlP || hashP || 'home';
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
  else if (page === 'about')           { showPg('pg-about');
    setMeta('About UK Rugby Club Directory | Free Rugby Club Listings UK','The UK\'s most comprehensive free rugby club directory. 773+ club profiles across England, Scotland, Wales and Northern Ireland. Independent, free and unaffiliated.','about UK rugby club directory, rugby club directory UK, free rugby club listings','about',{"@context":"https://schema.org","@type":"AboutPage","name":"About UK Rugby Club Directory","url":"https://ukrugbyclubdirectory.co.uk/about"});
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
  else if (page === 'county' && param) {
    showPg('pg-county');
    loadCounty(param);
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

  window.scrollTo(0,0);
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
  // Push clean path URL to browser bar (Item 7 — path-based URLs)
  // e.g. /club/leicester-tigers instead of ?p=club/leicester-tigers
  const cleanPath = '/' + path;
  history.pushState({p: path}, '', cleanPath);
  // Trigger route directly
  route();
}

// Handle browser back/forward with clean paths
window.addEventListener('popstate', function(e) {
  route();
});

// load fires on initial page load
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
  // Strip legacy hash-prefix so canonicals use clean paths, not fragment URLs.
  // e.g. '#club/st-annes-rugby-club' → 'club/st-annes-rugby-club'
  //      '#home' → '' (homepage = site root)
  url = (url || '').replace(/^#/, '');
  if (url === 'home') url = '';
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
//  CLUB PROFILE PAGE — Yell-style layout
//  Left: logo + name, about, details list, nearby clubs
//  Right sidebar: contact card, map, share, own this listing
// ════════════════════════════════════════════════════════════════
function renderClubPage(slug) {
  const c = slugMap[slug];
  if (!c) { document.getElementById('pg-club').innerHTML = '<div class="con sec" style="padding:60px 0 80px"><h2 style="font-family:var(--fd);font-size:1.5rem;text-transform:uppercase;color:var(--navy);margin-bottom:12px">Club not found</h2><p><a onclick="go(&quot;home&quot;)" style="color:var(--red);cursor:pointer;font-weight:600">← Back to home</a></p></div>'; return; }

  const tl     = c.type==='union'?'Rugby Union':c.type==='league'?'Rugby League':'Rugby Business';
  const tc     = c.type;
  const nation = c.country;
  const loc    = [c.city, c.county].filter(Boolean).join(', ');
  const fullLoc= [c.city, c.county, c.country].filter(Boolean).join(', ');

  // ── SEO ──
  const pageTitle = `${c.name} – ${tl} Club in ${c.city||c.county}, ${nation} | UK Rugby Club Directory`;
  const pageDesc  = `${c.name} is a ${tl.toLowerCase()} club based in ${fullLoc}. ${c.desc.slice(0,110).trimEnd()}. Find address, phone, email, directions and more.`;
  const pageKw    = [c.name,`${c.name} rugby club`,`${tl.toLowerCase()} club ${c.city}`,`rugby ${c.city}`,`rugby ${c.county}`,`rugby near me ${c.city}`,`${c.type} clubs ${nation}`,c.city+' rugby',c.county+' rugby clubs',nation+' rugby clubs','find a rugby club','rugby near me',SITE_NAME].filter(Boolean).join(', ');
  const pageUrl   = `#club/${slug}`;
  const schema = {"@context":"https://schema.org","@type":"SportsOrganization","name":c.name,"sport":"Rugby","description":c.desc,"address":{"@type":"PostalAddress","streetAddress":c.address||undefined,"addressLocality":c.city,"addressRegion":c.county,"addressCountry":"GB"},"url":c.website&&c.website.startsWith('http')?c.website:`https://ukrugbyclubdirectory.co.uk/${pageUrl}`,"telephone":c.phone||undefined,"email":c.email||undefined,"logo":c.logo||undefined,"aggregateRating":c.rating?{"@type":"AggregateRating","ratingValue":c.rating,"bestRating":"5","worstRating":"1","reviewCount":"10"}:undefined,"sameAs":c.website&&c.website.startsWith('http')?[c.website]:undefined,"geo":c.lat&&c.lng?{"@type":"GeoCoordinates","latitude":c.lat,"longitude":c.lng}:undefined};
  const geoOpts = c.lat&&c.lng?{geoRegion:nation==='Scotland'?'GB-SCT':nation==='Wales'?'GB-WLS':nation==='Northern Ireland'?'GB-NIR':'GB-ENG',geoPlacename:fullLoc,geoPos:`${c.lat};${c.lng}`,icbm:`${c.lat}, ${c.lng}`,ogType:'place'}:{};
  setMeta(pageTitle,pageDesc,pageKw,pageUrl,schema,geoOpts);

  // ── Stars helper ──
  const starsHtml = r => {
    let h = '<span class="y-stars">';
    for(let i=1;i<=5;i++) h += `<svg width="14" height="14" viewBox="0 0 24 24" fill="${i<=Math.round(r)?'#f5a623':'#ddd'}" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    h += '</span>'; return h;
  };

  // ── Logo ──
  const logoHtml = c.logo
    ? `<img class="y-logo" src="${c.logo}" alt="${c.name} badge" onerror="this.style.display='none'">`
    : `<div class="y-logo-ph">${ballSvg()}</div>`;

  // ── Type badge colour ──
  const badgeClass = tc==='union'?'y-badge-union':tc==='league'?'y-badge-league':'y-badge-biz';

  // ── Region label ──
  const regionMap = {'north-west':'North West','yorkshire':'Yorkshire','london':'London & SE','midlands':'Midlands','south-west':'South West','north-east':'North East','east':'East England','wales':'Wales','scotland':'Scotland','northern-ireland':'N. Ireland'};
  const regionLabel = regionMap[c.region]||c.country;
  const dirUrl = c.lat&&c.lng?`https://www.google.com/maps/search/${encodeURIComponent(c.name)}/@${c.lat},${c.lng},15z`:`https://www.google.com/maps/search/${encodeURIComponent(c.address||c.name)}`;

  // ── Nearby clubs ──
  const nearby = DB.filter(x=>x.id!==c.id&&(x.region===c.region||x.country===c.country)&&x.type===c.type).slice(0,6);

  const html = `
  <!-- YELL-STYLE PROFILE PAGE -->
  <div style="background:#f5f5f5;min-height:100vh;padding-bottom:40px">

    <!-- BREADCRUMB -->
    <div style="background:#fff;border-bottom:1px solid #e4e9f0">
      <div class="con" style="padding-top:10px;padding-bottom:10px">
        <nav class="bc" style="color:#7a8c9e">
          <a onclick="go('home')" style="color:#7a8c9e">Home</a><span style="color:#d1d5db;margin:0 3px">›</span>
          <a onclick="go('rugby-${tc==='business'?'businesses':tc}')" style="color:#7a8c9e">${tc==='union'?'Rugby Union':tc==='league'?'Rugby League':'Businesses'}</a><span style="color:#d1d5db;margin:0 3px">›</span>
          <a onclick="go('region/${c.region}')" style="color:#7a8c9e">${regionLabel}</a><span style="color:#d1d5db;margin:0 3px">›</span>
          <span style="color:#0a1628;font-weight:600">${c.name}</span>
        </nav>
      </div>
    </div>

    <!-- HEADER BAR -->
    <div style="background:#fff;border-bottom:1px solid #e4e9f0;padding:22px 0">
      <div class="con" style="display:flex;align-items:flex-start;gap:20px;flex-wrap:wrap">
        <!-- Logo -->
        <div class="y-logo-wrap">${logoHtml}</div>
        <!-- Info -->
        <div style="flex:1;min-width:0">
          <span class="y-badge ${badgeClass}">${tl}</span>
          <h1 class="y-title">${c.name}</h1>
          ${c.rating?`<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">${starsHtml(parseFloat(c.rating))}<span style="font-size:.88rem;color:#333;font-weight:600">${c.rating}</span><span style="font-size:.82rem;color:#888">Google rating</span></div>`:''}
          <div style="display:flex;align-items:center;gap:6px;font-size:.88rem;color:#555;margin-bottom:10px">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${c.address||fullLoc}
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:10px">
            ${(()=>{
              const lv=c.league||'';
              const lvClass=lv.toLowerCase().includes('premiership')||lv.toLowerCase().includes('super league')?'level-prem':lv.toLowerCase().includes('national 1')||lv.toLowerCase().includes('championship')?'level-nat1':lv.toLowerCase().includes('regional')||lv.toLowerCase().includes('division')?'level-regional':'level-county';
              return lv?`<span class="level-badge ${lvClass}">${lv}</span>`:'';
            })()}
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            ${c.website&&c.website.startsWith('http')?`<a href="${c.website}" target="_blank" rel="noopener" class="y-btn-primary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> Visit Website</a>`:''}
            ${c.phone?`<a href="tel:${c.phone}" class="y-btn-outline"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.69A2 2 0 012 .89h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg> ${c.phone}</a>`:''}
            ${c.phone?`<a href="https://wa.me/${c.phone.replace(/[^0-9]/g,'')}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;background:#25d366;color:#fff;padding:8px 14px;border-radius:7px;font-size:.85rem;font-weight:600;text-decoration:none"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg> WhatsApp</a>`:''}
            <a href="${dirUrl}" target="_blank" rel="noopener" class="y-btn-outline"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg> Get Directions</a>
            <button class="follow-btn${isFollowing(c.slug)?' following':''}" data-slug="${c.slug}" onclick="event.stopPropagation();toggleFollow('${c.slug}','${c.name.replace(/'/g,"\'")}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFollowing(c.slug)?'currentColor':'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              ${isFollowing(c.slug)?'Following':'Follow'}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="con" style="padding-top:24px">
      <div class="y-layout">

        <!-- LEFT COLUMN -->
        <div class="y-main">

          <!-- ── ABOUT ─────────────────────────────────── -->
          <div class="y-card">
            <h2 class="y-card-title">About ${c.name}</h2>
            <p style="font-size:.93rem;color:#444;line-height:1.8;margin-bottom:14px">${c.desc}</p>
            ${(()=>{
              // Team tags section
              const tags=(c.teams||'').split(',').map(t=>t.trim()).filter(Boolean);
              if(!tags.length) return '';
              const tagHtml=tags.map(t=>`<span class="team-tag">${t}</span>`).join('');
              return `<div style="margin-bottom:14px"><div style="font-size:.72rem;font-weight:700;color:var(--grey);text-transform:uppercase;letter-spacing:.5px;margin-bottom:7px">Teams Available</div><div class="cc-teams">${tagHtml}</div></div>`;
            })()}
            ${c.website&&c.website.startsWith('http')?`<a href="${c.website}" target="_blank" rel="noopener" style="color:var(--red);font-weight:600;font-size:.9rem">Visit official website →</a>`:''}
          </div>

          <!-- ── TEAMS & AGE GROUPS ──────── -->

          <div class="y-card">
            <h2 class="y-card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:6px"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              Teams & Age Groups
            </h2>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
              ${(()=>{
                const allTeams = c.teams ? c.teams.split(',').map(t=>t.trim()).filter(Boolean) :
                  c.type==='union' ? ['Senior XV','Junior Section','Mini Rugby','Colts (U18)'] :
                  c.type==='league' ? ['Senior XIII','Junior Section'] : ['Senior Team'];
                const icons = {
                  'Mini':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>',
                  'Junior':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
                  'Senior':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(-30 12 12)"/></svg>',
                  'Women':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M12 12v8M8 18h8"/></svg>',
                  'Vets':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
                };
                return allTeams.map(t=>{
                  const key = Object.keys(icons).find(k=>t.toLowerCase().includes(k.toLowerCase()))||'Senior';
                  return `<div style="background:var(--off);border-radius:8px;padding:10px 12px;border:1px solid var(--gl);display:flex;align-items:center;gap:8px">
                    ${icons[key]||icons.Senior}
                    <span style="font-size:.82rem;font-weight:600;color:var(--navy)">${t}</span>
                  </div>`;
                }).join('');
              })()}
            </div>
            <div style="background:#fef3c7;border-radius:8px;padding:10px 13px;border:1px solid #fde68a;font-size:.78rem;color:#92400e">
              <strong>New to rugby?</strong> ${c.name} welcomes players of all experience levels. Contact the club to arrange a free trial session.
            </div>
          </div>

          <!-- ── HISTORY & HONOURS ─────────────────────── -->
          <div class="y-card">
            <h2 class="y-card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:6px"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
              History & Honours
            </h2>

            <!-- Key Stats Row -->
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px">
              <div style="text-align:center;background:var(--navy);border-radius:10px;padding:14px 6px">
                <div style="font-size:1.35rem;font-weight:700;color:var(--gold);line-height:1;font-family:var(--fd)">${c.founded||'N/A'}</div>
                <div style="font-size:.62rem;color:rgba(255,255,255,.65);text-transform:uppercase;letter-spacing:.5px;margin-top:4px">Founded</div>
              </div>
              <div style="text-align:center;background:var(--off);border-radius:10px;padding:14px 6px;border:1px solid var(--gl)">
                <div style="font-size:.78rem;font-weight:700;color:var(--navy);line-height:1.3">${c.colours||'See website'}</div>
                <div style="font-size:.62rem;color:var(--grey);text-transform:uppercase;letter-spacing:.5px;margin-top:4px">Kit Colours</div>
              </div>
              <div style="text-align:center;background:var(--off);border-radius:10px;padding:14px 6px;border:1px solid var(--gl)">
                <div style="font-size:.78rem;font-weight:700;color:var(--navy);line-height:1.3">${tc==='union'?nation+' Rugby':'Rugby League'}</div>
                <div style="font-size:.62rem;color:var(--grey);text-transform:uppercase;letter-spacing:.5px;margin-top:4px">Governing Body</div>
              </div>
              <div style="text-align:center;background:var(--off);border-radius:10px;padding:14px 6px;border:1px solid var(--gl)">
                <div style="font-size:.78rem;font-weight:700;color:var(--navy);line-height:1.3">${c.league||tl}</div>
                <div style="font-size:.62rem;color:var(--grey);text-transform:uppercase;letter-spacing:.5px;margin-top:4px">Current League</div>
              </div>
            </div>

            <!-- Club History Narrative -->
            <div style="background:var(--off);border-radius:10px;padding:14px 16px;border-left:3px solid var(--red);margin-bottom:14px">
              <div style="font-size:.72rem;font-weight:700;color:var(--red);text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">Club History</div>
              <p style="font-size:.86rem;color:var(--gd);line-height:1.75;margin:0">
                ${c.founded
                  ? `${c.name} was founded in ${c.founded} and has been a pillar of ${tc==='union'?'rugby union':'rugby league'} in ${c.city||c.county||c.country} for over ${new Date().getFullYear()-parseInt(c.founded)} years. ${c.colours?`The club plays in ${c.colours}.`:''} ${c.league?`Currently competing in the ${c.league}.`:''} ${c.desc}`
                  : c.desc}
              </p>
            </div>

            <!-- Honours List -->
            ${c.honours ? `
            <div style="margin-bottom:0">
              <div style="font-size:.72rem;font-weight:700;color:var(--grey);text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px;display:flex;align-items:center;gap:6px">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                Honours & Achievements
              </div>
              <div style="display:flex;flex-direction:column;gap:6px">
                ${c.honours.split(',').map(h=>h.trim()).filter(Boolean).map(h=>`
                <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:#fff;border:1px solid var(--gl);border-radius:8px">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style="font-size:.84rem;color:var(--navy);font-weight:500">${h}</span>
                </div>`).join('')}
              </div>
            </div>` : `
            <div style="text-align:center;padding:16px;background:var(--off);border-radius:8px;border:1px dashed var(--gl)">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gl)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:0 auto 8px"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
              <div style="font-size:.8rem;color:var(--grey);margin-bottom:6px">Honours not yet listed for this club</div>
              <a onclick="go('register')" style="font-size:.75rem;color:var(--red);font-weight:600;cursor:pointer">Own this club? Add your honours →</a>
            </div>`}
          </div>

          <!-- ── MEDIUM IMPACT: MEMBERSHIP & HOW TO JOIN ─ -->
          <div class="y-card" style="border:2px solid var(--red)">
            <h2 class="y-card-title" style="color:var(--red)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:6px"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
              How to Join ${c.name}
            </h2>
            <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:14px">
              <div style="display:flex;align-items:flex-start;gap:10px">
                <div style="width:26px;height:26px;background:var(--red);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:.75rem;font-weight:700">1</div>
                <div><div style="font-size:.84rem;font-weight:600;color:var(--navy)">Get in touch</div><div style="font-size:.78rem;color:var(--grey);margin-top:2px">${c.phone?`Call ${c.phone} or`:''} ${c.email?`email ${c.email} to`:'Contact the club to'} express your interest</div></div>
              </div>
              <div style="display:flex;align-items:flex-start;gap:10px">
                <div style="width:26px;height:26px;background:var(--red);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:.75rem;font-weight:700">2</div>
                <div><div style="font-size:.84rem;font-weight:600;color:var(--navy)">Come for a trial</div><div style="font-size:.78rem;color:var(--grey);margin-top:2px">Most clubs offer a free trial session — just turn up to a training session</div></div>
              </div>
              <div style="display:flex;align-items:flex-start;gap:10px">
                <div style="width:26px;height:26px;background:var(--red);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:.75rem;font-weight:700">3</div>
                <div><div style="font-size:.84rem;font-weight:600;color:var(--navy)">Register & join</div><div style="font-size:.78rem;color:var(--grey);margin-top:2px">Complete your RFU/WRU registration and pay your club membership fee</div></div>
              </div>
            </div>
            ${c.phone?`<a href="tel:${c.phone}" class="y-btn-primary" style="width:100%;justify-content:center;margin-bottom:8px">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.69A2 2 0 012 .89h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              Call to Enquire
            </a>`:''}
            ${c.email?`<a href="mailto:${c.email}?subject=New member enquiry — ${encodeURIComponent(c.name)}" class="y-btn-outline" style="width:100%;justify-content:center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>
              Email New Member Enquiry
            </a>`:''}
          </div>

          <!-- ── MEDIUM IMPACT: FACILITIES ─────────────── -->
          <div class="y-card">
            <h2 class="y-card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:6px"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              Ground & Facilities
            </h2>
            ${c.facilities?`<p style="font-size:.87rem;color:var(--gd);line-height:1.7;margin-bottom:12px">${c.facilities}</p>`:
            `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
              ${['Changing Rooms','Clubhouse / Bar','Parking','Match Pitch'].map(f=>`
              <div style="display:flex;align-items:center;gap:7px;font-size:.8rem;color:var(--grey)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gl)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                ${f} — not listed
              </div>`).join('')}
            </div>
            <a onclick="go('register')" style="font-size:.78rem;color:var(--red);font-weight:600;cursor:pointer">Own this club? Add facilities info →</a>`}
            <div class="y-map" onclick="window.open('${dirUrl}','_blank')" style="cursor:pointer;border-radius:8px;margin-top:12px">
              <div style="text-align:center;padding:22px 16px">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:0 auto 7px"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <p style="font-size:.82rem;color:#555;margin-bottom:3px">${c.address||fullLoc}</p>
                <span style="font-size:.78rem;font-weight:600;color:var(--red)">View on Google Maps →</span>
              </div>
            </div>
          </div>

          <!-- Club Details table -->
          <div class="y-card">
            <h2 class="y-card-title">Club Details</h2>
            <table class="y-table">
              <tr><td class="y-td-lbl">Sport Type</td><td class="y-td-val">${tl}</td></tr>
              <tr><td class="y-td-lbl">Nation</td><td class="y-td-val">${nation}</td></tr>
              <tr><td class="y-td-lbl">Region</td><td class="y-td-val">${regionLabel}</td></tr>
              ${c.city?`<tr><td class="y-td-lbl">City / Town</td><td class="y-td-val">${c.city}</td></tr>`:''}
              ${c.county?`<tr><td class="y-td-lbl">County</td><td class="y-td-val">${c.county}</td></tr>`:''}
              ${c.address?`<tr><td class="y-td-lbl">Address</td><td class="y-td-val">${c.address}</td></tr>`:''}
              ${c.phone?`<tr><td class="y-td-lbl">Phone</td><td class="y-td-val"><a href="tel:${c.phone}" style="color:var(--red)">${c.phone}</a></td></tr>`:''}
              ${c.email?`<tr><td class="y-td-lbl">Email</td><td class="y-td-val"><a href="mailto:${c.email}" style="color:var(--red)">${c.email}</a></td></tr>`:''}
              ${c.website&&c.website.startsWith('http')?`<tr><td class="y-td-lbl">Website</td><td class="y-td-val"><a href="${c.website}" target="_blank" rel="noopener" style="color:var(--red)">${c.website.replace(/^https?:\/\//,'').replace(/\/$/,'')}</a></td></tr>`:''}
              ${c.rating?`<tr><td class="y-td-lbl">Google Rating</td><td class="y-td-val">${starsHtml(parseFloat(c.rating))} ${c.rating}/5</td></tr>`:''}
            </table>
          </div>

          <!-- ── QUICK WIN: MATCH RESULTS LINKS ─────────────────── -->
          ${tc!=='business'?`
          <div class="y-card">
            <h2 class="y-card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:6px"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              Results & League Tables
            </h2>
            <div style="display:flex;flex-direction:column;gap:8px">
              ${nation==='England'&&tc==='union'?`<a href="https://www.englandrugby.com/clubs-and-volunteers/find-a-club" target="_blank" rel="noopener" class="y-contact-row" style="text-decoration:none">
                <div class="y-contact-ico"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z"/></svg></div>
                <div><div style="font-size:.78rem;font-weight:600;color:var(--navy)">England Rugby — Club Finder & Results</div><div style="font-size:.72rem;color:var(--grey)">englandrugby.com</div></div>
              </a>`:''}
              ${nation==='Wales'&&tc==='union'?`<a href="https://www.wru.wales/clubs/" target="_blank" rel="noopener" class="y-contact-row" style="text-decoration:none">
                <div class="y-contact-ico"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z"/></svg></div>
                <div><div style="font-size:.78rem;font-weight:600;color:var(--navy)">Welsh Rugby Union — Club Directory</div><div style="font-size:.72rem;color:var(--grey)">wru.wales</div></div>
              </a>`:''}
              ${nation==='Scotland'&&tc==='union'?`<a href="https://www.scottishrugby.org/club-rugby/" target="_blank" rel="noopener" class="y-contact-row" style="text-decoration:none">
                <div class="y-contact-ico"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z"/></svg></div>
                <div><div style="font-size:.78rem;font-weight:600;color:var(--navy)">Scottish Rugby — Club Rugby</div><div style="font-size:.72rem;color:var(--grey)">scottishrugby.org</div></div>
              </a>`:''}
              ${tc==='league'?`<a href="https://www.rugby-league.com/results" target="_blank" rel="noopener" class="y-contact-row" style="text-decoration:none">
                <div class="y-contact-ico"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z"/></svg></div>
                <div><div style="font-size:.78rem;font-weight:600;color:var(--navy)">Rugby League — Results & Tables</div><div style="font-size:.72rem;color:var(--grey)">rugby-league.com</div></div>
              </a>`:''}
              <div style="font-size:.75rem;color:var(--grey);padding:4px 0">Live results and league tables are managed by the relevant governing body. Visit the links above to find ${c.name} fixtures and results.</div>
            </div>
            <!-- Live results feed -->
            <div id="results-feed-${c.slug}" style="margin-top:12px"></div>
          </div>`:''}

          <!-- Nearby Clubs -->
          ${nearby.length?`
          <div class="y-card">
            <h2 class="y-card-title">More ${tl} Clubs Near ${c.city||c.county}</h2>
            <div class="y-nearby">
              ${nearby.map(n=>`
              <div class="y-nearby-item" onclick="go('club/${n.slug}')" role="button" tabindex="0">
                <div class="y-nearby-logo">
                  ${n.logo?`<img src="${n.logo}" alt="${n.name}" loading="lazy" onerror="this.style.display='none'">`:`<div style="color:var(--grey)">${ballSvg()}</div>`}
                </div>
                <div style="flex:1;min-width:0">
                  <div class="y-nearby-name">${n.name}</div>
                  <div class="y-nearby-loc">${[n.city,n.county].filter(Boolean).join(', ')}</div>
                </div>
                ${n.lat&&n.lng&&userLat?`<div style="font-size:.7rem;color:var(--grey);flex-shrink:0">${haversine(userLat,userLng,parseFloat(n.lat),parseFloat(n.lng)).toFixed(1)} mi</div>`:''}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>`).join('')}
            </div>
          </div>`:''}

        </div>

        <!-- RIGHT SIDEBAR -->
        <div class="y-sidebar">

          <!-- Contact Card -->
          <div class="y-card">
            <h3 class="y-sidebar-title">Contact ${c.name}</h3>
            ${c.phone?`
            <a href="tel:${c.phone}" class="y-contact-row">
              <div class="y-contact-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.69A2 2 0 012 .89h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg></div>
              <div><span style="display:block;font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.4px;margin-bottom:1px">Phone</span><span style="font-size:.9rem;color:var(--red);font-weight:600">${c.phone}</span></div>
            </a>`:''}
            ${c.email?`
            <a href="mailto:${c.email}" class="y-contact-row">
              <div class="y-contact-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg></div>
              <div><span style="display:block;font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.4px;margin-bottom:1px">Email</span><span style="font-size:.9rem;color:var(--red);font-weight:600">${c.email}</span></div>
            </a>`:''}
            ${c.address?`
            <div class="y-contact-row">
              <div class="y-contact-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div><span style="display:block;font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.4px;margin-bottom:1px">Address</span><span style="font-size:.88rem;color:#333">${c.address}</span></div>
            </div>`:''}
            <a href="${dirUrl}" target="_blank" rel="noopener" class="y-btn-primary" style="display:flex;align-items:center;justify-content:center;gap:7px;margin-top:14px;width:100%;text-align:center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              Get Directions
            </a>
            ${c.phone?`<a href="https://wa.me/${c.phone.replace(/[^0-9+]/g,'')}" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;gap:7px;margin-top:8px;width:100%;padding:9px 18px;border-radius:7px;background:#25d366;color:#fff;font-size:.85rem;font-weight:600;text-decoration:none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              WhatsApp the Club
            </a>`:''}
            ${c.website&&c.website.startsWith('http')?`<a href="${c.website}" target="_blank" rel="noopener" class="y-btn-outline" style="display:flex;align-items:center;justify-content:center;gap:7px;margin-top:8px;width:100%;text-align:center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
              Visit Website
            </a>`:''}
          </div>

          <!-- Social Media Links — quick win ───────────── -->
          ${(()=>{
            const socials = [];
            if(c.facebook) socials.push(`<a href="${c.facebook}" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:#f0f2ff;border-radius:7px;font-size:.8rem;font-weight:600;color:#1877f2;text-decoration:none"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>Facebook Page</a>`);
            if(c.twitter) socials.push(`<a href="${c.twitter}" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:#f0f7ff;border-radius:7px;font-size:.8rem;font-weight:600;color:#1da1f2;text-decoration:none"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>Twitter / X</a>`);
            if(c.instagram) socials.push(`<a href="${c.instagram}" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:#fdf0f8;border-radius:7px;font-size:.8rem;font-weight:600;color:#c13584;text-decoration:none"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>Instagram</a>`);
            if(!socials.length) return '';
            return `<div class="y-card"><h3 class="y-sidebar-title">Follow on Social Media</h3><div style="display:flex;flex-direction:column;gap:7px">${socials.join('')}</div></div>`;
          })()}

          <!-- Map -->
          <div class="y-card" style="padding:0;overflow:hidden">
            <div class="y-map" onclick="window.open('${dirUrl}','_blank')" style="cursor:pointer">
              <div style="text-align:center;padding:28px 16px">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 8px;display:block"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <p style="font-size:.85rem;color:#555;margin-bottom:4px">${c.address||fullLoc}</p>
                <span style="font-size:.8rem;font-weight:600;color:var(--red)">View on Google Maps →</span>
              </div>
            </div>
          </div>

          <!-- Share -->
          <div class="y-card">
            <h3 class="y-sidebar-title">Share this listing</h3>
            <div style="display:flex;gap:8px">
              <button class="y-share-btn" style="background:#1da1f2" onclick="window.open('https://twitter.com/intent/tweet?text=Find ${encodeURIComponent(c.name)} on the UK Rugby Club Directory&url=https://ukrugbyclubdirectory.co.uk/%23club/${c.slug}','_blank')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </button>
              <button class="y-share-btn" style="background:#1877f2" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=https://ukrugbyclubdirectory.co.uk/%23club/${c.slug}','_blank')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </button>
              <button class="y-share-btn" style="background:#25d366" onclick="window.open('https://wa.me/?text=Find ${encodeURIComponent(c.name)} at https://ukrugbyclubdirectory.co.uk/%23club/${c.slug}','_blank')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              </button>
              <button class="y-share-btn" style="background:#555" onclick="navigator.clipboard.writeText('https://ukrugbyclubdirectory.co.uk/#club/${c.slug}').then(()=>this.title='Copied!')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              </button>
            </div>
          </div>

          <!-- Shop + Social links -->
          ${(()=>{
            const items=[];
            if(c.website&&c.website.startsWith('http')) items.push(`<a href="${c.website}/shop" target="_blank" rel="noopener" class="shop-btn"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg> Club Shop & Kit</a>`);
            return items.length?`<div class="y-card">${items.join('')}<div style="font-size:.72rem;color:var(--grey);margin-top:4px;text-align:center">Link opens club website shop</div></div>`:'';
          })()}

          <!-- Amenities quick-view -->
          <div class="y-card">
            <h3 class="y-sidebar-title">Amenities</h3>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
              <div class="amenity-badge ${c.facilities&&c.facilities.toLowerCase().includes('bar')?'yes':'no'}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
                Bar
              </div>
              <div class="amenity-badge ${c.facilities&&c.facilities.toLowerCase().includes('parking')?'yes':'no'}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                Parking
              </div>
              <div class="amenity-badge ${c.facilities&&(c.facilities.toLowerCase().includes('changing')||c.facilities.toLowerCase().includes('clubhouse'))?'yes':'no'}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                Clubhouse
              </div>
              <div class="amenity-badge ${c.facilities&&c.facilities.toLowerCase().includes('famil')?'yes':'no'}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                Family
              </div>
            </div>
            ${c.facilities?`<p style="font-size:.74rem;color:var(--grey);margin-top:8px;line-height:1.5">${c.facilities.slice(0,100)}${c.facilities.length>100?'…':''}</p>`:''}
          </div>

          <!-- Vibe Tags -->
          <div class="y-card">
            <h3 class="y-sidebar-title">Club Vibes</h3>
            <p style="font-size:.74rem;color:var(--grey);margin-bottom:10px">Tap to add your experience</p>
            <div class="vibe-tags" id="vibe-tags-${c.slug}"></div>
          </div>

          <!-- Claim this listing — Item 6 -->
          <div class="y-card claim-card" id="claim-${c.slug}">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span style="font-size:.83rem;font-weight:700;color:var(--navy);text-transform:uppercase;letter-spacing:.4px">Own this club?</span>
            </div>
            <p style="font-size:.78rem;color:var(--grey);line-height:1.6;margin-bottom:12px">Claim your free listing to update contact details, add training times, upload your badge and more.</p>
            <div id="claim-form-${c.slug}">
              <div style="margin-bottom:8px"><input type="text" id="claim-name-${c.slug}" placeholder="Your name" style="width:100%;padding:8px 10px;border:2px solid var(--gl);border-radius:6px;font-size:.82rem;outline:none"></div>
              <div style="margin-bottom:8px"><input type="email" id="claim-email-${c.slug}" placeholder="Club email address" style="width:100%;padding:8px 10px;border:2px solid var(--gl);border-radius:6px;font-size:.82rem;outline:none"></div>
              <div style="margin-bottom:10px"><select id="claim-role-${c.slug}" style="width:100%;padding:8px 10px;border:2px solid var(--gl);border-radius:6px;font-size:.82rem;color:var(--gd);outline:none;background:#fff">
                <option value="">Your role at the club</option>
                <option>Club Secretary</option>
                <option>Club Chairman</option>
                <option>Head Coach</option>
                <option>Team Manager</option>
                <option>Club Member</option>
              </select></div>
              <button onclick="submitClaim('${c.slug}','${c.name.replace(/'/g,'&#39;')}')" class="y-btn-primary" style="width:100%;justify-content:center">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Claim Free Listing
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- MORE CLUBS -->
      <div class="y-card" style="margin-top:24px">
        <h2 class="y-card-title">More ${tl} Clubs in ${nation}</h2>
        <div class="cg3">${DB.filter(x=>x.id!==c.id&&x.country===c.country&&x.type===c.type).slice(0,6).map(clubCard).join('')}</div>
      </div>
    </div>
  </div>`;

  document.getElementById('pg-club').innerHTML = html;
  // Init vibe tags after render
  renderVibeTags(c.slug);
  // Re-render MyClubs bar
  renderMyClubsBar();
  // Load live results feed
  setTimeout(() => renderResultsInProfile(c.slug, c.type), 300);
}

function submitClaim(slug, clubName) {
  const name  = (document.getElementById('claim-name-'+slug)||{}).value||'';
  const email = (document.getElementById('claim-email-'+slug)||{}).value||'';
  const role  = (document.getElementById('claim-role-'+slug)||{}).value||'';
  if(!name||!email) { alert('Please enter your name and email address.'); return; }
  if(!email.includes('@')) { alert('Please enter a valid email address.'); return; }
  // In production this would POST to a backend/Netlify function
  // For now show confirmation and log
  const form = document.getElementById('claim-form-'+slug);
  if(form) form.innerHTML = `<div style="text-align:center;padding:12px 0">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:0 auto 8px"><polyline points="20 6 9 17 4 12"/></svg>
    <div style="font-size:.85rem;font-weight:700;color:var(--navy);margin-bottom:4px">Request Received!</div>
    <div style="font-size:.77rem;color:var(--grey);line-height:1.6">We'll verify your connection to ${clubName} and be in touch at ${email} within 2 business days.</div>
  </div>`;
  console.log('Claim request:', {slug, clubName, name, email, role});
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
    if(tf==='beginner'){
      // Show all union/league clubs — all welcome beginners
      if(c.type==='business') return false;
    } else if(tf&&c.type!==tf) return false;
    if(q) return fuzzy(c.name,q)||fuzzy(c.city,q)||fuzzy(c.county,q)||fuzzy(c.country,q);
    return true;
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
  // Sort by distance if active
  if(distSortActive && userLat && userLng){
    S[type].list.sort((a,b)=>{
      const da=a.lat&&a.lng?haversine(userLat,userLng,parseFloat(a.lat),parseFloat(a.lng)):9999;
      const db=b.lat&&b.lng?haversine(userLat,userLng,parseFloat(b.lat),parseFloat(b.lng)):9999;
      return da-db;
    });
  }
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

function filtTeam(team,btn){
  document.getElementById('age-filters').querySelectorAll('.fb').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  if(team==='all'){ initDir('union','','',''); return; }
  // Filter by team tag — show clubs that have this team type
  const list=DB.filter(c=>{
    if(c.type!=='union') return false;
    const tags=(c.teams||'').toLowerCase();
    const name=c.name.toLowerCase();
    // Mini clubs
    if(team==='Mini') return tags.includes('mini')||tags.includes('u7')||tags.includes('u8')||tags.includes('u9')||tags.includes('u10')||name.includes('mini');
    if(team==='Junior') return tags.includes('junior')||tags.includes('u11')||tags.includes('u12')||tags.includes('u14')||tags.includes('u16')||tags.includes('u18')||name.includes('junior');
    if(team==='Women') return tags.includes('women')||tags.includes('ladies')||name.includes('women')||name.includes('ladies');
    if(team==='Vets') return tags.includes('vet')||name.includes('vet');
    if(team==='Senior') return true; // All clubs have senior teams
    return true;
  });
  S['union']={list,page:1};
  renderDir('union');
  const rc=document.getElementById('u-cnt'); if(rc) rc.textContent=list.length;
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
  // Parse team tags from teams field or generate defaults
  const teamTags = (()=>{
    if(c.teams) return c.teams.split(',').map(t=>t.trim()).filter(Boolean);
    // Default tags based on club type
    if(c.type==='union') return ['Senior','Junior','Mini'];
    if(c.type==='league') return ['Senior','Junior'];
    return [];
  })();
  const teamsHtml = teamTags.slice(0,3).map(t=>`<span class="team-tag">${t}</span>`).join('');
  const trainingHtml = c.training ? `<div class="cc-training"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${c.training}</div>` : '';
  return `<div class="club-card" onclick="go('club/${c.slug}')" role="link" tabindex="0" aria-label="View ${c.name} profile" onkeydown="if(event.key==='Enter')go('club/${c.slug}')">
    <div class="cc-head">${c.featured?'<span class="cc-feat">⭐ Featured</span>':''}${logoH}<div class="cc-ph" ${phShow}>${ballSvg()}</div></div>
    <div class="cc-body">
      <span class="type-b ${tc}">${tl}</span>
      <div class="cc-nm">${c.name}</div>
      <div class="cc-loc"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>${c.city}${c.county?', '+c.county:''}</div>
      ${distHtml(c)}
      ${trainingHtml}
      <p class="cc-desc">${c.desc}</p>
      ${teamsHtml?`<div class="cc-teams">${teamsHtml}</div>`:''}
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
