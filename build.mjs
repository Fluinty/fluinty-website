// Sklada strony z czesci wspolnych (src/partials) i tresci stron (src/pages).
// Wynik laduje w katalogu repo, bo Netlify serwuje pliki wprost, bez budowania.
// Uruchomienie: node build.mjs        (dodaj --check, zeby tylko sprawdzic, nic nie zapisujac)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'

const SRC = 'src'
const CHECK = process.argv.includes('--check')
// --base new-design: podglad calej strony pod fluinty.pl/new-design/ (noindex, pasek z informacja)
const BASE_ARG = process.argv.indexOf('--base')
const BASE = BASE_ARG > -1 ? process.argv[BASE_ARG + 1].replace(/^\/|\/$/g, '') : ''
const PREFIX = BASE ? '/' + BASE : ''
const OUT_DIR = BASE ? join('preview', BASE) : '.'
const SITE = 'https://fluinty.pl'

const partial = (name) => readFileSync(join(SRC, 'partials', name + '.html'), 'utf8')
const HEAD = partial('head')
const PARTS = {
  pl: { nav: partial('nav'), footer: partial('footer'), cta: 'Bezpłatna konsultacja', contact: 'kontakt/', locale: 'pl_PL' },
  en: { nav: partial('nav-en'), footer: partial('footer-en'), cta: 'Free consultation', contact: 'en/contact/', locale: 'en_GB' },
}

