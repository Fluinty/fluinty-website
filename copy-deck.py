# -*- coding: utf-8 -*-
# Wyciaga cale widoczne copy z src/pages/*.html i sklada jedna strone do czytania.
# Uruchomienie: python copy-deck.py [pl|en]  -> copy-deck-<jezyk>.html w scratchpadzie (sciezka w OUT)
import io, re, sys, html
from html.parser import HTMLParser

LANG = sys.argv[1] if len(sys.argv) > 1 else 'pl'
OUT = r'C:\Users\Adamn\AppData\Local\Temp\claude\C--Users-Adamn\304d8891-aa79-4e71-bc12-b07742a93582\scratchpad\copy-deck-%s.html' % LANG

if LANG == 'pl':
    PAGES = [('G', 'Strona główna', 'index'), ('E', 'Realizacja: Eticod', 'case-eticod'), ('H', 'Realizacja: Holbox', 'case-holbox'),
             ('A', 'Realizacja: Art-Tim', 'case-arttim'), ('B', 'Realizacja: Bodtech', 'case-bodtech'), ('M', 'Realizacja: IIM Marbella', 'case-marbella'),
             ('T', 'Realizacja: Tax-Net', 'case-taxnet'), ('D', 'Produkt: FluintyDebt', 'produkt-debt'), ('F', 'Produkt: FluintyFleet', 'produkt-fleet'),
             ('K', 'Kontakt', 'kontakt'), ('L', 'Blog: lista', 'blog'), ('W', 'Blog: wpis o Eticodzie', 'blog-post-eticod'),
             ('Z', 'Podziękowanie po formularzu', 'dziekujemy'), ('P', 'Polityka prywatności', 'polityka'), ('S', 'Księgowość i KSeF (strona bez linków w menu)', 'ksiegowosc')]
    NAV = [('N', 'Nawigacja i stopka (na każdej stronie)', ['nav', 'footer'])]
    TITLE = 'Copy nowej strony fluinty.pl'
    LEDE = 'Wszystkie teksty z nowej strony w kolejności czytania, z makiet po korekcie. Każdy blok ma numer, np. G.12. Uwagi możesz zostawić jako komentarze na tej stronie albo napisać w czacie: „G.12: było → ma być".'
else:
    PAGES = [('G', 'Home', 'en-index'), ('E', 'Case study: Eticod', 'en-case-eticod'), ('H', 'Case study: Holbox', 'en-case-holbox'),
             ('A', 'Case study: Art-Tim', 'en-case-arttim'), ('B', 'Case study: Bodtech', 'en-case-bodtech'), ('M', 'Case study: IIM Marbella', 'en-case-marbella'),
             ('T', 'Case study: Tax-Net', 'en-case-taxnet'), ('D', 'Product: FluintyDebt', 'en-produkt-debt'), ('F', 'Product: FluintyFleet', 'en-produkt-fleet'),
             ('K', 'Contact', 'en-kontakt'), ('L', 'Blog: list', 'en-blog'), ('W', 'Blog post: Eticod', 'en-blog-post-eticod'),
             ('Z', 'Thank-you page', 'en-dziekujemy'), ('P', 'Privacy policy', 'en-polityka')]
    NAV = [('N', 'Navigation and footer (every page)', ['nav-en', 'footer-en'])]
    TITLE = 'Copy of the English fluinty.pl'
    LEDE = 'All texts of the English version in reading order. Each block has a number, e.g. G.12.'

BLOCK = {'h1', 'h2', 'h3', 'h4', 'p', 'li', 'summary', 'dt', 'dd', 'th', 'td', 'blockquote', 'figcaption', 'button', 'label', 'legend', 'caption'}
SPAN_CLASSES = {'eyebrow', 'label', 'metric-num', 'metric-lab', 'chip', 'chip-mono', 'link-more', 'h3', 'small', 'badge', 'nav-lang', 'nav-cta', 'nav-pill', 'brand-word', 'log-line'}
SKIP = {'svg', 'script', 'style', 'template'}

class Node:
    def __init__(self, tag, attrs, parent):
        self.tag = tag; self.attrs = dict(attrs); self.parent = parent; self.children = []
    def text(self):
        out = []
        for c in self.children:
            out.append(c if isinstance(c, str) else ' ' + c.text() + ' ')
        return re.sub(r'\s+', ' ', ''.join(out)).strip()

