/* global gsap, ScrollTrigger, SplitText, Lenis */
const root = document.documentElement;
root.classList.remove('no-js');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ---------- library-free bits ---------- */
const toast = $('#toast');
$('#copy-email')?.addEventListener('click', async () => {
  const email = '01alanxiao@gmail.com';
  try { await navigator.clipboard.writeText(email); toast.textContent = 'Email copied'; }
  catch { location.href = `mailto:${email}`; toast.textContent = 'Opening your email app'; }
  toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200);
});

const clock = $('#clock');
const tick = () => { if (clock) clock.textContent = new Intl.DateTimeFormat('en-CA', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Toronto' }).format(new Date()); };
tick(); setInterval(tick, 30000);

(function rotator() {
  const words = $$('.rotator span'); if (words.length < 2 || reduced || !window.gsap) return;
  let i = 0;
  const box = words[0].parentElement;
  const fit = w => { box.style.width = w.offsetWidth + 'px'; };
  document.fonts?.ready.then(() => fit(words[i]));
  fit(words[0]);
  gsap.set(words, { y: 0, yPercent: k => k ? 110 : 0 });
  setInterval(() => {
    const cur = words[i], next = words[(i + 1) % words.length];
    fit(next);
    gsap.to(cur, { yPercent: -110, duration: .8, ease: 'power3.inOut' });
    gsap.fromTo(next, { yPercent: 110 }, { yPercent: 0, duration: .8, ease: 'power3.inOut' });
    i = (i + 1) % words.length;
  }, 2400);
})();

if (reduced || !window.gsap) {
  root.classList.add('reduced');
  $$('[data-count]').forEach(el => { el.textContent = el.dataset.prefix + Number(el.dataset.count).toLocaleString('en-CA') + el.dataset.suffix; });
} else {
  init();
}

function init() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const mm = gsap.matchMedia();
  const DESK = '(min-width: 1001px)', MOB = '(max-width: 1000px)';

  /* ---------- smooth scroll ---------- */
  const lenis = new Lenis({ lerp: .085, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const t = $(id); if (!t) return; e.preventDefault(); lenis.scrollTo(id === '#top' ? 0 : t, { duration: 1.8 });
  }));

  /* ---------- progress & nav ---------- */
  gsap.to('.progress span', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });
  const nav = $('.nav'); let lastY = 0;
  lenis.on('scroll', ({ scroll }) => {
    nav.classList.toggle('hide', scroll > lastY && scroll > 300);
    nav.classList.toggle('solid', scroll > innerHeight * 2.15);
    lastY = scroll;
  });

  /* ---------- cursor: dot + ring; label only on real links ---------- */
  const cursor = $('.cursor');
  if (fine) {
    root.classList.add('has-cursor');
    const dot = $('.cursor-dot'), ring = $('.cursor-ring'), label = $('.cursor-ring em');
    const dx = gsap.quickTo(dot, 'x', { duration: .08 }), dy = gsap.quickTo(dot, 'y', { duration: .08 });
    const rx = gsap.quickTo(ring, 'x', { duration: .45, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: .45, ease: 'power3' });
    let lx = -100, ly = -100;
    const darkSel = '.hero,.marquee,.awards,.aspire,.proj-cyfa .proj-visual,.proj-trading .proj-visual,.tone-ink,.work-brand.is-tile,.rc-media,.topics,.rp,.loader';
    const update = () => {
      const el = document.elementFromPoint(lx, ly);
      const t = el?.closest('a,button');
      const lab = t?.dataset.cursor;
      cursor.classList.toggle('is-link', !!t && !lab);
      cursor.classList.toggle('has-label', !!lab);
      if (lab) label.textContent = lab;
      cursor.classList.toggle('on-dark', !!el?.closest(darkSel));
    };
    let queued = false;
    const queue = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; update(); }); } };
    addEventListener('pointermove', e => { lx = e.clientX; ly = e.clientY; dx(lx); dy(ly); rx(lx); ry(ly); queue(); }, { passive: true });
    // content moves under a still cursor while scrolling, so re-check what's underneath
    lenis.on('scroll', queue);
    document.addEventListener('pointerleave', () => gsap.to([dot, ring], { opacity: 0 }));
    document.addEventListener('pointerenter', () => gsap.to([dot, ring], { opacity: 1 }));

    $$('.magnetic').forEach(el => {
      const xT = gsap.quickTo(el, 'x', { duration: .6, ease: 'power3.out' }), yT = gsap.quickTo(el, 'y', { duration: .6, ease: 'power3.out' });
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); xT((e.clientX - r.left - r.width / 2) * .2); yT((e.clientY - r.top - r.height / 2) * .25); });
      el.addEventListener('pointerleave', () => { xT(0); yT(0); });
    });
  }

  /* ---------- hero aurora ---------- */
  const canvas = $('.aurora'), ctx = canvas.getContext('2d');
  const blobs = [
    { c: '63,94,128', x: .72, y: .3, r: .45, s: .00016, p: 0 },
    { c: '42,61,88', x: .3, y: .25, r: .4, s: .00013, p: 2 },
    { c: '110,139,170', x: .6, y: .85, r: .32, s: .00019, p: 4 },
    { c: '31,47,71', x: .15, y: .7, r: .42, s: .00015, p: 1 },
  ];
  let mx = .5, my = .5, heroVisible = true;
  const sizeCanvas = () => { canvas.width = Math.round(canvas.offsetWidth / 4); canvas.height = Math.round(canvas.offsetHeight / 4); };
  sizeCanvas(); addEventListener('resize', sizeCanvas);
  gsap.ticker.add(time => {
    if (!heroVisible) return;
    const w = canvas.width, h = canvas.height, t = time * 1000;
    ctx.clearRect(0, 0, w, h);
    for (const b of blobs) {
      const x = (b.x + Math.sin(t * b.s + b.p) * .12 + (mx - .5) * .08) * w;
      const y = (b.y + Math.cos(t * b.s * 1.3 + b.p) * .1 + (my - .5) * .08) * h;
      const r = b.r * Math.max(w, h);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${b.c},.8)`); g.addColorStop(1, `rgba(${b.c},0)`);
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    }
  });

  /* ---------- hero image cloud ---------- */
  const tiles = $$('.t');
  const vec = tiles.map(t => {
    const x = parseFloat(t.style.getPropertyValue('--x')) - 50, y = parseFloat(t.style.getPropertyValue('--y')) - 50;
    const len = Math.hypot(x, y) || 1;
    return { x: x / len, y: y / len, d: +t.dataset.depth, dist: len };
  });
  // idle float
  tiles.forEach((t, i) => {
    gsap.to($('.t-float', t), { y: gsap.utils.random(-16, 16), rotate: gsap.utils.random(-2.5, 2.5), duration: gsap.utils.random(3.5, 6), ease: 'sine.inOut', yoyo: true, repeat: -1, delay: -i * .4 });
  });
  // mouse parallax
  if (fine) {
    const movers = tiles.map((t, i) => ({ x: gsap.quickTo($('.t-par', t), 'x', { duration: 1.4, ease: 'power3' }), y: gsap.quickTo($('.t-par', t), 'y', { duration: 1.4, ease: 'power3' }), d: vec[i].d }));
    const hch = $$('.hch').map(el => ({ el, w: 300 }));
    addEventListener('pointermove', e => {
      mx = e.clientX / innerWidth; my = e.clientY / innerHeight;
      if (!heroVisible) return;
      movers.forEach(m => { m.x((mx - .5) * -60 * m.d); m.y((my - .5) * -44 * m.d); });
      hch.forEach(s => {
        const r = s.el.getBoundingClientRect();
        const k = Math.max(0, 1 - Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) / 420);
        gsap.to(s, { w: 260 + 340 * k, duration: .8, ease: 'power3.out', overwrite: true, onUpdate: () => { s.el.style.fontVariationSettings = `'wght' ${s.w.toFixed(0)}, 'opsz' 72`; } });
      });
    });
  }
  // scroll: pin the hero and burst the cloud outward past the camera
  const heroTl = gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=120%', pin: true, scrub: 1, invalidateOnRefresh: true, onLeave: () => heroVisible = false, onEnterBack: () => heroVisible = true } });
  tiles.forEach((t, i) => {
    const v = vec[i];
    heroTl.to(t, { x: () => v.x * innerWidth * (.35 + v.d * .25), y: () => v.y * innerHeight * (.45 + v.d * .25), scale: 1.4 + v.d * .5, rotate: v.x * 14, ease: 'power2.in' }, 0)
      .to(t, { opacity: 0, ease: 'power1.in', duration: .4 }, .6);
  });
  // dive into the "o" of Xiao: the name zooms around the o while a photo opens up inside it
  const heroEl = $('.hero'), nameEl = $('.hero-name'), innerEl = $('.hero-inner'), oEl = $('.hch-o');
  // layout offsets (unaffected by transforms) of el relative to an ancestor
  const offsetTo = (el, anc) => { let x = 0, y = 0; while (el && el !== anc) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; } return [x, y]; };
  const oPos = () => {
    const [nx, ny] = offsetTo(nameEl, heroEl), [px, py] = offsetTo(oEl, heroEl);
    const cx = px + oEl.offsetWidth * .49, cy = py + oEl.offsetHeight * .585;
    return { ox: cx - nx, oy: cy - ny, cx, cy, r: oEl.offsetWidth * .24 };
  };
  heroTl.to('.hero-kicker,.hero-lede,.scroll-cue', { opacity: 0, y: -30, ease: 'power2.in', duration: .4 }, 0)
    .to('.aurora', { opacity: 0, ease: 'none', duration: .6 }, 0)
    .to('.hn-row:first-child .hch', { yPercent: -40, opacity: 0, ease: 'power2.in', stagger: .03, duration: .35 }, .25)
    .to('.hn-row-2 .hch:not(.hch-o)', { opacity: 0, ease: 'power2.in', stagger: .03, duration: .3 }, .35)
    .fromTo(nameEl, { scale: 1 }, { scale: () => Math.max(innerWidth, innerHeight) / (oPos().r * 1.2), transformOrigin: () => `${oPos().ox}px ${oPos().oy}px`, ease: 'power3.in', duration: .65 }, .35)
    .fromTo('.hero-wipe', { clipPath: () => { const o = oPos(); return `circle(${o.r}px at ${o.cx}px ${o.cy}px)`; }, opacity: 0 },
      { clipPath: () => { const o = oPos(); return `circle(${Math.hypot(innerWidth, innerHeight)}px at ${o.cx}px ${o.cy}px)`; }, opacity: 1, ease: 'power3.in', duration: .65 }, .35)
    .fromTo('.wipe-img', { scale: 1.6 }, { scale: 1, ease: 'power2.out', duration: .65 }, .35)
    .to('.wipe-veil', { opacity: 1, ease: 'power1.in', duration: .22 }, .78)
    .set(nameEl, { opacity: 0 }, .99);

  /* ---------- opening sequence ---------- */
  const count = { v: 0 }, countEl = $('#count');
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  const floats = tiles.map(t => $('.t-float', t));
  gsap.set(floats, { opacity: 0 });
  tl.fromTo('.lch', { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: .045 }, 0)
    .to(count, { v: 100, duration: 1.4, ease: 'power2.inOut', onUpdate: () => countEl.textContent = Math.round(count.v) }, 0)
    .to('.loader-bar span', { width: '100%', duration: 1.4, ease: 'power2.inOut' }, 0)
    .to('.lch', { yPercent: -110, duration: .55, stagger: .02, ease: 'power3.in' }, 1.45)
    .to('.loader-count', { opacity: 0, duration: .3 }, 1.45)
    .to('.loader-top', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, 1.75)
    .to('.loader-bottom', { yPercent: 100, duration: 1.1, ease: 'expo.inOut' }, 1.75)
    .set('.loader', { display: 'none' })
    .fromTo(floats, { opacity: 0, xPercent: i => -vec[i].x * vec[i].dist * 9, yPercent: i => -vec[i].y * vec[i].dist * 9, scale: .2, rotationY: () => gsap.utils.random(-70, 70) },
      { opacity: 1, xPercent: 0, yPercent: 0, scale: 1, rotationY: 0, duration: 2.2, stagger: { each: .05, from: 'random' }, ease: 'expo.out' }, 1.95)
    .from('.hch', { yPercent: 115, duration: 1.6, stagger: .07 }, 2.15)
    .from('.hero-kicker,.hero-lede,.scroll-cue', { y: 24, opacity: 0, duration: 1.2, stagger: .12 }, 2.6)
    .add(() => lenis.start(), 2.4);
  setTimeout(() => lenis.start(), 5000);

  /* ---------- headings ---------- */
  $$('[data-split]').forEach(el => {
    const split = SplitText.create(el, { type: 'lines,words', linesClass: 'split-line', mask: 'lines' });
    gsap.from(split.words, { yPercent: 115, duration: 1.3, stagger: .05, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  $$('.sec-head .sec-lede,.contact-kicker').forEach(el => gsap.from(el, { y: 30, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));

  /* ---------- statement & counters ---------- */
  const st = $('[data-words]');
  const sw = SplitText.create(st, { type: 'words', wordsClass: 'w' });
  gsap.to(sw.words, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: st, start: 'top 80%', end: 'bottom 45%', scrub: true } });
  gsap.from(st, { y: 80, ease: 'none', scrollTrigger: { trigger: '.intro', start: 'top bottom', end: 'top 30%', scrub: true } });
  $$('[data-count]').forEach(el => {
    const o = { v: 0 }, end = +el.dataset.count;
    el.textContent = el.dataset.prefix + '0' + el.dataset.suffix;
    gsap.to(o, { v: end, duration: 2.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => el.textContent = el.dataset.prefix + Math.round(o.v).toLocaleString('en-CA') + el.dataset.suffix });
  });
  gsap.from('.stat', { y: 60, opacity: 0, duration: 1.2, stagger: .12, ease: 'expo.out', scrollTrigger: { trigger: '.stats', start: 'top 88%' } });

  /* ---------- velocity marquees ---------- */
  function marquee(sel, speed, dir = -1) {
    const track = $(sel); if (!track) return;
    const loop = dir < 0
      ? gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration: speed, ease: 'none', repeat: -1 })
      : gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration: speed, ease: 'none', repeat: -1 });
    const skew = gsap.quickTo(track, 'skewX', { duration: .5, ease: 'power3' });
    let idle;
    lenis.on('scroll', ({ velocity }) => {
      const ts = 1 + Math.min(Math.abs(velocity) / 6, 6);
      loop.timeScale(velocity < 0 ? -ts : ts);
      skew(gsap.utils.clamp(-8, 8, velocity * -.3));
      clearTimeout(idle);
      idle = setTimeout(() => { gsap.to(loop, { timeScale: 1, duration: .8 }); skew(0); }, 140);
    });
  }
  marquee('.marquee-track', 30);
  marquee('.topics-track', 36, 1);
  marquee('.c-strip-track', 60);

  /* ---------- sideways sections ---------- */
  function sideways({ section, pinEl, track, extra }) {
    const tr = $(track);
    const dist = () => Math.max(0, tr.scrollWidth - innerWidth);
    const tween = gsap.to(tr, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: pinEl || section, start: 'top top', end: () => '+=' + dist(), pin: pinEl || section, scrub: .6, invalidateOnRefresh: true, anticipatePin: 1, fastScrollEnd: true } });
    extra?.(tween);
    return tween;
  }

  // projects
  mm.add(DESK, () => {
    const h = sideways({ section: '.work-sec', track: '.htrack' });
    $$('.proj:not(.proj-intro)').forEach(panel => {
      gsap.from($('.proj-visual', panel), { clipPath: 'inset(18% 18% 18% 18%)', scale: .9, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: h, start: 'left 95%', end: 'left 35%', scrub: true } });
      gsap.from($$('.proj-copy > *', panel), { x: 140, opacity: 0, stagger: .08, ease: 'power2.out', scrollTrigger: { trigger: panel, containerAnimation: h, start: 'left 80%', end: 'left 30%', scrub: true } });
      projectArt(panel, { containerAnimation: h, start: 'left 85%' });
    });
  });
  mm.add(MOB, () => {
    $$('.proj:not(.proj-intro)').forEach(panel => {
      gsap.from($('.proj-visual', panel), { clipPath: 'inset(12% 12% 12% 12%)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: panel, start: 'top 85%' } });
      gsap.from($$('.proj-copy > *', panel), { y: 40, opacity: 0, duration: 1, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: $('.proj-copy', panel), start: 'top 88%' } });
      projectArt(panel, { start: 'top 75%' });
    });
  });
  function projectArt(panel, st) {
    if (panel.classList.contains('proj-trading')) {
      const path = $('.trend', panel), len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.timeline({ scrollTrigger: { trigger: panel, ...st } })
        .from($$('.candle', panel), { scaleY: 0, transformOrigin: '50% 100%', opacity: 0, duration: .9, stagger: .06, ease: 'power3.out' })
        .to(path, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, .2);
    }
    if (panel.classList.contains('proj-civory')) {
      gsap.timeline({ scrollTrigger: { trigger: panel, ...st } })
        .from($('.pv-civ', panel), { scale: .7, opacity: 0, rotate: -12, duration: 1.6, ease: 'expo.out' })
        .from($$('.civ-rings span', panel), { scale: .4, opacity: 0, duration: 1.4, stagger: .12, ease: 'expo.out' }, 0)
        .from($$('.civ-words span', panel), { x: -16, opacity: 0, duration: .9, stagger: .12, ease: 'power3.out' }, .5);
    }
    if (panel.classList.contains('proj-spendleak')) {
      const tot = $('[data-sl-total]', panel), o = { v: 0 };
      gsap.timeline({ scrollTrigger: { trigger: panel, ...st } })
        .from($('.pv-sl', panel), { y: -40, scale: .6, opacity: 0, duration: 1.4, ease: 'expo.out' })
        .from($('.sl-audit', panel), { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out' }, .1)
        .from($$('.sl-row', panel), { x: -30, opacity: 0, duration: .7, stagger: .14, ease: 'power3.out' }, .5)
        .to(o, { v: 7020, duration: 1.6, ease: 'power2.out', onUpdate: () => tot.textContent = '$' + Math.round(o.v).toLocaleString('en-CA') }, .7);
    }
    if (panel.classList.contains('proj-cyfa')) {
      gsap.from($('.pv-logo', panel), { scale: .75, opacity: 0, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: panel, ...st } });
      gsap.from($$('.pv-orbit span', panel), { scale: .3, opacity: 0, duration: 1.6, stagger: .12, ease: 'expo.out', scrollTrigger: { trigger: panel, ...st } });
    }
  }

  // research gallery
  mm.add(DESK, () => {
    const cards = $$('.rc');
    const h = sideways({ section: '.research', pinEl: '.r-pin', track: '.r-track' });
    gsap.fromTo('.r-ghost', { xPercent: 0 }, { xPercent: -35, ease: 'none', scrollTrigger: { trigger: '.r-pin', start: 'top top', end: () => '+=' + ($('.r-track').scrollWidth - innerWidth), scrub: 1, invalidateOnRefresh: true } });
    gsap.to('.r-progress span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.r-pin', start: 'top top', end: () => '+=' + ($('.r-track').scrollWidth - innerWidth), scrub: true, invalidateOnRefresh: true } });
    cards.forEach((c, i) => {
      // fly in from below/above with a tilt, then wave as they pass
      gsap.fromTo(c, { y: i % 2 ? -180 : 180, rotate: i % 2 ? -6 : 6, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: c, containerAnimation: h, start: 'left 100%', end: 'left 55%', scrub: true } });
      gsap.to(c, { y: i % 2 ? 60 : -60, rotate: i % 2 ? 2 : -2, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: h, start: 'left 40%', end: 'right 0%', scrub: true } });
      gsap.fromTo($('.rc-img', c), { xPercent: 6 }, { xPercent: -6, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: h, start: 'left right', end: 'right left', scrub: true } });
      gsap.from($$('.rc-body > *', c), { y: 30, opacity: 0, stagger: .06, ease: 'power2.out', scrollTrigger: { trigger: c, containerAnimation: h, start: 'left 85%', end: 'left 45%', scrub: true } });
    });
    gsap.from($$('.r-end > *'), { x: 80, opacity: 0, stagger: .1, ease: 'power2.out', scrollTrigger: { trigger: '.r-end', containerAnimation: h, start: 'left 95%', end: 'left 60%', scrub: true } });
  });
  mm.add(MOB, () => {
    $$('.rc').forEach((c, i) => gsap.from(c, { y: 80, x: i % 2 ? 30 : -30, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 90%' } }));
  });

  // court, screen & plate reel
  mm.add(DESK, () => {
    const h = sideways({ section: '.reel', pinEl: '.reel-pin', track: '.reel-track' });
    $$('.rp').forEach((p, i) => {
      gsap.fromTo(p, { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', ease: 'power2.out', scrollTrigger: { trigger: p, containerAnimation: h, start: 'left 100%', end: 'left 50%', scrub: true } });
      gsap.fromTo($('.rp-img', p), { xPercent: 8, scale: 1.15 }, { xPercent: -8, scale: 1, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: h, start: 'left right', end: 'right left', scrub: true } });
      gsap.from($$('figcaption > *', p), { y: 40, opacity: 0, stagger: .08, ease: 'power2.out', scrollTrigger: { trigger: p, containerAnimation: h, start: 'left 98%', end: 'left 70%', scrub: true } });
      gsap.to(p, { y: i % 2 ? 22 : -22, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: h, start: 'left right', end: 'right left', scrub: true } });
    });
  });
  mm.add(MOB, () => {
    $$('.rp').forEach(p => gsap.from(p, { clipPath: 'inset(0 0 100% 0)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: p, start: 'top 85%' } }));
  });

  /* ---------- experience: stacked cards ---------- */
  const cards = $$('.work');
  mm.add(DESK, () => {
    cards.forEach((card, i) => {
      const img = $('.work-img', card);
      if (img) gsap.fromTo(img, { yPercent: -10 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });
      if (i === cards.length - 1) return;
      gsap.to($('.work-inner', card), { scale: .92 + i * .01, ease: 'none', scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 20%', scrub: true } });
    });
  });
  cards.forEach(card => {
    gsap.from($$('.work-org,.work-desc', card), { y: 40, opacity: 0, duration: 1, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 75%' } });
    const brand = $('.work-brand img, .work-logo img', card);
    if (brand) gsap.from(brand, { scale: .7, opacity: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 70%' } });
  });

  /* ---------- awards ---------- */
  gsap.from('.award', { clipPath: 'inset(0 100% 0 0)', duration: 1.2, stagger: .07, ease: 'expo.inOut', scrollTrigger: { trigger: '.award-list', start: 'top 85%' } });
  gsap.from('.award-rank', { yPercent: 100, opacity: 0, duration: 1, stagger: .07, ease: 'expo.out', delay: .3, scrollTrigger: { trigger: '.award-list', start: 'top 85%' } });

  /* ---------- more ---------- */
  gsap.from('.inv li', { x: -40, opacity: 0, duration: .9, stagger: .07, ease: 'power3.out', scrollTrigger: { trigger: '.inv', start: 'top 88%' } });
  gsap.from('.learn-card', { y: 40, opacity: 0, duration: 1.1, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: '.learn', start: 'top 88%' } });
  gsap.from('.toolkit li', { y: 14, opacity: 0, duration: .7, stagger: .03, ease: 'power3.out', scrollTrigger: { trigger: '.toolkit', start: 'top 92%' } });

  /* ---------- off the clock ---------- */
  gsap.from('.book', { y: 140, rotateX: 40, opacity: 0, duration: 1.4, stagger: .15, ease: 'expo.out', scrollTrigger: { trigger: '.shelf', start: 'top 82%' } });
  if (fine) $$('[data-tilt]').forEach(b => {
    const rx = gsap.quickTo(b, 'rotateX', { duration: .6, ease: 'power3' }), ry = gsap.quickTo(b, 'rotateY', { duration: .6, ease: 'power3' });
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - .5) * 30); rx(-((e.clientY - r.top) / r.height - .5) * 22); });
    b.addEventListener('pointerleave', () => { ry(-14); rx(0); });
  });
  mm.add('(min-width: 701px)', () => {
    gsap.timeline({ scrollTrigger: { trigger: '.duel', start: 'top 85%', end: 'center 55%', scrub: 1 } })
      .from('.guest-l', { xPercent: -18, opacity: 0, ease: 'none' }, 0)
      .from('.guest-r', { xPercent: 18, opacity: 0, ease: 'none' }, 0)
      .from('.duel-vs', { opacity: 0, ease: 'none' }, .3);
  });
  mm.add('(max-width: 700px)', () => {
    gsap.from('.guest', { y: 80, opacity: 0, duration: 1.2, stagger: .2, ease: 'expo.out', scrollTrigger: { trigger: '.duel', start: 'top 85%' } });
  });

  /* ---------- contact ---------- */
  gsap.fromTo('.c-band-track', { xPercent: 0 }, { xPercent: -40, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom bottom', scrub: 1 } });
  gsap.from('.c-email', { yPercent: 60, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.c-email', start: 'top 92%' } });
  gsap.from('.c-email-line', { scaleX: 0, duration: 1.6, ease: 'expo.inOut', delay: .3, scrollTrigger: { trigger: '.c-email', start: 'top 92%' } });
  gsap.from('.contact-actions > *, .c-side', { y: 40, opacity: 0, duration: 1, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.contact-actions', start: 'top 95%' } });
  if (fine) {
    const spot = $('.spot'), sec = $('.contact');
    const sx = gsap.quickTo(spot, 'x', { duration: 1, ease: 'power3' }), sy = gsap.quickTo(spot, 'y', { duration: 1, ease: 'power3' });
    sec.addEventListener('pointermove', e => { const r = sec.getBoundingClientRect(); sx(e.clientX - r.left); sy(e.clientY - r.top); });
  }

  // coloured aurora behind the contact section
  (function contactAurora() {
    const cv = $('.c-aurora'); if (!cv) return;
    const c2 = cv.getContext('2d');
    const bl = [
      { c: '201,212,223', x: .2, y: .3, r: .45, s: .00014, p: 0 },
      { c: '214,208,240', x: .75, y: .25, r: .42, s: .00011, p: 2 },
      { c: '205,224,214', x: .55, y: .8, r: .4, s: .00017, p: 4 },
      { c: '220,228,236', x: .9, y: .75, r: .3, s: .00013, p: 1 },
    ];
    let on = false;
    const size = () => { cv.width = Math.round(cv.offsetWidth / 5); cv.height = Math.round(cv.offsetHeight / 5); };
    size(); addEventListener('resize', size);
    ScrollTrigger.create({ trigger: '.contact', start: 'top bottom', end: 'bottom top', onToggle: s => on = s.isActive });
    gsap.ticker.add(time => {
      if (!on) return;
      const w = cv.width, h = cv.height, t = time * 1000;
      c2.clearRect(0, 0, w, h);
      for (const b of bl) {
        const x = (b.x + Math.sin(t * b.s + b.p) * .15) * w, y = (b.y + Math.cos(t * b.s * 1.2 + b.p) * .12) * h, r = b.r * Math.max(w, h);
        const g = c2.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${b.c},.75)`); g.addColorStop(1, `rgba(${b.c},0)`);
        c2.fillStyle = g; c2.fillRect(0, 0, w, h);
      }
    });
  })();
  gsap.from('.fch', { yPercent: 110, duration: 1.6, stagger: .05, ease: 'expo.out', scrollTrigger: { trigger: '.f-mark', start: 'top 95%' } });
  gsap.from('.c-strip img', { y: 60, opacity: 0, duration: 1.2, stagger: .04, ease: 'expo.out', scrollTrigger: { trigger: '.c-strip', start: 'top 98%' } });
  $$('.book-3d').forEach((b, i) => gsap.to(b, { y: -10, duration: 2.6 + i * .4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * .5 }));
  gsap.from('.award-title', { x: 40, opacity: 0, duration: 1, stagger: .07, ease: 'power3.out', delay: .35, scrollTrigger: { trigger: '.award-list', start: 'top 85%' } });
  $$('.work-role').forEach(el => {
    const sp = SplitText.create(el, { type: 'words,chars', wordsClass: 'wr' });
    gsap.from(sp.chars, { yPercent: 60, opacity: 0, duration: .9, stagger: .015, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
  });

  const ab = $('[data-words-2]');
  if (ab) { const sp = SplitText.create(ab, { type: 'words', wordsClass: 'w' }); gsap.to(sp.words, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: ab, start: 'top 82%', end: 'bottom 55%', scrub: true } }); }
  gsap.from('.aspire-card', { y: 90, opacity: 0, duration: 1.4, stagger: .15, ease: 'expo.out', scrollTrigger: { trigger: '.aspire-grid', start: 'top 85%' } });
  gsap.from('.beliefs li', { x: 40, opacity: 0, duration: 1, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.beliefs', start: 'top 85%' } });
  gsap.from('.certs li', { y: 24, opacity: 0, duration: .8, stagger: .05, ease: 'power3.out', scrollTrigger: { trigger: '.certs', start: 'top 90%' } });
  gsap.from('.social', { y: 40, opacity: 0, rotateX: -50, transformPerspective: 600, duration: 1.1, stagger: .07, ease: 'expo.out', scrollTrigger: { trigger: '.socials', start: 'top 92%' } });
  gsap.from('.guest-list li', { x: 30, opacity: 0, duration: .8, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: '.guest-list', start: 'top 90%' } });
  if (fine) {
    const fchs = $$('.fch').map(el => ({ el, w: 300 }));
    $('.f-mark')?.addEventListener('pointermove', e => fchs.forEach(f => {
      const r = f.el.getBoundingClientRect(); const k = Math.max(0, 1 - Math.abs(e.clientX - (r.left + r.width / 2)) / 260);
      gsap.to(f, { w: 260 + 420 * k, duration: .6, ease: 'power3.out', overwrite: true, onUpdate: () => { f.el.style.fontVariationSettings = `'wght' ${f.w.toFixed(0)}, 'opsz' 72`; } });
    }));
  }

  addEventListener('load', () => ScrollTrigger.refresh());
}
