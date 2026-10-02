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

`{{ROOT}}assets/klienci/eticod.svg`, `holbox.svg`, `iimarbella.svg`, `bodtech.png`, `taxnet.png`, `pupchoice.png`; `{{ROOT}}assets/zespol/adam-nelip.jpg`, `patryk-bielecki.jpg`; logo Fluinty `{{ROOT}}assets/logo.png`. Art-Tim i TerraGroup nie mają logotypu, stoją tekstem w `logo-tile`. Pasek „Pracujemy dla” i kafelki w kartach realizacji biorą jednokolorowe znaki z `assets/klienci/pasek/` (kolor `--text-2`, przycięte, bez tła; generator w scratchpadzie `logos-mono.py`). Wysokość podawaj w `style` (globalne `img { height: auto }` przebija atrybut). Na case Bodtechu idzie `bodtech-znak.png`: kolorowy znak bez „Luxecasting Poland” i białych prostokątów. Pup Choice piszemy bez apostrofu.

## Adresy

`{{ROOT}}` = strona główna. Dalej: `realizacje/eticod/`, `realizacje/iim-marbella/`, `realizacje/art-tim/`, `realizacje/holbox/`, `realizacje/bodtech/`, `realizacje/tax-net/`, `produkty/fluintydebt/`, `produkty/fluintyfleet/`, `ksiegowosc-i-ksef/`, `kontakt/`, `blog/`, `polityka-prywatnosci/`. Kotwice na stronie głównej: `#realizacje`, `#co-automatyzujemy`, `#kalkulator`, `#cennik`, `#produkty`, `#zespol`, `#faq`.

## Sprawdzenie po napisaniu

`node build.mjs --check` w katalogu repo: sprawdza podmianę znaczników, bilans `<div>` i to, czy strona ma dokładnie jeden `<h1>`. Musi wyjść „bez problemow".

## Okładka i demo na case studies

Każda realizacja ma dwa elementy jak w deckach: **okładkę** (rysunek ze świata firmy w prawej kolumnie hero, jak slajd 1) i **demo** (proces, który zbudowaliśmy, pokazany na zmyślonym przykładzie, jak slajd 4/5). Wzorzec do skopiowania: `src/pages/case-eticod.html` i `en-case-eticod.html`. Style i silnik są wspólne: `css/case.css` i `js/case.js` (build.mjs podpina je sam na stronach case). **Własnego JS na stronie nie piszesz**, wszystko sterują atrybuty. Klasy mają prefiks `cs-`. Uwaga na tokeny: `--ink` to tło hero, nie kolor tekstu (tekst to `--text`, `--text-2`, `--text-3`).

**Kolejność sekcji (zebra):** ciemny hero z okładką → biała Wyzwanie → **szara demo `id="przyklad"`** → biała Rozwiązanie (panel `.flow` zostaje, Adam chce więcej rur, nie mniej) → mięta Wyniki → biała → granatowe CTA. Rozwiązanie zmienia więc tło z szarego na białe.

### Rury w tle hero

SVG „kanały” z makiety (`*.dc.html`, absolutny `<svg>` zaraz po otwarciu hero, ok. l. 57–67) kopiujesz 1:1 jako pierwsze dziecko sekcji hero: `<svg class="bg-deco" viewBox="0 0 1440 640" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">`. Sekcja hero dostaje klasę `cs-hero` (poniżej 640 px rury znikają, bo rozciągają się w pionie, a makieta mobilna ich nie ma). Kulkom z opóźnionym `begin` daj `opacity="0"` i `<set attributeName="opacity" to="0.7" begin="(ten sam begin)">`, inaczej do startu świecą w lewym górnym rogu. Art-Tim i Marbella w makiecie rur nie mają.

### Okładka

W `.grid-hero` prawa kolumna zamiast konsoli:

```html
<div class="cs-hero-art">
  <figure class="cs-art" data-case="holbox" role="img" aria-label="Pełny opis tego, co widać na rysunku.">
    <svg viewBox="0 0 600 400" aria-hidden="true" focusable="false">…</svg>
  </figure>
  <p class="cs-cap">Jedno, dwa zdania: czynność z rysunku i to, co robi automat.</p>
  <a class="link-more" href="#przyklad">Przykład niżej <svg …strzałka w dół…></svg></a>
</div>
```