// Mapa stron: plik zrodlowy -> adres w serwisie.
// active: ktora pozycja menu ma stan biezacej strony. alt: adres tej samej strony w drugim jezyku.
const PL = [
  { src: 'index',            out: 'index.html',                          path: '/',                         alt: '/en/',                                  active: null,        title: 'Automatyzacja procesów dla MŚP | Fluinty', desc: 'Wdrażamy agentów AI, którzy przejmują powtarzalne procesy: zamówienia z maili do ERP, dokumenty, reklamacje, windykacja. Jawny cennik, pierwszy krok bezpłatny.' },
  { src: 'case-eticod',      out: 'realizacje/eticod/index.html',        path: '/realizacje/eticod/',       alt: '/en/case-studies/eticod/',              active: 'REALIZACJE', title: 'Eticod: zamówienia z maili prosto do ERP | Fluinty', desc: 'Agent czyta zamówienia ze skrzynki, sprawdza komplet danych i wpisuje je do ERP bez API. 160 h miesięcznie mniej ręcznej pracy, zero błędnych wpisów od startu.' },
  { src: 'case-marbella',    out: 'realizacje/iim-marbella/index.html',  path: '/realizacje/iim-marbella/', alt: '/en/case-studies/iim-marbella/',        active: 'REALIZACJE', title: 'IIM Marbella: agent dla agentów i cold mailing | Fluinty', desc: 'Asystent AI, który co rano oddaje handlowcowi gotową listę kontaktów, oraz kanał cold mailingu zbudowany od domen po odpowiedzi.' },
  { src: 'case-arttim',      out: 'realizacje/art-tim/index.html',       path: '/realizacje/art-tim/',      alt: '/en/case-studies/art-tim/',             active: 'REALIZACJE', title: 'Art-Tim: przypomnienia o terminach i koszty floty | Fluinty', desc: 'Dwa wdrożenia u podwykonawcy kurierskiego: przypomnienia o polisach i przeglądach miesiąc wcześniej oraz import kosztów zakupowych z przypisaniem do pojazdu.' },
  { src: 'case-holbox',      out: 'realizacje/holbox/index.html',        path: '/realizacje/holbox/',       alt: '/en/case-studies/holbox/',              active: 'REALIZACJE', title: 'Holbox: faktury z maili same trafiają do raportów | Fluinty', desc: 'Faktury z maili i dokumenty z Dysku trafiają do arkusza i logu. Około 2 400 dokumentów bez ręcznej poprawki, na produkcji od listopada 2025.' },
  { src: 'case-bodtech',     out: 'realizacje/bodtech/index.html',       path: '/realizacje/bodtech/',      alt: '/en/case-studies/bodtech/',             active: 'REALIZACJE', title: 'Bodtech: reklamacje ze zdjęciami obsługiwane automatycznie | Fluinty', desc: 'Agent czyta zgłoszenia reklamacyjne w kilku językach, rozpoznaje zdjęcia, zakłada folder i rejestr, a prośbę o kontakt z człowiekiem przekazuje od razu.' },
  { src: 'case-taxnet',      out: 'realizacje/tax-net/index.html',       path: '/realizacje/tax-net/',      alt: '/en/case-studies/tax-net/',             active: 'REALIZACJE', title: 'Tax-Net: treści i pozycjonowanie dla biura rachunkowego | Fluinty', desc: 'Stała obsługa treści i SEO: ruch organiczny 176 do 349 w pięć miesięcy, siedem fraz z dziewięciu w top 3. Szacunek Semrush.' },
  { src: 'produkt-debt',     out: 'produkty/fluintydebt/index.html',     path: '/produkty/fluintydebt/',    alt: '/en/products/fluintydebt/',             active: 'PRODUKTY',   title: 'FluintyDebt: przypomnienia o płatnościach bez windykatora | Fluinty', desc: 'System pilnuje terminów płatności na danych z KSeF i banku, wysyła przypomnienia w Waszym imieniu i eskaluje sprawy do człowieka.' },
  { src: 'produkt-fleet',    out: 'produkty/fluintyfleet/index.html',    path: '/produkty/fluintyfleet/',   alt: '/en/products/fluintyfleet/',            active: 'PRODUKTY',   title: 'FluintyFleet: koszty floty per pojazd i terminy | Fluinty', desc: 'Import faktur od dostawców, koszt przypisany do pojazdu i przypomnienia o polisach oraz przeglądach miesiąc wcześniej.' },
  { src: 'ksiegowosc',       out: 'ksiegowosc-i-ksef/index.html',        path: '/ksiegowosc-i-ksef/',       alt: null,                                    active: 'CO',         title: 'Księgowość i KSeF: integracja i automat księgujący | Fluinty', desc: 'Porządkujemy wdrożenia KSeF 2.0 i budujemy automat, który proponuje dekrety, a wątpliwe dokumenty odsyła do księgowej.' },
  { src: 'kontakt',          out: 'kontakt/index.html',                  path: '/kontakt/',                 alt: '/en/contact/',                          active: 'KONTAKT',    title: 'Kontakt: bezpłatna konsultacja 30 minut | Fluinty', desc: 'Wybierzcie termin rozmowy o jednym procesie albo prezentacji produktu. Bez zobowiązań, w 24 godziny wracamy z pomysłem.' },
  { src: 'blog',             out: 'blog/index.html',                     path: '/blog/',                    alt: '/en/blog/',                             active: 'BLOG',        title: 'Blog: jak automatyzujemy procesy w MŚP | Fluinty', desc: 'Piszemy o tym, co wdrażamy: zamówienia z maili, dokumenty, reklamacje, floty. Bez porad ogólnych.' },
  { src: 'blog-post-bezpieczenstwo-danych-ai', out: 'blog/bezpieczenstwo-danych-ai/index.html', path: '/blog/bezpieczenstwo-danych-ai/', alt: null, active: 'BLOG', title: 'Bezpieczeństwo danych przy AI: 5 wariantów i ich koszt | Fluinty', desc: 'Gdzie trafiają dane, kiedy firma używa AI: API, chmura w UE, hybryda, własny serwer, model u Was. Ile kosztuje każdy poziom ochrony i kiedy przestaje się opłacać.' },
  { src: 'blog-post-odbieranie-faktur-ksef', out: 'blog/odbieranie-faktur-ksef/index.html', path: '/blog/odbieranie-faktur-ksef/', alt: null, active: 'BLOG', title: 'Odbieranie faktur w KSeF: ręcznie, automatycznie i co potem | Fluinty', desc: 'Jak odbierać faktury w KSeF przez aplikację, program i biuro rachunkowe, kiedy faktura jest otrzymana i co da się zautomatyzować po odbiorze: opis, dopasowanie, dekret.' },
  { src: 'blog-post-automatyzacja-biznesu', out: 'blog/automatyzacja-biznesu/index.html', path: '/blog/automatyzacja-biznesu/', alt: null, active: 'BLOG', title: 'Automatyzacja biznesu w MŚP: od czego zacząć i ile to kosztuje | Fluinty', desc: 'Automatyzacja biznesu na przykładach z polskich firm: zamówienia do ERP, faktury, reklamacje, sprzedaż. Jak policzyć, czy się opłaca, i od którego procesu zacząć.' },
  { src: 'blog-post-eticod', out: 'blog/zamowienia-z-maili-do-erp/index.html', path: '/blog/zamowienia-z-maili-do-erp/', alt: '/en/blog/email-orders-into-erp/', active: 'BLOG', title: 'Zamówienia z maili do ERP bez API. Jak to działa u Eticodu | Fluinty', desc: 'Dwa tory, kontrola kompletu danych i wpis do systemu, który nie wystawia API. Opis wdrożenia, w którym od startu nie było ani jednego błędnego wpisu.' },
  { src: 'autor-adam-nelip',  out: 'zespol/adam-nelip/index.html',  path: '/zespol/adam-nelip/',  alt: null, active: 'ZESPOL', title: 'Adam Nelip, współzałożyciel Fluinty | Fluinty', desc: 'Adam Nelip współprowadzi Fluinty. Dziesięć lat przy produktach cyfrowych: Pronos, Vazco, Aidar Solutions, McKinsey & Company. Pisze o automatyzacji procesów w MŚP.' },
  { src: 'autor-patryk-bielecki', out: 'zespol/patryk-bielecki/index.html', path: '/zespol/patryk-bielecki/', alt: null, active: 'ZESPOL', title: 'Patryk Bielecki, współzałożyciel Fluinty | Fluinty', desc: 'Patryk Bielecki współprowadzi Fluinty. Senior Product Manager w Semrush, buduje produkt mierzący widoczność marek w ChatGPT, Gemini i Perplexity.' },
  { src: 'dziekujemy',       out: 'dziekujemy/index.html',               path: '/dziekujemy/',              alt: '/en/thank-you/',                        active: null,        title: 'Dziękujemy za wiadomość | Fluinty', desc: 'Wiadomość dotarła. Odpisujemy w 24 godziny.' },
  // 404 wyswietla sie pod dowolnym adresem, wiec linki musza byc liczone od katalogu glownego (absRoot)
  { src: '404',              out: '404.html',                            path: '/404.html',                 alt: null,                                    active: null,        absRoot: true, title: 'Nie ma takiej strony | Fluinty', desc: 'Ta strona nie istnieje albo zmieniła adres przy przebudowie fluinty.pl.' },
  { src: 'polityka',         out: 'polityka-prywatnosci/index.html',     path: '/polityka-prywatnosci/',    alt: '/en/privacy-policy/',                   active: null,        title: 'Polityka prywatności | Fluinty', desc: 'Kto przetwarza dane z formularza kontaktowego, w jakim celu, jak długo i jakie macie prawa.' },
]

