// Sprawdza zbudowane strony: martwe linki, brakujace obrazki, naglowki, zakazane frazy.
// Uruchomienie: node check-site.mjs
import { readFileSync, existsSync, statSync } from 'node:fs'
import { dirname, join, normalize } from 'node:path'

const PAGES = [
  'index.html',
  'realizacje/eticod/index.html', 'realizacje/iim-marbella/index.html', 'realizacje/art-tim/index.html',
  'realizacje/holbox/index.html', 'realizacje/bodtech/index.html', 'realizacje/tax-net/index.html',
  'produkty/fluintydebt/index.html', 'produkty/fluintyfleet/index.html',
  'ksiegowosc-i-ksef/index.html', 'kontakt/index.html',
  'blog/index.html', 'blog/zamowienia-z-maili-do-erp/index.html',
  'polityka-prywatnosci/index.html', 'dziekujemy/index.html',
  'en/index.html', 'en/case-studies/eticod/index.html', 'en/case-studies/iim-marbella/index.html', 'en/case-studies/art-tim/index.html',
  'en/case-studies/holbox/index.html', 'en/case-studies/bodtech/index.html', 'en/case-studies/tax-net/index.html',
  'en/products/fluintydebt/index.html', 'en/products/fluintyfleet/index.html', 'en/contact/index.html',
  'en/blog/index.html', 'en/blog/email-orders-into-erp/index.html', 'en/thank-you/index.html', 'en/privacy-policy/index.html',
]

const BANNED = [/Sistrade/i, /LUXE/, /Tax-Libris/i, /440 tys/i, /7\s*900/, /24\s*900/, /39 zł\s*\/\s*pojazd/i, /potwierdził klient/i, /potwierdzone przez klienta/i]

let bad = 0
const note = (page, msg) => { console.log(`  ! ${page}: ${msg}`); bad++ }

for (const page of PAGES) {
  if (!existsSync(page)) { note(page, 'brak pliku'); continue }
  const html = readFileSync(page, 'utf8')
  const dir = dirname(page)

  const h1 = (html.match(/<h1[\s>]/g) || []).length
  if (h1 !== 1) note(page, `${h1} naglowkow h1`)
  const left = html.match(/\{\{[A-Z_]+\}\}/g)
  if (left) note(page, `niepodmienione ${[...new Set(left)].join(', ')}`)
  for (const re of BANNED) if (re.test(html)) note(page, `zakazana fraza ${re}`)

  // linki wewnetrzne
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1])
  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) continue
    const [path, hash] = href.split('#')
    if (!path) continue
    let target = path.startsWith('/') ? normalize(path.slice(1)) : normalize(join(dir, path))
    if (target.endsWith('\\') || target.endsWith('/') || !path.includes('.')) target = join(target, 'index.html')
    if (!existsSync(target)) { note(page, `martwy link ${href} (szukalem ${target})`); continue }
    if (hash) {
      const targetHtml = readFileSync(target, 'utf8')
      if (!targetHtml.includes(`id="${hash}"`)) note(page, `kotwica #${hash} nie istnieje w ${target}`)
    }
  }

  // obrazki
  for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    const src = m[1]
    if (/^(https?:|data:)/.test(src)) continue
    const target = src.startsWith('/') ? normalize(src.slice(1)) : normalize(join(dir, src))
    if (!existsSync(target)) note(page, `brak obrazka ${src}`)
    else if (statSync(target).size === 0) note(page, `pusty obrazek ${src}`)
  }
  // alt przy obrazkach
  for (const m of html.matchAll(/<img(?![^>]*\balt=)[^>]*>/g)) note(page, `img bez alt: ${m[0].slice(0, 70)}`)
}

console.log(bad === 0 ? `\nOK: ${PAGES.length} stron bez problemow` : `\nznalezione problemy: ${bad}`)
process.exitCode = bad === 0 ? 0 : 1
