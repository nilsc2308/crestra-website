# crestra – Launch-Checkliste (geprüft 2.10.2026)

| Punkt | Stand | Ergebnis |
|---|---|---|
| Datenschutzerklärung | ⚠️ fast | Vorhanden, passt zur Seite (GitHub Pages, jsDelivr, Supabase-Formular, keine Cookies). **Offen:** Anbieter des Postfachs info@crestra.de eintragen (Platzhalter im Abschnitt „E-Mail“); Supabase-Auftragsverarbeitungsvertrag (DPA) in den Supabase-Einstellungen annehmen; gegenlesen lassen. |
| Impressum | ✅ | § 5 DDG: Name, crestra, Anschrift, Telefon, E-Mail, Verantwortlicher § 18 MStV. Keine USt-IdNr. vorhanden → keine Angabe nötig (falls später eine kommt: nachtragen). |
| Cookie Consent | ✅ nicht nötig | Test: `document.cookie` auf allen 14 Seiten leer. Kein Tracking, Schriften lokal, keine Karten/Videos von Dritten. Nur sessionStorage für das Intro (technisch nötig). |
| Mobile Version | ✅ | Alle Seiten in Chrome + Safari bei 390 px getestet: 0 Fehler, kein seitliches Verrutschen, Burger-Menü, Knopf unten. |
| Meta Titles | ✅ | Alle 14 Seiten 10–65 Zeichen, keine doppelten. |
| Meta Descriptions | ✅ | Alle 50–155 Zeichen, keine doppelten (404 verlängert). |
| Favicon / Logo im Tab | ✅ | favicon.ico (16/32/48 px), favicon.svg, apple-touch-icon (180 px), icon-192/512 + site.webmanifest – Logo im Browser-Tab, in Lesezeichen und auf dem Handy-Startbildschirm. |
| Sitemap.xml | ✅ | 12 Seiten, alle vorhanden; danke.html und 404.html bewusst nicht drin. |
| Robots.txt | ✅ | Alles erlaubt, Verweis auf Sitemap. danke/404 mit `noindex`. |
| Canonical URLs | ✅ | Jede Seite zeigt auf sich selbst unter https://crestra.de/ – greift, sobald die Domain auf die Seite zeigt. |
| 404-Seite | ✅ | Vorhanden, mit Wegen zu Start, Leistung & Preis, Kontakt. GitHub Pages zeigt sie automatisch. |
| Broken Links | ✅ | 17 verschiedene Links geprüft, 0 kaputt. |
| Performance | ✅ | Startseite bis „load“: 188 KB Desktop / 145 KB Handy (vorher 643 KB – Akzentschrift von 143 auf 21 KB verkleinert, Screenshots entfernt). Layout-Verschiebung (CLS) 0,006. |
| Accessibility Basics | ✅ | axe-Test (WCAG 2 AA) auf allen Seiten: 0 Fehler nach dem Einblenden. Grau für Kleintext abgedunkelt (Kontrast ≥ 5:1), Überschriften-Reihenfolge korrigiert (Ablauf, Ratgeber), Formular mit Labels, Fokus-Rahmen, Tastatur-bedienbar, reduzierte Bewegung wird beachtet. |
| Kontaktformular | ✅ | Pflichtfelder, E-Mail-Prüfung, Stil-Auswahl, Senden → danke.html, Eintrag in Supabase `anfragen` (Test angekommen + gelöscht), anonym nur Einfügen/kein Lesen, E-Mail-Ersatz, Spam-Falle. |
| Alt-Texte | ✅ | Seite hat keine Bilder mehr (Beispiele entfernt); keine `img` ohne alt. |
| Google Analytics / Tracking | ✅ bewusst keins | Kein Tracking → kein Cookie-Banner. Später möglich: cookielose Statistik – dann Datenschutz ergänzen. |
| Open Graph Bild | ✅ | og.jpg 1200×630 mit Schriftzug + Claim, og:title/description/url/image auf allen Seiten. |
| Lokale SEO-Daten | ⚠️ | Adresse, Telefon, E-Mail als strukturierte Daten (ProfessionalService) auf jeder Seite, dazu FAQPage + Article. Öffnungszeiten: keine (Arbeit per E-Mail). **Empfehlung:** Google-Unternehmensprofil anlegen (als Servicegebiet „Deutschland“, Adresse kann verborgen werden) – musst du selbst bei Google beantragen. |
| Indexierung bei Google | ⏳ nach Launch | Erst möglich, wenn die Seite online ist: Google Search Console → crestra.de bestätigen → sitemap.xml einreichen → nach einigen Tagen „site:crestra.de“ prüfen. |

## Vor dem Online-Gang noch offen
- [ ] Postfach-Anbieter von info@crestra.de nennen (für die Datenschutzerklärung) und Postfach testen
- [ ] Domain crestra.de: DNS wie bei euregiowash.de (A 185.199.108.153, CNAME www → nilsc2308.github.io)
- [ ] Telefonnummer 0173 9128902 steht im Impressum (Pflicht: schneller Kontaktweg) und auf Kontakt/Über – auf Kontakt/Über entfernen, wenn du keine Anrufe willst
- [ ] Nils' Ja zum Veröffentlichen auf GitHub Pages
- [ ] Neue Anfragen sichtbar machen (Vorschlag: im crestra-Board)
