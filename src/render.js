import { me, stats, publications, projects, experience, awards, involvement, learning, books, certificates, socials } from './data.js';

const esc = v => String(v ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const ext = (url, label, cls = '', cursor = 'Open') =>
  `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="${cls}" data-cursor="${cursor}">${label}</a>`;
const arrow = `<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const letters = (word, cls = '') => [...word].map(c => `<span class="ch ${cls}">${c === ' ' ? '&nbsp;' : esc(c)}</span>`).join('');
const pic = (src, alt, cls = '', eager = false) =>
  `<img src="${src}" alt="${esc(alt)}" class="${cls}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

/* ---------- hero image cloud ----------
   x / y = centre position in % of the hero, w = width in vw, d = depth (parallax + scroll speed), r = rotation */
const cloud = [
  { src: '/images/nyse-floor.webp', x: 12, y: 22, w: 15, ar: '1/1', d: 1.3, r: -4 },
  { src: '/images/federal-reserve.webp', x: 36, y: 13, w: 14, ar: '16/9', d: .8, r: 2 },
  { src: '/images/echr.webp', x: 66, y: 12, w: 15, ar: '3/2', d: 1.1, r: -2 },
  { src: '/images/jackman-law.webp', x: 89, y: 22, w: 14, ar: '4/3', d: 1.5, r: 4 },
  { src: '/images/worgl-note.webp', x: 25, y: 40, w: 9, ar: '250/138', d: 2, r: -7, cls: 'paperish' },
  { src: '/images/cyfa-logo.png', x: 78, y: 41, w: 9, ar: '1/1', d: 1.9, r: 5, cls: 'logo-tile logo-dark' },
  { src: '/images/servers.webp', x: 6, y: 58, w: 12, ar: '3/2', d: 1.2, r: 3 },
  { src: '/images/book-wealth.webp', x: 19, y: 79, w: 8, ar: '2/3', d: 1.7, r: -5 },
  { src: '/images/scales.webp', x: 94, y: 62, w: 10, ar: '3/4', d: 1.4, r: -3 },
  { src: '/images/civory-mark.png', x: 82, y: 82, w: 8, ar: '1/1', d: 2.1, r: 6, cls: 'logo-tile logo-light' },
  { src: '/images/glass-tower.webp', x: 66, y: 87, w: 9, ar: '3/4', d: .9, r: -2 },
  { src: '/images/churchill.webp', x: 35, y: 89, w: 8, ar: '4/5', d: 1.1, r: 3, cls: 'mono' },
  { src: '/images/commodus.webp', x: 50, y: 92, w: 7, ar: '4/5', d: 1.6, r: -4, cls: 'mono' },
  { src: '/images/book-psychology.webp', x: 4, y: 88, w: 7, ar: '2/3', d: 2.2, r: 6 },
  { src: '/images/study.webp', x: 52, y: 6, w: 8, ar: '16/9', d: 2.3, r: -3 },
  { src: '/images/tennis.webp', x: 97, y: 92, w: 9, ar: '16/10', d: 1.8, r: 4 },
  { src: '/images/spendleak-mark.png', x: 63, y: 30, w: 6, ar: '1/1', d: 2.4, r: -6, cls: 'logo-tile logo-light' },
];
const cloudTile = (t, i) => `<figure class="t ${t.cls || ''} ${i > 9 ? 't-extra' : ''}" style="--x:${t.x};--y:${t.y};--w:${t.w};--ar:${t.ar};--r:${t.r}deg" data-depth="${t.d}"><div class="t-par"><div class="t-float">${pic(t.src, '', '', i < 8)}</div></div></figure>`;

/* ---------- project visuals ---------- */
const projectVisual = key => {
  if (key === 'cyfa') return `<div class="pv pv-cyfa"><div class="pv-orbit" aria-hidden="true"><span></span><span></span><span></span></div><img src="/images/cyfa-logo.png" alt="Canadian Youth Finance Alliance logo" class="pv-logo" loading="lazy"></div>`;
  if (key === 'trading') {
    const candles = [[40, 60, 140], [70, 90, 120], [100, 70, 150], [130, 110, 95], [160, 80, 130], [190, 50, 160], [220, 40, 110], [250, 70, 90], [280, 30, 120], [310, 20, 70]];
    return `<div class="pv pv-trading"><svg viewBox="0 0 360 240" aria-hidden="true">
      ${[60, 110, 160, 210].map(y => `<path d="M10 ${y}H350" class="grid"/>`).join('')}
      ${candles.map(([x, top, len], k) => `<g class="candle ${k % 3 === 1 ? 'down' : ''}"><path d="M${x} ${top - 12}V${top + len + 12}"/><rect x="${x - 7}" y="${top}" width="14" height="${len * .5}" rx="1"/></g>`).join('')}
      <path class="trend" d="M20 200 C70 190 90 150 130 160 S200 110 230 115 S300 50 345 40"/>
    </svg><div class="ticker" aria-hidden="true"><span>CYFA +4.2%</span><span>Team Maple 12,480</span><span>Order filled</span><span>Leaderboard updated</span><span>CYFA +4.2%</span><span>Team Maple 12,480</span><span>Order filled</span><span>Leaderboard updated</span></div></div>`;
  }
  if (key === 'spendleak') return `<div class="pv pv-spendleak"><div class="rcpt-wrap"><div class="rcpt" aria-hidden="true">
      <div class="rcpt-top"><img src="/images/spendleak-mark.png" alt="" class="rcpt-logo"><div><strong>SpendLeak</strong><span>Audit report · #0417</span></div></div>
      <div class="rcpt-meta"><span>Vendor: Northwind Supply</span><span>Q3 invoices: 142</span></div>
      <div class="rcpt-rows">
        <div class="rr flag"><span>Duplicate invoice INV-2041</span><b>$4,820</b><em>Flagged</em></div>
        <div class="rr flag"><span>Price above contract rate</span><b>$1,260</b><em>Flagged</em></div>
        <div class="rr flag"><span>Unused software seats ×7</span><b>$940</b><em>Flagged</em></div>
        <div class="rr ok"><span>Freight charges</span><b>$2,315</b><em>Matched</em></div>
      </div>
      <div class="rcpt-total"><span>Recoverable</span><strong data-sl-total>$7,020</strong></div>
      <div class="rcpt-bar"></div>
      <div class="rcpt-scan"></div>
      <div class="rcpt-stamp">Recovered</div>
    </div></div></div>`;
  return `<div class="pv pv-civory"><div class="civ-rings" aria-hidden="true"><span></span><span></span></div><img src="/images/civory-mark.png" alt="Civory logo" class="pv-civ" loading="lazy"><div class="civ-words" aria-hidden="true"><span>Statutes</span><span>Parliament</span><span>Courts</span><span>Policy</span></div></div>`;
};

const projectPanel = (p, i) => `
  <article class="proj proj-${p.key}">
    <div class="proj-visual">${projectVisual(p.key)}</div>
    <div class="proj-copy">
      <p class="proj-meta"><span>${esc(p.role)}</span><span>${esc(p.state)}</span></p>
      <h3 class="proj-title">${esc(p.name)}</h3>
      <p class="proj-body">${esc(p.body)}</p>
      ${p.features ? `<ul class="proj-feats">${p.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
      <dl class="proj-metrics">${p.metrics.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>
      ${ext(p.link, `<span>${esc(p.linkLabel)}</span>${arrow}`, 'pill magnetic', 'Visit')}
    </div>
    <span class="proj-count" aria-hidden="true">${i + 1} / ${projects.length}</span>
  </article>`;

const paperCard = (p, i) => {
  const tag = p.link ? 'a' : 'div';
  const attrs = p.link ? `href="${esc(p.link)}" target="_blank" rel="noopener noreferrer" data-cursor="Read"` : '';
  return `<${tag} class="rc rc-${i % 2 ? 'low' : 'high'}" ${attrs}>
    <div class="rc-media ${p.small ? 'rc-specimen' : ''}">${pic(p.img, p.imgAlt, 'rc-img')}</div>
    <div class="rc-body">
      <div class="rc-head"><span class="rc-cat">${esc(p.category)}</span><span class="rc-status">${esc(p.status)}, ${esc(p.year)}</span></div>
      <h3 class="rc-title">${esc(p.title)}</h3>
      <p class="rc-sum">${esc(p.summary)}</p>
      <div class="rc-foot"><span class="rc-tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</span><span class="rc-go">${p.link ? `Read paper ${arrow}` : 'Available on request'}</span></div>
    </div>
    <span class="rc-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
  </${tag}>`;
};

const workMedia = x => {
  if (x.img) return pic(x.img, x.imgAlt, 'work-img');
  if (x.logo) return `<div class="work-logo"><img src="/images/cyfa-logo.png" alt="CYFA logo" loading="lazy"></div>`;
  if (x.logoImg) return `<div class="work-brand ${x.logoTile ? 'is-tile' : ''} ${x.white ? 'is-white' : ''} ${x.light ? 'is-light' : ''}"><img src="${x.logoImg}" alt="${esc(x.logoAlt)}" loading="lazy"></div>`;
  return '';
};
const workCard = (x, i) => `
  <article class="work tone-${x.tone}" style="--i:${i}">
    <div class="work-inner">
      <div class="work-text">
        <p class="work-when"><time class="work-date">${esc(x.date)}</time>${x.former ? '<span class="work-former">Former</span>' : '<span class="work-now">Current</span>'}</p>
        <h3 class="work-role">${esc(x.role)}</h3>
        <p class="work-org">${esc(x.org)}</p>
        <p class="work-desc">${esc(x.desc)}</p>
      </div>
      <div class="work-media">${workMedia(x)}</div>
    </div>
  </article>`;

const awardRow = a => `
  <li class="award">
    <span class="award-rank">${esc(a.rank)}</span>
    <span class="award-title">${esc(a.title)}</span>
    <span class="award-event">${esc(a.event)}</span>
    <span class="award-year">${esc(a.year)}</span>
  </li>`;

const bookCard = (b, i) => `
  <figure class="book" style="--i:${i};--ar:${b.ar}">
    <div class="book-3d" data-tilt><div class="book-spine" aria-hidden="true"></div>${pic(b.img, `${b.title} by ${b.author}, book cover`, 'book-img')}<div class="book-shine" aria-hidden="true"></div></div>
    <figcaption><strong>${esc(b.title)}</strong><span>${esc(b.author)}</span><p>${esc(b.note)}</p></figcaption>
  </figure>`;

const reel = [
  { img: '/images/tennis.webp', alt: 'Two tennis rackets and balls on a clay court', kind: 'Favourite sport', title: 'Tennis', text: 'Long rallies, patience, and one good serve.', wide: true },
  { img: '/images/badminton.webp', alt: 'Shuttlecock resting on a badminton racket', kind: 'Favourite sport', title: 'Badminton', text: 'Faster than it looks. Much faster.' },
  { img: '/images/glass-tower.webp', alt: 'Glass office tower against a blue sky', kind: 'Favourite show', title: 'Suits', text: 'Sharp dialogue, high-stakes negotiation, and the reason I still think about corporate law.', tall: true },
  { img: '/images/iron-throne.webp', alt: 'The Iron Throne made of swords', kind: 'Favourite show', title: 'Game of Thrones', text: 'A seven-season case study in power, legitimacy, and terrible succession planning.', wide: true },
  { img: '/images/carbonara.webp', alt: 'A twirl of spaghetti carbonara on a dark plate', kind: 'Favourite food', title: 'Carbonara', text: 'Eggs, pecorino, guanciale, pepper. No cream. Non-negotiable.', tall: true },
];
const reelPanel = (r, i) => `<figure class="rp ${r.wide ? 'rp-wide' : ''} ${r.tall ? 'rp-tall' : ''}" style="--i:${i}"><div class="rp-media">${pic(r.img, r.alt, 'rp-img')}</div><figcaption><span>${esc(r.kind)}</span><strong>${esc(r.title)}</strong><p>${esc(r.text)}</p></figcaption></figure>`;

const strip = ['nyse-floor.webp', 'federal-reserve.webp', 'echr.webp', 'jackman-law.webp', 'servers.webp', 'scales.webp', 'worgl-note.webp', 'glass-tower.webp', 'churchill.webp', 'commodus.webp', 'tennis.webp', 'study.webp'];

export function render() {
  return `
<a class="skip" href="#main">Skip to content</a>
<div class="loader" aria-hidden="true"><div class="loader-top"></div><div class="loader-bottom"></div><div class="loader-inner"><span class="loader-name">${letters('Alan Xiao', 'lch')}</span><span class="loader-count"><span id="count">0</span></span></div><div class="loader-bar"><span></span></div></div>
<div class="cursor" aria-hidden="true"><span class="cursor-dot"></span><span class="cursor-ring"><em></em></span></div>
<div class="progress" aria-hidden="true"><span></span></div>

<header class="nav">
  <a href="#top" class="nav-mark" aria-label="Alan Xiao, back to top">AX</a>
  <nav aria-label="Sections"><ul class="nav-links">
    <li><a href="#work">Projects</a></li><li><a href="#research">Research</a></li><li><a href="#experience">Experience</a></li><li><a href="#awards">Awards</a></li><li><a href="#aspirations">Goals</a></li><li><a href="#beyond">Off the clock</a></li>
  </ul></nav>
  <a href="#contact" class="nav-cta magnetic">Contact</a>
</header>

<main id="main">
<section class="hero" id="top">
  <canvas class="aurora" aria-hidden="true"></canvas>
  <div class="hero-grain" aria-hidden="true"></div>
  <div class="cloud" aria-hidden="true">${cloud.map(cloudTile).join('')}</div>
  <div class="hero-inner">
    <p class="hero-kicker">Toronto · student, researcher, founder</p>
    <h1 class="hero-name" aria-label="Alan Xiao"><span class="hn-row">${letters('Alan', 'hch')}</span><span class="hn-row hn-row-2">${letters('Xia', 'hch')}<span class="ch hch hch-o">o</span></span></h1>
    <p class="hero-lede">Studying the institutions behind <span class="rotator" aria-live="off"><span>law</span><span>markets</span><span>public policy</span><span>technology</span></span><br>and asking the questions that don’t have easy answers.</p>
  </div>
  <div class="hero-wipe" aria-hidden="true"><img class="wipe-img" src="/images/study.webp" alt=""><div class="wipe-veil"></div></div>
  <a href="#intro" class="scroll-cue" aria-label="Scroll to introduction">Scroll<span></span></a>
</section>

<section class="intro" id="intro">
  <div class="wrap">
    <p class="statement" data-words>I’m a student fascinated by the institutions that shape law, money and power. I’ve researched public companies for seven-figure investment decisions, drafted legal documents at a law firm, founded a national non-profit, and published research on everything from European climate law to expiring money. I like following the evidence until one argument actually holds up.</p>
    <div class="stats">${stats.map(s => `<div class="stat"><strong data-count="${s.value}" data-prefix="${s.prefix || ''}" data-suffix="${s.suffix}">${s.prefix || ''}${s.value.toLocaleString('en-CA')}${s.suffix}</strong><span>${esc(s.label)}</span></div>`).join('')}</div>
  </div>
</section>

<div class="marquee" aria-hidden="true"><div class="marquee-track">${Array.from({ length: 2 }, () => `<span>Law</span><i></i><span>Economics</span><i></i><span>Finance</span><i></i><span>Public policy</span><i></i><span>Technology</span><i></i>`).join('')}</div></div>

<section class="work-sec" id="work">
  <div class="hscroll">
    <div class="htrack">
      <div class="proj proj-intro">
        <h2 class="h2" data-split>Things I’ve built</h2>
        <p class="sec-lede">Four projects, one idea: make money and public institutions easier to understand, for students, for citizens and for businesses.</p>
        <p class="hint" aria-hidden="true"><span class="hint-line"></span>Keep scrolling</p>
      </div>
      ${projects.map(projectPanel).join('')}
    </div>
  </div>
</section>

<section class="research" id="research">
  <div class="r-pin">
    <div class="r-ghost" aria-hidden="true">Research · Writing · Research · Writing ·</div>
    <div class="r-track">
      <div class="r-intro">
        <h2 class="h2" data-split>Research &amp; writing</h2>
        <p class="sec-lede">Five papers across European law, monetary economics, banking and computation. SSRN papers are open preprints, not peer-reviewed journal articles.</p>
        <p class="hint" aria-hidden="true"><span class="hint-line"></span>Keep scrolling</p>
      </div>
      ${publications.map(paperCard).join('')}
      <div class="r-end"><p>More of my work, and what I’m writing next, is on LinkedIn.</p>${ext(me.linkedin, `<span>Follow on LinkedIn</span>${arrow}`, 'pill magnetic', 'Open')}</div>
    </div>
    <div class="r-progress" aria-hidden="true"><span></span></div>
  </div>
</section>

<section class="experience" id="experience">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-split>Experience</h2>
      <p class="sec-lede">Equity research, corporate law, legal casework and leading teams. Each one taught me a different way to think.</p>
    </div>
    <div class="stack">${experience.map(workCard).join('')}</div>
  </div>
</section>

<section class="awards" id="awards">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-split>Competitions</h2>
      <p class="sec-lede">The placings are nice. The real value was defending ideas under pressure, from Toronto to San Antonio to Harvard.</p>
    </div>
    <ol class="award-list">${awards.map(awardRow).join('')}</ol>
  </div>
</section>

<section class="more">
  <div class="wrap more-grid">
    <div class="more-col">
      <h2 class="h3" data-split>Where I spend my time</h2>
      <ul class="inv">${involvement.map(x => `<li><strong>${esc(x.name)}</strong><span>${esc(x.role)}</span><em>${esc(x.period)}</em></li>`).join('')}</ul>
    </div>
    <div class="more-col">
      <h2 class="h3" data-split>Learning &amp; credentials</h2>
      <div class="learn">${learning.map((x, i) => `<div class="learn-card lc-${i}"><h3>${esc(x.title)}</h3><p>${esc(x.body)}</p></div>`).join('')}</div>
      <h3 class="certs-h">Course certificates</h3>
      <ul class="certs">${certificates.map(c => `<li><strong>${esc(c.title)}</strong><span>${esc(c.org)}</span><em>${esc(c.date)}</em></li>`).join('')}</ul>
      <div class="toolkit"><p>I code across most languages, and these are the ones I reach for most.</p><ul>${['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'SQL', 'R', 'React', 'Vite', 'Excel modelling', 'AI APIs', 'Legal databases'].map(t => `<li>${t}</li>`).join('')}</ul></div>
    </div>
  </div>
</section>

<section class="aspire" id="aspirations">
  <div class="wrap">
    <h2 class="h2" data-split>Where I’m headed</h2>
    <div class="aspire-grid">
      <article class="aspire-card">
        <span class="aspire-k">The goal</span>
        <p class="aspire-big" data-words-2>I want to become a lawyer in private equity, working where deals, capital and the law meet.</p>
        <p class="aspire-small">It brings together everything on this page: equity research, corporate law, and building companies from nothing.</p>
      </article>
      <article class="aspire-card">
        <span class="aspire-k">What I believe</span>
        <ul class="beliefs">
          <li><strong>Representation for all.</strong> Everyone deserves a capable advocate, whoever they are.</li>
          <li><strong>Rights for everyone.</strong> Rights mean the most when they protect people equally, and they should keep growing.</li>
          <li><strong>Liberty under the rule of law.</strong> Fair, predictable rules let people and businesses make their own choices.</li>
          <li><strong>Law as a tool for good.</strong> A legal system that works is one of the best ways a society helps its people.</li>
        </ul>
      </article>
    </div>
  </div>
</section>

<section class="beyond" id="beyond">
  <div class="wrap">
    <div class="beyond-head">
      <h2 class="h-xl" data-split>Off the clock</h2>
      <p class="sec-lede">Research papers and spreadsheets aren’t the whole story. Here’s what I read, play, watch, eat, and overthink.</p>
    </div>
    <div class="chapter">
      <h3 class="h3" data-split>On the shelf</h3>
      <div class="shelf">${books.map(bookCard).join('')}</div>
    </div>
  </div>

  <div class="reel">
    <div class="reel-pin">
      <div class="reel-track">
        <div class="reel-intro"><h3 class="h2" data-split>A few of my favourites</h3><p class="sec-lede">My favourite sports, my favourite shows, and my favourite food. The things I reach for when I’m not working.</p></div>
        ${reel.map(reelPanel).join('')}
      </div>
    </div>
  </div>

  <div class="wrap">
    <div class="chapter history">
      <h3 class="h3" data-split>Two dinner guests from history</h3>
      <div class="duel">
        <figure class="guest guest-l">${pic('/images/churchill.webp', 'Winston Churchill giving the V sign outside 10 Downing Street', 'guest-img')}<figcaption><strong>Winston Churchill</strong><p>In 1940, with Europe falling and many in his own government pushing for a deal, he refused to give in. I’d ask how he kept a whole country going when nearly everyone said the fight was lost. That refusal to quit under pressure is the leadership lesson I come back to most.</p></figcaption></figure>
        <div class="duel-vs" aria-hidden="true">or</div>
        <figure class="guest guest-r">${pic('/images/commodus.webp', 'Marble bust of the Roman emperor Commodus', 'guest-img')}<figcaption><strong>Commodus</strong><p>Not because I admire him. I’d just like to ask what on earth he was thinking.</p><ul class="guest-list"><li>Dropped his father Marcus Aurelius’s policies and left the empire to corrupt favourites</li><li>Drained the treasury and debased the currency</li><li>Purged senators after plots against him</li><li>Fought rigged gladiator fights as “Hercules” and renamed Rome after himself</li><li>Was assassinated in 192 CE, setting off civil war</li></ul></figcaption></figure>
      </div>
    </div>
  </div>
  <div class="topics" aria-label="Topics I could talk about for hours: politics, public policy, economics and law">
    <p class="topics-label">Topics I could talk about for hours</p>
    <div class="topics-track" aria-hidden="true">${Array.from({ length: 3 }, () => `<span>Politics</span><span>Public policy</span><span>Economics</span><span>Law</span>`).join('')}</div>
  </div>
</section>

<section class="contact" id="contact">
  <div class="spot" aria-hidden="true"></div>
  <canvas class="c-aurora" aria-hidden="true"></canvas>
  <div class="c-band" aria-hidden="true"><div class="c-band-track">${Array.from({ length: 4 }, () => `<span>Let’s talk</span><em>Let’s talk</em>`).join('')}</div></div>
  <div class="wrap c-grid">
    <div class="c-main">
      <p class="contact-kicker">Have an idea, a research question or a project worth talking about? I reply to every message.</p>
      <button type="button" class="c-email" id="copy-email" data-cursor="Copy"><span class="c-email-text">${esc(me.email)}</span><span class="c-email-line" aria-hidden="true"></span></button>
      <ul class="socials">${socials.map((x, i) => `<li style="--i:${i}"><a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer" class="social magnetic" data-cursor="Open"><span class="s-name">${esc(x.name)}</span><span class="s-handle">${esc(x.handle)}</span>${arrow}</a></li>`).join('')}</ul>
      <div class="contact-actions">
        ${ext(me.cyfa, `<span>CYFA</span>${arrow}`, 'pill pill-ghost magnetic', 'Visit')}
        ${ext('https://civory-beta.vercel.app/', `<span>Civory</span>${arrow}`, 'pill pill-ghost magnetic', 'Visit')}
        ${ext('https://spendleakbeta.vercel.app/', `<span>SpendLeak</span>${arrow}`, 'pill pill-ghost magnetic', 'Visit')}
      </div>
    </div>
    <div class="c-side">
      <div class="badge" aria-hidden="true"><svg viewBox="0 0 200 200"><defs><path id="circ" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0"/></defs><text><textPath href="#circ">open to research · internships · collaborations · </textPath></text></svg><span class="badge-core">AX</span></div>
      <p class="c-clock">Toronto, <span id="clock">--:--</span></p>
    </div>
  </div>
  <div class="c-strip" aria-hidden="true"><div class="c-strip-track">${[...strip, ...strip].map(s => `<img src="/images/${s}" alt="" loading="lazy" decoding="async">`).join('')}</div></div>
</section>
</main>

<footer class="footer">
  <div class="f-mark" aria-hidden="true"><span>${letters('Alan Xiao', 'fch')}</span></div>
  <div class="wrap footer-inner">
    <p class="f-name">Alan Xiao</p>
    <p>© 2026 · ${esc(me.location)}</p>
    <details><summary>Image credits</summary><p>Photographs are illustrative and don’t show Alan or his work. Institutional photos (NYSE, Federal Reserve, European Court of Human Rights, U of T Jackman Law Building), the Wörgl note, book covers, logos, and the Churchill and Commodus images belong to their respective owners and archives; see IMAGE_SOURCES.md. Nothing here is financial or legal advice.</p></details>
    <a href="#top" class="to-top">Back to top ↑</a>
  </div>
</footer>
<div class="toast" id="toast" role="status" aria-live="polite">Email copied</div>
`;
}
