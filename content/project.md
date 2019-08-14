# Projekt

<p class="author">Emil Folino</p>

Du jobbar som teknisk arkitekt och teamledare i en framstormande startup där du har [Carte Blanche](https://en.wikipedia.org/wiki/Carte_blanche) att välja teknik inför ett nytt spännande projekt, som är tänkt skaka om trading-branchen. Du har stor påtryckning från eran investor [a12o](https://a12o.emilfolino.se) att detta projekt måste lyckas för att de ska kunna glida resten av livet.

Du har valt att bygga ihop en väl fungerande applikation som påvisar alla de tekniker du tror på. När du är klar så är tanken att du presenterar projektet och teknikerna för dina medlemmar i teamet och din applikation fungerar som utvärderings- och utbildningsmaterial för ditt team.

Tänk på att ditt team till största del består av PHP-utvecklare kritiska mot nya tekniker och du behöver göra ett gott jobb för att imponera på dem. Annars är risken att de sågar dina nya idéer.



#### Projektspecifikation

Du ska utveckla och driftsätta en trading plattform baserad på följande kravspecifikation. Du ska själv välja objekt att sälja exempel på objekt kan vara råvaror, värdepapper, antikviteter eller varför inte kakor & tårtor?

Saknas info i specen så kan du själv välja väg, dokumentera dina val i redovisningstexten.

De tre första kraven är obligatoriska och måste lösas för att få godkänt på uppgiften. De tre sista kraven är optionella krav. Lös optionella kraven för att samla poäng och nå högre betyg.

För allra högsta betyg krävs en allmänt god applikation. Den skall vara snygg, tilltalande, lättanvänd, väl dokumenterad och felfri.

Varje krav ger max 10 poäng, totalt är det 60 poäng.

#### Repon på GitHub

Skapa flera repon för projektet. När du är klar, committa, tagga, pusha till GitHub. Länka till dina repon i din inlämning på Canvas.



### Krav 1: Backend

Skapa ett API för trading av dina valda objekt. Användare av din tradingplattform ska kunna registrera och autentisera sig mot plattformen. Som autentiserad användare ska det gå att köpa och sälja valda objekt som hamnar i ett depå kopplat till användaren. Gör det även möjligt för användaren att sätta in medel på depån, som användaren sedan kan handla för.

Gör ett medvetet val av teknik och berätta utförligt i din README om vilka teknikval du har gjort och varför.



### Krav 2: Frontend

Skapa en klient som är publikt tillgänglig.  Klienten ska vara designat för att användas på enheter av olika storlekar. I klienten ska det vara möjligt att autentisera sig mot API:t. När klienten är autentiserad kan användaren se tillgängliga medel och objekt i depån samt handla med objekt. Gör det även möjligt för att användaren att sätta in medel på depån, som användaren sedan kan handla för.

Gör ett medvetet val av teknik och berätta utförligt i din README om vilka teknikval du har gjort och varför.



### Krav 3: Realtid

Skapa en realtids micro-service som hanterar priserna för dina säljobjekt. I din frontend ska denna micro-service användas för att grafisk representera priserna i realtid.

I dina README beskriver du i ett eget stycke om hur du implementerade realtidsaspekten i din applikation. Du skriver också om vilken teknik/verktyg du valt för din implementation samt en kort reflektion av hur du tycker tekniken fungerar.



### Krav 4: Tester backend

<div class="under-construction" id="under-construction">
    <p class="optional">Optionellt krav</p>
</div>

Du har god kodtäckning i enhetstester och funktionstester på både backend och frontend. Sträva efter 70% där det är rimligt, men se det som en riktlinje och inte ett hårt krav.

I din README skriver du ett stycke om vilka verktyg du använt för din testsuite och om det är delar av applikationen som inte täcks av tester. Du reflekterar kort över hur dina teknikval fungerat för dig. Du reflekterar också över hur lätt/svårt det är att få kodtäckning på din applikation.

Man kan köra hela din testsuite lokalt via `npm test`.

I README visar du hur man kan se kodtäckningen lokalt i webbläsaren.

Dina repon har en CI-kedja och automatiserade tester med tillhörande badges för byggtjänst, kodtäckning och tjänst för kodkvalitet.

I din README skriver du ett stycke om CI-kedjan, vilka tjänster du valt och varför samt eventuella begränsningar i hur CI-kedjan kan hantera din applikation. Du gör en kort reflektion över din syn på den hjälpen liknande verktyg ger dig.

Berätta om du är nöjd eller inte med de betyg som tjänsten för kodkvalitet ger dig.



### Krav 5: Tester frontend

<div class="under-construction" id="under-construction">
    <p class="optional">Optionellt krav</p>
</div>

I din README beskriver du 5 stycken use-cases för din applikation, som du sedan använder Selenium för att testa.

Man kan köra hela din testsuite lokalt via `npm test`.



### Krav 6: Skrivande

<div class="under-construction" id="under-construction">
    <p class="optional">Optionellt krav</p>
</div>

Skriv en akademisk sammanfattning av de lärdomar du har gjort under projektets gång. Sammanfatta vilka fördelar och nackdelar som dina valda tekniker och verktyg har gett dig under projektet.

En beskriv av hur du gör en akademisk sammanfattning finns i skrivguiden under [Uppsatsens delar](http://skrivguiden.se/skriva/uppsatsens_delar) titta under Avslutning.

**Lämna in texten som PDF bilaga till din inlämning på Canvas.**



## Redovisning

Gör en inlämning på Canvas med följande innehåll:

1. Länka till dina GitHub repon och berätta om vilka optionella krav du gjort. Och om du gjorde nya vägval rörande tekniker inför projektet.

1. Skriv ett allmänt stycke om hur projektet gick att genomföra. Problem/lösningar/strul/enkelt/svårt/snabbt/lång tid, etc. Var projektet lätt eller svårt? Tog det lång tid? Vad var svårt och vad gick lätt? Var det ett bra och rimligt projekt för denna kursen?

1. Avsluta med ett sista stycke med dina tankar om kursen och vad du anser om materialet och handledningen (ca 5-10 meningar). Ge feedback till lärarna och förslå eventuella förbättringsförslag till kommande kurstillfällen. Är du nöjd/missnöjd? Kommer du att rekommendera kursen till dina vänner/kollegor? På en skala 1-10, vilket betyg ger du kursen?
