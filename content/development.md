# Vidareutveckling

Nu har vi uppdaterad applikationen och säkerställt funktionalitet genom testning och en CI-kedja. Då blir det dags för vidareutveckling av applikationen. Vi gör det genom att implementera 3-6 nya features i vår applikation. Kraven för de olika features finns beskrivit nedan. Vid tveksamheter ställ antingen en fråga eller gör en egen tolkning som beskrivs i redovisningstexten.



### Krav 1: Autentisering

Användare ska ha möjlighet för att registrera sig för applikationen och sedan kan en användare bara se och redigera egna dokument. Skapa möjlighet för att dela dokument med andra användare på plattformen. Använd ett mail API, förslagsvis Mailgun eller Sendgrid, för att koppla på möjligheten att maila ut inbjudan till att redigera dokument. Skicka med en länk i mailet för att användaren ska kunna registrera sig.



### Krav 2: Sockets

Använd web-sockets för att skapa möjlighet för att två användare samtidigt ska kunna redigera i samma dokument. Använd artikeln [sockets](sockets) som hjälp på traven.



### Krav 3: Kommentarer

Lägg till möjligheten att kommentera specifika rader i dokumentet. Skapa ett bra och lättanvänt gränssnitt för att kommentera i dokumentet. Kommentarer bör hanteras med hjälp av sockets, artikeln [sockets](sockets) kan ge vissa tips om hur ni kan gå till väga.



### Krav 4: Code-mode

Lägg till möjligheten att välja code-mode. Editorn byts då ut mot en kod-editor förslagsvis codemirror eller monaco-editor. Din kod-editor bör stödja JavaScript och är även det enda som kan exekveras enligt nedan. Spara information i databasen om dokumentets typ (kod eller inte kod-dokument). Skapa en knapp för att exekvera koden. Koden ska exekveras genom att skickas som en [base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64)-kodat sträng till endpointen [execjs.emilfolino.se](https://execjs.emilfolino.se). Se dokumentation på hemsidan för endpoints och request-typ.



### Krav 5: GraphQL

Implementera så att er backend endast exponerar en GraphQL endpoint och att er frontend endast hämtar data från backenden på denna endpoint. Ni kan ta hjälp av artikeln [GraphQL](graphql).



### Krav 6: Testning

Testa dina features från ovan så du känner förtroende för koden. Du kan välja att testa i frontend eller backend. Beskriv i din redovisningstext ditt testförfarande och vad som gör att du känner förtroende för koden.



## Redovisning

Gör en inlämning på Canvas med följande innehåll:

Länka till dina GitHub repon och driftsatta sidor som en del av din inlämning.

1. Berätta **gemensamt** om vilka krav ni har gjort och hur ni har implementerad kraven. Beskriv de val ni har gjort och vilka problem som uppstod på vägen.

2. Svara sedan **individuellt** på följande redovisningsfrågor:

    * Hur har det varit att vidareutveckla en befintlig applikation jämfört med nyutveckling som vi gjort i stor utsträckning i tidigare kurser?

    * Vilka verktyg och metoder tar du med dig vidare i din webbprogrammerings-verktygslåda? Varför?

    * Vilken är den största lärdomen du har gjort i kursen?

3. Avsluta med ett sista stycke med dina **individuella** tankar om kursen och vad du anser om materialet och handledningen (ca 5-10 meningar). Ge feedback till lärarna och förslå eventuella förbättringsförslag till kommande kurstillfällen. Är du nöjd/missnöjd? Kommer du att rekommendera kursen till dina vänner/kollegor? På en skala 1-10, vilket betyg ger du kursen?



### Presentation

Spela in en **gemensam** redovisningsvideo som ni länkar till i inlämningen på Canvas. Prata om koden ni skrivit för de nya features och visa de features i videon. Se till att båda syns i videon samtidigt, kan vara bra att spela in via Zoom.
