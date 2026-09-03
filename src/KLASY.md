# Jak pisać strony w src/pages

Nowa strona fluinty.pl. Makiety leżą w `C:\Users\Adamn\AppData\Local\Temp\claude\C--Users-Adamn\304d8891-aa79-4e71-bc12-b07742a93582\scratchpad\fluinty-design\*.dc.html` (dalej: KANWA). Mapa linków i nagłówków: `mapa-celow.md` w tym samym katalogu.

## Co piszesz

Tylko **treść strony**: sekcje `<section>` od pierwszej do ostatniej. Bez `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`, bez nawigacji i bez stopki. Te części dokleja `build.mjs`. Plik zaczyna się od pierwszej sekcji, kończy na ostatniej.

Znacznik `{{ROOT}}` w ścieżkach zamienia się przy budowaniu na właściwą liczbę `../`. Używaj go w **każdym** odnośniku i ścieżce do pliku: `{{ROOT}}kontakt/`, `{{ROOT}}assets/klienci/eticod.svg`, `{{ROOT}}#cennik`.

## Zasady

1. **Treść bierzesz z KANWY słowo w słowo.** Nie przepisujesz, nie skracasz, nie poprawiasz stylu. Wyjątek: makieta ma osobne wersje desktop i mobile, a Ty robisz jedną responsywną (patrz punkt 4).
2. **Żadnych wymyślonych liczb.** Jeśli liczby nie ma w makiecie, nie ma jej na stronie.
3. **Semantyka zamiast divów.** To, co w makiecie wygląda jak przycisk albo link, jest `<a>` albo `<button>`. Cała karta realizacji i produktu to `<a class="card">`. Nagłówki: jeden `<h1>` na stronę, sekcje `<h2>`, tytuły kart `<h3>`. Sekcja to `<section class="sec sec-...">` z `aria-labelledby` wskazującym na id nagłówka.
4. **Jedna strona responsywna, nie dwie.** Układ robisz klasami z listy niżej (siatki same się zawijają). Nie wpisujesz szerokości w pikselach, nie kopiujesz `width: 1440px`, `padding: 104px 120px`.
5. **Style inline tylko wyjątkowo**, kiedy nie ma pasującej klasy: kolor pojedynczego elementu, wysokość obrazka, `grid-template-columns` dla nietypowej siatki. Wszystko powtarzalne ma już klasę.
6. **Dekoracja jest niewidoczna dla czytników.** Konsole z logiem, schematy przepływu, orby, dashboardy: `aria-hidden="true"`. Obrazki treściowe mają `alt`, dekoracyjne mają `alt=""`.
7. **Animowane bloki oznaczasz** `data-animated` (na sekcji albo kontenerze). Skrypt zatrzymuje je poza ekranem.
8. **Zakazy:** nazwa Sistrade (piszemy „ERP bez API"), „Weryfikacja faktur LUXE", Tax-Libris, nazwa kancelarii, liczby LinkedIn Tax-Netu, ceny FluintyDebt i FluintyFleet, „~440 tys. zł rocznie", wielkość floty Art-Timu, zdanie o tym, że klient potwierdził liczbę.

## Szkielet sekcji

```html
<section class="sec sec-white" aria-labelledby="realizacje" id="realizacje">
  <div class="wrap">
    <div class="sec-head sr">
      <p class="eyebrow">Dowody</p>
      <h2 id="realizacje">Dowody, nie obietnice.</h2>
      <div class="accent-bar"></div>
      <p class="lead">Zdanie wprowadzające.</p>
    </div>
    <div class="grid grid-3 sr-grid">…</div>
  </div>
</section>
```

Tła idą zebrą: sąsiednie sekcje nie mogą mieć tego samego. Kolejność na stronie głównej: ciemny hero → biała → szara → biała → jasny teal → biała → granatowe CTA → stopka.

## Klasy

**Sekcje i układ:** `sec`, `sec-white`, `sec-gray`, `sec-mint`, `sec-dark`, `sec-navy`, `wrap`, `sec-head`, `grid` + `grid-2` / `grid-3` / `grid-4`, `grid-hero`, `stack`, `stack-s`, `row`, `btn-row`.

**Tekst:** `eyebrow` (kropka rysuje się sama), `h1`–`h3` (są też same znaczniki), `lead`, `small`, `label`, `body-2`, `accent-bar`, `mark` (gradient na wyrazie w `<h1>`), `vh` (tekst tylko dla czytnika).

**Akcje:** `btn btn-primary`, `btn btn-ghost`, `btn-sm`, `link-more` (link z kreską i strzałką, strzałka jako inline SVG 14×14), `glow` (pulsująca poświata, tylko główne CTA).

**Karty:** `card`, `card-hi` (wyróżniona), `card-dark` (na ciemnym), `badge` (pastylka nad kartą), `chips` + `chip` / `chip-hi` / `chip-mono`.

**Liczby:** `metrics`, `metric`, `metric-num`, `metric-lab`, `metric-bordered` (kreska po lewej). Licznik doliczający: `<span class="metric-num" data-count-to="160" data-count-from="0">160</span>`.

**Konsola:** `console`, `console-bar`, `console-body`, `log-line` (+ `log-line-ok` dla linii na zielono), `ts` (czas w linii), `caret`, `status-dot` (pulsująca kropka, tylko gdy proces naprawdę działa), `status-square` (statyczny kwadrat, gdy to podgląd). Kolejność linii ustawiasz `style="animation-delay: .6s"` i dalej co 0,9 s.

**Schemat przepływu:** `flow`, `flow-head`, `flow-scroll` (opakowanie na SVG, przewija się w poziomie na telefonie), `flow-cap`, `flow-orb`. SVG kopiujesz z makiety bez zmian, dokładając `preserveAspectRatio="xMidYMid meet"` i `aria-hidden="true"`.

**FAQ:** `faq` na kontenerze, w środku `<details>` z `<summary>` i `<div class="answer">`. Chevron to inline SVG z klasą `chev`. Pierwsze pytanie ma `open`.

**Formularz:** `field` (etykieta + pole), `input`/`textarea` bez klasy. Każde pole ma `<label for>`.

**Karuzela:** `marquee`, `marquee-track`, `logo-tile`, `logo-tile-navy` (dla jasnych logotypów). Zestaw logotypów powtarzasz dwa razy, drugi z `aria-hidden="true"`.

**Tła:** `bg-grid`, `bg-glow` (na ciemnych sekcjach, razem z `sec-dark`).

**Ruch:** `sr` (element wjeżdża przy scrollu), `sr-grid` (dzieci wjeżdżają po kolei), `data-animated` (pauza poza ekranem).

## Obrazy w repo

`{{ROOT}}assets/klienci/eticod.svg`, `holbox.svg`, `iimarbella.svg`, `bodtech.png`, `taxnet.png`, `pupchoice.png`; `{{ROOT}}assets/zespol/adam-nelip.jpg`, `patryk-bielecki.jpg`; logo Fluinty `{{ROOT}}assets/logo.png`. Art-Tim i TerraGroup nie mają logotypu, stoją tekstem w `logo-tile`.

## Adresy

`{{ROOT}}` = strona główna. Dalej: `realizacje/eticod/`, `realizacje/iim-marbella/`, `realizacje/art-tim/`, `realizacje/holbox/`, `realizacje/bodtech/`, `realizacje/tax-net/`, `produkty/fluintydebt/`, `produkty/fluintyfleet/`, `ksiegowosc-i-ksef/`, `kontakt/`, `blog/`, `polityka-prywatnosci/`. Kotwice na stronie głównej: `#realizacje`, `#co-automatyzujemy`, `#kalkulator`, `#cennik`, `#produkty`, `#zespol`, `#faq`.

## Sprawdzenie po napisaniu

`node build.mjs --check` w katalogu repo: sprawdza podmianę znaczników, bilans `<div>` i to, czy strona ma dokładnie jeden `<h1>`. Musi wyjść „bez problemow".
