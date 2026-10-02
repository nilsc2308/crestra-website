/* crestra – main.js */
(() => {
  const d = document, root = d.documentElement;
  const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = d) => c.querySelector(s), $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const hatGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  /* ---------- Lenis + GSAP ---------- */
  let lenis = null;
  if (hatGsap) gsap.registerPlugin(ScrollTrigger);
  if (!ruhig && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.1, easing: t => 1 - Math.pow(1 - t, 3.2), smoothWheel: true });
    if (hatGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  const nachLaden = () => hatGsap && ScrollTrigger.refresh();
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(nachLaden);
  addEventListener('load', nachLaden);

  /* ---------- Kopfzeile, Fortschritt, Sticky-CTA ---------- */
  const kopf = $('.kopf'), fort = $('.fortschritt'), kc = $('.klebe-cta');
  const ziel = $('#anfrage') || $('.fuss');
  const beimScrollen = () => {
    const y = scrollY, h = d.documentElement.scrollHeight - innerHeight;
    if (kopf) kopf.classList.toggle('linie', y > 8);
    if (fort) fort.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`;
    if (kc) {
      const zielTop = ziel ? ziel.getBoundingClientRect().top : Infinity;
      kc.classList.toggle('sichtbar', y > innerHeight * 0.7 && zielTop > innerHeight * 0.9);
    }
  };
  addEventListener('scroll', beimScrollen, { passive: true });
  beimScrollen();

  /* ---------- Ausklappmenü ---------- */
  $$('.aus').forEach(a => {
    const b = $('button', a);
    const setze = o => { a.classList.toggle('offen', o); b.setAttribute('aria-expanded', o); };
    b.addEventListener('click', e => { e.stopPropagation(); setze(!a.classList.contains('offen')); });
    if (matchMedia('(hover:hover)').matches) {
      let t;
      a.addEventListener('mouseenter', () => { clearTimeout(t); setze(true); });
      a.addEventListener('mouseleave', () => { t = setTimeout(() => setze(false), 160); });
    }
    d.addEventListener('click', e => { if (!a.contains(e.target)) setze(false); });
    a.addEventListener('keydown', e => { if (e.key === 'Escape') { setze(false); b.focus(); } });
  });

  /* ---------- Handy-Menü ---------- */
  const burger = $('.burger');
  if (burger) {
    const menue = $('.menue');
    const setze = o => {
      root.classList.toggle('menue-offen', o);
      burger.setAttribute('aria-expanded', o);
      burger.setAttribute('aria-label', o ? 'Menü schließen' : 'Menü öffnen');
      menue.setAttribute('aria-hidden', !o);
      $$('a', menue).forEach((l, i) => { l.style.transitionDelay = o ? `${60 + i * 35}ms` : '0ms'; l.tabIndex = o ? 0 : -1; });
      if (lenis) o ? lenis.stop() : lenis.start();
      d.body.style.overflow = o ? 'hidden' : '';
    };
    setze(false);
    burger.addEventListener('click', () => setze(!root.classList.contains('menue-offen')));
    d.addEventListener('keydown', e => { if (e.key === 'Escape' && root.classList.contains('menue-offen')) { setze(false); burger.focus(); } });
  }

  /* ---------- Seitenübergang + Intro ---------- */
  const vorhang = $('.vorhang');
  if (vorhang && !ruhig) {
    d.addEventListener('click', e => {
      const a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const href = a.getAttribute('href') || '';
      if (a.target || a.hasAttribute('download') || !/\.html(\?|$)/.test(href) || /^(https?:|mailto:|tel:)/.test(href)) return;
      e.preventDefault();
      vorhang.classList.remove('raus'); vorhang.classList.add('rein');
      setTimeout(() => { location.href = a.href; }, 430);
    });
    addEventListener('pageshow', e => { if (e.persisted) vorhang.classList.remove('rein', 'raus'); });
  }
  const intro = $('.intro');
  if (intro) {
    let gesehen = false;
    try { gesehen = sessionStorage.getItem('crestra-intro') === '1'; sessionStorage.setItem('crestra-intro', '1'); } catch (e) { gesehen = true; }
    if (gesehen || ruhig || !hatGsap) intro.remove();
    else {
      const m = $('.marke', intro);
      gsap.timeline({ onComplete: () => intro.remove() })
        .from(m, { y: 24, opacity: 0, duration: .6, ease: 'expo.out' })
        .to(m, { y: -16, opacity: 0, duration: .35, ease: 'power2.in' }, '+=.35')
        .to(intro, { opacity: 0, duration: .35, ease: 'power2.out' }, '-=.1');
    }
  }

  /* ---------- Knöpfe: Lichtreflex + Magnet ---------- */
  if (matchMedia('(hover:hover)').matches && !ruhig) {
    $$('.btn').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        b.style.setProperty('--mx', x + 'px'); b.style.setProperty('--my', y + 'px');
        if (hatGsap && b.dataset.magnet !== 'aus') gsap.to(b, { x: (x - r.width / 2) * .12, y: (y - r.height / 2) * .2, duration: .3, ease: 'power3.out' });
      });
      b.addEventListener('pointerleave', () => hatGsap && gsap.to(b, { x: 0, y: 0, duration: .45, ease: 'elastic.out(1,.5)' }));
    });
  }

  /* ---------- Reveals ---------- */
  if (hatGsap) {
    $$('.wr').forEach(h => {
      const teile = [];
      const geh = (n) => {
        [...n.childNodes].forEach(c => {
          if (c.nodeType === 3) {
            const frag = d.createDocumentFragment();
            c.nodeValue.split(/(\s+)/).forEach(t => {
              if (!t) return;
              if (/^\s+$/.test(t)) { frag.appendChild(d.createTextNode(t)); return; }
              const w = d.createElement('span'); w.className = 'w';
              const i = d.createElement('span'); i.textContent = t; w.appendChild(i); frag.appendChild(w); teile.push(i);
            });
            c.replaceWith(frag);
          } else if (c.nodeType === 1 && c.tagName !== 'BR') {
            if (c.tagName === 'EM') { const w = d.createElement('span'); w.className = 'w'; c.replaceWith(w); const i = d.createElement('span'); i.appendChild(c); w.appendChild(i); teile.push(i); }
            else geh(c);
          }
        });
      };
      geh(h);
      if (ruhig) return;
      const sofort = h.closest('.einstieg, .seitenkopf');
      gsap.from(teile, { yPercent: 105, duration: 1, ease: 'expo.out', stagger: .045, delay: sofort ? .15 : 0,
        scrollTrigger: sofort ? null : { trigger: h, start: 'top 88%' } });
    });
    if (ruhig) $$('.auf').forEach(e => { e.style.opacity = 1; e.style.transform = 'none'; });
    else $$('.auf').forEach(e => {
      const sofort = e.closest('.einstieg, .seitenkopf');
      gsap.to(e, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: sofort ? .35 + (+e.dataset.v || 0) : 0,
        scrollTrigger: sofort ? null : { trigger: e, start: 'top 90%' } });
    });
  } else $$('.auf').forEach(e => { e.style.opacity = 1; e.style.transform = 'none'; });

  /* ---------- Rechner ---------- */
  const r = $('[data-rechner]');
  if (r) {
    const wert = $('#r-wert', r), marge = $('#r-marge', r), aus = $('.ergebnis', r);
    const JAHR1 = 250 + 12 * 59, FOLGE = 12 * 59;
    const zahl = s => { const v = parseFloat(String(s).replace(/\./g, '').replace(',', '.')); return isFinite(v) && v > 0 ? v : 0; };
    const eur = v => Math.round(v).toLocaleString('de-DE') + ' €';
    const rechne = () => {
      const w = zahl(wert.value), m = Math.min(100, zahl(marge.value));
      const g = w * m / 100;
      let satz;
      if (!g) satz = 'Tragen Sie Ihren Auftragswert und Ihren Gewinnanteil ein.';
      else if (g >= JAHR1) {
        const jahre = 1 + Math.floor((g - JAHR1) / FOLGE);
        satz = `Ein einziger zusätzlicher Auftrag bezahlt Ihre Website für <b>${jahre} ${jahre === 1 ? 'Jahr' : 'Jahre'}</b>.`;
      } else {
        const n = Math.ceil(JAHR1 / g);
        satz = `Nach <b>${n} zusätzlichen Aufträgen</b> im Jahr ist die Website bezahlt.`;
      }
      $('.gross', aus).innerHTML = satz;
      $('[data-g]', aus).textContent = g ? eur(g) : '–';
      $('[data-j1]', aus).textContent = eur(JAHR1);
      $('[data-jf]', aus).textContent = eur(FOLGE);
    };
    [wert, marge].forEach(i => i.addEventListener('input', rechne));
    $$('.vorlagen button', r).forEach(b => b.addEventListener('click', () => { wert.value = Number(b.dataset.w).toLocaleString('de-DE'); marge.value = b.dataset.m; rechne(); }));
    rechne();
  }

  /* ---------- Formular ---------- */
  const SB = 'https://mvcwhvntbvnldqimjiki.supabase.co/rest/v1/anfragen';
  const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Y3dodm50YnZubGRxaW1qaWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2MDE3MzAsImV4cCI6MjEwNjE3NzczMH0._Ar5wQHzxZInIL9VhbtEFjLjb7VxZ9WishHm6lGJtFo';
  $$('form[data-anfrage]').forEach(f => {
    const thema = new URLSearchParams(location.search).get('branche');
    if (thema && f.branche) [...f.branche.options].forEach(o => { if (o.value === thema) o.selected = true; });
    const status = $('.status', f), knopf = $('button[type=submit]', f);
    const pruefe = (feld) => {
      const box = feld.closest('.f'); if (!box) return true;
      let ok = feld.checkValidity();
      if (feld.type === 'email') ok = ok && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(feld.value.trim());
      if (feld.required && !feld.value.trim()) ok = false;
      box.classList.toggle('falsch', !ok);
      feld.setAttribute('aria-invalid', !ok);
      return ok;
    };
    $$('input, select, textarea', f).forEach(i => i.addEventListener('blur', () => { if (i.closest('.f.falsch') || i.value) pruefe(i); }));
    f.addEventListener('submit', async e => {
      e.preventDefault();
      if (f.querySelector('.honig input').value) return;
      const felder = $$('[required]', f);
      const ok = felder.map(pruefe).every(Boolean);
      if (!ok) { const erst = $('.falsch input, .falsch select, .falsch textarea', f); erst && erst.focus(); status.className = 'status fehler'; status.textContent = 'Bitte die markierten Felder ausfüllen.'; return; }
      const daten = {
        firma: f.firma.value.trim(), name: f.name.value.trim() || null, email: f.email.value.trim(),
        telefon: f.telefon.value.trim() || null, website: f.website.value.trim() || null,
        branche: f.branche.value || null, nachricht: f.nachricht.value.trim() || null,
        quelle: (location.pathname.split('/').pop() || 'index.html').slice(0, 120)
      };
      knopf.disabled = true; status.className = 'status'; status.textContent = 'Wird gesendet …';
      try {
        const res = await fetch(SB, { method: 'POST', headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(daten) });
        if (!res.ok) throw new Error(res.status);
        location.href = 'danke.html';
      } catch (err) {
        knopf.disabled = false;
        const text = encodeURIComponent(`Firma: ${daten.firma}\nName: ${daten.name || ''}\nE-Mail: ${daten.email}\nTelefon: ${daten.telefon || ''}\nWebsite: ${daten.website || ''}\nBranche: ${daten.branche || ''}\n\n${daten.nachricht || ''}`);
        status.className = 'status fehler';
        status.innerHTML = `Das Senden hat gerade nicht geklappt. <a class="link" href="mailto:info@crestra.de?subject=${encodeURIComponent('Entwurf anfordern: ' + daten.firma)}&body=${text}">Stattdessen per E-Mail schicken</a>`;
      }
    });
  });

  /* ---------- Jahr ---------- */
  $$('[data-jahr]').forEach(e => { e.textContent = new Date().getFullYear(); });
})();
