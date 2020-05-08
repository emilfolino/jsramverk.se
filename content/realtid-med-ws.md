# Realtidsprogrammering med paketet ws

<p class="author">Emil Folino, Mikael Roos</p>

Vi skall se hur JavaScript och Websockets kan kombineras till något som motsvarar realtidsprogrammering i webbsammanhanget.

Vi ser koden som krävs för att sätta upp en klient och en server som utför echo och broadcast. Det ger oss en grund att stå på. Som server använder vi en inbyggd HTTP-server, en standalone websocket server och applikationsservern Express.



#### Förkunskaper

Du kan grunderna i JavaScript på klient och server samt har tillgång till en labbmiljö med Node, npm och Express.

Exempelprogram ligger i kursrepot för [ramverk2 under `example/websocket`](https://github.com/dbwebb-se/ramverk2/tree/master/example/websocket).



#### En echo-server

Det finns ett exempel av en [echo-server](http://demos.kaazing.com/echo/) som använder sig av websockets. Pröva den så ser du klienten koppla upp sig till servern och sedan kan man skicka ett meddelande. Servern skickar tillbaka samma meddelande, som en ekande-server, en echo-server.

<img src="https://dbwebb.se/image/snapht17/kaazing-echo-server.png?w=w2""altesta konceptet av en echo-server med websockets.">

Du kan även pröva att koppla upp dig mot en annan echo-server som finns på `ws://dbwebb.se:1337/`. Pröva att det fungerar på samma sätt och att klienten du använder fungerar även mot en annan server.



## En klient i webbläsaren

Tanken är att vi bygger upp en egen klient och en egen server, för att se vilka delar som behövs och för att testa hur saker fungerar.

Låt se vilken kod som behövs för att sätta upp en server och en klient motsvarande en echo-server. Vi börjar med klienten i webbläsaren. I kursrepot under `example/websocket/connect` finns sidan `client.html` som är grunden till en klient.

<img src="https://dbwebb.se/image/snapht17/websocket-client.png?w=w2" alt="En klient som kan koppla upp sig mot en server via websocket.">

Klienten kan bara göra en uppkoppling, den kan inte skicka eller ta emot några meddelanden. Men det är en start.

Då skall vi använda klienten.



#### Klient websocket connect

För att se vad som händer när du trycker på "Connect" så öppnar du devtools och kikar i flikarna "Console" och "Networks".

Bekanta dig med hur det ser ut i olika webbläsare. Här ser du Firefox och Chrome.

<img src="https://dbwebb.se/image/snapht17/websocket-connect-firefox.png?w=w2" alt="Firefox visar detaljer i Console när uppkopplingen sker för websockets.">

<img src="https://dbwebb.se/image/snapht17/websocket-connect-chrome.png?w=w2" alt="Chrome visar detaljer i Console när uppkopplingen sker för websockets.">

Vi kan se vad som händer i Consolen, dels saker som vi själva skriver ut men även detaljer som webbläsaren kan välja att skriva ut (Firefox).

Du kan också se hur uppkopplingen för en websocket ser ut under fliken "Networks".

<img src="https://dbwebb.se/image/snapht17/websocket-connect-firefox-network.png?w=w2" alt="Firefox i fliken Networks vid uppkoppling för websockets.">

<img src="https://dbwebb.se/image/snapht17/websocket-connect-chrome-network.png?w=w2" alt="Chrome i fliken Networks vid uppkoppling för websockets.">

Det du ser är status 101 "Switching Protocols" för själva requesten som görs vid uppkopplingen av websocketen.

Om du klickar på requesten så ser du detaljer om dess header information. Det du ser (bilder nedan) är att webbläsaren gör en request header för att uppgradera protokollet mot servern till "websocket". Servern svarar om den accepterar uppgraderingen. I dessa fallen gick det bra.

<img src="https://dbwebb.se/image/snapht17/websocket-upgrade-firefox.png?w=w2" alt="Firefox visar hur request och response header innehåller detaljer om uppgradering till protokoll websocket.">

<img src="https://dbwebb.se/image/snapht17/websocket-upgrade-chrome.png?w=w2" alt="Chrome visar hur request och response header innehåller detaljer om uppgradering till protokoll websocket.">

När webbläsaren, eller webappen, kopplar upp sig sker det alltså via HTTP-protokollet och webbläsaren ber att få uppgradera protokollet till websocket. Servern svarar om det går bra. Därefter är uppkopplingen etablerad och övrig kommunikation sker över websocket.



#### Connect på klientsidan

Låt kika på koden som behövs i klienten för att göra en uppkoppling till servern.

HTML-sidan `client.html` innehåller endast en knapp och ett inputfält.

```html
<!doctype html>
<meta charset="utf-8">
<title>HTML5 websockets</title>

<h1>Websockets</h1>
<h2>Connect</h2>
<p>You may connect to any server out there, try any of these:</p>
<ul>
    <li><code>ws://dbwebb.se:1337/echo</code></li>
    <li><code>ws://demos.kaazing.com/echo</code></li>
    <li><code>ws://localhost:1337/</code> (if you have your own server)</li>
</ul>
<p>Open up devtools and see the output in the console and network tab.</p>

<input id="url" value="ws://dbwebb.se:1337/echo" style="width: 30em;"/>
<button id="connect">Connect</button>

<script src="client.js"></script>
```

Själva koden för att sätta igång kopplingen och hålla den levande finns i filen `client.js` och där används det inbyggda objektet `WebSocket` ([MDN WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)) som erbjuder ett API för att jobba med websockets i webbläsaren.

```javascript
/**
 * To setup a websocket connection, and nothing more.
 */
(function () {
    "use strict";

    let websocket;
    let url     = document.getElementById("url");
    let connect = document.getElementById("connect");

    connect.addEventListener("click", function(/*event*/) {
        console.log("Connecting to: " + url.value);
        websocket = new WebSocket(url.value);

        websocket.onopen = function() {
            console.log("The websocket is now open.");
        };
    }, false);
})();
```

Det viktiga i koden rör `new WebSocket()` där vi skapar ett nytt objekt för vår websocket-koppling. Själva uppkopplingen sker i samband med att objektet skapas. Till detta objekt kopplar vi en eventhanterare som anropas när uppkopplingen är utförd.



#### Klient skicka och ta emot

Vi bygger vidare på vår klient så att den kan koppla upp sig, koppla ned sig och skicka samt ta emot meddelanden från en echo-server. Det finns ett färdigt exempelprogram i `example/websocket/echo` där `client.html` är klienten för webbläsaren. Formuläret är utökat och själva koden som hanterar websocket finns i `client.js`.

Så här kan det se ut i klienten när du kopplar upp dig, skickar ett meddelande och avslutar uppkopplingen.

<img src="https://dbwebb.se/image/snapht17/websocket-echo-client.png?w=w2" alt="En session mot en echo-server.">

Låt oss titta på grundstrukturen över hur vi använder `WebSocket`.

```javascript
/**
 * What to do when user clicks Connect
 */
connect.addEventListener("click", function(/*event*/) {
    websocket = new WebSocket(url.value);

    websocket.onopen = function() {
        console.log("The websocket is now open.");
    };

    websocket.onmessage = function(event) {
        console.log("Receiving message: " + event.data);
    };

    websocket.onclose = function() {
        console.log("The websocket is now closed.");
    };
}, false);
```

Vi har tre eventhanterare i form av `onopen`, `onclose` och `onmessage`. Eventhanteraren `onmessage` anropas när vi tar emot ett meddelande från servern. Eventet `onclose` sker när uppkopplingen kopplas ned.

När vi skickar ett meddelande löses det av följande kod.

```javascript
/**
 * What to do when user clicks to send a message.
 */
sendMessage.addEventListener("click", function(/*event*/) {
    let messageText = message.value;

    if (!websocket || websocket.readyState === 3) {
        console.log("The websocket is not connected to a server.");
    } else {
        websocket.send(messageText);
        console.log("Sending message: " + messageText);
    }
});
```

Vi har en knapp i HTML formuläret som initierar att ett meddelande skickas när man klickar på knappen. Först kontrollerar vi att websocketen är öppen och sedan skickas meddelandet.

En websocket har enligt WebSocket API följande _ready states_ som visar status på en specifik websocket.

```javascript
// ready state
const unsigned short CONNECTING = 0;
const unsigned short OPEN = 1;
const unsigned short CLOSING = 2;
const unsigned short CLOSED = 3;
```

För att stänga en websocket gör vi `websocket.close()` och klienten har i formuläret en knapp som aktiverar att websocketen stängs.

Detta är grunderna i hur websockets fungerar i klienten. Öppna, skicka meddelande, ta emot meddelande och stäng uppkopplingen.



## En server för connect

Då kikar vi på hur server-delen kan se ut. Vi börjar med ett par varianter av servrar som enbart kan koppla upp sig. Exempelkoden för servrarna ligger i `example/websocket/connect`.



#### Programvara för websocket serverside

Vi behöver en extern modul för att lösa implementationen av serverdelen av WebSocket. För detta syfte använder jag [npm-modulen ws](https://www.npmjs.com/package/ws) som är en av de mer populära WebSocket implementationerna för native websocket. Du kan läsa dokumentationen på [GitHub för `websocket/ws`](https://github.com/websockets/ws).

Installera med npm.

```shell
$npm install ws
```

I exempelkatalogen finns en `package.json` så du kan installera allt som behövs till exemplet via `npm install`.

Du startar en server med `npm start` eller valfri server genom att ange dess fil med till exempel `node server.js` för standardservern.



#### Standalone websocket server

Det finns flera servrar i katalogen `example/websocket/connect` och vi tittar på koden till samtliga då de visar oss alternativa vägar för att sätta upp en websocket server.

Först har vi en standalone server som implementeras via modulen ws.

```javascript
/**
 * Minimal standalone websocket server to answer on a connect.
 */
"use strict";

const port = process.env.DBWEBB_PORT || 1337;
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: port });

wss.on("connection", (socket) => {
    console.log("Connection received: " + socket);
    //console.log(socket);
});

console.log(`Server is listening on ${port}`);
```

Vi startar upp servern och kopplar eventhanterare till den då en uppkoppling tas emot. Om vi använder någon av de klienter vi har tillgång till så bör vi se en utskrift för varje uppkoppling som sker. Utskriften ser du i terminalen.



#### Node HTTP-server

I Node finns en inbyggd HTTP-server som kan fungera likt en webbserver. Koden för att använda en sådan kan se ut så här (`example/websocket/connect/server-http.js`).

```javascript
/**
 * Minimal Node builtin HTTP-server.
 */
"use strict";

const port = process.env.DBWEBB_PORT || 1337;
const http = require("http");
const server = http.createServer((request, response) => {
    console.log("Webserver received: " + request.url);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
});

server.listen(port, (err) => {
    if (err) {
        return console.log("Something bad happened", err);
    }

    console.log(`Server is listening on ${port}`);
});
```

Kanske vill vi inte enbart att servern skall prata websockets utan även svara på vanliga HTTP-requester och kanske till och med husera klienten som används.

I vårt exempel så svarar servern alltid "Hello World", oavsett vilken route vi använder.

<img src="https://dbwebb.se/image/snapht17/node-httpd-server.png?w=w2" alt="Den inbyggda webbservern svarar alltid Hello World.">

Då tittar vi hur vi kan kombinera en websocket server med en HTTP-server.



#### HTTP och websocket server

Vi ser hur vi kan kombinera en server för både HTTP och websocket, genom att använda Nodes inbyggda HTTP-server tillsammans med modulen ws. Exempelkoden ligger i `example/websocket/connect/server-ws-http.js`.

```javascript
/**
 * Websocket and node builtin httpd server.
 */
"use strict";

const port = process.env.DBWEBB_PORT || 1337;
const http = require("http");
const server = http.createServer((request, response) => {
    console.log("Webserver received: " + request.url);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
});

const WebSocket = require("ws");
const wss = new WebSocket.Server({
    server: server
});

wss.on("connection", (socket) => {
    console.log("Connection received: " + socket);
    //console.log(socket);
});

server.listen(port, (err) => {
    if (err) {
        return console.log("Something bad happened", err);
    }

    console.log(`Server is listening on ${port}`);
});
```

Det som kopplar samman websocket servern mot den inbyggda servern är följande kodrader.

```javascript
const wss = new WebSocket.Server({
    server: server
});
```

Servern för websocket använder sig av `server` som refererar till den inbyggda HTTP-server som startats.

Nu har vi en kombination av servrar som kan leverera både vanliga HTTP svar och svar på websockets.



#### Websocket server med Express

Avslutningsvis tittar vi på en server där modulen ws använder sig av applikationsservern Express för att interagera med en HTTP-server. Exempelkoden ligger i `example/websocket/connect/server-express.js`.

Vi delar upp exempelkoden i delar. Först tittar vi på de moduler som hämtas och variabler som deklareras.

```javascript
/**
 * Minimal express websocket server to answer on a connect.
 */
"use strict";

const port = process.env.DBWEBB_PORT || 1337;
const express = require("express");
const http = require("http");
const url = require("url");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
```

Det är sista raden som kopplar samman websocket modulen med Express-servern.

Sedan gör vi en exempel route i Express som alltid svarar på en inkommande HTTP request.

```javascript
// Answer on all http requests
app.use(function (req, res) {
    res.send({ msg: "hello" });
});
```

Koden för websocketen är som tidigare. Här handlar det om att lägga till eventhanterare som i exemplet enbart skriver ut att uppkoppling sker.

```javascript
// Setup for websocket requests.
// Docs: https://github.com/websockets/ws/blob/master/doc/ws.md
wss.on("connection", (ws, req) => {
    console.log("Connection received.");
    // console.log(ws);
    // console.log(req);
});
```

Avslutningsvis startar vi upp Express.

```javascript
// Startup server
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
```

Så ser alltså koden ut när man integrerar en websocket i Express.

Där hade vi ett par olika alternativ till hur man kan sätta upp en kombination av websocket och HTTP-server med Node.



#### En echo server

För att implementera en websocket echo-server behöver vi ta emot en uppkoppling, ta emot meddelande och skicka tillbaka samma meddelande till samma klient. Koden för detta kan se ut så här.

```javascript
// Setup for websocket requests.
// Docs: https://github.com/websockets/ws/blob/master/doc/ws.md
wss.on("connection", (ws, req) => {
    console.log("Connection received.");
    // console.log(ws);
    // console.log(req);

    ws.on("message", (message) => {
        console.log("Received: %s", message);
        ws.send(message);
    });

    ws.on("error", (error) => {
        console.log(`Server error: ${error}`);
    });

    ws.on("close", (code, reason) => {
        console.log(`Closing connection: ${code} ${reason}`);
    });
});
```

Vi använder `console.log()` för att skriva ut vad som händer på serversidan.

Det vi behöver göra är främst att koppla upp en eventhanterare för eventet `message`. När meddelandet kommer så skickar vi tillbaka det igen via `ws.send(message)`.

I exempelkatalogen `example/websocket/echo` finner du två implementationer av denna echo-server. En med Node (`server.js`) och en med Express (`server-express.js`).

Pröva de båda implementationerna tillsammans med klienten som ligger i samma katalog.



#### Broadcast server

En broadcast-server kan ta emot flera uppkopplade klienter samtidigt och varje meddelande som servern tar emot skickas ut till samtliga klienter. Låt se hur detta kan se ut för en websocket server. Koden finns i `example/websocket/broadcast`.

Du kan börja med att starta upp broadcast-servern med `npm start`. Öppna sedan två (eller flera) webbläsare mot servern och koppla upp dem och börja skicka och ta emot meddelanden.

För varje meddelande du skickar i en klient så skickas samma meddelande vidare till alla klienter som är uppkopplade.

Låt se vilka ändringar som gjordes i server-koden.

Först använder vi en inbyggd feature `clientTracking` i modulen ws som håller koll på samtliga klienter som är uppkopplade mot server.

```javascript
const wss = new WebSocket.Server({
    server: server,
    clientTracking: true // keep track on connected clients
});
```

För att se vad moduler erbjuder för features så behöver vi studera dokumentationen för [modulen ws API](https://github.com/websockets/ws/blob/master/doc/ws.md).

När vi enablar `clientTracking` så sparas alla klienter i ett Set ([MDN datatypen Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)) i `wss.clients`.

För att skicka meddelanden till alla klienterna så kan vi göra en funktion.

```javascript
// Broadcast data to everyone except one self (ws).
wss.broadcastExcept = (ws, data) => {
    let clients = 0;

    wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            clients++;
            client.send(data);
        }
    });
    console.log(`Broadcasted data to ${clients} (${wss.clients.size}) clients.`);
}
```

Vi anropar sedan funktionen när vi tar emot ett meddelande via `onmessage`.

```javascript
wss.on("connection", (ws, req) => {
    console.log("Connection received. Adding client.");

    wss.broadcastExcept(ws, `New client connected (${wss.clients.size}).`);

    ws.on("message", (message) => {
        console.log("Received: %s", message);
        wss.broadcastExcept(ws, message);
    });
});
```

Där har vi kärnan i en broadcast-server, som också ger grunderna till en enkel chatt-server.



## Subprotokoll

Inbyggt i hanteringen kring websockets finns en hantering av subprotokoll som erbjuder en förhandling mellan klienten och servern för att bestämma vilket protokoll, eller vilken version av ett protokoll som skall gälla. Detta ger möjligheten att klienter och servrar kan ha stöd för olika (versioner av) protokoll och det som bäst matchar klient och server används.

I exempelkatalogen `example/websocket/subprotocol` finns en klient och en broadcast-server som stödjer subprotokoll.

Klienten som sådan har en dropdown där du kan välja olika subprotokoll. Beroende på vilken server du väljer att koppla upp dig mot så har de stöd för olika subprotokoll (eller inget subprotokoll).

<img src="https://dbwebb.se/image/snapht17/websocket-subprotocols.png?w=w2" alt="En klient där man kan välja subprotokoll.">

Om du startar upp servern i exempelkatalogen så kan du koppla upp dig med antingen `text` eller `json`. Det är två olika subprotokoll som servern känner igen och skillnaden är hur svaret skickas till klienten. Klienten känner igen vilket protokoll som används men skriver bara ut svaret utan att göra någon skillnad på vilket subprotokoll som används.



#### Klient hantera subprotokoll

I klienten är det följande kodsekvens som hanterar vilket subprotokoll som föredras.

```javascript
if (!protocol.value) {
    websocket = new WebSocket(url.value);
} else {
    websocket = new WebSocket(url.value, protocol.value);
}
```

Värdet på subprotokollet hämtas från formuläret.

Klienten kan också skicka en array med förslag till olika subprotokoll. Server väljer sedan ett av dem och returnerar det svaret så att klienten har det i `websocket.protocol`. På det viset kan klienten bete sig olika beroende av vilket subprotokoll som används.



#### Server hantera subprotokoll

I modulen ws finns inbyggt stöd för att välja subprotokoll. Man anger en funktion som anropas inför uppkopplingen och där bestämmer returvärdet från funktionen vilket subprotokoll som accepteras.

```javascript
const wss = new WebSocket.Server({
    server: server,
    clientTracking: true, // keep track on connected clients,
    handleProtocols: handleProtocols // Manage what subprotocol to use.
});
```

I funktionen `handleProtocols()` ser vi koden för att välja bland inkommande subprotokoll.

```javascript
/**
 * Select subprotocol to use for connection.
 *
 * @param {Array} protocols              Subprotocols to choose from, sent
 *                                        by client request.
 * @param {http.IncomingMessage} request The client HTTP GET request.
 *
 * @return {void}
 */
function handleProtocols(protocols /*, request */) {
    console.log(`Incoming protocol requests '${protocols}'.`);
    for (var i=0; i < protocols.length; i++) {
        if (protocols[i] === "text") {
            return "text";
        } else if (protocols[i] === "json") {
            return "json";
        }
    }
    return false;
}
```

Valet handlar om att loopa igenom inkommande förslag på subprotokoll och välja det som bäst matchar.

När valet är gjort skickas informationen till klienten och i servern lagras det valda subprotokollet i `ws.protocol`. Det gör att vi kan bestämma vilket protokoll som används när vi skickar (och läser) meddelanden.

```javascript
if (ws.protocol === "json") {
    let msg = {
        timestamp: Date(),
        data: data
    };

    client.send(JSON.stringify(msg));
} else {
    client.send(data);
}
```

Att använda JSON ger oss möjligheten att skicka objekt i varje meddelanden. Här kan vi konstruera vårt eget specifika applikationsprotokoll, ovanpå websockets.



#### Same origin policy

I websockets finns inget stöd för SOP/CORS (Same Origin policy/Cross-Origin Resource Sharing) som kontrollerar vem som kan koppla upp sig mot vår server. Vi behöver hantera sådant själva, att styra vem som kan koppla upp sig mot vår server.

Vi kan naturligtvis styra sådant över vårt applikationsprotokoll, någon form av behörighetskontroll eller inloggning. Men, det går också styra i själva uppkopplingen, till exempel att bara tillåta uppkopplingar från vissa domänadresser.

Modulen ws kan anropa en specifik callback `verifyClient`, om vi så vill, och i den callbacken kan vi ta beslut utifrån innehållet i klientens HTTP request och välja om vi vill acceptera kopplingen. En del som finns i requesten är det _origin_ där requesten initierades. Vi kan på så sätt tillåta uppkopplingar som till exempel kommer från localhost och dbwebb.se samt ignorera alla andra.



## Avslutningsvis

Vi har gått igenom grunderna för WebSockets och sett hur modulen ws kan användas på serversidan tillsammans native WebSockets i klienten, med eller utan subprotkoll och i ett sammanhang av echo- samt broadcast-server.