- **Co rysować:** materiał, maszynę albo dokument z codziennej pracy klienta, kreską jak ktoś z branży (prawdziwe nazwy operacji, typowe wymiary). Pomysły na każdą firmę: `spec-decki.json` → `per_case`. Bez logotypów, bez produktów i danych klienta. Najlepiej coś, co wraca w demo (u Eticodu etykiety z polami indeks, ilość, termin).
- **Szerokość viewBox 600**, wysokość dowolna (Eticod: `0 52 600 382`, pusty pas u góry obcięty). Rysunek ma 320 px na telefonie 360 i ok. 420 px przy 1024, więc: tekst widoczny zawsze min. **21 jednostek**; drobne podpisy (min. **16,5 jednostki**) z klasą `cs-small`, znikają poniżej 400 px szerokości rysunku; zamiennik większym pismem dla wąskiego rysunku z klasą `cs-narrow`.
- **Klocki kreski na ciemnym tle** (css/case.css): `cs-ln` (główna), `cs-ln-2` (drugorzędna), `cs-ln-3` (cicha), `cs-acc` (turkus), `cs-t` (podpis mono 16,5), `cs-t-l` (duży napis). Kolory i kształty tylko dla swojej firmy piszesz w `<style>` na samym początku pliku strony, selektory zawsze od `.cs-art[data-case="holbox"]`.
- **Ruch:** klasa klocka + opóźnienie i czas w `style`: `class="cs-a-draw" pathLength="1" style="--d: .4s; --t: .6s;"`. Klocki: `cs-a-draw` (linia się rysuje, tylko `<path>` z `pathLength="1"`), `cs-a-fade`, `cs-a-rise`, `cs-a-pop` (wskakuje z przeskokiem), `cs-a-spin` (obrót, np. rolka, cylinder; tylko coś niesymetrycznego widać), `cs-a-grow` (rośnie od środka), `cs-a-wipe` (odsłania od lewej), `cs-a-wipe-l` (od prawej), `cs-a-peel` (odkleja się w górę i znika; w stanie końcowym niewidoczny). Animowany element nie może mieć własnego `transform=""`, wtedy owiń go w `<g>`. Kaskada co 0,1–0,18 s, **całość do 3 s**. Kolejność w SVG = kolejność rysowania (to, co ma być pod spodem, piszesz wcześniej).
- **Zachowanie (robi js/case.js):** rysunek gra raz, kiedy wjedzie na ekran, i od nowa po kliknięciu. Bez JS i przy `prefers-reduced-motion` widać od razu stan końcowy, więc **stan końcowy to zwykły wygląd SVG**, a animacje startują z ukrycia (`both`). Nie pisz animacji poza `.cs-art.play`.

### Demo

Nowa sekcja między Wyzwaniem a Rozwiązaniem. Szkielet (pełny przykład w case-eticod.html):

```html
<section class="sec sec-gray" id="przyklad" aria-labelledby="przyklad-h">
  <div class="wrap">
    <div class="cs-demo-top">
      <div class="sec-head sr"> eyebrow „Przykład na zmyślonym …”, h2 „Tak to wygląda na przykładzie.”, accent-bar, lead </div>
      <button type="button" class="btn btn-ghost btn-sm cs-replay" data-cs-replay hidden>(ikona) Pokaż jeszcze raz</button>
    </div>
    <div class="cs-demo" data-cs-demo data-split="2">
      <div class="cs-col cs-in">  wejście: maile, PDF-y, zdjęcia (.cs-doc)            </div>
      <div class="cs-col cs-mid"> kroki (.cs-steps) i liczniki (.cs-tally)            </div>
      <div class="cs-col cs-out"> wynik: arkusz, rejestr, okno systemu, pole człowieka  </div>
      <div class="cs-log">        opcjonalny dziennik w stylu konsoli (pod wejściem i krokami) </div>
    </div>
    <p class="cs-note"><b>Co robi człowiek, a czego automat nie robi.</b> Firmy, … są zmyślone.</p>
  </div>
</section>
```

Przycisk ma `hidden` w HTML, odkrywa go skrypt (bez JS i przy reduced motion zostaje schowany). EN: „Play it again”, nagłówek „What it looks like on an example.”.

**Klocki treści:** wejście `cs-doc` (w środku `<header>` z `cs-fmt` / `<b>` / `<em>`, lista maili `cs-inbox` > `cs-mail` z `cs-from`, `cs-subj`, `cs-snip`, `cs-tags` > `cs-tag` / `cs-tag-ok` / `cs-tag-done`; linie maila `ol.cs-lines`; załącznik `cs-att`; tabela `cs-scroll` > `table.cs-spec`, komórki `cs-nowrap`, `cs-b`). Pominięty mail: `cs-mail is-skip`. Środek: `ol.cs-steps` > `li.cs-step` > `span.cs-n` + `p`; liczniki `.cs-tally` > `div` (`cs-w` bursztyn, `cs-z` turkus) > `b` + `span`. Wynik: karta `cs-card` (+ `cs-card-h`, plik `cs-file`), rekord `cs-rec` > `cs-rec-h` + wiersze `cs-fr` (`cs-k` pole, `cs-v` wartość, `cs-s` źródło, np. „mail A, l. 3”), brak `cs-fr cs-gap` (bursztyn), pole człowieka `cs-human` (`<b>Do człowieka</b><p>…</p>`, kreskowane), okno systemu `cs-sys` > `cs-sys-h` (trzy `<i>`, `<span>` nazwa, `<em>`), `cs-sys-b` > `cs-sys-f` (etykieta + `span.cs-field` > `span` z wartością, wpisuje się „na klawiaturze”), stopka `cs-sys-foot` z `cs-sys-btn`, `cs-cursor`, `cs-saved`. Kalendarz `cs-cal` > `i.cs-day` (`is-go`, `is-off` przekreślone, `is-in`). Dziennik `cs-log` > `cs-log-h` + `ol.cs-log-b` > `li` (`span.ts` + tekst; `cs-ok` na turkusowo; na końcu może stać `span.caret`).

