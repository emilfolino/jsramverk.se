# GraphQL

<p class="author">Emil Folino</p>

Denna veckan tittar vi på hur vi kan använda GraphQL som ett lager framför vårt REST-API.



## Titta

#### Kort introduktion till GraphQL

<div class='embed-container'><iframe src="https://www.youtube.com/embed/eIQh02xuVw4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



#### Längre kodexempel i Express

Exempelkod till nedanstående video finns på [GitHub](https://github.com/WebDevSimplified/Learn-GraphQL).

<div class='embed-container'><iframe src="https://www.youtube.com/embed/ZQL7tL2S0oQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



## Material och tekniker



### GraphQL i backend

[Kursrepot](https://github.com/emilfolino/jsramverk) har uppdaterats med ett nytt exempel [graphql](https://github.com/emilfolino/jsramverk/tree/master/graphql). Gör en `git pull` för att ladda ner senaste. Är exempelkoden från detta exemplet som förklaras nedan.



### GraphQL i frontend

Vi kan hämta data från en GraphQL kan vi göra det med våra vanliga verktyg för att hämta data. Till exempel `fetch`, `axios` eller services i Angular. Det kan se ut på följande sätt när vi vill hämta alla kursers namn från graphql-servern i exempelkoden ovan.

```javascript
fetch('/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({query: "{ courses { name } }"})
})
    .then(r => r.json())
    .then(data => console.log('data returned:', data));
```

Om man vill ha en mer fullständig GraphQL-klient att använda kan [Relay](https://relay.dev/) för React eller [Apollo-client](https://www.apollographql.com/docs/react/#community-integrations) som finns för Angular och Vue.



## Kravspecifikation

1. Implementera ett GraphQL schema för ditt API.

1. Din frontend bör använda GraphQL för minst en (1) del av ditt gränssnitt.

1. Committa och tagga dina repon med 5.0.0 och 6.0.0 eller senare, ladda upp till GitHub och driftsätt.

1. Länka till båda dina GitHub repon och den driftsatta klienten i en kommentar till din inlämning på Canvas.



## Skriva

Vi fortsätter iterativt med att förbättra vårt akademiska skrivande. Använd den återkopplingen du fick på förra veckans metodbeskrivning och förbättra beskrivningen.

Gå tillbaka till skrivguiden och titta under [metod](http://skrivguiden.se/skriva/uppsatsens_delar/#metod) för bra tips.

**Lämna in texten som PDF bilaga till din inlämning på Canvas.**
