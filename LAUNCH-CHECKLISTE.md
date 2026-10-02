# crestra – Launch-Checkliste (Stand 2.10.2026)

## Offen – braucht Nils
- [ ] **Impressum: Umsatzsteuer** – USt-IdNr. eintragen oder Hinweis „Kleinunternehmer nach § 19 UStG“ (Platzhalter steht in `_build.py`, Abschnitt Impressum).
- [ ] **Domain crestra.de** – gehört sie dir schon? Alle Canonical-/OG-/Sitemap-Adressen zeigen auf https://crestra.de/. Danach DNS wie bei euregiowash.de (A 185.199.108.153, CNAME www → nilsc2308.github.io) und CNAME-Datei ins Repo.
- [x] **E-Mail** – info@crestra.de (2.10.). Postfach muss eingerichtet sein und funktionieren; Anbieter in der Datenschutzerklärung eintragen (Platzhalter steht dort).
- [ ] **Telefonnummer** – 0173 9128902 steht im Impressum (Pflicht: schneller Kontaktweg) und auf Kontakt/Über. Wenn du keine Anrufe willst: auf Kontakt/Über entfernen, im Impressum muss ein schneller Kontaktweg bleiben.
- [x] **Gratis-Entwurf** ist auf Nils' Wunsch die Hauptbotschaft (2.10.).
- [ ] **Supabase-Auftragsverarbeitung**: In den Supabase-Einstellungen den Auftragsverarbeitungsvertrag (DPA) annehmen; Datenschutzerklärung nennt Supabase (Irland).
- [ ] **Datenschutz gegenlesen lassen** (GitHub Pages/DPF-Angabe, jsDelivr, Gmail).
- [ ] **Anfragen lesen**: Formular-Anfragen landen in Supabase, Tabelle `anfragen` (Projekt „claude“). Noch keine Benachrichtigung – Vorschlag: im crestra-Board anzeigen.

## Geprüft (2.10.2026)
| Punkt | Ergebnis |
|---|---|
| JS-Fehler | 0 – alle 14 Seiten, Chromium + WebKit, 1400 px + 390 px |
| Horizontales Scrollen | keins (scrollWidth = clientWidth überall) |
| Formular | Pflichtfelder + E-Mail-Prüfung, Branche per `?branche=` vorgewählt, Senden → danke.html, Eintrag in Supabase angekommen (Test gelöscht); Ersatz per E-Mail-Link, wenn Senden scheitert; Honeypot |
| Datenbank | Tabelle `anfragen`: anonym nur Einfügen, Lesen gesperrt (getestet) |
| Links | 23 interne/externe Links ohne Fehler |
| Ladegröße Startseite bis „load“ | 643 KB (Ziel Desktop < 900 KB erfüllt; Handy-Ziel 500 KB knapp verfehlt – größter Posten: Newsreader-Kursivschrift 147 KB) |
| Cookies | keine; nur sessionStorage für das Intro; Schriften lokal; kein Tracking → kein Banner nötig |
| Meta | Titel ≤ 65, Beschreibungen ≤ 155 Zeichen (vom Generator erzwungen), Canonical, OG + og.jpg 1200×630 |
| Strukturierte Daten | ProfessionalService auf allen Seiten, FAQPage, Article |
| sitemap.xml, robots.txt, favicon.svg, apple-touch-icon.png, 404 | vorhanden |
| prefers-reduced-motion | Szene wird statische Reihe, Reveals aus, Lenis aus |
| Bilder | keine (Beispiele auf Nils' Wunsch entfernt) |
| Analytics | keins (bewusst) |
