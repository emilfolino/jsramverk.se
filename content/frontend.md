# Frontend

Vi utvärderar frontend ramverk och skapar en me-applikation i det JavaScript ramverk du valde.

## Läsa

Följande länkar är bra att ha för undersökande och implementation.

1. [Angular](https://angular.io/) ger dig en översikt och där hittar du dokumentationen som du vill läsa igenom.

1. [Mithril](https://mithril.js.org/) ger dig en översikt och där hittar du dokumentationen som du vill läsa igenom.

1. [React](https://reactjs.org/) ger dig en översikt och där hittar du dokumentationen som du vill läsa igenom.

1. [Vue](https://vuejs.org/) ger dig en översikt och där hittar du dokumentationen som du vill läsa igenom.



## Titta

I nedanstående video berättar John Papa om hur man kan tänka när man väljer ett JavaScript-ramverk.

<div class='embed-container'><iframe src="https://www.youtube.com/embed/dHptnyroFNA" frameborder="0" allowfullscreen></iframe></div>



## Material och tekniker

#### Rader skriven kod i exempelprogrammen {#loc}

I kursrepots exempel katalog finns två olika exempel program skrivna med hjälp av de fem ovannämnda teknikerna. I `example/tic-tac-toe` finns ett luffarschack implementerad med möjlighet att hoppa tillbaka i spelets historik. I `example/calculator` är en simpel miniräknare implementerad.

Dessutom finns det samma Me-sida som konsumerar me-api:t från tidigare kursmoment implementerad i de 5 olika teknikerna. [GitHub repon](https://github.com/emilfolino?utf8=%E2%9C%93&tab=repositories&q=me-&type=&language=) för dessa 5 Me-sidor samt me-api:t finns tillgängligt. Dessa är även driftsatta på `me-{angular,mithril,react,vanilla,vue}.jsramverk.me`.

Först tar vi en titt på antal rader som utvecklaren behöver skriva i dessa små exempelprogram och hur stora produktionsfilerna för dessa exempelprogram är.

I nedanstående tabell listas de rader kod som utvecklaren har skrivit för att implementera exempelprogrammen. De rader som är räknade är enbart de rader som innehåller källkod, så rader med kommentarer och tomma rader är borttagna.

|  | Angular | Mithril | React | Vue | Vanilla JS |
|-----|--------|--------|--------|---------|--------|
| calculator  | 112 | 103 | 133 | 98 | 118 |
| me   | 166 | 107 | 117 | 134 | 92 |
| tic-tac-toe | 196 | 136 | 146 | 172 | 126 |



#### Storlek produktionsfil(er) {#filesize}

I nedanstående tabell listas storleken på produktionsfilerna som skapas av antingen bygg verktyget i ramverket, webpack eller uglify. Filstorlekar är utskrivna med hjälp av kommandot `ls -lh` i ett bash-skal.

|  | Angular | Mithril | React | Vue | Vanilla JS |
|-----|--------|--------|--------|---------|--------|
| calculator  | 217K | 30K | 115K | 83K | 2.6K |
| me   | 329K | 29K | 134K | 106K | 2.2K |
| tic-tac-toe | 222K | 29K | 37K | 87K | 2.8K |




Vi tittar i denna del av artikeln på några tekniska koncept som används i de olika ramverken. Vi tittar på hur man har vald att implementera dessa koncept i de olika ramverken och utvärderar vilka fördelar och nackdelar som finns med att göra på det viset.


### Komponenter {#komponenter}

De fyra ramverk som har valts ut i denna artikel är alla byggda runt komponenter. Komponenter är återanvändbara delar av koden, som i bästa fall inte har några externa beroenden.

I mithril och React är allt JavaScript och komponenterna definieras i JavaScript filer. I mithril är enda kravet att det ska finnas en `view` funktion som returnerar noder. I React heter funktionen `render` och funktionen returnerar JSX. I Vue finns varje komponent i en fil men är uppdelade i tre delar `template`, `script` och `style`, som motsvarar de tre lagren vi känner till från tidigare med struktur (HTML), stil (CSS) och dynamik (JavaScript). I angular har man tagit det ett steg längre med tre olika filer för dessa tre lager.



### Länkning av data {#linking}

Vi vill i många applikationer och speciellt i applikationer där data uppdateras ofta länka data i våra modeller till representationen i en vy. I vanilla JavaScript hade vi gjort det genom att varje gång data uppdateras sätta ett nytt värde för ett specifikt element i DOM'en.

```javascript
var data = 42;

document.getElementById("element").textContent = data;
```

I många ramverk är detta nått man försöker förenkla genom att uppdatera vyn direkt varje gång data ändras. Detta är en av de magiska sakerna med JavaScript ramverk och vi ska nedan se exempel på hur detta kan göras. I de flesta ramverken definierar vi medlemsvariabler i komponenter och vi kan sedan använda dessa medlemsvariabler i templates. I nedanstående exempel ser vi hur vi använder medlemsvariabler i Vue.

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



## Kravspecifikation

## Skriva
