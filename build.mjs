// Sklada strony z czesci wspolnych (src/partials) i tresci stron (src/pages).
// Wynik laduje w katalogu repo, bo Netlify serwuje pliki wprost, bez budowania.
// Uruchomienie: node build.mjs        (dodaj --check, zeby tylko sprawdzic, nic nie zapisujac)
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'

const SRC = 'src'
const CHECK = process.argv.includes('--check')

const partial = (name) => readFileSync(join(SRC, 'partials', name + '.html'), 'utf8')
const HEAD = partial('head')
const NAV = partial('nav')
const FOOTER = partial('footer')

// Mapa stron: plik zrodlowy -> adres w serwisie.
// active: ktora pozycja menu ma stan biezacej strony.
const PAGES = [
  { src: 'index',            out: 'index.html',                          path: '/',                         active: null,        title: 'Automatyzacja procesów dla MŚP | Fluinty', desc: 'Wdrażamy agentów AI, którzy przejmują powtarzalne procesy: zamówienia z maili do ERP, dokumenty, reklamacje, windykacja. Jawny cennik, pierwszy krok bezpłatny.' },
  { src: 'case-eticod',      out: 'realizacje/eticod/index.html',        path: '/realizacje/eticod/',       active: 'REALIZACJE', title: 'Eticod: zamówienia z maili prosto do ERP | Fluinty', desc: 'Agent czyta zamówienia ze skrzynki, sprawdza komplet danych i wpisuje je do ERP bez API. 160 h miesięcznie mniej ręcznej pracy, zero błędnych wpisów od startu.' },
  { src: 'case-marbella',    out: 'realizacje/iim-marbella/index.html',  path: '/realizacje/iim-marbella/', active: 'REALIZACJE', title: 'IIM Marbella: agent dla agentów i cold mailing | Fluinty', desc: 'Asystent AI, który co rano oddaje handlowcowi gotową listę kontaktów, oraz kanał cold mailingu zbudowany od domen po odpowiedzi.' },
  { src: 'case-arttim',      out: 'realizacje/art-tim/index.html',       path: '/realizacje/art-tim/',      active: 'REALIZACJE', title: 'Art-Tim: przypomnienia o terminach i koszty floty | Fluinty', desc: 'Dwa wdrożenia u podwykonawcy kurierskiego: przypomnienia o polisach i przeglądach miesiąc wcześniej oraz import kosztów zakupowych z przypisaniem do pojazdu.' },
  { src: 'case-holbox',      out: 'realizacje/holbox/index.html',        path: '/realizacje/holbox/',       active: 'REALIZACJE', title: 'Holbox: dokumenty zakupowe same trafiają do arkusza | Fluinty', desc: 'Zamówienia z maili i dokumenty z Dysku trafiają do arkusza i logu. Około 2 400 dokumentów bez ręcznej poprawki, na produkcji od listopada 2025.' },
  { src: 'case-bodtech',     out: 'realizacje/bodtech/index.html',       path: '/realizacje/bodtech/',      active: 'REALIZACJE', title: 'Bodtech: reklamacje ze zdjęciami obsługiwane automatycznie | Fluinty', desc: 'Agent czyta zgłoszenia reklamacyjne w kilku językach, rozpoznaje zdjęcia, zakłada folder i rejestr, a prośbę o kontakt z człowiekiem przekazuje od razu.' },
  { src: 'case-taxnet',      out: 'realizacje/tax-net/index.html',       path: '/realizacje/tax-net/',      active: 'REALIZACJE', title: 'Tax-Net: treści i pozycjonowanie dla biura rachunkowego | Fluinty', desc: 'Stała obsługa treści i SEO: ruch organiczny 176 do 349 w pięć miesięcy, siedem fraz z dziewięciu w top 3. Szacunek Semrush.' },
  { src: 'produkt-debt',     out: 'produkty/fluintydebt/index.html',     path: '/produkty/fluintydebt/',    active: 'PRODUKTY',   title: 'FluintyDebt: przypomnienia o płatnościach bez windykatora | Fluinty', desc: 'System pilnuje terminów płatności na danych z KSeF i banku, wysyła przypomnienia w Waszym imieniu i eskaluje sprawy do człowieka.' },
  { src: 'produkt-fleet',    out: 'produkty/fluintyfleet/index.html',    path: '/produkty/fluintyfleet/',   active: 'PRODUKTY',   title: 'FluintyFleet: koszty floty per pojazd i terminy | Fluinty', desc: 'Import faktur od dostawców, koszt przypisany do pojazdu i przypomnienia o polisach oraz przeglądach miesiąc wcześniej.' },
  { src: 'ksiegowosc',       out: 'ksiegowosc-i-ksef/index.html',        path: '/ksiegowosc-i-ksef/',       active: 'CO',         title: 'Księgowość i KSeF: integracja i automat księgujący | Fluinty', desc: 'Porządkujemy wdrożenia KSeF 2.0 i budujemy automat, który proponuje dekrety, a wątpliwe dokumenty odsyła do księgowej.' },
  { src: 'kontakt',          out: 'kontakt/index.html',                  path: '/kontakt/',                 active: 'KONTAKT',    title: 'Kontakt: bezpłatna konsultacja 45 minut | Fluinty', desc: 'Wybierzcie termin rozmowy o jednym procesie albo prezentacji produktu. Bez zobowiązań, w 24 godziny wracamy z pomysłem.' },
  { src: 'blog',             out: 'blog/index.html',                     path: '/blog/',                    active: null,        title: 'Blog: jak automatyzujemy procesy w MŚP | Fluinty', desc: 'Piszemy o tym, co wdrażamy: zamówienia z maili, dokumenty, reklamacje, floty. Bez porad ogólnych.' },
  { src: 'blog-post-eticod', out: 'blog/zamowienia-z-maili-do-erp/index.html', path: '/blog/zamowienia-z-maili-do-erp/', active: null, title: 'Zamówienia z maili do ERP bez API. Jak to działa u Eticodu | Fluinty', desc: 'Dwa tory, kontrola kompletu danych i wpis do systemu, który nie wystawia API. Opis wdrożenia, w którym od startu nie było ani jednego błędnego wpisu.' },
  { src: 'dziekujemy',       out: 'dziekujemy/index.html',                path: '/dziekujemy/',              active: null,        title: 'Dziękujemy za wiadomość | Fluinty', desc: 'Wiadomość dotarła. Odpisujemy w 24 godziny w dni robocze.' },
  { src: 'polityka',         out: 'polityka-prywatnosci/index.html',     path: '/polityka-prywatnosci/',    active: null,        title: 'Polityka prywatności | Fluinty', desc: 'Kto przetwarza dane z formularza kontaktowego, w jakim celu, jak długo i jakie macie prawa.' },
]

