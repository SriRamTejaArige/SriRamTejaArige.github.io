// Site engine: builds the home page and each app page from apps/apps.js.
(function () {
  'use strict';

  // ---- Your details (shown in the header, home page and footer) ----
  const OWNER = {
    name: 'Sri Ram Teja Arige',
    role: 'Independent app developer',
    bio: 'I build free, practical apps for real-world work — starting with software for LED walls and live events. Everything here is free to download, and the code is open source.',
    github: 'SriRamTejaArige',
  };

  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const APPS = window.APPS || [];

  // ---------------------------------------------------------------- header & footer
  function chrome() {
    const initials = OWNER.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('');
    $('#site-header').innerHTML = `
      <a class="brand" href="./"><span class="mark">${esc(initials)}</span><span>${esc(OWNER.name)}</span></a>
      <nav><a href="./#apps">Apps</a><a href="./#about">About</a><a href="https://github.com/${esc(OWNER.github)}" rel="noopener">GitHub</a></nav>`;
    $('#site-footer').innerHTML = `
      <div>© ${new Date().getFullYear()} ${esc(OWNER.name)} · Free & open-source apps</div>
      <div><a href="https://github.com/${esc(OWNER.github)}" rel="noopener">github.com/${esc(OWNER.github)}</a></div>`;
  }

  // ---------------------------------------------------------------- live release info from GitHub
  // Download buttons always point at the newest release, so publishing a new version needs no website edit.
  async function latestRelease(repo) {
    try {
      const key = 'rel:' + repo;
      const cached = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (cached && Date.now() - cached.t < 10 * 60 * 1000) return cached.d;
      const r = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers: { Accept: 'application/vnd.github+json' } });
      if (!r.ok) return null;
      const d = await r.json();
      const slim = {
        tag: d.tag_name,
        date: d.published_at,
        assets: (d.assets || []).map((a) => ({ name: a.name, url: a.browser_download_url, size: a.size, count: a.download_count })),
      };
      try {
        sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: slim }));
      } catch (e) {}
      return slim;
    } catch (e) {
      return null;
    }
  }
  const safeGithubUrl = (u) => (/^https:\/\/github\.com\//.test(u) ? u : null);
  const mb = (b) => (b / 1048576).toFixed(0) + ' MB';

  // ---------------------------------------------------------------- home page
  function renderHome() {
    document.title = `${OWNER.name} — Free Apps`;
    $('#hero-name').textContent = OWNER.name;
    $('#hero-role').textContent = OWNER.role;
    $('#hero-bio').textContent = OWNER.bio;
    $('#about-text').textContent = OWNER.bio;
    $('#app-count').textContent = APPS.length === 1 ? '1 app' : APPS.length + ' apps';
    $('#app-grid').innerHTML = APPS.map(
      (a) => `<a class="app-card" href="app.html?id=${encodeURIComponent(a.id)}" style="--accent:${esc(a.color || '#7c5cff')}">
        <div class="app-card-top"><img src="${esc(a.icon)}" alt="" width="64" height="64"><div><h3>${esc(a.name)}</h3><p>${esc(a.tagline)}</p></div></div>
        ${a.screenshots && a.screenshots[0] ? `<img class="app-card-shot" src="${esc(a.screenshots[0].src)}" alt="${esc(a.name)} screenshot" loading="lazy">` : ''}
        <p class="app-card-sum">${esc(a.summary)}</p>
        <div class="chips"><span>${esc(a.category)}</span><span>${esc(a.platform)}</span><span class="ver" data-repo="${esc(a.github || '')}">v${esc(a.version)}</span></div>
        <span class="btn">View details &amp; download →</span>
      </a>`
    ).join('') + `<div class="app-card soon"><div class="soon-icon">＋</div><h3>More apps coming soon</h3><p>New free tools will appear here.</p></div>`;
    // Show the live latest version on each card.
    document.querySelectorAll('.ver[data-repo]').forEach(async (el) => {
      if (!el.dataset.repo) return;
      const rel = await latestRelease(el.dataset.repo);
      if (rel && rel.tag) el.textContent = rel.tag;
    });
  }

  // ---------------------------------------------------------------- app page
  async function renderApp() {
    const id = new URLSearchParams(location.search).get('id');
    const a = APPS.find((x) => x.id === id) || (APPS.length === 1 ? APPS[0] : null);
    const main = $('#app-main');
    if (!a) {
      main.innerHTML = `<section class="wrap notfound"><h1>App not found</h1><p><a href="./">← Back to all apps</a></p></section>`;
      return;
    }
    document.title = `${a.name} — ${a.tagline} | ${OWNER.name}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', a.summary);
    document.documentElement.style.setProperty('--accent', a.color || '#7c5cff');

    const dl = a.downloads
      .map((d, i) => `<a class="dl ${d.primary ? 'primary' : ''}" id="dl-${i}" href="${esc(d.fallback)}"><b>⬇ ${esc(d.label)}</b><small>${esc(d.note)}</small><small class="dl-meta"></small></a>`)
      .join('');
    main.innerHTML = `
      <section class="app-hero"><div class="wrap">
        <a class="back" href="./">← All apps</a>
        <div class="app-head">
          <img src="${esc(a.icon)}" alt="" width="96" height="96">
          <div><h1>${esc(a.name)}</h1><p class="tag">${esc(a.tagline)}</p>
            <div class="chips"><span id="ver">Version ${esc(a.version)}</span><span>${esc(a.platform)}</span><span>${esc(a.license)}</span><span>${esc(a.size)}</span></div>
          </div>
        </div>
        <p class="lead">${esc(a.summary)}</p>
        <div class="dls">${dl}</div>
        <p class="fine"><span id="dl-count"></span>${a.github ? `<a href="https://github.com/${esc(a.github)}" rel="noopener">View source code on GitHub</a> · <a href="https://github.com/${esc(a.github)}/releases" rel="noopener">All versions</a>` : ''}</p>
      </div></section>

      <section class="wrap shots">${(a.screenshots || [])
        .map((s) => `<figure><img src="${esc(s.src)}" alt="${esc(s.caption)}" loading="lazy" data-zoom><figcaption>${esc(s.caption)}</figcaption></figure>`)
        .join('')}</section>

      <section class="wrap highlights">${(a.highlights || [])
        .map(([ic, t, d]) => `<div class="hl"><span class="hl-ic">${ic}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`)
        .join('')}</section>

      <section class="wrap docs">
        <nav class="toc" aria-label="How to use"><h4>How to use</h4>${a.sections.map((s) => `<a href="#${esc(s.id)}">${esc(s.title)}</a>`).join('')}</nav>
        <div class="doc-body">${a.sections.map((s) => `<article id="${esc(s.id)}"><h2>${esc(s.title)}</h2>${s.html}</article>`).join('')}</div>
      </section>`;

    // Lightbox for screenshots.
    main.querySelectorAll('[data-zoom]').forEach((img) =>
      img.addEventListener('click', () => {
        const lb = $('#lightbox');
        $('img', lb).src = img.src;
        $('img', lb).alt = img.alt;
        lb.hidden = false;
      })
    );

    // Highlight the current section in the side menu.
    const links = [...main.querySelectorAll('.toc a')];
    const obs = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.isIntersecting && links.forEach((l) => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id))),
      { rootMargin: '-20% 0px -70% 0px' }
    );
    main.querySelectorAll('.doc-body article').forEach((s) => obs.observe(s));

    // Point the buttons at the latest GitHub release.
    if (a.github) {
      const rel = await latestRelease(a.github);
      if (rel) {
        $('#ver').textContent = 'Version ' + rel.tag.replace(/^v/, '');
        let total = 0;
        a.downloads.forEach((d, i) => {
          const asset = rel.assets.find((x) => x.name.toLowerCase().includes(d.match.toLowerCase()));
          if (!asset) return;
          total += asset.count || 0;
          const url = safeGithubUrl(asset.url);
          const el = $('#dl-' + i);
          if (url) el.href = url;
          $('.dl-meta', el).textContent = `${asset.name} · ${mb(asset.size)}`;
        });
        if (total > 0) $('#dl-count').textContent = `${total.toLocaleString()} downloads · `;
      }
    }
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
