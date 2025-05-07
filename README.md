# PseudoForms

<p>Projekt studencki "próbujący" imitować Google Forms (Formularze Google).</p>

<p>Zamysłem całego projektu jest stworzenie strony na której każda chętna osoba będzie w stanie stworzyć ankietę</p>
<p>Ankiety będzie można tworzyć bez rejestracji konta na stronie</p>
<p>Dla chętnych istnieje opcja stworzenia konta, która pozwala na:
<ul>
    <li>śledzenie ankiet które się stworzyło</li>
    <li>śledzenie ankiet które się wypełniło</li>
</ul>
</p>
Same ankiety posiadają składają się z prostych pytań tworzonych przez Autora ankiety.
Odpowiedzi na dane pytanie można ustawić na odpowiedzi dowolne (dowolny tekst wpisany przez wypełniającego),
wybór jednokrotny, lub wielokrotny

## Wymagania

Zainstalowany Node.js, dostęp do internetu (do pobrania potrzebnych modułów), sprawna przeglądarka internetowa (IE nie zaliczamy do tego)

## Uruchomienie projektu

### Za pomocą VS Code:

Otwórz folder pseudoforms w VS Code<br>
Uruchom Terminal (powinien znajdować się w folderze projektu tzn. <code>\path\to\pseudoforms</code>)<br>
Uruchom aktualizację modułów:
```
npm update
```
Wciśnij F5<br>
Wybierz Node, do uruchomienia projektu

### Za pomocą CMD (windows):

Wejdź do folderu pseudoforms:
```
cd C:\Your\path\to\pseudoforms
```
Wykonaj najpierw aktualizację modułów:
```
npm update
```
Potem uruchom projekt:
```
npm start
```


### Informacje dodatkowe

***folder pseudoforms*** - w nim mamy cały projekt<br>
<b>Folder inne</b> - przeznaczony jest na zipy które wysyłamy jako etapy, nasze prace które nie wiemy czy się nadają, zadania na zajęciach itp.


API testować najlepiej z poziomu swaggera - dostępny jest na http://localhost:3000/api-docs
można też ręcznie testować api - za pomocą curl
