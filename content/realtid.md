# Realtid

<p class="author">Emil Folino</p>

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

I `client.js` importerar vi `socket.io-client` och skapar en `socket` instans, som är kopplat mot localhost på port 3000. Vi använder sedan två stycken socket.io-client event `connect` och `disconnect` för att än så länge skriva ut status för förbindelsen till servern till konsollen.

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', function() {
    console.info("Connected");
});

socket.on('disconnect', function() {
    console.info("Disconnected");
});
```

Om vi bundlar ihop JavaScript filen med hjälp av npm-skriptet `"start": "webpack -d"` och öppnar `index.html` i en webbläsare ska vi i konsollen nu kunna se _Connected_. Om du inte ser detta, kolla så att servern ligger och snurrar.

Men ett meddelande i konsollen kommer vi inte så långt med. Så låt oss skapa möjlighet för att kunna skicka ett meddelande till servern. Vi skapar ett input fält och ett element där vi senare kan lägga till meddelanden som har skickats till servern och tillbaka ut till klienten.

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Websocket chatt</title>

    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <h1>Websocket chatt</h1>

    <h2>Messages:</h2>
    <div id="all-messages" class="all-messages"></div>

    <p><strong>Write new message:</strong></p>
    <input id="new-message" class="new-message" value=""/>


    <script type="text/javascript" src="dist/bundle.js"></script>
</body>
</html>
```

Vi lägger även till lite CSS för att få chatten till att se lite trevligare ut.

```css
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto Mono', monospace;
    font-size: 1.8rem;
    margin: 2rem auto;
    width: 60%;
}

.all-messages {
    width: 100%;
    height: 30vh;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 2rem;
}

.all-messages p:nth-child(2n) {
    background-color: #ccc;
}

.new-message {
    width: 100%;
    height: 5vh;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 2rem;
    font-size: 1.8rem;
}
```

Vi kopplar sedan ett event till händelsen `keyup` för input fältet. När vi trycker på enter i det fältet vill vi att meddelandet som just nu är skrivit i fältet skickas till servern. Vi vill bara att meddelandet ska skickas när vi är uppkopplade mot servern och därför lägger vi event hanteraren inuti vårt connect anrop. Notera att vi ger det data vi skickar ett namn `'chat message'` och skickar med värdet från fältet.

```javascript
const newMessage = document.getElementById("new-message");

...

socket.on('connect', function() {
    newMessage.addEventListener("keyup", function (event) {
        if (event.code === "Enter") {
            socket.emit('chat message', event.target.value);
            event.target.value = "";
        }
    });
});
```

#### Tillbaka till servern

På servern använder vi sedan eventet `socket.on('chat message')` för att ta emot meddelandet från klienten. För enkelhetens skull skickar vi sedan tillbaka meddelandet till samtliga uppkopplade klienter, inklusive den klienten som skickade meddelandet, med hjälp av `emit` funktionen. Nedan syns koden för servern i sin helhet.

```javascript
const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.info("User connected");

    socket.on('chat message', function (message) {
        io.emit('chat message', message);
    });
});

server.listen(3000);
```



#### Visa nya meddelanden i klienten

En chatt är inte till mycket nytta om vi inte ser vad de andra klienter skriver. Så varje gång vi får ett meddelande från servern vill vi skriva ut detta. Vi gör detta med eventet `socket.on('chat message')` där meddelandet är skickat med som data till callbacken för eventet. Vi lägger sedan till meddelandet i elementet som visar upp alla meddelanden. Nedan syns koden för klienten i sin helhet.

```javascript
import io from 'socket.io-client';

const newMessage = document.getElementById("new-message");
const allMessages = document.getElementById("all-messages");

const socket = io('http://localhost:3000');

socket.on('connect', function() {
    socket.on('chat message', function (message) {
        let addedMessage = document.createElement("p");

        addedMessage.textContent = message;

        allMessages.appendChild(addedMessage);
    });

    newMessage.addEventListener("keyup", function (event) {
        if (event.code === "Enter") {
            socket.emit('chat message', event.target.value);
            event.target.value = "";
        }
    });
});

socket.on('disconnect', function() {
    console.info("Disconnected");
});
```



#### Driftsättning

När vi vill driftsätta vår server och klient ändrar vi de URL'er vi vill koppla oss mot.

