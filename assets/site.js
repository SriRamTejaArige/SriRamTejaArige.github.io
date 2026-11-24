// Site engine: builds the home page and each app page from apps/apps.js.
(function () {
  'use strict';

  // ---- Your details (header, home page, footer) ----
  const OWNER = {
    name: 'Sri Ram Teja Arige',
    github: 'SriRamTejaArige',
    // Home page headline and intro.
    headline: 'Desktop software for live events',
    intro: 'I build and maintain Windows apps for live events. The first, LiveWall Studio, runs videos, camera feeds and titles on LED walls at weddings, stage shows and DJ nights.',
    about:
      'Each app is built for real events: it works offline, needs no account, and runs on an ordinary Windows laptop. Licences are one-time, and you get help directly from me.',
  };

  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const APPS = window.APPS || [];
  const MARK = '<span class="mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';

  // ---------------------------------------------------------------- header & footer
  function chrome() {
    $('#site-header').innerHTML = `<div class="wrap">
      <a class="brand" href="./">${MARK}<span>${esc(OWNER.name)}</span></a>
      <nav><a href="./#apps">Apps</a><a href="./#about">About</a><a href="https://github.com/${esc(OWNER.github)}" rel="noopener">GitHub</a></nav>
    </div>`;
    $('#site-footer').innerHTML = `<div class="wrap">
      <span>© ${new Date().getFullYear()} ${esc(OWNER.name)}</span>
      <a href="https://github.com/${esc(OWNER.github)}" rel="noopener">github.com/${esc(OWNER.github)}</a>
    </div>`;
  }

  // ---------------------------------------------------------------- latest release from GitHub
  // Download buttons always point at the newest release, so publishing a new version needs no website edit.
  async function latestRelease(repo) {
    try {
      const key = 'rel:' + repo;
      const cached = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (cached && Date.now() - cached.t < 10 * 60 * 1000) return cached.d;
      const r = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers: { Accept: 'application/vnd.github+json' } });
      if (!r.ok) return null;
      const d = await r.json();
      const slim = { tag: d.tag_name, assets: (d.assets || []).map((a) => ({ name: a.name, url: a.browser_download_url, size: a.size })) };
      try {
        sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: slim }));
      } catch (e) {}
      return slim;
    } catch (e) {
      return null;
    }
  }
  const safeGithubUrl = (u) => (/^https:\/\/github\.com\//.test(u) ? u : null);
  const mb = (b) => Math.round(b / 1048576) + ' MB';
  const metaLine = (a, ver, size) => [ver || 'v' + a.version, a.platform, a.license, size || a.size].filter(Boolean).map(esc).join(' · ');
  const windowFrame = (src, alt, title) =>
    `<div class="window"><div class="window-bar"><span></span><span></span><span></span><em>${esc(title)}</em></div><img src="${esc(src)}" alt="${esc(alt)}" width="1920" height="1052"></div>`;

  // ---------------------------------------------------------------- home page
  function renderHome() {
    document.title = `${OWNER.name} · Desktop apps for live events`;
    const f = APPS[0];
    $('#home-main').innerHTML = `
      <section class="hero"><div class="wrap">
        <div>
          <p class="kicker">${esc(OWNER.name)}</p>
          <h1>${esc(OWNER.headline)}</h1>
          <p class="sub">${esc(OWNER.intro)}</p>
          ${f ? `<div class="actions"><a class="btn primary" href="app.html?id=${encodeURIComponent(f.id)}">Get ${esc(f.name)}</a><a class="btn" href="#apps">All apps</a></div>` : ''}
        </div>
        ${f && f.screenshots && f.screenshots[0] ? windowFrame(f.screenshots[0].src, f.screenshots[0].caption, f.name) : ''}
      </div></section>

      <section class="wrap section" id="apps">
        <div class="section-head"><h2>Apps</h2><span class="mono">${APPS.length} ${APPS.length === 1 ? 'app' : 'apps'}</span></div>
        <div class="app-list">${APPS.map(
          (a) => `<a class="app-row" href="app.html?id=${encodeURIComponent(a.id)}">
            <img src="${esc(a.icon)}" alt="" width="56" height="56">
            <div><h3>${esc(a.name)}</h3><p>${esc(a.tagline)}</p><p class="mono" data-repo="${esc(a.github || '')}" data-app="${esc(a.id)}">${metaLine(a)}</p></div>
            <span class="btn sm">Details</span>
          </a>`
        ).join('')}</div>
      </section>

      <section class="wrap section about" id="about">
        <div class="section-head"><h2>About</h2></div>
        <p>${esc(OWNER.about)}</p>
        <dl class="facts">
          <div><dt>One-time licence</dt><dd>No subscription, no ads, no account</dd></div>
          <div><dt>Direct support</dt><dd>Help from the developer by email</dd></div>
          <div><dt>Works offline</dt><dd>No internet needed once installed</dd></div>
        </dl>
      </section>`;

    // Show the live latest version on each row.
    document.querySelectorAll('[data-repo]').forEach(async (el) => {
      if (!el.dataset.repo) return;
      const a = APPS.find((x) => x.id === el.dataset.app);
      const rel = await latestRelease(el.dataset.repo);
      if (a && rel && rel.tag) el.innerHTML = metaLine(a, rel.tag);
    });
  }

  // ---------------------------------------------------------------- licence: request form + key-unlocked download
  function licenceSections(a) {
    return `<section class="wrap section licence" id="request">
        <div class="section-head"><h2>Request a licence</h2></div>
        <div class="lic-grid">
          <div class="lic-steps">
            <p><b>1.</b> Send this request.</p>
            <p><b>2.</b> When it's accepted you receive your personal <b>licence key</b> by email.</p>
            <p><b>3.</b> Enter the key under <b>Download</b> below to get the installer, then paste the same key into the app once to activate it.</p>
          </div>
          <form id="req-form" class="lic-form">
            <label>Your name<input name="name" required maxlength="80" autocomplete="name"></label>
            <label>Email (your key is sent here)<input name="email" type="email" required maxlength="120" autocomplete="email"></label>
            <label>Phone / WhatsApp (optional)<input name="phone" maxlength="30" autocomplete="tel"></label>
            <label>City / country<input name="city" maxlength="80"></label>
            <label>How will you use it? (optional)<textarea name="message" rows="3" maxlength="800" placeholder="e.g. weddings and DJ nights, LED wall 4x3 m"></textarea></label>
            <input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
            <button class="btn primary" type="submit">Send request</button>
            <p class="lic-msg" id="req-msg" role="status"></p>
          </form>
        </div>
      </section>
      <section class="wrap section licence" id="download">
        <div class="section-head"><h2>Download</h2></div>
        <p class="sub">Enter the licence key you received (it starts with <code>LW1-</code>).</p>
        <div class="lic-key">
          <textarea id="key-in" rows="2" spellcheck="false" placeholder="LW1-..."></textarea>
          <button class="btn primary" id="key-go" type="button">Unlock download</button>
        </div>
        <p class="lic-msg" id="key-msg" role="status"></p>
        <div class="actions" id="key-files" hidden></div>
      </section>`;
  }

  const b64urlBytes = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));
  async function verifyKey(key, spkiB64) {
    const m = /^LW1-([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)$/.exec(key.replace(/\s+/g, ''));
    if (!m) return null;
    const pub = await crypto.subtle.importKey('spki', b64urlBytes(spkiB64), { name: 'Ed25519' }, false, ['verify']);
    const ok = await crypto.subtle.verify({ name: 'Ed25519' }, pub, b64urlBytes(m[2]), new TextEncoder().encode(m[1]));
    if (!ok) return null;
    const p = JSON.parse(new TextDecoder().decode(b64urlBytes(m[1])));
    return p && p.v === 1 && p.n ? p : null;
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

    const kmsg = $('#key-msg');
    const files = $('#key-files');
    $('#key-go').addEventListener('click', async () => {
      const key = $('#key-in').value.trim();
      kmsg.className = 'lic-msg';
      files.hidden = true;
      if (!key) {
        kmsg.textContent = 'Paste your licence key first.';
        return;
      }
      let p = null;
      try {
        p = await verifyKey(key, L.publicKey);
      } catch (err) {
        kmsg.className = 'lic-msg bad';
        kmsg.textContent = "Your browser can't check keys. Please use an up-to-date Chrome, Edge, Firefox or Safari.";
        return;
      }
      if (!p) {
        kmsg.className = 'lic-msg bad';
        kmsg.textContent = 'That key is not valid. Check you copied all of it.';
        return;
      }
      kmsg.className = 'lic-msg good';
      kmsg.textContent = `Key accepted - licensed to ${p.n}. Choose a download:`;
      files.innerHTML = L.files.map((f, i) => `<a class="btn ${i ? '' : 'primary'}" href="${esc(f.url)}" title="${esc(f.note || '')}">${esc(f.label)}</a>`).join('');
      files.hidden = false;
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
      <section class="hero"><div class="wrap">
        <div>
          <a class="back" href="./">All apps</a>
          <div class="app-id"><img src="${esc(a.icon)}" alt="" width="40" height="40"><div><b>${esc(a.name)}</b><span>${esc(a.category)}</span></div></div>
          <h1>${esc(a.headline || a.tagline)}</h1>
          <p class="sub">${esc(a.summary)}</p>
          <div class="actions">
            ${d1 ? `<a class="btn primary" id="dl-0" href="${esc(d1.fallback)}">${esc(d1.label)}</a>` : ''}
            ${d2 ? `<a class="btn" id="dl-1" href="${esc(d2.fallback)}">${esc(d2.label)}</a>` : ''}
          </div>
          <p class="mono meta" id="app-meta">${metaLine(a)}</p>
          <p class="dl-note">${esc(a.downloadNote || '')}</p>
        </div>
        ${shots[0] ? windowFrame(shots[0].src, shots[0].caption, a.name) : ''}
      </div></section>

      ${a.licence ? licenceSections(a) : ''}

      ${a.highlights && a.highlights.length ? `<section class="wrap section">
        <div class="section-head"><h2>What it does</h2></div>
        <div class="features">${a.highlights.map((h) => { const [t, d] = h.length === 3 ? h.slice(1) : h; return `<div class="feature"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`; }).join('')}</div>
      </section>` : ''}

      ${shots.slice(1).map((s) => `<section class="wrap section shot"><figure>${windowFrame(s.src, s.caption, 'Live output')}<figcaption>${esc(s.caption)}</figcaption></figure></section>`).join('')}

      <section class="wrap section docs">
        <nav class="toc" aria-label="Guide"><h4>Guide</h4>${a.sections.map((s) => `<a href="#${esc(s.id)}">${esc(s.title)}</a>`).join('')}</nav>
        <div class="doc-body">${a.sections.map((s) => `<article id="${esc(s.id)}"><h2>${esc(s.title)}</h2>${s.html}</article>`).join('')}</div>
      </section>
      ${a.github ? `<section class="wrap section"><p class="mono">Source code: <a href="https://github.com/${esc(a.github)}" rel="noopener">github.com/${esc(a.github)}</a> · <a href="https://github.com/${esc(a.github)}/releases" rel="noopener">All versions</a></p></section>` : ''}`;

    if (a.licence) wireLicence(a);

    // Screenshot lightbox.
    main.querySelectorAll('.window img').forEach((img) =>
      img.addEventListener('click', () => {
        const lb = $('#lightbox');
        $('img', lb).src = img.src;
        $('img', lb).alt = img.alt;
        lb.hidden = false;
      })
    );

    // Highlight the current guide section.
    const links = [...main.querySelectorAll('.toc a')];
    const obs = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.isIntersecting && links.forEach((l) => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id))),
      { rootMargin: '-20% 0px -70% 0px' }
    );
    main.querySelectorAll('.doc-body article').forEach((s) => obs.observe(s));

    // Point the buttons at the latest GitHub release and show the real file size.
    if (a.github) {
      const rel = await latestRelease(a.github);
      if (rel) {
        let size = '';
        a.downloads.forEach((d, i) => {
          const asset = rel.assets.find((x) => x.name.toLowerCase().includes(d.match.toLowerCase()));
          const el = $('#dl-' + i);
          if (!asset || !el) return;
          const url = safeGithubUrl(asset.url);
          if (url) el.href = url;
          el.title = `${asset.name} (${mb(asset.size)})`;
          if (i === 0) size = mb(asset.size);
        });
        $('#app-meta').innerHTML = metaLine(a, rel.tag, size);
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
