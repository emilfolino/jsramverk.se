# Sockets

<p class="author">Emil Folino</p>

Denna veckan tittar vi på realtidsprogrammering och hur två eller fler personer kan uppdatera samma dokument.



## Läsa

Läs igenom nedanstående dokumentation översiktligt och spara de för referens under arbetet.

1. [websocket modulen ws](https://github.com/websockets/ws) är en websocket server som använder rena (_native_) WebSockets.

2. [MDN WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) ger dig material för klientsidan samt bakomliggande information om hur man bygger en server från grunden.

3. [socket.io](https://socket.io/) är en introduktion till en modul som implementerar websockets (och närliggande tekniker) för realtid i klient och server.



## Titta

Nedanstående video ger en bra introduktion till varför vi vill använda scokets över till exempel _refreshing_ eller _polling_. Dessutom introduceras de begränsningar i `ws` paketet som gör att vi istället använder `socket.io`.

<div class='embed-container'><iframe src="https://www.youtube.com/embed/1BfCnjr_Vjg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



## Material och tekniker

Vi kommer i detta och kommande kursmoment använda oss av paketet [socket.io](https://socket.io/). Paketet underlättar för oss när vi vill skicka data över en websocket mellan en server och ett flertal klienter. Vi börjar med servern och tar sedan en titt på hur vi kan integrera socket.io i klienter och i de olika ramverken ni har valt att jobba med.

Ett exempel program med en chattklient och chattserver finns under `socket/` i kursrepot.



### Sockets för vår editor

Vi börjar på serversidan och kommer igenom hela denna artikel hoppa lite fram och tillbaka mellan de olika delarna av vår applikation. Jag har markerat kodexempel med `// Klient` respektive `// Server` för att markera vart koden hör hemma.

För att kunna använda oss av `socket.io` på servern installerar vi det med hjälp av `npm`. De två paketen `bufferutil` och `utf-8-validate` installerar vi för att [snabba upp](https://github.com/websockets/ws/#opt-in-for-performance) serverns hantering av sockets. Det är viktigt i dessa sammanhang när vi använder oss av realtidsprogrammering.

```shell
$npm install --save socket.io
$npm install --save-optional bufferutil utf-8-validate
```

För att initiera och integrera sockets i vår express backend måste vi skapa en `httpServer` instans som använder vår Express-`app`.

```javascript
// Server
const app = express();
const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
```

`origin` är den URL'n eller de URL'er som vi vill kunna ta emot uppkopplingar ifrån. Under utveckling är det högst troligen en `localhost` adress med en port för ditt valda ramverk.

Precis som vi är vana vid från JavaScript händer allt asynkront och event-styrd när vi hanterar sockets. Därför är en viktig del av att hantera sockets att skapa `EventListeners` som lyssnar på olika händelser.

Vi börjar med en lyssnare för att kolla om vi får in några uppkopplingar:

```javascript
// Server
io.sockets.on('connection', function(socket) {
    console.log(socket.id); // Nått lång och slumpat
});
```

En funktion som vi kommer använda en hel del i detta kursmoment är [socket.emit()](https://socket.io/docs/v4/emit-cheatsheet/). I `emit` funktionen skickar vi med en nyckel/event-namn och sedan data som vi vill koppla till eventet. Så till exempel om vi vill skicka ett `message` via vår socket antingen från server till klient eller från klient till server, kan vi göra det med `emit()` enligt nedan.

```javascript
// Server eller klient
socket.emit("message", data);
```



### Installation i klienten

Vi installerar `socket.io-client` med hjälp av `npm`.

```shell
$npm i --save socket.io-client
```

Och sedan initierar vi klienten med en `ENDPOINT` som är URL'n till servern vi vill att paketen skickas till.

```javascript
// Klient
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:1337";

const socket = socketIOClient(ENDPOINT);
```



### Rooms

Då vi kommer ha många olika dokument som många olika användare ska kunna redigera i vår editor kommer vi använda oss av [Rooms](https://socket.io/docs/v4/rooms/). Rooms lever enbart på servern, men vi kan initiera de från klienten genom att använda `emit`. Jag väljer att skicka med det unika ID som vårt dokument har i mongodb databasen som rumsnamn. Då är vi säkra på att denna del av socketen är kopplat till det specifika dokument.

```javascript
// Klient
socket.emit("create", docs["_id"]);
```

Vi tar "emot" med en EventListener på server sidan som lyssnar på "create" events.

```javascript
// Server
io.sockets.on('connection', function(socket) {
    socket.on('create', function(room) {
        socket.join(room);
    });
});
```

Vi använder sedan `join` för att skapa ett rum som automatiskt är kopplat till den specifika socket och dokument som vi vill koppla upp oss mot.

Vi kan nu använda `emit` och `to` funktionerna för att skicka data till alla klienter i ett specifikt rum. Här utnyttjar vi att vi från klienten där en ändring har skett skickar med både `_id` och den nya texten som data, så vi kan använda `_id` för att skicka till rätt rum.

```javascript
// Server
socket.to(data["_id"]).emit("doc", data);
```

Vi kan sedan i klienten ta emot data genom en EventListener och uppdatera värdet i vår text editor.

```javascript
// Klient
socket.on("doc", (data) => {
    setEditorContent(data.html, false);
});
```

På liknande sätt kan vi från klienten skicka en uppdatering till servern, som vi sedan tar hand om på servern och skickar ut till alla andra klienter.

```javascript
// Klient
let data = {
    _id: "LÅNG OCH SLUMPAT",
    html: "Texten i html format från editorn"
};

socket.emit("doc", data);
```

På servern har vi en EventListener och en `emit`.

```javascript
// Server
socket.on("doc", function (data) {
    socket.to(data["_id"]).emit("doc", data);

    // Spara till databas och göra annat med data
});
```

### Tips i ramverken

Generellt är det viktigt att hålla koll på livscykel-funktionerna i ramverken. Att först initiera sockets när vyn renderats och att koppla sig mot ändringar i `state` för att skicka data fram och tillbaka.

Text editorerna har inbyggda `change` events som kan triggas lite titt som tätt, bland annat när vi fyller i texten från andra klienter. Detta kan ställa till det med en oändlig loop där vi försöker uppdatera samtidigt som vi uppdaterar. Se därför till att bara skicka till socketen när det verkligen har hänt en uppdatering av texten.



#### Angular

För Angular finns det ett paket `ngx-socket-io` för att hantera sockets: [https://www.npmjs.com/package/ngx-socket-io](https://www.npmjs.com/package/ngx-socket-io).



#### Vue

Även för Vue finns det ett paket för hantering av socket io som kan vara intressant att titta på: [https://www.npmjs.com/package/vue-socket.io](https://www.npmjs.com/package/vue-socket.io).



## Kravspecifikation

1. Använd sockets för att skapa realtidskommunikation mellan server och klienter.

1. Två klienter ska samtidigt kunna öppna samma dokument och man ska i ena klienten kunna se när man skriver i andra.

1. Committa och tagga ditt repon med 4.0.0 eller senare, ladda upp till GitHub och driftsätt.

1. Länka till båda dina GitHub repon och den driftsatta klienten i en kommentar till din inlämning på Canvas.



## Skriva

Vi fortsätter iterativt med att förbättra våra syften. Använd den återkopplingen du fick på förra veckans syften och förbättra.

Gå tillbaka till skrivguiden och titta under [Syfte, problemformulering och forskningsfrågor – att begränsa ämne](http://skrivguiden.se/skriva/skrivprocessen/#syfte) för bra tips.

**Lämna in texten som PDF bilaga till din inlämning på Canvas.**
