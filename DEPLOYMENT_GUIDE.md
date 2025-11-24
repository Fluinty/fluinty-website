# Przewodnik Wdrożenia - fluinty.pl

## 🎯 Cel
Zamiana obecnej strony WordPress na nową stronę statyczną HTML/CSS/JS

## 📋 Wymagania Wstępne

Przed rozpoczęciem upewnij się, że masz:
- ✅ Dostęp do panelu hostingowego (cPanel, DirectAdmin, lub inny)
- ✅ Dane FTP/SFTP do serwera
- ✅ Kopię zapasową obecnej strony WordPress (na wszelki wypadek)

---

## 🚀 Opcje Wdrożenia

### **Opcja 1: Hosting Statyczny (ZALECANA - Najszybsza i Najtańsza)**

Ponieważ Twoja nowa strona to czysty HTML/CSS/JS bez backendu, możesz użyć szybszego i tańszego hostingu statycznego:

#### **Netlify (DARMOWE - POLECANE)**
✅ **Zalety:**
- Darmowy hosting
- Automatyczne HTTPS
- Globalny CDN (błyskawiczne ładowanie)
- Automatyczne wdrożenia z GitHub
- Własna domena (fluinty.pl)

**Kroki:**
1. Stwórz konto na [netlify.com](https://netlify.com)
2. Przeciągnij i upuść folder `fluinty-redesign` na Netlify
3. W ustawieniach domeny dodaj `fluinty.pl`
4. Netlify poda Ci ustawienia DNS do zmiany u Twojego rejestratora domeny

#### **Vercel (DARMOWE - Alternatywa)**
- Podobne do Netlify
- Świetna wydajność
- [vercel.com](https://vercel.com)

#### **Cloudflare Pages (DARMOWE)**
- Używasz już Cloudflare? Idealne!
- [pages.cloudflare.com](https://pages.cloudflare.com)

---

### **Opcja 2: Obecny Hosting (Zamiana WordPressa)**

Jeśli chcesz zachować obecny hosting, musisz zastąpić WordPress plikami statycznymi:

⚠️ **OSTRZEŻENIE:** To usunie Twoją obecną stronę WordPress!

#### **Przygotowanie:**
1. **Zrób backup WordPressa:**
   - Użyj wtyczki jak UpdraftPlus lub
   - Pobierz wszystkie pliki przez FTP
   - Wyeksportuj bazę danych przez phpMyAdmin

#### **Wdrożenie:**

**Krok 1: Połącz się z serwerem przez FTP**
- Użyj programu jak FileZilla
- Host: `ftp.fluinty.pl` (lub adres IP podany przez hosting)
- Użytkownik i hasło: z panelu hostingowego

**Krok 2: Usuń pliki WordPress**
- Przejdź do folderu `public_html` (lub `www`, `httpdocs`)
- **Usuń wszystkie pliki i foldery WordPress:**
  - `wp-admin/`
  - `wp-content/`
  - `wp-includes/`
  - Wszystkie pliki `.php`
  - `.htaccess` (lub zrób backup na wszelki wypadek)

**Krok 3: Wgraj nowe pliki**
- Prześlij wszystkie pliki z folderu `fluinty-redesign`:
  ```
  fluinty-redesign/
  ├── index.html          → public_html/index.html
  ├── css/
  │   └── styles.css      → public_html/css/styles.css
  ├── js/
  │   └── main.js         → public_html/js/main.js
  ├── pages/
  │   ├── case-study-eticod.html
  │   └── case-study-art-tim.html
  └── (wszystkie inne pliki)
  ```

**Krok 4: Sprawdź plik `.htaccess`**
Stwórz nowy plik `.htaccess` w `public_html`:
```apache
# Przekierowania HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Kompresja
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
</IfModule>
```

---

## 📂 Struktura Plików do Wgrania

```
public_html/
├── index.html                          # Strona główna
├── css/
│   └── styles.css                      # Style custom
├── js/
│   └── main.js                         # JavaScript
├── pages/
│   ├── case-study-eticod.html         # Case study Eticod
│   └── case-study-art-tim.html        # Case study Art-Tim
└── .htaccess                           # Konfiguracja serwera
```

💡 **UWAGA:** Obrazy są obecnie linkowane z Unsplash (zewnętrzne URL). To działa, ale w przyszłości możesz:
- Pobrać i wgrać własne zdjęcia do folderu `/images/`
- Zaktualizować ścieżki w HTML

---

## ✅ Checklist Wdrożenia

### Przed wdrożeniem:
- [ ] Backup obecnej strony WordPress
- [ ] Backup bazy danych
- [ ] Przygotowanie wszystkich plików lokalnie
- [ ] Test strony lokalnie (otwórz `index.html` w przeglądarce)

### Podczas wdrożenia:
- [ ] Połączenie FTP/SFTP
- [ ] Usunięcie starych plików WordPress
- [ ] Wgranie nowych plików
- [ ] Konfiguracja `.htaccess`
- [ ] Sprawdzenie uprawnień plików (755 dla folderów, 644 dla plików)

### Po wdrożeniu:
- [ ] Test strony na `https://fluinty.pl`
- [ ] Sprawdzenie responsywności (telefon, tablet, desktop)
- [ ] Test wszystkich linków
- [ ] Sprawdzenie szybkości ładowania ([PageSpeed Insights](https://pagespeed.web.dev/))
- [ ] Test formularza kontaktowego (wymaga dodania backendu!)

---

## 🔧 Następne Kroki (Funkcjonalność)

### ⚠️ Formularz Kontaktowy
Obecnie formularz HTML nie jest funkcjonalny. Potrzebujesz:

**Opcja A: Formspree (NAJŁATWIEJSZE)**
1. Zarejestruj się na [formspree.io](https://formspree.io)
2. Stwórz formularz, dostaniesz endpoint
3. Zmień `<form>` tag w index.html:
```html
<form action="https://formspree.io/f/TWOJ_ID" method="POST">
```

**Opcja B: EmailJS**
- Darmowe 200 emaili/miesiąc
- [emailjs.com](https://emailjs.com)

**Opcja C: Własny Backend**
- Potrzebujesz serwera (Node.js, PHP)
- Możesz użyć Netlify Functions (darmowe)

### 📊 Google Analytics
Dodaj przed `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TWOJ_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TWOJ_ID');
</script>
```

---

## 💰 Koszty

### Hosting Statyczny (POLECANE):
- **Netlify/Vercel/Cloudflare Pages:** 0 PLN/miesiąc
- **Rejestracja domeny:** ~50-100 PLN/rok (jeśli już masz, to 0 PLN)

### Obecny Hosting:
- **Kontynuacja hostingu WordPress:** zależnie od pakietu
- **Możliwość downgrade'u do tańszego pakietu:** oszczędność nawet 50-80%

---

## 🆘 Potrzebujesz Pomocy?

### Hosting statyczny (Netlify):
1. Spakuj cały folder `fluinty-redesign` do ZIP
2. Przeciągnij na Netlify
3. Skonfiguruj domenę
4. **Gotowe w 5 minut!**

### Zastąpienie WordPressa:
1. Podaj nazwę hostingu (home.pl, nazwa.pl, OVH?)
2. Mogę pomóc z konfiguracją FTP
3. Krok po kroku

---

## 📞 Kontakt po Wdrożeniu

Po wdrożeniu pamiętaj:
- Formularz kontaktowy wymaga backendu (Formspree to 5 min)
- Możesz dodać własne zdjęcia zamiast Unsplash
- Rozważ Google Analytics/Meta Pixel
- Może być potrzebna integracja z CRM

**Powodzenia! 🚀**