const ACTIVE_KEYS = ['REALIZACJE', 'CO', 'PRODUKTY', 'ZESPOL', 'CENNIK', 'KONTAKT']

function build() {
  const written = []
  const problems = []

  for (const page of PAGES) {
    const file = join(SRC, 'pages', page.src + '.html')
    if (!existsSync(file)) { problems.push(`brak zrodla: ${file}`); continue }
    const body = readFileSync(file, 'utf8')

    // ile poziomow w gore do katalogu glownego
    const depth = page.out.split('/').length - 1
    const root = depth === 0 ? '' : '../'.repeat(depth)

    let navCta = `<a class="nav-cta" href="${root}kontakt/">Bezpłatna konsultacja</a>`
    if (page.active === 'KONTAKT') navCta = ''

    let html = HEAD + NAV + '\n' + body.trimEnd() + '\n' + FOOTER
    html = html
      .replace(/\{\{TITLE\}\}/g, page.title)
      .replace(/\{\{DESC\}\}/g, page.desc)
      .replace(/\{\{PATH\}\}/g, page.path)
      .replace(/\{\{NAV_CTA\}\}/g, navCta)
      .replace(/\{\{ROOT\}\}/g, root)

    for (const key of ACTIVE_KEYS) {
      html = html.replace(new RegExp(`\\{\\{ACTIVE_${key}\\}\\}`, 'g'),
        page.active === key ? ' aria-current="page"' : '')
    }

    const left = html.match(/\{\{[A-Z_]+\}\}/g)
    if (left) problems.push(`${page.out}: niepodmienione znaczniki ${[...new Set(left)].join(', ')}`)

    const opens = (html.match(/<div\b/g) || []).length
    const closes = (html.match(/<\/div>/g) || []).length
    if (opens !== closes) problems.push(`${page.out}: div ${opens} otwarc, ${closes} zamkniec`)
    if ((html.match(/<h1\b/g) || []).length !== 1) problems.push(`${page.out}: ma byc dokladnie jeden <h1>`)

    if (!CHECK) {
      mkdirSync(dirname(page.out) === '.' ? '.' : dirname(page.out), { recursive: true })
      writeFileSync(page.out, html, 'utf8')
    }
    written.push(page.out)
  }

  console.log(`${CHECK ? 'sprawdzone' : 'zapisane'}: ${written.length} stron`)
  written.forEach((w) => console.log('  ' + w))
  if (problems.length) {
    console.log('\nPROBLEMY:')
    problems.forEach((p) => console.log('  ! ' + p))
    process.exitCode = 1
  } else {
    console.log('\nbez problemow')
  }
}

build()