**Atrybuty silnika (js/case.js):**

| atrybut | gdzie | co robi |
| --- | --- | --- |
| `data-step="N"`, `data-dur="ms"` | `li.cs-step` | krok N; trwa `data-dur` (domyślnie 1400), potem następny. Numery kroków = numery 01–0N z Rozwiązania. |
| `data-stagger="ms"` | `li.cs-step` | odstęp kaskady w kroku (domyślnie 170) |
| `data-at="N"` | dowolny element | w trakcie gry schowany, wchodzi w kroku N, kaskadą w kolejności w HTML |
| `data-t="ms"` | element z `data-at` | dokładny moment wejścia od początku kroku (zamiast kaskady) |
| `data-f="klucz [klucz]"` | źródło (np. `span.cs-hl` w mailu, `tr.cs-hl` w PDF, wiersz rekordu) | podświetla się, kiedy wchodzi element z tym `data-r` |
| `data-r="klucz"` | cel w wyniku | przy wejściu zapala źródła z tym kluczem |
| `data-fly="tekst"` | cel z `data-r` | żeton z tym tekstem leci ze źródła do celu, cel pojawia się po wylądowaniu; pusty `data-fly=""` bierze tekst źródła (tylko gdy źródło to krótki `span`). Leci tylko w układzie trzykolumnowym i gdy oba końce są na ekranie. Cel z `cs-gap` dostaje żeton bursztynowy. |
| `data-late="N ms klasa"` | dowolny | klasa jest w HTML (stan końcowy); silnik zdejmuje ją na starcie i dokłada w kroku N po `ms`. Przykład: `data-late="1 700 is-skip"` (mail szarzeje), `data-late="3 0 cs-scan"` (linia skanera po dokumencie). |
| `data-count="klucz"`, `data-tick="klucz"` | liczba / element | licznik startuje od 0, każde wejście elementu z `data-tick` dodaje 1; na końcu wraca wartość z HTML |
| `data-split="N"` | `.cs-demo` | na telefonie kroki od N czekają, aż kolumna wyniku wjedzie na ekran (ustaw na krok, w którym pierwszy raz coś pojawia się w `cs-out`) |

Automatycznie: `cs-gap` przy wejściu pulsuje bursztynem, `cs-human` turkusem, liczba w `.cs-tally > div` z `data-at` przeskakuje. Demo startuje, kiedy jego górna krawędź minie 70% wysokości ekranu, trwa 8–10 s i wraca do stanu końcowego (podświetlenia gasną, wszystkie kroki granatowe).

**Jak ułożyć demo:**
1. Kroki to skrócone nazwy kroków 01–0N z sekcji Rozwiązanie, z tą samą numeracją. Ostatni krok to wynik w systemie klienta.
2. Wejście: 2–4 dokumenty, w tym jeden „szum”, który automat pomija (`is-skip`), jeśli pasuje do procesu. Każda dana, która trafia do wyniku, ma w dokumencie `data-f`, a w wyniku kolumnę źródła.
3. Co najmniej jeden brak na bursztynowo (`cs-gap`) i jedno pole człowieka (`cs-human`): automat nie zgaduje, nie wysyła, nie zatwierdza tego, czego nie robi w prawdziwym wdrożeniu.
4. Dane zmyślone i oznaczone: eyebrow „Przykład na zmyślonym …”, `<em>przykład</em>` w nagłówku wyniku, zdanie w `cs-note` („Firmy, … są zmyślone.”), domeny `przyklad-….example` (EN: `sample-….example`). Żadnych prawdziwych klientów, nazwisk ani liczb o kliencie; prawdziwe liczby są w hero i Wynikach. Zakazy z punktu 8 obowiązują też tu (ERP bez nazwy systemu).
5. Konsolę z hero przenosisz do demo jako `cs-log` (linie przypięte do kroków przez `data-at`/`data-t`) albo usuwasz, jeśli demo pokazuje to samo. Nie zostawiaj jej w hero obok okładki.
6. EN: ten sam HTML, przetłumaczone teksty, `data-fly` i daty w formacie angielskim; `id="przyklad"` zostaje.

**Sprawdzenie:** `node build.mjs`, `node check-site.mjs`, potem narzędziem na 360, 390, 768, 1024, 1440 i 1920 (PL i EN): okładka gra i kończy się w stanie końcowym, demo startuje po przewinięciu, kończy się (`.cs-demo` bez `cs-running`), przycisk gra od nowa, na telefonie druga połowa rusza przy wyniku, `scrollWidth` = szerokość okna, tekst min. 11 px (w SVG: rozmiar × szerokość rysunku / 600), zero błędów konsoli.