const EN = [
  { src: 'en-index',            out: 'en/index.html',                                path: '/en/',                              alt: '/',                               active: null,        title: 'Process automation for SMEs | Fluinty', desc: 'We deploy AI agents that take over repetitive processes: email orders into the ERP, documents, complaints, receivables. Transparent pricing, the first step is free.' },
  { src: 'en-case-eticod',      out: 'en/case-studies/eticod/index.html',            path: '/en/case-studies/eticod/',          alt: '/realizacje/eticod/',             active: 'REALIZACJE', title: 'Eticod: email orders straight into the ERP | Fluinty', desc: 'An agent reads orders from the inbox, checks the data is complete and enters them into an ERP with no API. 160 hours less manual work a month, zero incorrect entries since launch.' },
  { src: 'en-case-marbella',    out: 'en/case-studies/iim-marbella/index.html',      path: '/en/case-studies/iim-marbella/',    alt: '/realizacje/iim-marbella/',       active: 'REALIZACJE', title: 'IIM Marbella: an AI assistant for estate agents and cold email | Fluinty', desc: 'An AI assistant that hands each agent a ready contact list every morning, plus a cold email channel built from domains to replies.' },
  { src: 'en-case-arttim',      out: 'en/case-studies/art-tim/index.html',           path: '/en/case-studies/art-tim/',         alt: '/realizacje/art-tim/',            active: 'REALIZACJE', title: 'Art-Tim: fleet deadlines and purchase costs per vehicle | Fluinty', desc: 'Two implementations at a courier subcontractor: insurance and inspection reminders a month ahead, and purchase costs imported and assigned to vehicles.' },
  { src: 'en-case-holbox',      out: 'en/case-studies/holbox/index.html',            path: '/en/case-studies/holbox/',          alt: '/realizacje/holbox/',             active: 'REALIZACJE', title: 'Holbox: email invoices land in the reports on their own | Fluinty', desc: 'Invoices from email and documents from Drive go into a sheet and a log. Around 2,400 documents without a single manual correction, in production since November 2025.' },
  { src: 'en-case-bodtech',     out: 'en/case-studies/bodtech/index.html',           path: '/en/case-studies/bodtech/',         alt: '/realizacje/bodtech/',            active: 'REALIZACJE', title: 'Bodtech: complaints with photos handled automatically | Fluinty', desc: 'An agent reads complaint emails in several languages, recognises the photos, creates the folder and register entry, and hands requests for a human over straight away.' },
  { src: 'en-case-taxnet',      out: 'en/case-studies/tax-net/index.html',           path: '/en/case-studies/tax-net/',         alt: '/realizacje/tax-net/',            active: 'REALIZACJE', title: 'Tax-Net: content and SEO for an accounting firm | Fluinty', desc: 'Ongoing content and SEO work: organic traffic from 176 to 349 in five months, seven of nine keywords in the top 3. Semrush estimate.' },
  { src: 'en-produkt-debt',     out: 'en/products/fluintydebt/index.html',           path: '/en/products/fluintydebt/',         alt: '/produkty/fluintydebt/',          active: 'PRODUKTY',   title: 'FluintyDebt: payment reminders without a debt collector | Fluinty', desc: 'The system watches due dates on e-invoice and bank data, sends reminders in your name and escalates cases to a human.' },
  { src: 'en-produkt-fleet',    out: 'en/products/fluintyfleet/index.html',          path: '/en/products/fluintyfleet/',        alt: '/produkty/fluintyfleet/',         active: 'PRODUKTY',   title: 'FluintyFleet: fleet costs per vehicle and deadlines | Fluinty', desc: 'Supplier invoices imported, every cost assigned to a vehicle, and reminders for insurance and inspections a month ahead.' },
  { src: 'en-kontakt',          out: 'en/contact/index.html',                        path: '/en/contact/',                      alt: '/kontakt/',                       active: 'KONTAKT',    title: 'Contact: a free 30-minute consultation | Fluinty', desc: 'Pick a slot to talk about one process or see a product demo. No commitment, we come back with a proposal within 24 hours.' },
  { src: 'en-blog',             out: 'en/blog/index.html',                           path: '/en/blog/',                         alt: '/blog/',                          active: 'BLOG',        title: 'Blog: how we automate processes in SMEs | Fluinty', desc: 'We write about what we build: email orders, documents, complaints, fleets. No generic advice.' },
  { src: 'en-blog-post-eticod', out: 'en/blog/email-orders-into-erp/index.html',     path: '/en/blog/email-orders-into-erp/',   alt: '/blog/zamowienia-z-maili-do-erp/', active: 'BLOG',       title: 'Email orders into an ERP with no API. How it works at Eticod | Fluinty', desc: 'Two lanes, a completeness check and an entry into a system that has no API. The story of a deployment with zero incorrect entries since launch.' },
  { src: 'en-dziekujemy',       out: 'en/thank-you/index.html',                      path: '/en/thank-you/',                    alt: '/dziekujemy/',                    active: null,        title: 'Thanks for your message | Fluinty', desc: 'Your message is in. We reply within 24 hours.' },
  { src: 'en-polityka',         out: 'en/privacy-policy/index.html',                 path: '/en/privacy-policy/',               alt: '/polityka-prywatnosci/',          active: null,        title: 'Privacy policy | Fluinty', desc: 'Who processes the data from the contact form, for what purpose, for how long, and what your rights are.' },
]

