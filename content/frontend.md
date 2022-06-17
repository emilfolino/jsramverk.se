# Frontend

<p class="author">Emil Folino</p>

Vi börjar kursen med att utvärdera frontend JavaScript ramverk. Vi tittar och jämför "The Big Three" Angular, React och Vue med Vanilla JavaScript, Svelte och Mithril. Vi kollar på arkitekturen för de olika ramverken och hur vi gör vissa viktiga saker i ramverket. Vi jämför dessutom hur många rader det krävs för att skriva vissa kodexempel och hur stora produktionsfilerna blir för dessa kodexempel. Först bekantar vi oss med dokumentationen och fyra korta filmer om ramverken. Sen tittar vi på några föreläsningar om hur man väljer JavaScript ramverk.



## Läsa

Följande länkar är bra att ha för undersökande och implementation. [Angular](https://angular.io/), [React](https://reactjs.org/), [Svelte](https://svelte.dev/) och [Vue](https://vuejs.org/) ger dig en översikt och där hittar du dokumentationen som du vill läsa igenom.



## Titta

#### Fyra korta

Fyra korta filmer om ramverken och deras historia.

<div class='embed-container'><iframe src="https://www.youtube.com/embed/Ata9cSC2WpM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<div class='embed-container'><iframe src="https://www.youtube.com/embed/Tn6-PIqc4UM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<div class='embed-container'><iframe src="https://www.youtube.com/embed/rv3Yq-B8qp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<div class='embed-container'><iframe src="https://www.youtube.com/embed/nhBVL41-_Cw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



#### Föreläsningar om att välja ramverk

I nedanstående video berättar John Papa om hur man kan tänka när man väljer ett JavaScript-ramverk.

<div class='embed-container'><iframe src="https://www.youtube.com/embed/dHptnyroFNA" frameborder="0" allowfullscreen></iframe></div>

Fireship har gjort en lite nyare jämförelse av ramverken, där även sju andra ramverk jämförs med "The Big Three".

<div class='embed-container'><iframe src="https://www.youtube.com/embed/cuHDQhDhvPE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



## Material och tekniker

I [kursrepot](https://github.com/emilfolino/jsramverk) finns två exempel program skrivna med hjälp av de sex ovannämnda teknikerna. I `/tic-tac-toe` finns ett luffarschack implementerad med möjlighet att hoppa tillbaka i spelets historik. I `/calculator` är en simpel miniräknare implementerad.

Dessutom finns en Me-sida som konsumerar ett Me-API implementerad i de sex olika teknikerna. [GitHub repon](https://github.com/emilfolino?utf8=%E2%9C%93&tab=repositories&q=me-&type=&language=) för dessa sex Me-sidor samt Me-API:t finns tillgängligt. Dessa är även driftsatta på `me-{angular, mithril, react, svelte, vanilla, vue}.jsramverk.se`.

Först tar vi en titt på antal rader som utvecklaren behöver skriva i dessa små exempelprogram och hur stora produktionsfilerna för dessa exempelprogram är.



#### Rader skriven kod i exempelprogrammen

I nedanstående tabell listas de rader kod som utvecklaren har skrivit för att implementera exempelprogrammen. De rader som är räknade är enbart de rader som innehåller källkod, så rader med kommentarer och tomma rader är borttagna.

|  | Angular | Mithril | React | Vue | Vanilla JS |
|-----|--------|--------|--------|---------|--------|
| calculator  | 112 | 103 | 133 | 98 | 118 |
| tic-tac-toe | 196 | 136 | 146 | 172 | 126 |
| me   | 166 | 107 | 117 | 134 | 92 |



#### Storlek produktionsfil(er)

I nedanstående tabell listas storleken på produktionsfilerna som skapas av antingen bygg verktyget i ramverket, webpack eller uglify. Filstorlekar är utskrivna med hjälp av kommandot `ls -lh` i ett bash-skal.

|  | Angular | Mithril | React | Vue | Vanilla JS |
|-----|--------|--------|--------|---------|--------|
| calculator  | 217K | 30K | 115K | 83K | 2.6K |
| tic-tac-toe | 222K | 29K | 37K | 87K | 2.8K |
| me   | 329K | 29K | 134K | 106K | 2.2K |



## Flera exempelprogram

#### RealWorld

För att ytterligare utvärdera våra valda ramverk tar vi en titt i GitHub repot [RealWorld Example](https://github.com/gothinkster/realworld). RealWorld Example repon är både backend och frontend som uppfyller vissa specifikationer och därför kan sättas ihop villkorligt. Använd dessa repon för att skapa dig en uppfattning om hur frontend ramverken samspelar med backends.



#### John Papas Heroes

Under dotJS konferensen pratade John Papa om att välja ett frontend ramverk, videon är länkat ovan. Som förberedelse för presentationen hade han skapat samma app i "The Big Three" och de tre apparna ligger som open source kod på GitHub. [heroes-angular](https://github.com/johnpapa/heroes-angular), [heroes-react](https://github.com/johnpapa/heroes-react) och [heroes-vue](https://github.com/johnpapa/heroes-vue) är de tre repon som innehåller koden och det finns länkar till en publik driftsatt version från GitHub.

Titta igenom repon och se hur John Papa har strukturerat apparna i de olika ramverken.



## Path of Least Resistance

Innan vi kommer allt för långt ner i tekniska detaljer kommer här nog det viktigaste valet inom Path of Least Resistance i denna kursen.

Vill du utveckla dina kunskaper i ramverket React och ha möjlighet att diskutera med många andra i chatten väljer du i detta kursmomentet ramverket React och text editorn Quill. Det är dessa tekniker som ingår i Path of Least Resistance från detta kmomet.

<img src="path.png" class="path" alt="road used as indicator for path of least resistance track" />

Om du däremot vill utmana dig själv lite mer i kursen välj ett av de andra ramverken Angular, Svelte eller Vue och eventuellt även en annan text editor komponent.



## Tekniska koncept

Vi tittar i denna del av artikeln på några tekniska koncept som används i de olika ramverken. Vi tittar på hur man har valt att implementera dessa koncept i de olika ramverken och utvärderar vilka fördelar och nackdelar som finns med att göra på det viset.



### Komponenter

De fyra ramverk som har valts ut i denna artikel är alla byggda runt komponenter. Komponenter är återanvändbara delar av koden, som i bästa fall inte har några externa beroenden.

I mithril och React är allt JavaScript och komponenterna definieras i JavaScript filer. I mithril är enda kravet att det ska finnas en `view` funktion som returnerar noder. I React heter funktionen `render` och funktionen returnerar JSX. I Vue finns varje komponent i en fil men är uppdelade i tre delar `template`, `script` och `style`, som motsvarar de tre lagren vi känner till från tidigare med struktur (HTML), stil (CSS) och dynamik (JavaScript). I angular har man tagit det ett steg längre med tre olika filer för dessa tre lager.



### Länkning av data

Vi vill i många applikationer och speciellt i applikationer där data uppdateras ofta länka data i våra modeller till representationen i en vy. I vanilla JavaScript hade vi gjort det genom att varje gång data uppdateras sätta ett nytt värde för ett specifikt element i DOM'en.

```javascript
var data = 42;

document.getElementById("element").textContent = data;
```

I många ramverk är detta nått man försöker förenkla genom att uppdatera vyn direkt varje gång data ändras. Detta är en av de magiska sakerna med JavaScript ramverk och vi ska nedan se exempel på hur detta kan göras. I de flesta ramverken definierar vi medlemsvariabler i komponenter och vi kan sedan använda dessa medlemsvariabler i templates. I nedanstående exempel ser vi hur vi använder medlemsvariabler i Vue. Exemplet är tagit från exempelprogrammet `/calculator`.

```html
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
}
</script>
```

Om medlemsvariabeln `current` får ett nytt värde ändras den direkt i den kopplade template. I vanilla JavaScript gör vi en explicit koppling och uppdatering av data och i de ramverk som har valts ut är det en implicit koppling och uppdatering.



### Routing

I de flesta applikationer vill vi kunna gå mellan olika sidor och då är en router ett bra sätt att delegera och strukturera detta förfarande. I många fall av klient-sida routing använder man hashbang (#!) routing där de två tecknen #! används för att markera att detta är en route. Me-applikationerna som redovisas ovan använder alla någon form av routing.

I angular och mithril finns det inbyggda routers, i Angular importerar man ett paket och i mithril används funktionen `m.route()`. I react och vue installeras ytterligare paket `react-router-dom` och `vue-router`.

I angular (`app.module.ts`), mithril (`index.js`) och vue (`router/index.js`) definieras alla router i en JavaScript kontext och man använder sedan ett element för att visa de olika komponenter kopplat till routen. Filerna inom parentes är de filer där routerna är definierat i Me-applikationerna. I react anges router och vad som ska visas på de olika router i filen `App.js` med hjälp av JSX.

Ett exempel på en enkel router i vanilla JavaScript kan ses i me-vanilla exemplet där funktioner används för att skriva ut de enskilda vyerna.



### Eventhantering och delegering

JavaScript tillför det dynamiska lagret till webben och en stor del av detta är att hantera användarens klick, skrivande osv. I vanilla JavaScript sköter vi detta med EventListeners.

```javascript
document.getElementById("my-btn").addEventListener("click", function (event) {
    // do the thing needed when a button is clicked.
});
```

Ramverken försöker förenkla detta förfarandet genom att förkorta ner syntaxen för EventListeners. `/tic-tac-toe` exempelprogrammen är bra exempel både på Eventhantering och delegering och vi kan titta på hur detta lösas i de olika ramverk.

```html
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



### HTTP-anrop

För att vi ska kunna prata med en backend behöver vi kunna kommunicera över HTTP. Jag har valt att i react, vanilla och vue exemplen använda [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), som vi känner igen från tidigare. I många fall används ytterligare paket som till exempel [axios](https://www.npmjs.com/package/axios) för att kommunicera med en backend, vilket ökar komplexiteten och beroenden ytterligare. I mithril används den inbyggda funktionen `m.request()`, som introducerades tillsammans med mithril i kursen webapp. I angular använder vi oss av den inbyggda modulen HttpClient och en så kallad service. Exempel på detta kan ses i me-angular applikationen i katalogerna `src/app/report` och `src/app/me`.



### Command-Line-Interfaces

Till ramverken kan man använda olika CLI verktyg som kan hjälpa till när man ska skapa en applikation från början eller skapa olika delar av en applikation.



#### Angular

[Angulars CLI](https://angular.io/cli) heter `ng` och är det mest fullfjädrade CLI till dessa ramverk. Man kan göra oerhört mycket med det och det installeras med hjälp av:

```shell
$npm install -g @angular/cli
```

Och vi kan skapa ett nytt projekt och starta utvecklingsservern med hjälp av kommandona:

```shell
$ng new my-first-project
$cd my-first-project
$ng serve
```

Titta gärna igenom [dokumentationen](https://angular.io/cli) för att se alla valmöjligheter.



#### React

[React](https://github.com/facebook/create-react-app) har inte på samma sätt ett hårt kopplat CLI som till exempel Angular eller Vue. Dock kan `npx` scriptet `create-react-app` användas för att skapa boilerplate kod, installera paket och bygg-script för att komma igång snabbt. Här är kommandona för att komma igång med `create-react-app`.

```shell
$npx create-react-app my-app
$cd my-app
$npm start
```



#### Vue

[Vues CLI](https://cli.vuejs.org/) är som mycket annat i Vue inspirerad av Angular. Men som många andra delar ligger det mitt-i-mellan Angular och React. Det installeras och en applikation skapas med följande kommandon:

```shell
$npm install -g @vue/cli
$vue create my-project
$cd my-project
$npm run serve
```



## Editor-komponenter

Att skriva en egen text-redigerare för att användas på webben är ett eget 10-årigt projekt, så här tar vi som man brukar i JavaScript-världen en genväg. Exempel på textredigerare finns nedan:

[CKEditor](https://ckeditor.com/ckeditor-5/) - komponenter för [ramverken](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/overview.html)

[Quill](https://quilljs.com/) - [Angular](https://www.npmjs.com/package/ngx-quill), [React](https://github.com/zenoamaro/react-quill) och [Vue](https://github.com/surmon-china/vue-quill-editor).

[TinyMCE](https://github.com/tinymce/tinymce-dist#readme) - komponenter för [ramverken](https://www.tiny.cloud/docs/integrations/).

[Trix](https://trix-editor.org/) - finns även som komponenter till ramverken [Angular](https://www.npmjs.com/package/angular-trix), [React](https://www.npmjs.com/package/react-trix) och [Vue](https://www.npmjs.com/package/vue-trix).



## Driftsättning

Vi har än så länge visat upp våra än så länge ganska enkla editors med hjälp av ramverkens inbyggda webbservrar. Men för att de applikationer vi skapar med hjälp av ramverken ska få ett värde för andra än oss själva ska de självklart ut på internet och ha ett liv.

Vi har under utvecklingen av vår applikation använd oss av ett `start` eller `serve` kommando. Dessa kommandon bygger i botten på `webpack` och sedan en inbyggt webbserver som har använts för att visa upp filerna.

När vi ska driftsätta sker det på ett lite annat sätt. Alla ramverken har ett inbyggt `build` kommando som med hjälp av webpack packar ihop filerna till produktionsfiler och lägger dessa i en `dist/` eller `build/` katalog. Dessa filer kan vi sedan visa upp med en vanlig webbserver till exempel studentservern. Vi har tidigare använt `dbwebb`-kommandot för att publicera innehåll till studentservern. Vi ska nu titta på hur vi kan göra det med hjälp av `rsync`, som ligger till grund för mycket av `dbwebb publish`.



#### Angular

Angulars CLI ger oss möjlighet för att skapa produktionsfiler med kommandot `ng build` som kan anropas med `npm run build` i vårt projekt. `build` kommandot skapar en katalog `dist/projekt_namn/` som innehåller HMTL, CSS och JavaScript filer, samt lite annat smått och gott.

Om vi skickar upp denna katalogen till vår användares `www`-katalog på studentservern har vi driftsatt vår applikation. Vi kommer använda `rsync` för att kopiera upp filerna till studentservern. `-av` står för archive och verbose, så vi tar med kataloger och vi skriver ut vad som händer. `--delete` gör att vi tar bort filer på mottagersidan som inte finns lokalt.

```shell
$rsync -av --delete dist/projekt_namn/ AKRONYM@ssh.student.bth.se:www/editor
```

Om `rsync` inte hittar rätt ssh nyckel kan man testa med kommandot nedan där vi specificerar vilken nyckel vi vill använda.

```shell
$rsync -av --delete -e "ssh -i $HOME/.ssh/dbwebb.pub" dist/projekt_namn/ AKRONYM@ssh.student.bth.se:www/editor
```

Vi kan nu gå till `www.student.bth.se/~AKRONYM/editor` och se en vit sida. Detta beror på att filerna skapas med utgångspunkten att de ska driftsättas i en rot-katalog och inte som vi har gjort det i editor katalogen. Vi kan se till att vår sida kan driftsättas i editor-katalogen genom att skicka med `--base-href './'` till `ng build` kommandot så vårt kommando blir:

```shell
$ng build --prod --base-href './'
```

Vi kan förenkla flödet ytterligare genom att lägga till ett npm script som vi kan använda varje gång vi vill driftsätta.

```json
"scripts": {

  "deploy": "ng build --prod --base-href './' && rsync -av --delete build/ AKRONYM@ssh.student.bth.se:www/editor"

}
```



#### React

När vi skapade vår app med hjälp av `create-react-app` fick vi med ett `npm script` för att skapa produktionsfiler. Vi kan köra detta sciptet med `npm run build`. Scriptet skapar en katalog `build/` som innehåller HMTL, CSS och JavaScript filer, samt lite annat smått och gott.

Om vi skickar upp denna katalogen till vår användares `www`-katalog på studentservern har vi driftsatt vår applikation. Vi kommer använda `rsync` för att kopiera upp filerna till studentservern. `-av` står för archive och verbose, så vi tar med kataloger och vi skriver ut vad som händer. `--delete` gör att vi tar bort filer på mottagersidan som inte finns lokalt.

```shell
$rsync -av --delete build/ AKRONYM@ssh.student.bth.se:www/editor
```

Om `rsync` inte hittar rätt ssh nyckel kan man testa med kommandot nedan där vi specificerar vilken nyckel vi vill använda.

```shell
$rsync -av --delete -e "ssh -i $HOME/.ssh/dbwebb.pub" build/ AKRONYM@ssh.student.bth.se:www/editor
```

Vi kan nu gå till `www.student.bth.se/~AKRONYM/editor` och se en vit sida. Anledningen till detta är att React skapar `build`-katalogen med utgångspunkt i att den ska driftsättas i en rot-katalog och inte som vi har gjort det i editor katalogen. Vi kan använda oss av `homepage`-attributet i vår `package.json`. Vi sätter det till `"homepage": "."` vilket gör att de första raderna i min fil ser ut så här:

```json
{
  "name": "jsramverk-editor",
  "version": "0.1.0",
  "private": true,
  "homepage": ".",
  "dependencies": {

  }
}
```

Vi kan förenkla flödet ytterligare genom att lägga till ett npm script som vi kan använda varje gång vi vill driftsätta.

```json
"scripts": {

  "deploy": "npm run build && rsync -av --delete build/ AKRONYM@ssh.student.bth.se:www/editor"

}
```



#### Vue

Vues CLI ger oss möjlighet för att skapa produktionsfiler med kommandot  `npm run build` i vårt projekt. `build` kommandot skapar en katalog `dist/` som innehåller HMTL, CSS och JavaScript filer, samt lite annat smått och gott.

Om vi skickar upp denna katalogen till vår användares `www`-katalog på studentservern har vi driftsatt vår applikation. Vi kommer använda `rsync` för att kopiera upp filerna till studentservern. `-av` står för archive och verbose, så vi tar med kataloger och vi skriver ut vad som händer. `--delete` gör att vi tar bort filer på mottagersidan som inte finns lokalt.

```shell
$rsync -av --delete dist/ AKRONYM@ssh.student.bth.se:www/editor
```

Om `rsync` inte hittar rätt ssh nyckel kan man testa med kommandot nedan där vi specificerar vilken nyckel vi vill använda.

```shell
$rsync -av --delete -e "ssh -i $HOME/.ssh/dbwebb.pub" dist/projekt_namn/ AKRONYM@ssh.student.bth.se:www/editor
```

Vi kan nu gå till `www.student.bth.se/~AKRONYM/editor` och se en vit sida. Detta beror på att filerna skapas med utgångspunkten att de ska driftsättas i en rot-katalog och inte som vi har gjort det i editor katalogen. Vi kan se till att vår sida kan driftsättas i editor-katalogen genom att använda oss av [Vues konfigurationsfil](https://cli.vuejs.org/config/#global-cli-config) `vue.config.js`. Skapa filen i roten av ditt projekt med följande innehåll.

```javascript
module.exports = {
  publicPath: "./",
};
```

Vi kan förenkla flödet ytterligare genom att lägga till ett npm script som vi kan använda varje gång vi vill driftsätta.

```json
"scripts": {

  "deploy": "npm run build && rsync -av --delete dist/ efostud@ssh.student.bth.se:www/editor"

}
```



## Kravspecifikation

Nedan finns kravspecifikationen för veckans inlämningsuppgift:

1. Skapa grunden till vår editor.

1. Din applikation ska innehålla en text editor där man kan skriva text. Välj en editor-komponent ovan eller en annan om du har en personlig favorit.

1. Applikationen ska dessutom innehålla en toolbar längst upp på skärmen.

1. Toolbaren ska än så länge innehålla en Spara-knapp. När man trycker på knappen ska innehållet från editorn skrivas ut i consollen. Spara-knappen behöver alltså inte ligga som en del av editorn.

1. Committa alla filer och lägg till en tagg (1.0.\*).

1. Pusha upp repot till GitHub, inklusive taggarna.

1. Länka till ditt GitHub repo och till din editor på studentservern i en kommentar till din inlämning på Canvas.



## Sammanfattning

Vi har nu skrapat ytan på JavaScript ramverken Angular, Mithril, React och Vue, samt jämfört ramverken med vanilla JavaScript. Vi avslutar denna vecka med en video där den tidigare BDFL för [django](https://www.djangoproject.com/) pratar om hur vi inte alltid behöver ett JavaScript ramverk.

<div class='embed-container'><iframe src="https://www.youtube.com/embed/k7n2xnOiWI8" frameborder="0" allowfullscreen></iframe></div>



## Skriva

Ni får i denna kursen möjlighet för att träna på akademiskt skrivande och förbereda inför en studie/exjobb. Denna delen av kursen är optionell och enbart tänkt som en hjälp inför kommande exjobb.

Vi kommer i vecka 1 & 2 fokusera på forskningsfrågor. Vi kommer använda oss av en iterativ process för att förbättra vårt akademiska skrivande inför kommande exjobb, som avslutar och sammanfattar utbildningen.

Forskningsfrågor skapar grunden för studien och är de frågor vi söker svar på i studien. All forskning och den vetenskapliga metoden handlar i grunden om att ställa intressanta frågor och sedan på ett metodiskt och reproducerbart sätt jobba fram svaren till dessa frågor. Viktigt med forskningsfrågor är att de är avgränsade, inte är ja/nej frågor och att de är mätbara. Sen är det viktigt att de två forskningsfrågorna är inom samma område. Vi kan inte ha en fråga om testning och en om JavaScript-ramverk, det är för brett ett område och vi vill försöka avgränsa och fokusera vår studie.

Biblioteket vid BTH och tre andra högskolor och universitet i Sverige utvecklar tillsammans [skrivguiden.se](http://skrivguiden.se/). Här finns bra tips på struktur, vad de olika delar av en akademisk text ska innehålla och hur man skriver akademiskt. Använd [skrivguiden.se](http://skrivguiden.se/) som en referens under kursen, titta på guiden översiktligt denna veckan och återkom till guiden under kursens gång. Första 4 veckorna är speciellt "[Syfte, problemformulering och forskningsfrågor – att begränsa ämne](http://skrivguiden.se/skriva/skrivprocessen/#syfte)" ett bra ställe att titta i guiden.

Denna första veckan formulerar du två stycken forskningsfrågor. Frågorna ska ligga inom de ämnen som du ska skriva ditt kommande exjobb inom, dvs. programvaruteknik, datavetenskap eller webbprogrammering. Så ni kan basera frågorna runt mycket av det vi har gått igenom i utbildningen. Exempel på hur man formulerar bra forskningsfrågor kommer visas på föreläsningen. Se till att numrera forskningsfrågorna med titeln RQ1 för research question 1.

Se forskningsfrågorna som ett första utkast denna veckan, du får möjlighet att förbättra frågorna kommande veckan.

**Lämna in dina frågor som en del av inlämningen på Canvas.**
