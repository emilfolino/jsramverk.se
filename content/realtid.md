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



## socket.io

[socket.io](https://socket.io/) är ett paket för _"real-time, bidirectional and event-based communication"_ och underlättar processen för att skapa och driftsätta tjänster med realtidskommunikation. Vi ska i följande avsnitt bekanta oss med både server och klient implementationer av en chatt med websocket kommunikation.


## Kravspecifikation

1. Skapa en klient och en server för chatt med hjälp av socket.io.

1. Integrera klienten i ditt valda ramverk som en del av din me-sida.

1. Gör ett medvetet val om chatt backend ska ligga som egen driftsatt server med egen domän eller som en del av me-api:t.

1. När man kopplar upp sig så identifierar man sig med ett nick, ett smeknamn.

1. Flera klienter kan koppla sig till chatten. När någon skriver något ser alla andra det. Man ser nicket tillsammans med meddelandet.

1. Committa, tagga och pusha relevanta repon samt driftsätta på din server.



## Skriva
