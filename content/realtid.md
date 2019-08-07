# Realtid

<div class="under-construction" id="under-construction">
    <div class="under-construction-text">
        <p><strong>Uppdatering</strong></p>
        <p>Denna inlämningsuppgift uppdateras och kravspecifikation samt material kan ändras.</p>
    </div>
</div>

Vi tittar på hur vi kan använda websockets för realtidsprogrammering på webben.



## Läsa

Läs igenom nedanstående dokumentation översiktligt och spara de för referens under arbetet.

1. [websocket modulen ws](https://github.com/websockets/ws) är en websocket server som använder rena (_native_) WebSockets.

2. [MDN WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) ger dig material för klientsidan samt bakomliggande information om hur man bygger en server från grunden.

3. [socket.io](https://socket.io/) är en introduktion till en modul som implementerar websockets (och närliggande tekniker) för realtid i klient och server.



## Material och tekniker

HTML5 Websockets skapar nya möjligheter där webbläsaren kan ha en konstant uppkoppling mot en server där meddelanden både kan skickas och tas emot med minimal overhead. Möjligheten öppnar sig för att bättre bygga webbapplikationer som agerar i realtid.

Det finns en W3C standard för [The Websocket API](https://www.w3.org/TR/websockets/), det ger grunden till vad utvecklare av webbläsare och liknande behöver förhålla sig till.

Om man vill se detaljer om Websocket protokollet så finns en [RFC 6455](https://tools.ietf.org/html/rfc6455) som beskriver protokollet och hur klienten och servern kopplar upp sig, sköter kommunikationen och stänger ned kopplingen.

För att se guider med exempelkod för både klient och servrar implementerade i olika språk så vänder vi oss till [MDN WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

Vi kommer denna vecka främst använda [socket.io](https://socket.io/) för realtidskommunikation. Till grund för detta paketet finns grund implementationen av websocket. I artikeln [Realtidsprogrammering med paketet ws](realtid-med-ws) beskrivs hur man kan använda paketet ws för realtidskommunikation. Läs igenom artikeln för ytterligare information om websockets och se exempel på hur man kan implementera realtidsprogrammering utan socket.io.



<h2>socket.io</h2>

[socket.io](https://socket.io/) är ett paket för _"real-time, bidirectional and event-based communication"_ och underlättar processen för att skapa och driftsätta tjänster med realtidskommunikation. Vi ska i följande avsnitt bekanta oss med både server och klient implementationer av en chatt med websocket kommunikation.

Exempelkod för både server och klienter finns under `/socket` i GitHub-repot [emilfolino/jsramverk](https://github.com/emilfolino/jsramverk).



#### Server

socket.io [server API dokumentationen](https://socket.io/docs/server-api/) är en bra start för att bekanta sig med vilket API socket.io servern exponerar.

Vi vill skapa en socket.io server i express kontext och därför börjar vi med att skapa en katalog och ett npm projekt. I detta projektet installerar vi express och socket.io.

```shell
$mkdir socket-server
$cd socket-server
$npm init --yes
$npm install --save express socket.io
$touch app.js
```

Vi instantierar sedan app objektet i express och kopplar socket.io till app objektet. Än så länge ser vi till att bara

```javascript
// app.js
const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.on('connection', function () {
    console.info("User connected");
});

server.listen(3000);
```

Starta servern med kommandot `node app.js` och sen tar vi en titt på hur vi med hjälp av en klient kan koppla oss mot servern.



#### Klient

socket.io [klient API dokumentationen](https://socket.io/docs/client-api/) är en bra start för att bekanta sig med vilket API socket.io klienten exponerar.

Vi skapar en ny katalog på samma nivå som socker-server katalogen och installerar socket.io-client npm-paketet. Vi installerar även webpack för att kunna packa ihop filerna.

```shell
$mkdir socket-client
$cd socket-client
$npm init --yes
$npm install --save socket.io-client
$npm install --save-dev webpack webpack-cli
$touch client.js index.html webpack.config.js
```

Som det sista skapar vi tre filer. I `index.html` skapar vi grunden för webbplats med följande HTML. Observera att vi inkluderar JavaScript filen `dist/bundle.js`, som skapas med hjälp av webpack.

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Websocket chatt</title>
</head>
<body>
    <h1>Websocket chatt</h1>

    <script type="text/javascript" src="dist/bundle.js"></script>
</body>
</html>
```

Webpack konfigurationen är enkel och det enda vi gör i den är att specificera `entry` och `output`.

```javascript
module.exports = {
    entry: "./client.js",
    output: {
        filename: "bundle.js"
    }
};
```

I `client.js` importerar vi `socket.io-client` och skapar en `socket` instans, som är kopplat mot localhost. Per automatik kopplas den mot port 3000, men vi kan ange en villkorlig port. Vi använder sedan två stycken socket.io-client event `connect` och `disconnect` för att än så länge skriva ut status för förbindelsen till servern till konsollen.

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost');

socket.on('connect', function() {
    console.info("Connected");
});

socket.on('disconnect', function() {
    console.info("Disconnected");
});
```

Om vi bundlar ihop JavaScript filen med hjälp av npm-skriptet `"start": "webpack -d"` och öppnar `index.html` i en webbläsare ska vi i konsollen nu kunna se _Connected_. Om du inte ser detta, kolla så att servern ligger och snurrar.



## Kravspecifikation

1. Skapa en klient och en server för chatt.

1. Integrera klienten i ditt valda ramverk som en del av din me-sida. Kolla om det finns paket eller integrationer i ditt ramverk som stödjer websockets eller socket.io.

1. Gör ett medvetet val om chatt backend ska ligga som egen driftsatt server med egen domän eller som en del av me-api:t.

1. När man kopplar upp sig så identifierar man sig med ett nick, ett smeknamn.

1. Flera klienter kan koppla sig till chatten. När någon skriver något ser alla andra det. Man ser nicket tillsammans med meddelandet.

1. Committa, tagga och pusha relevanta repon samt driftsätta på din server.

1. Länka till GitHub repon och driftsatta klienten i din inlämning på Canvas.



## Skriva
