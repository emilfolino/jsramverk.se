# Projekt

<p class="author">Emil Folino</p>



## Projektbeskrivning

Vi ska i projektet knyta ihop säcken för vår editor. Uppgiften blir för dig att utveckla 3-6 nya features för din editor. Kraven är beskrivit nedan och du ska välja minst 3 krav och resterande krav är för högre betyg.

Saknas info i specen så kan du själv välja väg, dokumentera dina val i redovisningstexten.

För allra högsta betyg krävs en allmänt god applikation. Den skall vara snygg, tilltalande, lättanvänd, väl dokumenterad och felfri.

Varje krav ger max 10 poäng, totalt är det 60 poäng.



#### Repon på GitHub

Skapa flera repon för projektet. När du är klar, committa, tagga, pusha till GitHub. Länka till dina repon i din inlämning på Canvas.



### Krav 1: Skriva ut PDF

Skapa en knapp för utskrift där backend sedan skapar en PDF, som går att ladda ner. Välj ett npm-paket för att skapa PDF'en, beskriv varför du valde just det paket du valde.



### Krav 2: Kommentarer

Lägg till möjligheten att kommentera specifika rader i dokumentet. Skapa ett bra och lättanvänt gränssnitt för att kommentera i dokumentet.



### Krav 3: Maila inbjudan

Använd ett mail API, förslagsvis Mailgun eller Sendgrid, för att koppla på möjligheten att maila ut inbjudan till att redigera dokument. Skicka med en länk i mailet för att användaren ska kunna registrera sig.



### Krav 4: Code-mode

Lägg till möjligheten att välja code-mode. Editorn byts då ut mot en kod-editor förslagsvis codemirror eller monaco-editor. Din kod-editor bör enbart stödja JavaScript och är även det enda som kan exekveras enligt nedan. Spara information i databasen om dokumentets typ (kod eller inte kod-dokument). Skapa en knapp för att exekvera koden. Koden ska exekveras genom att skickas som en [base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64)-kodat sträng till endpointen [execjs.emilfolino.se](https://execjs.emilfolino.se). Se dokumentation på hemsidan för endpoints och request-typ.



### Krav 5: GraphQL

Implementera GraphQL som en del av ditt API. Redovisa varför du har valt att implementera GraphQL för just den delen av ditt API där du har valt att implementera GraphQL. Förklara vilka fördelar du får av att implementera GraphQL för just denna delen av ditt API. Dokumentera hur din klient använder GraphQL servern.



### Krav 6: Testning

Testa dina features från ovan så du känner förtroende för koden. Du kan välja att testa i frontend eller backend. Beskriv i din redovisningstext ditt testförfarande och vad som gör att du känner förtroende för koden.



## Redovisning

Gör en inlämning på Canvas med följande innehåll:

Länka till dina GitHub repon och driftsatta sidor som en del av din inlämning.

1. Berätta om vilka krav du har gjort och hur du har  implementerad kraven. Beskriv de val du har gjort och vilka problem som uppstod på vägen.

2. Skriv ett allmänt stycke om hur projektet gick att genomföra. Problem/lösningar/strul/enkelt/svårt/snabbt/lång tid, etc. Var projektet lätt eller svårt? Tog det lång tid? Vad var svårt och vad gick lätt? Var det ett bra och rimligt projekt för denna kursen?

3. Avsluta med ett sista stycke med dina tankar om kursen och vad du anser om materialet och handledningen (ca 5-10 meningar). Ge feedback till lärarna och förslå eventuella förbättringsförslag till kommande kurstillfällen. Är du nöjd/missnöjd? Kommer du att rekommendera kursen till dina vänner/kollegor? På en skala 1-10, vilket betyg ger du kursen?



### Presentation

Spela in en redovisningsvideo som ni länkar till i inlämningen på Canvas. Prata om koden ni skrivit för att utöka editorn med de nya features.
