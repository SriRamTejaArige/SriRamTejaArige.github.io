// Site engine: builds the home page and each app page from apps/apps.js (Azura Productions theme).
(function () {
  'use strict';

  // ---- Your details (header, home page, footer) ----
  const OWNER = {
    name: 'Sri Ram Teja Arige',
    github: 'SriRamTejaArige',
    email: 'positive.sriram@gmail.com',
    headline: 'Desktop Software',
    headline2: 'for Live Events',
    intro: 'I build Windows apps for weddings, stage shows and DJ nights. The first, LiveWall Studio, runs videos, camera feeds and titles on LED walls from one laptop.',
    about:
      'Each app is built for real events: it works offline, needs no account, and runs on an ordinary Windows laptop. Licences are one-time, and you get help directly from me.',
  };

  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const APPS = window.APPS || [];
  const TONES = ['t-gold', 't-saffron', 't-blue', 't-red'];
  const TONE_INK = ['#b38f00', '#c25e00', '#4169e1', '#990000'];

  // Small line icons (Lucide, ISC licence).
  const P = {
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
    wand: '<path d="m15 4-1 1M9 9l-7 7 3 3 7-7M14 6l4 4M18 2l4 4"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
    play: '<path d="m6 3 14 9-14 9z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    wifi: '<path d="M2 2l20 20M8.5 16.5a5 5 0 0 1 7 0M2 8.8a15 15 0 0 1 4.2-2.6M10.7 5.1A15 15 0 0 1 22 8.8M5 12.9a10 10 0 0 1 5.2-2.7M19 12.9a10 10 0 0 0-2.6-1.8"/><path d="M12 20h.01"/>',
    star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    tag: '<path d="M12 2H2v10l9.3 9.3a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7" cy="7" r="1.5"/>',
  };
  const icon = (n, size = 24, color = 'currentColor') =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`;
  const FEATURE_ICONS = ['play', 'monitor', 'camera', 'layout', 'wand', 'music', 'layers', 'sparkles'];
  const dots = `<span class="dot" style="top:90px;right:80px;width:16px;height:16px;background:rgba(255,217,0,.3)"></span>
    <span class="dot" style="top:170px;left:70px;width:24px;height:24px;background:rgba(255,153,51,.22);animation-delay:1s"></span>
    <span class="dot" style="bottom:150px;right:160px;width:12px;height:12px;background:rgba(255,217,0,.4);animation-delay:2s"></span>`;

  // ---------------------------------------------------------------- header & footer
  function chrome() {
    $('#site-header').innerHTML = `<div class="wrap">
      <a class="brand" href="./">${esc(OWNER.name)}</a>
      <nav><a href="./">Home</a><a href="./#apps">Apps</a><a href="./#about">About</a><a href="mailto:${esc(OWNER.email)}">Contact</a></nav>
    </div>`;
    $('#site-footer').innerHTML = `<div class="wrap">
      <div><a class="brand" href="./">${esc(OWNER.name)}</a><p>${esc(OWNER.about)}</p></div>
      <div><h4>Apps</h4><ul>${APPS.map((a) => `<li><a href="app.html?id=${encodeURIComponent(a.id)}">${esc(a.name)}</a></li>`).join('')}</ul></div>
      <div><h4>Contact</h4><ul>
        <li><a href="mailto:${esc(OWNER.email)}">${esc(OWNER.email)}</a></li>
        <li><a href="https://github.com/${esc(OWNER.github)}" rel="noopener">github.com/${esc(OWNER.github)}</a></li>
      </ul></div>
      <div class="bottom"><p class="quote">Made for every celebration</p>© ${new Date().getFullYear()} ${esc(OWNER.name)}. All rights reserved.</div>
    </div>`;
    if (!$('#lightbox')) document.body.insertAdjacentHTML('beforeend', '<div id="lightbox" class="lightbox" hidden><img alt="" /></div>');
  }

  const metaLine = (a) => [`v${a.version}`, a.platform, a.license, a.size].filter(Boolean).map(esc).join(' · ');
  const zoomable = (root) =>
    root.querySelectorAll('[data-zoom]').forEach((img) =>
      img.addEventListener('click', () => {
        const lb = $('#lightbox');
        $('img', lb).src = img.dataset.zoom || img.src;
        $('img', lb).alt = img.alt;
        lb.hidden = false;
      })
    );
  function reveal(root) {
    const els = root.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) return els.forEach((e) => e.classList.add('in'));
    const io = new IntersectionObserver((ents) => ents.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((e) => io.observe(e));
  }
  const heroIcons = (items) =>
    `<div class="icons">${items.map(([n, label, bg, ink]) => `<div><i style="background:${bg};color:${ink}">${icon(n, 24)}</i>${esc(label)}</div>`).join('')}</div>`;

  // ---------------------------------------------------------------- home page
  function renderHome() {
    document.title = `${OWNER.name} · Desktop apps for live events`;
    const f = APPS[0];
    $('#home-main').innerHTML = `
      <section class="hero">
        <div class="hero-bg" style="background-image:url('${esc(f ? f.heroImage : '')}')"></div>${dots}
        <div class="wrap">
          <div>
            <span class="pill gold">${icon('star', 16)} Software for events</span>
            <h1>${esc(OWNER.headline)}<span>${esc(OWNER.headline2)}</span></h1>
            <p class="sub">${esc(OWNER.intro)}</p>
            <div class="actions">
              ${f ? `<a class="btn saffron" href="app.html?id=${encodeURIComponent(f.id)}">${icon('play', 18)} Explore ${esc(f.name)}</a>` : ''}
              <a class="btn outline" href="#apps">All Apps</a>
            </div>
            ${heroIcons([['monitor', 'LED Walls', 'rgba(255,217,0,.2)', '#ffd900'], ['layout', 'Templates', 'rgba(255,153,51,.2)', '#ff9933'], ['music', 'Music Sync', 'rgba(65,105,225,.25)', '#7d9bff']])}
          </div>
          ${f ? `<div class="float-card-wrap"><div class="float-card">
            <div class="top"><span class="live">NEW RELEASE</span><span class="mono">v${esc(f.version)}</span></div>
            <div class="shot"><img src="${esc(f.cardImage || f.screenshots[1].src)}" alt="${esc(f.name)} LED wall output" data-zoom></div>
            <div class="foot"><div><b>${esc(f.name)}</b><small>${esc(f.tagline)}</small></div><a class="btn gold sm" href="app.html?id=${encodeURIComponent(f.id)}">View</a></div>
          </div></div>` : ''}
        </div>
      </section>

      <section class="section serene" id="apps"><div class="wrap">
        <div class="section-head reveal"><span class="pill gold">${icon('star', 16)} My Apps</span><h2>Apps</h2>
          <p>Professional tools for real events - offline-ready, simple to run and made for Indian celebrations.</p></div>
        ${APPS.map((a, i) => `<div class="app-feature reveal">
          <div class="card ${TONES[(i + 2) % 4]}">
            <div class="app-head"><img src="${esc(a.icon)}" alt=""><div><h3>${esc(a.name)}</h3><span class="tag">${esc(a.category)}</span></div></div>
            <p>${esc(a.summary)}</p>
            <ul>${(a.highlights || []).slice(0, 5).map((h) => `<li>${esc(h[0])}</li>`).join('')}</ul>
            <div class="price">${esc(a.license)} · v${esc(a.version)}</div>
            <a class="btn tone" href="app.html?id=${encodeURIComponent(a.id)}">Get All Details ${icon('play', 14)}</a>
          </div>
          <div class="shot-panel"><img src="${esc(a.screenshots[0].src)}" alt="${esc(a.screenshots[0].caption)}" data-zoom>
            <div class="cap"><span class="badge">The studio</span><span>${esc(a.tagline)}</span></div></div>
        </div>`).join('')}
      </div></section>

      ${f && f.gallery ? `<section class="section"><div class="wrap">
        <div class="section-head reveal"><h2 class="red">On the LED Wall</h2><p>Real output from ${esc(f.name)} - ready designs for every function.</p></div>
        <div class="gallery">${f.gallery.slice(0, 4).map(galleryCard).join('')}</div>
      </div></section>` : ''}

      <section class="section serene" id="about"><div class="wrap">
        <div class="section-head reveal"><span class="pill gold">${icon('user', 16)} About</span><h2>Built for Real Events</h2></div>
        <p class="about-text reveal">${esc(OWNER.about)}</p>
        <div class="facts">
          ${[['tag', 'One-time licence', 'No subscription, no ads, no account'], ['mail', 'Direct support', 'Help from the developer by email'], ['wifi', 'Works offline', 'No internet needed at the venue']]
            .map(([n, t, d], i) => `<div class="card ${TONES[i]} reveal"><div class="ic">${icon(n, 28)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
        </div>
      </div></section>`;
    zoomable($('#home-main'));
    reveal($('#home-main'));
  }

  const galleryCard = (g) => `<div class="ecard reveal">
      <div class="img"><img src="${esc(g.src)}" alt="${esc(g.title)}" loading="lazy" data-zoom><span class="badge">${esc(g.tag)}</span></div>
      <div class="body"><h3>${esc(g.title)}</h3><p>${esc(g.text)}</p><div class="chips">${(g.chips || []).map((c) => `<span>${esc(c)}</span>`).join('')}</div></div>
    </div>`;

  // ---------------------------------------------------------------- licence: request form + key-unlocked download
  function licenceSections(a) {
    return `<section class="section serene" id="request"><div class="wrap">
        <div class="section-head reveal"><span class="pill gold">${icon('key', 16)} One PC · One Licence</span><h2 class="red">Request a Licence</h2>
          <p>Send a request with your PC code. Once it is accepted you receive a licence key made for that PC.</p></div>
        <div class="lic-grid">
          <div class="lic-steps reveal">
            ${[
              ['Install the app', `Download the installer below and run it on the PC that drives your LED wall.`],
              ['Copy your PC code', `At the end of setup ${esc(a.name)} shows this PC's code, like <code>PC-7F3A-91C2</code>.`],
              ['Send this request', 'Fill the form with your details and the PC code.'],
              ['Activate', 'You get your licence key by email. Paste it into the app once - done.'],
            ].map(([t, d], i) => `<div class="step"><span class="num" style="background:${TONE_INK[i]}">${i + 1}</span><p><b>${t}.</b> ${d}</p></div>`).join('')}
          </div>
          <form id="req-form" class="lic-form panel reveal">
            <div class="two">
              <label>Your name<input name="name" required maxlength="80" autocomplete="name"></label>
              <label>Email (your key is sent here)<input name="email" type="email" required maxlength="120" autocomplete="email"></label>
            </div>
            <div class="two">
              <label>PC code (shown by the app during setup)<input name="pc" class="pc" required maxlength="12" placeholder="PC-7F3A-91C2" pattern="[Pp][Cc]-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}"></label>
              <label>Phone / WhatsApp (optional)<input name="phone" maxlength="30" autocomplete="tel"></label>
            </div>
            <label>City / country<input name="city" maxlength="80"></label>
            <label>How will you use it? (optional)<textarea name="message" rows="3" maxlength="800" placeholder="e.g. weddings and DJ nights, LED wall 4x3 m"></textarea></label>
            <input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
            <button class="btn saffron" type="submit">${icon('mail', 18)} Send request</button>
            <p class="lic-msg" id="req-msg" role="status"></p>
          </form>
        </div>
      </div></section>
      <section class="section" id="download"><div class="wrap">
        <div class="section-head reveal"><h2>Download</h2><p>Free to download. The app opens on its activation screen and needs a licence key made for your PC.</p></div>
        <div class="panel reveal" style="text-align:center">
          <div class="actions" style="justify-content:center">${a.licence.files.map((f, i) => `<a class="btn ${i ? 'ghost' : 'saffron'}" href="${esc(f.url)}">${icon('download', 18)} ${esc(f.label)}</a>`).join('')}</div>
          <p class="lic-msg">${esc(a.licence.files.map((f) => f.note).filter(Boolean).join(' · '))}</p>
          <p class="lic-msg">Already have a key? Paste it at the end of setup, or in the app's activation screen.</p>
        </div>
      </div></section>`;
  }

  function wireLicence(a) {
    const L = a.licence;
    const form = $('#req-form');
    const rmsg = $('#req-msg');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      if (data._honey) return;
      delete data._honey;
      data.pc = String(data.pc || '').trim().toUpperCase();
      const btn = $('button', form);
      btn.disabled = true;
      rmsg.className = 'lic-msg';
      rmsg.textContent = 'Sending...';
      try {
        const r = await fetch('https://formsubmit.co/ajax/' + encodeURIComponent(L.requestTo), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ _subject: `${a.name} licence request - ${data.name}`, _template: 'table', _captcha: 'false', app: a.name, ...data }),
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok || String(j.success) !== 'true') throw new Error(j.message || 'send failed');
        form.reset();
        rmsg.className = 'lic-msg good';
        rmsg.textContent = 'Request sent. You will get an email reply, usually within a day.';
      } catch (err) {
        rmsg.className = 'lic-msg bad';
        rmsg.innerHTML = `Couldn't send right now. Please email <a href="mailto:${esc(L.requestTo)}">${esc(L.requestTo)}</a> instead.`;
      }
      btn.disabled = false;
    });

  }

  // ---------------------------------------------------------------- app page
  async function renderApp() {
    const id = new URLSearchParams(location.search).get('id');
    const a = APPS.find((x) => x.id === id) || (APPS.length === 1 ? APPS[0] : null);
    const main = $('#app-main');
    if (!a) {
      main.innerHTML = `<section class="wrap notfound"><h1>App not found</h1><p><a href="./">Back to all apps</a></p></section>`;
      return;
    }
    document.title = `${a.name} · ${OWNER.name}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', a.summary);

    const [d1, d2] = a.downloads;
    const shots = a.screenshots || [];
    main.innerHTML = `
      <section class="hero">
        <div class="hero-bg" style="background-image:url('${esc(a.heroImage || '')}')"></div>${dots}
        <div class="wrap">
          <div>
            <a class="back" href="./">&larr; All apps</a>
            <div class="app-id"><img src="${esc(a.icon)}" alt=""><div><b>${esc(a.name)}</b><span>${esc(a.category)}</span></div></div>
            <h1>${esc(a.headlineGold || a.name)}<span>${esc(a.headlineWhite || '')}</span></h1>
            <p class="sub">${esc(a.summary)}</p>
            <div class="actions">
              ${d1 ? `<a class="btn saffron" href="${esc(d1.fallback)}">${icon('key', 18)} ${esc(d1.label)}</a>` : ''}
              ${d2 ? `<a class="btn outline" href="${esc(d2.fallback)}">${icon('download', 18)} ${esc(d2.label)}</a>` : ''}
            </div>
            <p class="meta">${metaLine(a)}</p>
            ${heroIcons([['monitor', 'LED Walls', 'rgba(255,217,0,.2)', '#ffd900'], ['wand', 'Green Screen', 'rgba(255,153,51,.2)', '#ff9933'], ['music', 'Music Sync', 'rgba(65,105,225,.25)', '#7d9bff']])}
          </div>
          ${shots[0] ? `<div class="float-card-wrap"><div class="float-card">
            <div class="top"><span class="live">${esc(a.name.toUpperCase())}</span><span class="mono">v${esc(a.version)} · Windows</span></div>
            <div class="shot"><img src="${esc(shots[0].src)}" alt="${esc(shots[0].caption)}" data-zoom></div>
            <div class="foot"><div><b>The studio</b><small>Preview, live, layers and templates</small></div><a class="btn gold sm" href="#request">Get it</a></div>
          </div></div>` : ''}
        </div>
      </section>

      ${a.highlights && a.highlights.length ? `<section class="section"><div class="wrap">
        <div class="section-head reveal"><span class="pill gold">${icon('star', 16)} Everything you need</span><h2>What It Does</h2></div>
        <div class="cards three">${a.highlights.map((h, i) => `<div class="card ${TONES[i % 4]} reveal">
          <div class="ic">${icon(FEATURE_ICONS[i % FEATURE_ICONS.length], 30)}</div><h3>${esc(h[0])}</h3><p>${esc(h[1])}</p></div>`).join('')}</div>
      </div></section>` : ''}

      ${a.gallery ? `<section class="section serene"><div class="wrap">
        <div class="section-head reveal"><h2 class="red">On the LED Wall</h2><p>Real output from ${esc(a.name)} - ready designs for every function, live in one tap.</p></div>
        <div class="gallery">${a.gallery.map(galleryCard).join('')}</div>
      </div></section>` : ''}

      ${a.licence ? licenceSections(a) : ''}

      <section class="section serene"><div class="wrap">
        <div class="section-head reveal"><h2>Guide</h2><p>Install, connect your LED wall and run your first show.</p></div>
        <div class="docs">
          <nav class="toc" aria-label="Guide"><h4>Guide</h4>${a.sections.map((s) => `<a href="#${esc(s.id)}">${esc(s.title)}</a>`).join('')}</nav>
          <div class="doc-body">${a.sections.map((s) => `<article id="${esc(s.id)}"><h2>${esc(s.title)}</h2>${s.html}</article>`).join('')}</div>
        </div>
      </div></section>`;

    if (a.licence) wireLicence(a);
    zoomable(main);
    reveal(main);

    // Highlight the current guide section.
    const links = [...main.querySelectorAll('.toc a')];
    const obs = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.isIntersecting && links.forEach((l) => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id))),
      { rootMargin: '-20% 0px -70% 0px' }
    );
    main.querySelectorAll('.doc-body article').forEach((s) => obs.observe(s));
  }

  document.addEventListener('DOMContentLoaded', () => {
    chrome();
    if (document.body.dataset.page === 'app') renderApp();
    else renderHome();
    const lb = $('#lightbox');
    if (lb) {
      lb.addEventListener('click', () => (lb.hidden = true));
      document.addEventListener('keydown', (e) => e.key === 'Escape' && (lb.hidden = true));
    }
  });
})();
