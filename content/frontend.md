# Frontend

Vi börjar kursen med att utvärdera frontend JavaScript ramverk. Vi tittar och jämför "The Big Three" Angular, React och Vue med Vanilla JavaScript och Mithril, som vi redan är bekanta med. Vi kollar på arkitekturen för de olika ramverken och hur vi gör vissa viktiga saker i ramverket. Vi jämför dessutom hur många rader det krävs för att skriva vissa kodexempel och hur stora produktionsfilerna blir för dessa kodexempel. Först bekantar vi oss med dokumentationen och tittar på en föreläsning om hur man väljer JavaScript ramverk.



## Läsa

Följande länkar är bra att ha för undersökande och implementation.

1. [Angular](https://angular.io/) ger dig en översikt och där hittar du dokumentationen som du vill läsa igenom.

1. [React](https://reactjs.org/) ger dig en översikt och där hittar du dokumentationen som du vill läsa igenom.

1. [Vue](https://vuejs.org/) ger dig en översikt och där hittar du dokumentationen som du vill läsa igenom.



## Titta

I nedanstående video berättar John Papa om hur man kan tänka när man väljer ett JavaScript-ramverk.

<div class='embed-container'><iframe src="https://www.youtube.com/embed/dHptnyroFNA" frameborder="0" allowfullscreen></iframe></div>



## Material och tekniker

I [kursrepot](https://github.com/emilfolino/jsramverk) finns två olika exempel program skrivna med hjälp av de fem ovannämnda teknikerna. I `/tic-tac-toe` finns ett luffarschack implementerad med möjlighet att hoppa tillbaka i spelets historik. I `/calculator` är en simpel miniräknare implementerad.

Dessutom finns en Me-sida som konsumerar ett Me-API implementerad i de 5 olika teknikerna. [GitHub repon](https://github.com/emilfolino?utf8=%E2%9C%93&tab=repositories&q=me-&type=&language=) för dessa 5 Me-sidor samt Me-API:t finns tillgängligt. Dessa är även driftsatta på `me-{angular, mithril, react, vanilla, vue}.jsramverk.me`. Du kommer under [vecka 3](backend) bygga ett eget Me-API.

Först tar vi en titt på antal rader som utvecklaren behöver skriva i dessa små exempelprogram och hur stora produktionsfilerna för dessa exempelprogram är.

#### Rader skriven kod i exempelprogrammen

I nedanstående tabell listas de rader kod som utvecklaren har skrivit för att implementera exempelprogrammen. De rader som är räknade är enbart de rader som innehåller källkod, så rader med kommentarer och tomma rader är borttagna.

|  | Angular | Mithril | React | Vue | Vanilla JS |
|-----|--------|--------|--------|---------|--------|
| calculator  | 112 | 103 | 133 | 98 | 118 |
| me   | 166 | 107 | 117 | 134 | 92 |
| tic-tac-toe | 196 | 136 | 146 | 172 | 126 |



#### Storlek produktionsfil(er)

I nedanstående tabell listas storleken på produktionsfilerna som skapas av antingen bygg verktyget i ramverket, webpack eller uglify. Filstorlekar är utskrivna med hjälp av kommandot `ls -lh` i ett bash-skal.

|  | Angular | Mithril | React | Vue | Vanilla JS |
|-----|--------|--------|--------|---------|--------|
| calculator  | 217K | 30K | 115K | 83K | 2.6K |
| me   | 329K | 29K | 134K | 106K | 2.2K |
| tic-tac-toe | 222K | 29K | 37K | 87K | 2.8K |



## Flera exempelprogram

#### RealWorld

För att ytterligare utvärdera våra valda ramverk tar vi en titt i GitHub repot [RealWorld Example](https://github.com/gothinkster/realworld). RealWorld Example repon är både backend och frontend som uppfyller vissa specifikationer och därför kan sättas ihop villkorligt. Använd dessa repon för att skapa dig en uppfattning om hur frontend ramverken samspelar med backends.



#### John Papa's Heroes

Under dotJS konferensen pratade John Papa om att välja ett frontend ramverk, videon är länkat ovan. Som förberedelse för presentationen hade han skapat samma app i "The Big Three" och de tre apparna ligger som open source kod på GitHub. [heroes-angular](https://github.com/johnpapa/heroes-angular), [heroes-react](https://github.com/johnpapa/heroes-react) och [heroes-vue](https://github.com/johnpapa/heroes-vue) är de tre repon som innehåller koden och det finns länkar till en publik driftsatt version från GitHub.

Titta igenom repon och se hur John Papa har strukturerat apparna i de olika ramverken.



## Tekniska koncept

Vi tittar i denna del av artikeln på några tekniska koncept som används i de olika ramverken. Vi tittar på hur man har vald att implementera dessa koncept i de olika ramverken och utvärderar vilka fördelar och nackdelar som finns med att göra på det viset.



#### Komponenter

De fyra ramverk som har valts ut i denna artikel är alla byggda runt komponenter. Komponenter är återanvändbara delar av koden, som i bästa fall inte har några externa beroenden.

I mithril och React är allt JavaScript och komponenterna definieras i JavaScript filer. I mithril är enda kravet att det ska finnas en `view` funktion som returnerar noder. I React heter funktionen `render` och funktionen returnerar JSX. I Vue finns varje komponent i en fil men är uppdelade i tre delar `template`, `script` och `style`, som motsvarar de tre lagren vi känner till från tidigare med struktur (HTML), stil (CSS) och dynamik (JavaScript). I angular har man tagit det ett steg längre med tre olika filer för dessa tre lager.



#### Länkning av data

Vi vill i många applikationer och speciellt i applikationer där data uppdateras ofta länka data i våra modeller till representationen i en vy. I vanilla JavaScript hade vi gjort det genom att varje gång data uppdateras sätta ett nytt värde för ett specifikt element i DOM'en.

```javascript
var data = 42;

document.getElementById("element").textContent = data;
```

I många ramverk är detta nått man försöker förenkla genom att uppdatera vyn direkt varje gång data ändras. Detta är en av de magiska sakerna med JavaScript ramverk och vi ska nedan se exempel på hur detta kan göras. I de flesta ramverken definierar vi medlemsvariabler i komponenter och vi kan sedan använda dessa medlemsvariabler i templates. I nedanstående exempel ser vi hur vi använder medlemsvariabler i Vue. Exemplet är tagit från exempelprogrammet `/calculator`.

```
<template>
    <div class="calculator">
        <div class="display">{{ current || 0 }}</div>
        ...
    </div>
</template>

<script>
export default {
    data() {
        return {
            current: 0,
        }
    },
    ...
```

Om medlemsvariabeln `current` får ett nytt värde ändras den direkt i den kopplade template. I vanilla JavaScript gör vi en explicit koppling och uppdatering av data och i de ramverk som har valts ut är det en implicit koppling och uppdatering.



#### Routing

I de flesta applikationer vill vi kunna gå mellan olika sidor och då är en router ett bra sätt att delegera och strukturera detta förfarande. I många fall av klient-sida routing använder man hashbang (#!) routing där de två tecknen #! används för att markera att detta är en route. Me-applikationerna som redovisas ovan använder alla någon form av routing.

I angular och mithril finns det inbyggda routers, i Angular importerar man ett paket och i mithril används funktionen `m.route()`. I react och vue installeras ytterligare paket `react-router-dom` och `vue-router`.

I angular (`app.module.ts`), mithril (`index.js`) och vue (`router/index.js`) definieras alla router i en JavaScript kontext och man använder sedan ett element för att visa de olika komponenter kopplat till routen. Filerna inom parentes är de filer där routerna är definierat i Me-applikationerna. I react anges router och vad som ska visas på de olika router i filen `App.js` med hjälp av JSX.

Ett exempel på en enkel router i vanilla JavaScript kan ses i me-vanilla exemplet där funktioner används för att skriva ut de enskilda vyerna.



#### Eventhantering och delegering

JavaScript tillför det dynamiska lagret till webben och en stor del av detta är att hantera användarens klick, skrivande osv. I vanilla JavaScript sköter vi detta med EventListeners.

```javascript
document.getElementById("my-btn").addEventListener("click", function (event) {
    // do the thing needed when a button is clicked.
});
```

Ramverken försöker förenkla detta förfarandet genom att förkorta ner syntaxen för EventListeners. `/tic-tac-toe` exempelprogrammen är bra exempel både på Eventhantering och delegering och vi kan titta på hur detta lösas i de olika ramverk.

```
// angular
<div class="square" (click)="click()">
  {{ squareValue }}
</div>

// mithril
return m("div.square",
    {
        onclick: function () {
            game.handleClick(index);
        }
    },
    game.history[game.stepNumber].squares[index]
);

// react
<button className="square" onClick={props.onClick}>
{props.value}
</button>

// vue
<div class="square" @click="onClick(index)">
  {{ current }}
</div>
```

I react och vue har vi skickat med en click-callback funktion från en annan komponent och när den sen klickas anropas den ursprungliga funktionen. I mithril används en funktion i modellen `game` som får hantera click-callbacken. I angular använder vi oss istället av en `EventEmitter`, som i sin tur skickar eventet upp i trädet av komponenter istället för att man som i react och vue skickar med en funktion ner i trädet.



#### HTTP-anrop

För att vi ska kunna prata med en backend behöver vi kunna kommunicera över HTTP. Jag har valt att i react, vanilla och vue exemplen använda [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), som vi känner igen från tidigare. I många fall använder ytterligare paket som till exempel [axios](https://www.npmjs.com/package/axios) för att kommunicera med en backend, vilket ökar komplexiteten och beroenden ytterligare. I mithril används den inbyggda funktionen `m.request()`, som introducerades tillsammans med mithril i webapp. I angular använder vi oss av den inbyggda modulen HttpClient och en så kallad service. Exempel på detta kan ses i me-angular applikationen i katalogerna `src/app/report` och `src/app/me`.



## Kravspecifikation

Nedan finns kravspecifikationen för veckans inlämningsuppgift:

1. Skapa en Me-applikation i ditt valda ramverk med följande routes: `/`, `/reports/week/1`.

1. Skapa en `README.md` fil i ditt repo som beskriver hur man installerar moduler och starter din Me-applikation.

1. `/` ska visa en kort beskrivning av dig själv.

1. `/reports/week/1` ska innehålla en länk till GitHub repot och innehållet från din `README.md` fil.

1. Committa alla filer och lägg till en tagg (1.0.\*).

1. Pusha upp repot till GitHub, inklusive taggarna.

1. Länka till ditt GitHub repo i din inlämning på Canvas.



## Skriva

Vi ska i denna kurs träna på akademiskt skrivande och kommer i vecka 1, 2 & 3 fokusera på bakgrund och introduktion. Vi kommer använda oss av en iterativ process för att förbättra vårt akademiska skrivande inför kommande exjobb, som avslutar och sammanfattar utbildningen.

I ett akademiskt arbete fyller bakgrunden och introduktionen en viktig funktion. Introduktionen skapar grunden och utgångspunkten för vår diskussion och sammanfattning där vi sätter vårt arbete i relation till aktuell forskning. Därför är det viktigt att vi i introduktionen berättar för vår läsare om läget på den aktuella forskningen inom området.

Skriv en kort introduktion till det ramverk som du har valt. Använd referenser på ett akademiskt sätt. Se denna texten som ett första utkast, vi kommer under de kommande två veckorna förbättra texten.

Biblioteket vid BTH och tre andra högskolor och universitet i Sverige utvecklar tillsammans [skrivguiden.se](http://skrivguiden.se/). Här finns bra tips på struktur, vad de olika delar av en akademisk text ska innehålla och hur man skriver akademiskt. Använd [skrivguiden.se](http://skrivguiden.se/) som en referens under kursen, titta på guiden översiktligt denna veckan och återkom till guiden under kursens gång.

Du får skriva introduktionen på antigen svenska eller engelska. Du väljer själv på vilket sätt och med vilken teknik du vill skriva texten. Under föreläsningen går Emil igenom tre olika sätt att skriva texten: Textbehandlare (Microsoft Word, Google Docs, Apple Pages, LibreOffice Writer eller liknande), [Markdown med Pandoc](http://arthurcgusmao.com/academia/2018/01/27/markdown-pandoc.html) och [LaTeX med Overleaf](https://sv.overleaf.com/edu/bth).

**Lämna in texten som PDF bilaga till din inlämning på Canvas.**



## Sammanfattning

Vi har nu skrapat ytan på JavaScript ramverken Angular, Mithril, React och Vue, samt jämfört ramverken med vanilla JavaScript. Vi avslutar denna vecka med en video där den tidigare BDFL för [django](https://www.djangoproject.com/) pratar om hur vi inte alltid behöver ett JavaScript ramverk.

<div class='embed-container'><iframe src="https://www.youtube.com/embed/k7n2xnOiWI8" frameborder="0" allowfullscreen></iframe></div>