I klienten ändrar vi från `localhost:3000` till en fast URL där du vill driftsätta på servern.

```javascript
const socket = io('https://socket-server.jsramverk.me');
```

Vi kan sedan driftsätta klienten med samma typ av konfiguration som frontend appen i vecka 3. Så här ser min konfiguration ut på `https://socket-client.jsramverk.me`.

```bash
server {
        root /var/www/socket-client.jsramverk.me/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name socket-client.jsramverk.me;

        charset utf-8;

        error_page 404 /index.html;

        location / {
        }

        listen 80;
}
```

Och använder liknande rsync skript för att skicka upp till servern som i [Driftsättning av frontend](https://jsramverk.me/deploy-frontend#driftsattning-av-frontend).

I server appen måste vi tillåta inkommande trafik från `https://socket-client.jsramverk.me:443` för att klienten ska kunna kommunicera med servern. Det gör vi genom raden `io.origins(['https://socket-client.jsramverk.me:443']);`, nedan syns hela min server.


```javascript
const express = require('express');
const app = express();


const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.origins(['https://socket-client.jsramverk.me:443']);

io.on('connection', function (socket) {
    console.info("User connected");

    socket.on('chat message', function (message) {
        io.emit('chat message', message);
    });
});

server.listen(8300);
```

Vi behöver sedan konfigurera nginx på liknande sätt som vårt API från tidigare i kursen. Nedan syns min konfiguration.

```bash
server {
    server_name socket-server.jsramverk.me;

    location /.well-known {
        alias /var/www/socket-server.jsramverk.me/html/.well-known;
    }

    location / {
        proxy_pass http://localhost:8300;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 80;
}
```

Vi kör igång servern med kommandot `pm2 start app.js --name socket-server` notera att servern i mitt fall lyssnar på port 8300. Som avslutning hämtar vi hem certifikat så vi kan köra över https med kommandot `sudo certbot --nginx`.



## Exempelprogram

I kursrepot finns ett exempel `simulate-prices` som använder sig av `socket.io` för att visualisera simulerade priser på kakor. Detta är ett annat exempel på hur man kan använda realtidsprogrammering för annat än det klassiska chatt exemplet.

I exempelprogrammet skapar vi både en server och en klient för att kommunicera över websockets. Servern broadcaster sedan priserna för de olika kakorna var 5:e sekund och klienterna kan sedan fånga upp priserna. I filen `stock.js` används en [Wiener-process](https://en.wikipedia.org/wiki/Wiener_process) för att simulera priserna på kakorna. En Wiener-process är det närmaste vi kommer att kunna simulera aktiekurser matematisk.

För att visualisera priserna används en graf modul kallad `Rickshaw`. Graferna visar realtidsdata med hjälp att rita ut en SVG bild.

Titta igenom exemplet och se hur `socket.io` kan användas för annat än en chatt. Titta speciellt noga på hur servern och klienterna kommunicerar med hjälp av JSON data. Detta kan vara mycket användbart i veckans inlämningsuppgift.



## Kravspecifikation

1. Skapa en klient och en server för chatt.

1. Integrera klienten i ditt valda ramverk som en del av din me-sida. Kolla om det finns paket eller integrationer i ditt ramverk som stödjer websockets eller socket.io.

1. Gör ett medvetet val om chatt backend/server ska ligga som egen driftsatt service med egen domän eller som en del av me-api:t.

1. När man kopplar upp sig så identifierar man sig med ett nick, ett smeknamn.

1. Flera klienter kan koppla sig till chatten. När någon kopplar upp sig i chatten skicka ett meddelande om detta till alla uppkopplade klienter.

1. När någon skriver något ser alla andra det. Man ser nicket och tiden för meddelandet tillsammans med meddelandet.

1. Committa, tagga och pusha relevanta repon samt driftsätta på din server.

1. Länka till GitHub repon och driftsatta klienten i din inlämning på Canvas.



## Skriva

Vi fortsätter iterativt med att förbättra vårt akademiska skrivande. Använd den återkopplingen du fick på förra veckans text och förbättra din forskningsfråga och metod.

Gå tillbaka till skrivguiden och titta under [metod](http://skrivguiden.se/skriva/uppsatsens_delar/#metod) för bra tips.

**Lämna in texten som PDF bilaga till din inlämning på Canvas.**
