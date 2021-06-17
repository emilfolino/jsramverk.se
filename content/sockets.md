# Sockets

<p class="author">Emil Folino</p>

> **Kursmomentet uppdateras** Kursen håller på att göras om inför kurstillfället HT2021. Kursmaterial för 2020 finns på [https://2020.jsramverk.se/](https://2020.jsramverk.se/).


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

### Server

### Klient