class Tree(HTMLParser):
    VOID = {'img', 'br', 'input', 'hr', 'meta', 'link', 'source', 'path', 'circle', 'rect'}
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node('root', [], None); self.cur = self.root
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.cur); self.cur.children.append(n)
        if tag not in self.VOID: self.cur = n
    def handle_startendtag(self, tag, attrs):
        self.cur.children.append(Node(tag, attrs, self.cur))
    def handle_endtag(self, tag):
        n = self.cur
        while n is not None and n.tag != tag: n = n.parent
        if n is not None and n.parent is not None: self.cur = n.parent
    def handle_data(self, data):
        if data: self.cur.children.append(data)

def is_block(n):
    if not isinstance(n, Node): return False
    if n.tag in BLOCK: return True
    cls = set((n.attrs.get('class') or '').split())
    return n.tag in ('span', 'a', 'div') and bool(cls & SPAN_CLASSES)

def has_block_desc(n):
    for c in n.children:
        if isinstance(c, Node):
            if c.tag in SKIP: continue
            if is_block(c) or has_block_desc(c): return True
    return False

def walk(n, out, ctx):
    seen = ctx.setdefault('seen', set())
    for c in n.children:
        if not isinstance(c, Node): continue
        if c.tag in SKIP: continue
        if c.tag == 'input' and c.attrs.get('placeholder'):
            out.append(('input', c.attrs['placeholder'], ctx)); continue
        if c.tag == 'img' and c.attrs.get('alt'):
            out.append(('alt', c.attrs['alt'], ctx)); continue
        hidden = c.attrs.get('aria-hidden') == 'true'
        cctx = dict(ctx)
        if hidden: cctx['hidden'] = True
        if c.tag == 'section':
            cctx['section'] = c.attrs.get('id') or c.attrs.get('aria-labelledby') or ''
        leaf = is_block(c) and (not has_block_desc(c) or 'metric-num' in (c.attrs.get('class') or '').split())
        if leaf:
            t = c.text()
            if t and cctx.get('hidden') and t in seen: continue
            if t: seen.add(t)
            kl = set((c.attrs.get('class') or '').split()) & SPAN_CLASSES
            if t: out.append(('span:' + ' '.join(sorted(kl)) if kl else c.tag, t, cctx))
        else:
            walk(c, out, cctx)

def blocks_of(src):
    t = Tree(); t.feed(io.open(src, encoding='utf-8').read()); out = []
    walk(t.root, out, {})
    # scal metric-num + metric-lab, usun duble tekstu (np. link "Zobacz" w karcie i w liscie)
    merged, prev = [], None
    for tag, txt, ctx in out:
        if tag == 'span:metric-lab' and merged and merged[-1][0] == 'span:metric-num':
            merged[-1] = ('metric', merged[-1][1] + ' · ' + txt, ctx); continue
        merged.append((tag, txt, ctx))
    return merged

