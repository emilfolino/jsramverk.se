# Vidareutveckling

Nu har vi uppdaterad applikationen och säkerställt funktionalitet genom testning och en CI-kedja. Då blir det dags för vidareutveckling av applikationen. Vi gör det genom att implementera 3-6 nya features i vår applikation. Kraven för de olika features finns beskrivit nedan. Vid tveksamheter ställ antingen en fråga eller gör en egen tolkning som beskrivs i redovisningstexten.



### Krav 1: Skriva ut PDF

Skapa en knapp för utskrift som sedan skapar en PDF, som går att ladda ner. Välj ett npm-paket för att skapa PDF'en, beskriv varför du valde just det paket du valde. Azure cloudet gör att det är svårt att driftsätta så att backend skapar PDF'n. Gör det därför enkelt för dig själv och skapa PDF'n i front.



### Krav 2: Kommentarer

Lägg till möjligheten att kommentera specifika rader i dokumentet. Skapa ett bra och lättanvänt gränssnitt för att kommentera i dokumentet.



### Krav 3: Maila inbjudan

Använd ett mail API, förslagsvis Mailgun eller Sendgrid, för att koppla på möjligheten att maila ut inbjudan till att redigera dokument. Skicka med en länk i mailet för att användaren ska kunna registrera sig.



### Krav 4: Autentisering

Skapa ett inloggningsflöde för applikationen och begränsa tillgång till data och applikation, både i frontend och i backend. Artikeln [Auth](auth) kan hjälpa till med ett tillvägagångssätt för backend.



### Krav 5: GraphQL

Implementera så att er backend endast exponerar en GraphQL endpoint och att er frontend endast hämtar data från backenden på denna endpoint. Ni kan ta hjälp av artikeln [GraphQL](graphql).



### Krav 6: Testning

Testa dina features från ovan så du känner förtroende för koden. Du kan välja att testa i frontend eller backend. Beskriv i din redovisningstext ditt testförfarande och vad som gör att du känner förtroende för koden.



## Redovisning

Gör en inlämning på Canvas med följande innehåll:

Länka till dina GitHub repon och driftsatta sidor som en del av din inlämning.

1. Berätta **gemensamt** om vilka krav ni har gjort och hur du har implementerad kraven. Beskriv de val ni har gjort och vilka problem som uppstod på vägen.

2. Svara sedan **individuellt** på följande redovisningsfrågor:
    A. Hur har det varit att vidareutveckla en befintlig applikation jämfört med nyutveckling som vi gjort i stor utsträckning i tidigare kurser?
    B. Vilka verktyg och metoder tar du med dig vidare i din webbprogrammerings-verktygslåda? Varför?
    C.

3. Avsluta med ett sista stycke med dina **individuella** tankar om kursen och vad du anser om materialet och handledningen (ca 5-10 meningar). Ge feedback till lärarna och förslå eventuella förbättringsförslag till kommande kurstillfällen. Är du nöjd/missnöjd? Kommer du att rekommendera kursen till dina vänner/kollegor? På en skala 1-10, vilket betyg ger du kursen?



### Presentation

Spela in en redovisningsvideo som ni länkar till i inlämningen på Canvas. Prata om koden ni skrivit för de nya features och visa de features i videon.
