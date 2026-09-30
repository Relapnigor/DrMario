# Dr. Mario

*[🇬🇧 English version of README](README.md)*

Odtworzenie klasycznej gry logicznej ze spadającymi klockami, napisane w TypeScript + Vite: sterujesz dwukolorową tabletką spadającą na planszę z wirusami, układasz 4 lub więcej pól tego samego koloru w rzędzie, żeby je zbić, i czyścisz wszystkie wirusy, żeby ukończyć etap.

## Funkcje

- Plansza 16x8, renderowana jako tabela HTML z sprite'ami ustawianymi przez CSS `background-image` (bez canvasu)
- Dwukolorowa spadająca tabletka: ruch w lewo/prawo, obrót, oraz swobodny spadek lub przyspieszone opuszczanie
- Dopasowanie 4+ pól tego samego koloru (w poziomie lub pionie) zbija je, wliczając w to wirusy, i przyznaje punkty
- Reakcje łańcuchowe: elementy pozostawione "w powietrzu" po zbiciu spadają niżej i są ponownie sprawdzane pod kątem nowych dopasowań
- Krótka animacja ręki opuszczająca każdą nową tabletkę do strefy startowej na początku tury
- Wynik, liczba pozostałych wirusów i zapisywany najlepszy wynik (przez `localStorage`), pokazywane jako sprite'y cyfr
- Trzy ikony wirusów krążą obok planszy, przyspieszając po zakończeniu gry
- Wygrana po zbiciu wszystkich wirusów; przegrana, gdy nowa tabletka nie ma gdzie się pojawić

## Stack technologiczny

- TypeScript
- [Vite](https://vitejs.dev/) jako serwer deweloperski i narzędzie do budowania
- Czysty HTML/CSS (renderowanie przez DOM, stylowanie przez obrazki tła poszczególnych komórek) — bez frameworka, bez canvasu
- [TypeDoc](https://typedoc.org/) do generowania dokumentacji API w `docs/`

## Struktura projektu

```
.
├── index.html                  # szkielet strony, ładuje src/Game.ts
├── src/
│   ├── Game.ts                   # spina wszystko razem i uruchamia główną pętlę gry
│   ├── style.css                  # style
│   ├── classes/
│   │   ├── Board.ts                  # buduje siatkę planszy i rozmieszcza początkowe wirusy
│   │   ├── Pill.ts                    # spadająca tabletka: ruch, obrót, blokowanie, dopasowania, spadanie
│   │   ├── Arm.ts                      # animacja "ręki" dostarczającej każdą nową tabletkę
│   │   ├── Anim.ts                      # animacja krążących ikon wirusów
│   │   └── Points.ts                     # wyświetlanie wyniku / liczby wirusów / rekordu, przez localStorage
│   ├── data/
│   │   ├── Boardstate.ts               # siatka stanu planszy, komórka po komórce
│   │   ├── Cellids.ts                   # równoległa siatka śledząca, która tabletka zajmuje daną komórkę
│   │   ├── Pillid.ts                     # prosty licznik id, do odróżniania połówek tabletek
│   │   ├── Frames.ts                      # dane klatek animacji opuszczania tabletki przez rękę
│   │   ├── Viruses.ts                      # początkowa liczba wirusów; resetuje wynik/wirusy przy starcie
│   │   ├── Gameover.ts                      # śledzi, czy gra się zakończyła
│   │   └── Stagecompleted.ts                 # śledzi, czy etap został ukończony
│   └── img/                                    # grafiki (sprite'y)
└── docs/                        # wygenerowana dokumentacja API (patrz niżej)
```

## Uruchomienie lokalnie

```bash
npm install
npm run dev
```

Następnie otwórz w przeglądarce adres wypisany w konsoli.

## Budowanie

```bash
npm run build
```

Uruchamia sprawdzenie typów (`tsc`), a następnie buduje produkcyjną paczkę przez Vite do `dist/`.

## Dokumentacja API

Folder `docs/` jest generowany na podstawie komentarzy TypeDoc w kodzie źródłowym i nie odświeża się automatycznie — po zmianie kodu lub komentarzy dokumentacyjnych wygeneruj go ponownie poleceniem:

```bash
npx typedoc --entryPointStrategy expand --out docs src
```

## Jak grać

1. Nowa dwukolorowa tabletka opuszcza się do strefy startowej nad planszą.
2. Poruszaj nią w lewo/prawo, obracaj, i pozwól jej spaść samodzielnie albo przyspiesz opadanie strzałką w dół.
3. Ułóż ją tak, żeby 4 lub więcej pól tego samego koloru znalazło się w rzędzie (poziomo lub pionowo) — dopasowane pola znikają, a wirusy wśród nich są usuwane i punktowane.
4. Zbij wszystkie wirusy na planszy, żeby ukończyć etap. Jeśli nowa tabletka nie ma gdzie się pojawić, bo stos sięgnął góry planszy, gra się kończy.

## Uwagi

- Komentarze w kodzie i dokumentacja TypeDoc są po angielsku.