STYLE = '''<style>
:root{--bg:#F5F7F9;--card:#FFFFFF;--ink:#131A22;--ink2:#4A5560;--ink3:#7A858F;--line:#D7DEE5;--acc:#007A70;--navy:#0B3D70;--mono:"IBM Plex Mono",Consolas,monospace;--sans:"IBM Plex Sans","Segoe UI",system-ui,sans-serif;--serif:"Source Serif 4",Georgia,serif}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0E1419;--card:#151C23;--ink:#E8EDF1;--ink2:#A9B4BE;--ink3:#7D8A95;--line:#2B3641;--acc:#5FCFC2;--navy:#9CC3EA}}
:root[data-theme="dark"]{--bg:#0E1419;--card:#151C23;--ink:#E8EDF1;--ink2:#A9B4BE;--ink3:#7D8A95;--line:#2B3641;--acc:#5FCFC2;--navy:#9CC3EA}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--serif);font-size:17px;line-height:1.6}
.wrap{max-width:1160px;margin:0 auto;padding:36px 24px 80px;display:grid;grid-template-columns:240px minmax(0,1fr);gap:40px}
@media(max-width:860px){.wrap{grid-template-columns:1fr;padding:20px 16px 60px}.toc{position:static}}
.toc{position:sticky;top:20px;align-self:start;font-family:var(--sans);font-size:13.5px;display:flex;flex-direction:column;gap:4px}
.toc a{color:var(--ink2);text-decoration:none;padding:5px 8px;border-radius:6px}.toc a:hover{background:var(--card)}
.toc .k{font-family:var(--mono);color:var(--acc);margin-right:6px}
h1.t{font-family:var(--sans);font-size:36px;letter-spacing:-.02em;line-height:1.1;margin:0 0 10px}
.lede{color:var(--ink2);max-width:66ch;margin:0 0 30px}
h2.page{font-family:var(--sans);font-size:24px;margin:52px 0 14px;padding-top:20px;border-top:1px solid var(--line)}
h2.page .k{font-family:var(--mono);font-size:14px;color:var(--acc);margin-right:10px}
.sec{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink3);margin:26px 0 6px}
.b{display:grid;grid-template-columns:52px minmax(0,1fr);gap:12px;padding:6px 0}
.b .n{font-family:var(--mono);font-size:11.5px;color:var(--ink3);padding-top:5px;user-select:all}
.b.h1 .x{font-family:var(--sans);font-size:30px;font-weight:700;line-height:1.15;letter-spacing:-.02em}
.b.h2 .x{font-family:var(--sans);font-size:23px;font-weight:700;line-height:1.2;letter-spacing:-.015em}
.b.h3 .x,.b.h4 .x,.b.summary .x{font-family:var(--sans);font-size:17px;font-weight:600}
.b.eyebrow .x,.b.label .x,.b.chip-mono .x{font-family:var(--mono);font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--acc)}
.b.metric .x{font-family:var(--sans);font-weight:700;color:var(--acc)}
.b.chip .x,.b.badge .x{font-family:var(--sans);font-size:14px;display:inline-block;border:1px solid var(--line);border-radius:99px;padding:3px 10px;color:var(--ink2)}
.b.li .x::before{content:"• ";color:var(--ink3)}
.b.button .x,.b.nav-cta .x,.b.nav-pill .x,.b.link-more .x{font-family:var(--sans);font-weight:600;color:var(--navy)}
.b.button .x::before{content:"[przycisk] ";font-weight:400;color:var(--ink3);font-family:var(--mono);font-size:11px}
.b.link-more .x::after{content:" →"}
.b.small .x,.b.metric-lab .x,.b.figcaption .x{font-size:14.5px;color:var(--ink2)}
.b.input .x::before{content:"[placeholder] ";color:var(--ink3);font-family:var(--mono);font-size:11px}
.b.alt .x::before{content:"[alt obrazka] ";color:var(--ink3);font-family:var(--mono);font-size:11px}
.b.hid .x{font-family:var(--mono);font-size:13px;color:var(--ink2)}.b.hid .x::before{content:"[konsola / dekoracja] ";color:var(--ink3);font-size:11px}
.b.dt .x{font-family:var(--sans);font-weight:600;font-size:14px}.b.dd .x,.b.td .x,.b.th .x{font-size:15px;color:var(--ink2)}
.b.th .x{font-family:var(--sans);font-weight:600;color:var(--ink)}
</style>'''

def render():
    toc, body, total = [], [], 0
    def emit(code, title, blocks):
        nonlocal total
        toc.append('<a href="#%s"><span class="k">%s</span>%s</a>' % (code, code, html.escape(title)))
        body.append('<h2 class="page" id="%s"><span class="k">%s</span>%s</h2>' % (code, code, html.escape(title)))
        i = 0; last_sec = None
        for tag, txt, ctx in blocks:
            sec = ctx.get('section')
            if sec and sec != last_sec:
                body.append('<p class="sec">sekcja %s</p>' % html.escape(sec.replace('-h', ''))); last_sec = sec
            i += 1; total += 1
            cls = tag.replace('span:', '').split(' ')[0]
            if ctx.get('hidden'): cls += ' hid'
            body.append('<div class="b %s"><span class="n">%s.%d</span><span class="x">%s</span></div>' % (cls, code, i, html.escape(txt)))
    for code, title, parts in NAV:
        blocks = []
        for part in parts: blocks += blocks_of('src/partials/%s.html' % part)
        emit(code, title, blocks)
    for code, title, src in PAGES:
        path = 'src/pages/%s.html' % src
        try: blocks = blocks_of(path)
        except FileNotFoundError: continue
        emit(code, title, blocks)
    page = ('<title>%s</title>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=IBM+Plex+Mono&display=swap">\n%s\n'
            '<div class="wrap"><nav class="toc">%s</nav><main><h1 class="t">%s</h1><p class="lede">%s</p>%s</main></div>\n') % (
            html.escape(TITLE), STYLE, '\n'.join(toc), html.escape(TITLE), html.escape(LEDE), '\n'.join(body))
    io.open(OUT, 'w', encoding='utf-8').write(page)
    print('zapisane:', OUT, '| blokow:', total)

render()