const PAGES = [...PL.map((p) => ({ ...p, lang: 'pl' })), ...EN.map((p) => ({ ...p, lang: 'en' }))]
const ACTIVE_KEYS = ['REALIZACJE', 'CO', 'PRODUKTY', 'ZESPOL', 'CENNIK', 'BLOG', 'KONTAKT']

function build() {
  const written = []
  const missing = []
  const problems = []

  for (const page of PAGES) {
    const file = join(SRC, 'pages', page.src + '.html')
    if (!existsSync(file)) { missing.push(page.out); continue }
    const body = readFileSync(file, 'utf8')
    const parts = PARTS[page.lang]

    // ile poziomow w gore do katalogu glownego
    const depth = page.out.split('/').length - 1
    const root = page.absRoot ? PREFIX + '/' : depth === 0 ? '' : '../'.repeat(depth)

    let navCta = `<a class="nav-cta" href="${root}${parts.contact}">${parts.cta}</a>`
    if (page.active === 'KONTAKT') navCta = ''

    const plPath = page.lang === 'pl' ? page.path : page.alt
    const enPath = page.lang === 'en' ? page.path : page.alt
    let hreflang = page.alt
      ? [`  <link rel="alternate" hreflang="pl" href="${SITE}${plPath}">`,
         `  <link rel="alternate" hreflang="en" href="${SITE}${enPath}">`,
         `  <link rel="alternate" hreflang="x-default" href="${SITE}${plPath}">`].join('\n')
      : ''
    const altHref = PREFIX + (page.alt || (page.lang === 'pl' ? '/en/' : '/'))
    if (BASE) hreflang = '  <meta name="robots" content="noindex, nofollow">'
    if (page.absRoot) hreflang = '  <meta name="robots" content="noindex">'

    const src = page.src.replace(/^en-/, '')
    const pageKind = src === 'index' ? 'home' : src.startsWith('case-') ? 'case' : src.startsWith('produkt-') ? 'product' : src.startsWith('blog') ? 'blog' : src === 'kontakt' ? 'contact' : 'other'
    let head = HEAD.replace('<body>', `<body class="page-${pageKind}">`)
    let foot = parts.footer
    if (pageKind === 'case' && existsSync('css/case.css')) head = head.replace('</head>', '  <link rel="stylesheet" href="{{ROOT}}css/case.css">\n</head>')
    if (pageKind === 'case' && existsSync('js/case.js')) foot = foot.replace('</body>', '  <script src="{{ROOT}}js/case.js" defer></script>\n</body>')
    let html = head + parts.nav + '\n' + body.trimEnd() + '\n' + foot
    html = html
      .replace(/\{\{LANG\}\}/g, page.lang)
      .replace(/\{\{LOCALE\}\}/g, parts.locale)
      .replace(/\{\{TITLE\}\}/g, page.title)
      .replace(/\{\{DESC\}\}/g, page.desc)
      .replace(/\{\{PATH\}\}/g, PREFIX + page.path)
      .replace(/\{\{HREFLANG\}\}/g, hreflang)
      .replace(/\{\{ALT\}\}/g, altHref)
      .replace(/\{\{NAV_CTA\}\}/g, navCta)
      .replace(/\{\{ROOT\}\}/g, root)
      .replace(/\{\{ABS\}\}/g, SITE + PREFIX + '/')

    for (const key of ACTIVE_KEYS) {
      html = html.replace(new RegExp(`\\{\\{ACTIVE_${key}\\}\\}`, 'g'),
        page.active === key ? ' aria-current="page"' : '')
    }

    if (BASE) {
      html = html
        .replace('href="/favicon.ico"', `href="${PREFIX}/favicon.ico"`)
        .replace('href="/apple-touch-icon.png"', `href="${PREFIX}/apple-touch-icon.png"`)
        .replace('<a class="skip"', (page.lang === 'pl'
          ? '<div style="background:#00C4B4;color:#0B3D70;font:600 13px/1.4 var(--body);text-align:center;padding:8px 16px;">Podgląd nowej strony fluinty.pl. Wersja robocza, nie dla klientów.</div>\n  <a class="skip"'
          : '<div style="background:#00C4B4;color:#0B3D70;font:600 13px/1.4 var(--body);text-align:center;padding:8px 16px;">Preview of the new fluinty.pl. Work in progress.</div>\n  <a class="skip"'))
    }

    const left = html.match(/\{\{[A-Z_]+\}\}/g)
    if (left) problems.push(`${page.out}: niepodmienione znaczniki ${[...new Set(left)].join(', ')}`)

    const opens = (html.match(/<div\b/g) || []).length
    const closes = (html.match(/<\/div>/g) || []).length
    if (opens !== closes) problems.push(`${page.out}: div ${opens} otwarc, ${closes} zamkniec`)
    if ((html.match(/<h1\b/g) || []).length !== 1) problems.push(`${page.out}: ma byc dokladnie jeden <h1>`)

    if (!CHECK) {
      const target = join(OUT_DIR, page.out)
      mkdirSync(dirname(target), { recursive: true })
      // 404 nie ma kanonicznego adresu
      if (page.absRoot) html = html.replace(/ {2}<link rel="canonical"[^\n]*\n/, '')
      writeFileSync(target, html, 'utf8')
    }
    written.push(page.out)
  }

  console.log(`${CHECK ? 'sprawdzone' : 'zapisane'}: ${written.length} stron`)
  written.forEach((w) => console.log('  ' + w))
  if (missing.length) {
    console.log(`\npominiete (brak zrodla w src/pages): ${missing.length}`)
    missing.forEach((m) => console.log('  - ' + m))
  }
  if (problems.length) {
    console.log('\nPROBLEMY:')
    problems.forEach((p) => console.log('  ! ' + p))
    process.exitCode = 1
  } else {
    console.log('\nbez problemow')
  }
}

build()
