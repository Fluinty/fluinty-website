# 🚀 Git Workflow - Fluinty Website

## Przed rozpoczęciem pracy (zawsze!)

```bash
# 1. Pobierz najnowsze zmiany z GitHuba
git pull origin main
```

**Dlaczego?** Kolega mógł wprowadzić zmiany. Zawsze synchronizuj się przed pracą!

---

## Podczas pracy

### 1. Edytuj pliki
- Zmień `index.html`, CSS, JS, cokolwiek potrzebujesz

### 2. Sprawdź co zmieniłeś
```bash
git status
```

### 3. Dodaj zmiany do commita
```bash
# Wszystkie pliki:
git add .

# LUB tylko konkretne pliki:
git add index.html
git add css/styles.css
```

### 4. Stwórz commit z opisem
```bash
git commit -m "Opis zmian, np: Dodano nową sekcję kontakt"
```

**Dobre opisy commitów:**
- ✅ "Zmieniono kolor przycisku CTA na primary"
- ✅ "Poprawiono padding w sekcji Hero"
- ✅ "Dodano nowy case study dla firmy XYZ"
- ❌ "Update" (za ogólne!)
- ❌ "Fixes" (co naprawione?)

### 5. Wyślij zmiany na GitHuba
```bash
git push origin main
```

**Co się dzieje?**
- Netlify automatycznie wykryje zmiany ⚡
- Zbuduje i wdroży nową wersję (~30 sek)
- Strona na https://charming-biscochitos-05ce3a.netlify.app/ się zaktualizuje!

---

## Pełny workflow w jednej linii

```bash
git pull && git add . && git commit -m "Twój opis" && git push
```

---

## Co jeśli kolega wprowadził zmiany podczas gdy Ty pracowałeś?

### Sytuacja: Dostałeś błąd przy `git push`
```
! [rejected]        main -> main (fetch first)
```

**Rozwiązanie:**
```bash
# 1. Zapisz swoje zmiany
git stash

# 2. Pobierz zmiany kolegi
git pull origin main

# 3. Przywróć swoje zmiany
git stash pop

# 4. Jeśli są konflikty, rozwiąż je w edytorze
# (Git pokaże gdzie się różnią)

# 5. Dodaj rozwiązane pliki
git add .

# 6. Commituj
git commit -m "Merge: połączono zmiany z kolegą"

# 7. Push
git push origin main
```

---

## Szybkie komendy (Cheat Sheet)

```bash
# Status (co zmieniłem?)
git status

# Historia commitów
git log --oneline

# Cofnij ostatni commit (zachowaj zmiany)
git reset --soft HEAD~1

# Zobacz zmiany w pliku
git diff nazwa-pliku.html

# Przywróć plik do wersji z GitHuba (UWAGA: tracisz lokalne zmiany!)
git checkout HEAD -- nazwa-pliku.html
```

---

## Netlify Auto-Deploy

✅ **Włączone!** Każdy `git push` = automatyczny deploy

🔍 **Sprawdź status:**
- Idź na https://app.netlify.com/
- Wybierz swoją stronę
- Zakładka "Deploys" - zobaczysz historię

---

## Najlepsze praktyki

1. 📥 **Zawsze `git pull` przed pracą**
2. 💾 **Commituj często** (małe, opisowe commity)
3. 📝 **Dobre opisy commitów** (nie "update", ale "Zmieniono X na Y")
4. 🔄 **Push regularnie** (żeby kolega widział Twoje zmiany)
5. 💬 **Komunikujcie się** (kto nad czym pracuje)

---

## Pomoc

Jeśli coś nie działa:
```bash
# Sprawdź konfigurację
git remote -v

# Powinno pokazać:
# origin  https://github.com/Fluinty/fluinty-website.git (fetch)
# origin  https://github.com/Fluinty/fluinty-website.git (push)
```

Jeśli nie - zaktualizuj URL:
```bash
git remote set-url origin https://github.com/Fluinty/fluinty-website.git
```

---

**🎯 Główna zasada: `git pull` → edycja → `git add .` → `git commit -m "opis"` → `git push`**

Powodzenia! 🚀
