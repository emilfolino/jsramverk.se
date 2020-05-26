# Test

<p class="author">Emil Folino, Mikael Roos</p>

Vi skapar en testmiljö för både frontend och backend kod, samt ett flöde för Continuous Integration.

Tanken är att vi förbereder oss för ett större utvecklingsprojekt i JavaScript och vi vill säkerställa att vi har en utvecklingsmiljö där vi kan testa vår programvara.

Vilken typ av tester vill vi göra och vilka verktyg kan hjälpa oss med detta? Låt oss gå igenom läget i JavaScript och använda några testrelaterade verktyg för att sätta en grund.



## Material och tekniker

Vi börjar med att skapa oss en överblick över olika verktyg för testning och olika typer av test.

1. Webbplatsen för [Mocha](https://mochajs.org/) ger dig en översikt av ett verktyg för att testa din JavaScript-kod med enhetstester. Du skall själv välja ett eget testverktyg att använda, Mocha är en av möjligheterna.

1. Verktyget [Istanbul](https://istanbul.js.org/) kan kopplas till Mocha för att hantera kodtäckning vid enhetstester.

1. Det finns en forumtråd med tips om [artiklar för testning](https://dbwebb.se/t/6984). Kika där för inspiration.



### Enhetstestning

På engelska blir det _unit testing_ ([Wikipedia om Unit Testing](https://en.wikipedia.org/wiki/Unit_testing)) och det handlar om att testa varje enhet av kod för sig själv. Det är _white box testing_ ([Wikipedia om White box testing](https://en.wikipedia.org/wiki/White-box_testing)) eftersom vi har full insyn i koden vi testar. Vi kan se källkoden och vi kan se att våra testfall verkligen exekverar alla delar av koden, förutsatt att vi använder oss av verktyg för kodtäckning, code coverage ([Wikipedia om Code Coverage](https://en.wikipedia.org/wiki/Code_coverage)). Att se kodtäckningen är viktigt i enhetstesterna, annars gör vi det onödigt svårt för oss. Kodtäckning är också ett sätt att visa för utomstående hur mycket av kodbasen som är testad via enhetstester. Att nå 100% i kodtäckning är bra, men man nöjer sig ofta med 70%. Hur mycket kodtäckning man kan få är också beroende av hur testbar koden är. Är koden inte skriven för att vara testbar så kan man ge sig på att det är svårt att skriva testfall i enhetstester och uppnå hög kodtäckning.

Varje testfall i enhetstestet innebär att man anropar en eller flera metoder/funktioner i sitt testobjekt. Testobjektet är den kodmodul man testar. Efter anropet så verifierar man att ett förväntat utfall är uppfyllt. Man har alltså vissa förväntningar på vad som skall hända när koden körs och det skall man verifiera efter att koden körts. Vi kallar detta _assertions_ ([Wikipedia om Assertion](https://en.wikipedia.org/wiki/Assertion_(software_development))) som är villkor som skall vara uppfyllda.

> _"If there is no assertion, it isn't a test."_

När man tänker på test och utveckling av kod i samklang så tenderar man att skriva kod som också är testbar och enkel att testa. Det blir till en erfarenhet som sitter i ryggraden om att koden jag skriver måste gå att testa i enhetstester. Bäst att skriva den testbar med ett tydligt publikt API och resten skyddat. Här funderar jag på vad som kan injectas in i modulen och troligen tänker jag igenom vad som kan mockas och inte ([Wikipedia om Mock object](https://en.wikipedia.org/wiki/Mock_object)), redan när jag utvecklar och skriver koden. När jag ser att jag skriver kod som är svår att testa så kan jag alltid välja att göra refactoring för att koden skall vara enklare att testa.

Det kan vara en klar skillnad mellan att skriva helt ny kod som man vill skall vara testbar, jämfört med att införa enhetstester för existerande kod. Man kan inte räkna med att den existerande koden är testbar ur alla aspekter. Som utvecklare måste man tänka på att skriva kod som är testbar, om man vill uppnå det. All kod som skrivs är inte testbar eller enkel att testa.

Varje testfall skall kunna köras isolerat från alla andra testfall. Man behöver alltså tänka på att varje test man skriver skall kunna köras oberoende av de andra testerna och oberoende av testernas inbördes ordning. Det brukar finnas stöd för att sätta upp en miljö för varje testfall och/eller suite av testfall. En bonus när man lyckas med detta är att alla tester kan köras parallellt. Det är en fördel när alla tester börjar ta längre tid, att köra tester parallellt snabbar upp och effektiviserar utvecklingsitden.

> _"If the tests can not run independently, then they are not unit tests."_



### Testdriven utveckling

TDD är förkortningen av testdriven utveckling ([Wikipedia om Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development)) som är en utvecklingsprocess som säger att man börjar skriva ett eller flera testfall och därefter skriver man koden för att lösa testfallen.

Vi kan förklara utvecklingsmodellen med följande steg.

1. Skriv ett testfall.
2. Exekvera testsuiten och se testfallet misslyckas.
3. Skriv koden.
4. Kör testerna (alla passerar).
5. Refactor, skriv om, organisera om, kodbasen efterhand som den växer.
6. Repetera.

I TDD pratar vi i termer om testfall och utvecklingen, koden vi skriver, drivs fram av de testfall vi lägger till och inte tvärtom. Det är alltså inte koden i sig som driver fram testfallen.

Som en bonus blir all vår kod testbar och troligen skriven för att vara högst testbar.

TDD får oss att skriva koden som löser testfallen, möjligen får det oss att fokusera på det som är viktigt i koden och möjligen ökar fokusen på att hålla kodmodulerna små.



### Behaviour driven utveckling

BDD är en vidareutveckling av TDD och står för Beteende-driven utveckling ([Wikipedia om Behavior-driven development](https://en.wikipedia.org/wiki/Behavior-driven_development))
BDD. En intressant del i BDD är att man diskuterar systemet i features som skrivs ned i ett textdokument. Dessa features dokumenteras på ett sätt så att både programmerare och systemets slutanvändare och ledning kan förstå dem. Det blir ett material där verksamhetens olika roller kan diskutera hur systemet skall fungera. Man får ett egen språk att samtala om systemet.

Dessa features, berättelser om hur systemet skall fungera, kan sedan automatgenerera testfall som kan köras av programmeraren. Dessa kan sedan styra utvecklingen och koden som skrivs för att lösa feature för feature. Jämför med TDD där testfallen driver utvecklingen. Här är det features, och dess testfall, som driver utvecklingen.

Så här kan en feature vara skriven, exemplet är taget från [`mosbth/cimage`](https://github.com/mosbth/cimage/tree/resize/features).

```shell
Feature: src
    Display an image by selecting its source.

    Scenario: Source is not a valid image name
        Given Set src "NO_IMAGE"
        When Get headers for image
        Then Returns status code "404"

    Scenario: Get only source image
        Given Set src "test_100x100.png"
        When Get image
        Then Returns status code "200"
        And Compares to image "test_100x100.png"
```

I fallet ovan används programvaran [Behat](http://behat.org/) för att parsa featuren och generera testbar kod och för att exekvera alla testfall. Den som jobbar med testsuiten behöver skriva en del kod för att hanteringen kring `Given`, `When`, `Then` och `And` skall fungera. Du kan se det som att termerna motsvaras av metoder som exekverar själva testfallen.

BDD kan vara en bra utvecklingmetodik som driven utvecklingen via testbar kod och erbjuder ett språk som både programmerare och icke-programmerare kan prata.



### Funktionstester

Låt oss benämna funktionstester ([Wikipedia om Functional testing](https://en.wikipedia.org/wiki/Functional_testing)) som testar en feature, en systemfunktion. Ta ett exempel att "registrera en ny användare". Ett sådant test innebär att man utför de steg som krävs för att registrera en användare. Det kan vara genom att använda ett grafiskt användargränssnitt (GUI), eller genom ett CLI-interface (Commandline interface) eller via ett API i koden eller ett publikt API via REST.

Funktionstester är i allmänhet _black-box tester_ ([Wikipedia om Black-box testing](https://en.wikipedia.org/wiki/Black-box_testing)) där man inte nödvändigtvis behöver ha koll på den underliggande koden. Man vill testa en systemfunktion och man bryr sig inte om vilka underliggande moduler som används.

Det kan finnas ett gränsområde där enhetstester övergår i funktionstester, gränsen går troligen någonstans där man slutar mocka och istället använder systemets riktiga moduler för att utföra en systemfunktion, med eller utan ett gränssnitt (GUI/CLI/API).

I webbsammanhang behöver man ofta utföra funktionstester i formen av en webbläsare, man vill simulera en webbläsare för att utföra hela åtgärden "registrera en ny användare". I sådana fall finns det programvara som hjälper testaren att simulera knapptryck och analysera webbsidan som kommer tillbaka som svar. Programvaran benämns ofta _headless browser_ ([Wikipedia om Headless browser](https://en.wikipedia.org/wiki/Headless_browser)) och det kan vara ett viktigt verktyg i testning.

Det är alltmer vanligt att en webbtjänst både erbjuder ett (REST) API och ett traditionellt webb-GUI. Det kan göra webbtjänsten enklare att testa då ett (REST) API ger en tydlig bild av vad man kan göra med systemet. Ett traditionellt webb-GUI är inte nödvändigtvis lika tydligt om vad man kan göra och vilket resultat man får tillbaka.



#### Övriga tester

Det finns många fler typer av tester som man kan vilja genomföra och kategorisera som egna typer av tester. Låt oss nämna några.

Integrationstester ([Wikipedia om Integration testing](https://en.wikipedia.org/wiki/Integration_testing)) fokuserar på att testa att flera moduler kan samverka på ett tänkt sätt. Man ser det som ett steg i en CI pipeline (Continuous integration) att alla moduler, eller en delmängd av dem, behöver integreras i något steg och då vill man verifiera med en testsuite att integrationen gick bra. Likt alla testfaser behöver man bestämma kriteria för vad som skall testas, hur det skall testas och vad som bestämmer att testerna går bra.

I systemtestfasen ([Wikipedia om System testing](https://en.wikipedia.org/wiki/System_testing)) utförs en serie av tester mot systemet som helhet. Alla moduler är på plats och systemet snurrar i en miljö som är relevant och motsvarar systemets verkliga driftsmiljö. Man kan utföra säkerhetstester, usabilitytester, prestandatester och stresstester eller tester av dokumentationen. Man tänker på systemet som helhet och testar de aspekter som är viktiga och relevanta. Systemtestet är en plats för att verifiera systemets icke-funktionella krav via icke-funktionella tester ([Wikipedia om Non-functional testing](https://en.wikipedia.org/wiki/Non-functional_testing)).

Ett annat test som kan vara av vikt är acceptanstester ([Wikipedia om Acceptance testing](https://en.wikipedia.org/wiki/Acceptance_testing)). Det är tester som utförs inför, tillsammans med, eller av kunden, när de tar emot leveransen. Där är ett viktigt dokument/fas som du och kunden gemensamt tagit fram som en del av beställningen och där testerna syftar till att verifiera att kunden verkligen fått leverans enligt beställning. Ur beställarens synpunkt kan acceptanstestet vara nästan lika viktigt som kravspecen då ett godkänt acceptanstest innebär att fakturan kan skickas och kunden har accepterat att systemet möter de kriteria som var viktigt.



## Testverktyg

Likt de flesta programmeringsspråk erbjuder även ekomiljön kring JavaScript ett större utbud av verktyg som kan användas för att bygga upp en testmiljö.

Om vi börjar "underifrån" med enhetstester så är de mer kända verktygen [Mocha](https://mochajs.org/), [Jasmine](https://jasmine.github.io/) och [Jest](http://facebook.github.io/jest/).

Det är inte en enkel sak att välja testverktyg, men om man börjar välja något så kan man ta det vidare därifrån och efterhand utvärdera vilket verktyg som lämpar sig för den egna organisationen.

På min kravlista finns att kodtäckning skall fungera för mina enhetstester. I JavaScript-världen finns främst [Istanbul](https://istanbul.js.org/) och [Blanket.js](http://blanketjs.org/) som ger oss denna möjlighet. Testverktyget jag väljer behöver alltså ha en känd koppling mot något av dessa verktyg.

När jag går från enhetstester till funktionstester så kan behovet av en headless browser komma upp. Här finns [Selenium](http://www.seleniumhq.org/) som en av de mer kända. Men alternativen är flera.

När jag väl bestämt mig för verktygen behövs en testrunner som kör mina tester och en hantering av testrapporten så den kan visas upp för programmerare och kanske även extern personal.

Allt som allt, någonstans här är namnen på några vanliga testverktyg inom JavaScript och jag tänker välja bland dessa.

Docker kan vara ett kraftfullt verktyg för att testa vår kod mot olika versioner av programvara och uppsättningar. För bakgrundsinformation om Docker och hur det kan användas finns artikeln [Docker som utvecklingsmiljö](/docker). Docker kan vara svårt att få till att fungera smärtfritt på alla operativsystem, så fundera om du vill lägga ner kraft och energi för att lära dig om detta verktyg.



#### Kodmoduler att testa

Innan jag väljer verktyg så behöver jag en kodbas som jag vill testa. För denna övnings skull så bygger jag en kortlek och ett [kortspel Black Jack](https://sv.wikipedia.org/wiki/Black_Jack). Det bör fungera för att visa hur testerna kan fungera med den testmiljö jag nu skall välja.

Mikael Roos' repo som jag delvis använder för att exemplifiera artikeln hittar du under repot [janaxs/blackjack](https://github.com/janaxs/blackjack).

Det finns också exempelprogram i kursrepot [ramverk2 under `/test`](https://github.com/emilfolino/jsramverk/tree/master/test) som exemplifierar kommande stycken i artikeln.

Låt oss då titta på de olika tester som körs på systemet och vilka verktyg jag valde.



### Enhetstestning

Det första testverktyget jag valde är för enhetstester. De verktygen jag valde mellan var främst [Mocha](https://mochajs.org/), [Yasmine](https://jasmine.github.io/) och [Jest](http://facebook.github.io/jest/). Mitt val föll på Mocha och jag gjorde ett testprogram i `/test/unittest-mocha` för att se hur det fungerade.

```shell
/test/unittest-mocha$ tree .
.
├── package.json
├── src
│   └── card
│       └── card.js
└── test
    └── card
        ├── card.js
        └── cardParameterized.js
```

Min källkod finns i `src/card` och mina enhetstester ligger i `test/card`. De båda filerna under test-katalogen innehåller samma tester, men testfallen är olika implementerade. Börja att kika i filen `card.js` då den är tydligast i hur testfallen kan skrivas. När du tycker att det blir alltför mycket kod i testfallen så tittar du istället i `cardParameterized.js` för att se hur man kan skriva mindre kod för samma testfall.

Koden som testas är en klass `Card` som skall fungera som ett kort i en vanlig kortlek.

Innan vi kan köra testerna så behöver vi installera Mocha. Det går att installera med `npm install mocha --save-dev` eller bara `npm install` eftersom filen `package.json` redan innehåller en referens till Mocha. När installationen är klar kan du köra testfallen med `npm test` eftersom `package.json` redan är konfigurerad för att köra Mocha med enhetstesterna.

```shell
$npm install
$npm test
```

Resultatet du ser är körningen av samtliga enhetstester. Men hur väl lyckas vi med kodtäckningen?



### Kodtäckning vid enhetstestning

När man kör enhetstester är man i princip beroende av ett verktyg som kan visa kodtäckningen för testfallen. Här väljer jag verktygen [Istanbul](https://istanbul.js.org/). I katalogen `/test/unittest-mocha-istanbul` har jag utökat mitt exempel med att använda Istanbul tillsammans med Mocha.

För att kunna köra testerna med kodtäckning behöver du först installera kommandoradsklienten [`nyc`](https://github.com/istanbuljs/nyc) via `npm install nyc --save-dev` eller bara `npm install`. Sedan kan du köra testerna igen, nu med kodtäckning inkluderat.

```shell
$npm install
$npm test
```

I filen `package.json` körs nu kommandot `nyc --reporter=html --reporter=text mocha 'test/**/*.js'` där `nyc` sköter kodtäckningen för alla testfall som `mocha` exekverar. Vi får en rapport i ren text och i katalogen `cover` genereras en HTML-rapport.

![Kodtäckningen är på 100% i vårt exempel.](https://dbwebb.se/image/snapht17/mocha-nyc-codecoverage.png?w=w2)

Med en HTML-rapport är det enkelt att klicka sig fram och se vilka delar av koden som täcks av testfallen. Kodtäckning är ett viktigt verktyg när man gör enhetstester.

Dessa verktyg skapar en del filer och kataloger, som vi inte är intresserade av att ha versionshanterad. Därför lägger vi till en ny `.gitignore` som gör att vi inte får kataloger genererad av testverktygen. Vi tar den officiella [Node.gitignore
](https://github.com/github/gitignore/blob/master/Node.gitignore) och kopierar in i vår `.gitignore`.

Ibland kan kombinationen av Windows och npm modulen bcrypt ställa till med stora problem. Ett tips hämtat från [installationsmanualen för bcrypt](https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions#microsoft-windows) är att installare npm paketet `windows-build-tools` med kommandot nedan. Installera det i kommandotolken (cmd) eller Powershell så Windows har tillgång till det.

```shell
$npm install --global --production windows-build-tools
```



## Integrationstestning

Vi har ovan tittat på en testmiljö i JavaScript där vi fokuserade på enhetstester. Vi ska nu bygga vidare på testmiljön och lägga till integrationstester. Vi bygger vidare med mocha och lägger till testverktygen `chai` och `chai http`.

Vi börjar dock med att fundera lite på vad det egentligen är vi vill testa och hur vi testar hela flödet istället för bara de små enheter.

I konferens keynoten nedan pratar skaparen av Ruby on Rails David Heinemeier Hansson (dhh) om hur hans syn på testning och programmering har ändrats genom åren. Hela keynoten är sevärd, men klippet nedan börjar när han pratar om TDD.

<div class='embed-container'><iframe width="560" height="315" src="https://www.youtube.com/embed/9LfmrkyP81M?start=1452" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

I keynoten visar dhh ett citat av Seth Godin.

> _"Just because you can measure it, doesn't mean it's important."_

Vi ändrar det i vår värld till.

> _"Just because you can **test** it, doesn't mean it's important."_

Med det vill jag inte argumentera för att vi inte ska skriva tester, men vi vill skriva tester som testar det som användaren ska använda. Ett sätt att göra det för API:er är att testa routerna precis som de anrops av klienter.



#### Integrationstester

Med integrationstester kan vi få lite mer förtroende i att vårt API fungerar som det är tänkt och på samma sätt som de klienter konsumerar API:t. Jag har gjort nedanstående steg i mitt [me-api](https://github.com/emilfolino/ramverk2-me). Använd exempelkoden där för att skaffa dig en överblick över testmetoden.

Vi använder oss av mocha som vi tittade kort på under förre kursmomentet tillsammans med `chai` och `chai-http`. `chai` är ett 'Assertion Library' och låter oss på ett enkelt och smidigt sätt kolla om JavaScript är lika med det vi vill testa för. `chai-http` låter oss anropa router och kolla om svaren vi får tillbaka matcher det vi förväntar oss. Dokumentationen för dessa två moduler finns på [chai dokumentation](https://www.chaijs.com/) och [chai-http dokumentation](https://www.chaijs.com/plugins/chai-http/).

Vi börjar med att installera de två moduler som ett utvecklings beroende med kommandot.

```shell
$npm install chai chai-http --save-dev
```

Vi börjar sedan i vår fil `app.js` som är vårt utgångspunkt för appen. Här vill exportera en server så vi har möjlighet för att anropa den från test filerna. Vi ändrar sista raderna i den filen till nått liknande nedanstående.

```javascript
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = server;
```

Vi kan då importera `server` i våra test filer och utföra anrop mot servern. Vi skapar för tydlighetens skull filen `test/reports/report_integration.js` och lägger våra tester i den filen. Vi börjar med att sätta vilket nodejs environment vi vill köra testerna som och sedan importerar vi test modulerna och vår `server`.

```javascript
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
```

Vi vill sedan kunna använda ett av de `chai` specifika 'assertions' (påstående) kallad `should` för att på ett oerhört koncist sätt skriva testfall. Vi inkluderar även `chai-http` i `chai`.

```javascript
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);
```

Vi kan nu skriva testfall enligt nedan där vi använder `mocha` och `chai` i kombination för att skriva vår testfall.

```javascript
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Reports', () => {
    describe('GET /reports/kmom01', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/kmom01")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /reports/kmom02', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/kmom02")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });
});
```

Vi ser här hur vi använder `should` tillsammans med andra nyckelord, som `be` och `above`. För en lista av alla dessa nyckelord se [BDD Dokumentationen för chai](https://www.chaijs.com/api/bdd/) och hur vi kan sätta ihop de.

Vi kör testarna på samma sätt som tidigare med `npm test` och får på samma sätt som tidigare kodtäckning med Istanbul. chai testerna körs via mocha så vi behöver inte explicit ange chai när vi kör testerna. Mitt `script` block i `package.json` ser nu ut som följande:

```json
"scripts": {
    "test": "nyc --reporter=html --reporter=text --reporter=clover mocha --timeout 10000",
    "start": "node app.js",
    "clean": "rm -rf node_modules package-lock.json",
},
```



### Testdatabas

Om vi har tester som påverkar databasen vill inte att dessa ska påverka utvecklingsdatabasen och definitivt inte produktionsdatabasen. Därför är det starkt rekommenderat att du skapar en testdatabas. Ett enkelt sätt att returnera korrekt databas beroende på `NODE_ENV` är att skapa en fil `db/database.js`, som gör precis detta. Ett exempel syns nedan där rätt databas returneras beroende på `NODE_ENV`.

```javascript
var sqlite3 = require('sqlite3').verbose();

module.exports = (function () {
    if (process.env.NODE_ENV === 'test') {
        return new sqlite3.Database('./db/test.sqlite');
    }

    return new sqlite3.Database('./db/texts.sqlite');
}());
```

Vi kan sedan hämta korrekt databas genom att anropa `database.js`.

```javascript
const db = require("../db/database.js");
```

För att skapa om en tom test databas för varje körning av testerna kan vi använda följande i vårt script block i `package.json`.

```json
"scripts": {
    "pretest": "bash db/reset_test_db.bash",
    "test": "nyc --reporter=html --reporter=text --reporter=clover mocha --timeout 10000",
    "start": "node app.js",
    "clean": "rm -rf node_modules package-lock.json",
},
```

Och bash-skriptet `db/reset_test_db.bash` är som nedan.

```bash
$(> db/test.sqlite)
cat db/migrate.sql | sqlite3 db/test.sqlite
```

Där `db/migrate.sql` innehåller kod för att skapa tabeller i databasen.



### Exempel

I repona för [auth](https://github.com/emilfolino/auth/tree/master/test) och [Lager API:t](https://github.com/emilfolino/order_api/tree/master/v2/test) som användes i kursen webapp finns det integrationstester med `chai` och `chai-http`. Ta en titt på detta för att se hur det kan se ut med fler testfall.



### Statisk kodvalidering

Denna vecka handlar om tester, men låt oss ta ett litet sidospår och säkerställa att vi även har validering av koden vi skriver, vi vill ha validering av kodstil och en linter. Det finns ett förberett exempel under `/test/validate`.

Eftersom vi utgår från kodstilen som definieras i [`javascript-style-guide`](https://www.npmjs.com/package/javascript-style-guide) så hämtar vi hem den och använder dess konfigurationsfil.

```shell
$npm install javascript-style-guide --save-dev
$cp node_modules/javascript-style-guide/.eslint* .
```

Vi behöver installera validatorn som löser både kodstil och linter.

```shell
$npm install eslint eslint-plugin-react --save-dev
```

Verktyget har flera plugins som kan vara relevanta att lägga till, lite beroende på vilken typ av kod (REACT, `.jsx`, `.pug`, etc) du utvecklar. Jag väljer att lägga till en plugin för REACT, även om den inte används i exemplet. Det finns en referens i konfigurationsfilen som vi lånat, som behöver pluginen.

Nu kan vi köra validatorn och eftersom den redan finns definierade i `package.json` så köra via npm.

```shell
$npm run eslint
```

Vill du köra validatorn som en del av din `npm test` så kan du lägga till det under "posttest" scriptet i `package.json`.

```json
"scripts": {
    "pretest": "bash db/reset_test_db.bash",
    "test": "nyc --reporter=html --reporter=text --reporter=clover mocha --timeout 10000",
    "posttest": "npm run eslint",
    "start": "node app.js",
    "clean": "rm -rf node_modules package-lock.json",
    "eslint": "eslint ."
},
```

När enhetstester körs så genereras kodtäckningen till katalogen `build/`. Det är för att undvika att skräpa ned i katalogen och samla bygg-relaterade filer i en katalog som är enkel att ta bort vid behov. Du kan se detaljer för hur `nyc` konfigureras i dess konfigfil `.nycrc`.



## Funktionstestning

Selenium kan sammanfattas lite kort med: _"Selenium is an umbrella project for a range of tools and libraries that enable and support the automation of web browsers."_

Selenium finns tillgängligt i ett antal språk, bl.a. Java, Python och JavaScript. Det finns [dokumentation för hela projektet](https://seleniumhq.github.io/docs/index.html) men även bara för [Javascript API:et](https://seleniumhq.github.io/selenium/docs/api/javascript/). Jag tycker att JavaScript dokumentationen fungerade bra för att söka upp funktioner och få en hyfsad uppfattning om hur de fungerar.

När man kodar med Selenium behöver man tänka på att det jobbar asynkront med promises, vilket gör att det blir mycket kod med `.then()` och skapande av anonyma funktioner. Nästan alla funktioner i Selenium returnerar ett promise.

Vi använder Selenium tillsammans med Mocha för att det ger oss en bra struktur för våra tester med Test Suit, Test Case, before och after funktioner bl.a.

**OBS!** för er som använder WSL på Windows, jag fick inte Selenium och Mocha att fungera. Jag var tvungen att gå över till Cygwin. Ni kan testa köra det men om det inte fungerar spendera inte för mycket tid på att försöka fixa det. Om någon får det att fungera dock gör ett foruminlägg och dela med er av hur ni gjorde.

Vi går vidare till att sätta igång med att få igång Selenium men först behöver vi en webbsida att testa.



#### Kodmoduler att testa

Vi behöver en kodbas att testa, jag har klippt och klistrat ihop två av exempelprogrammen som finns i kursrepot och skapat [Multipage med en kalkylator](https://github.com/dbwebb-se/ramverk2/tree/master/example/test/functiontest-selenium). Däri kan ni hitta ett fungerande exempel på vad vi kommer gå igenom i denna övningen.



### Selenium i JavaScript

Jag gjorde ett testprogram i `test/functiontest-selenium` för att se hur det fungerade.

```shell
test/functiontest-selenium $ tree .
.
├── package.json
├── src
│   ├── multipage
│   │   ├── index.html
│   │   └── main.js
│   └── style.css
└── test
    └── multipage
        ├── mocha_test.js
        └── simple_test.js
```

Min källkod finns i `src/multipage` och mina selenium tester ligger i `test/multipage`. `simple_test.js` innehåller ett kort exempel för att starta Selenium, hämta en sidas titel och skriva ut den i terminalen. `mocha_test.js` innehåller testerna och använder sig av både Selenium och Mocha.

Om ni kollar i `package.json` ser ni att vi använder paketen mocha, selenium-webdriver och http-server. Mocha och selenium-webdriver är självförklarande, http-server använder vi bara för att köra koden i `src` som om det låg på en server och URL:erna i testerna ser likadana ut för alla. Börja med att installera paketen.

```shell
$npm install
```

**Notera** versionen på selenium-webdriver, när jag installerade det första gången fick jag en alpha build som inte fungerar så kolla att ni har ex. `3.6.0`. Vi går vidare med att starta upp servern och kollar på hur webbsidan ser ut. Efter kommandot öppna din webbläsare och gå till `localhost:8082`.

```shell
$npm start
```

<img src="https://dbwebb.se/image/ramverk2/multipage.png" alt="Multipage exempel i Javascript.">

Om du redan kör en annan tjänst på port 8082 kan du ändra vilken port som ska användas i `package.json`.
Det är en väldigt simpel sida vi ska testa, det enda som är lite avancerat är kalkylatorn. När vi skriver tester nu vill vi testa användarnas upplevelse. T.ex. att knappar och länkar fungerar och saker har rätt färg m.m.



#### Selenium kod

Öppna `simple_test.js` i Atom och kolla på koden.

```javascript
var browser = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.firefox())
    .build();

browser.get("http://localhost:8082/multipage/#!/");
```

Vi börjar med att bygga en driver (`browser`), det är den som sköter vår interaktion med webbsidan. Det finns en mängd inställningar man kan sätta med [Capabilities](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Capabilities.html) men jag sätter bara vilken webbläsare som ska användas. De tillgängliga webbläsarna finns i slutet i Capabilities länken. Sist sätter vi vilken URL weblläsaren ska gå till när man startar testet.

Nu kan vi börja jobba mot webbsidan, vi börjar simpelt med att hämta titeln på sidan med `browser.getTitle()` och skriver ut den.

```javascript
// Two different ways to work with promises
// Way 1
let promise = browser.getTitle();

promise.then(function(title) {
    console.log(title);
});

// Way 2
browser.getTitle().then(function( title ) {
    console.log(title);
});
```

`.getTitle()` returner ett promise som bli klart innan vi kan kan skriva ut värdet. Ovanför kan ni se två vanliga sätt som man jobbar med promises och ".then". Välj det sättet ni föredrar och håll er till det, jag kommer använda den nedre av de två.

Nu har vi lite koll på vad som sker i koden, vi testar köra det.

```shell
$node test/multipage/simple_test.js
Multipage
Multipage
```

Finemang, nu kan vi gå vidare till att bygga ordentliga tester och kör det med Mocha.



#### Selenium med Mocha

`mocha_test.js` innehåller en hel del kod redan så innan ni dyker ner i den kör vi en förklaring av strukturen och börjar lite smått.

Vi börjar överst:

```javascript
const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = require("selenium-webdriver").By;

let browser;
```

Vi importerar lite fler moduler, `selenium-webdriver/testing` wrappar Mocha vilket gör att vi inte behöver importera Mocha utan behöver bara köra testerna med mocha kommandot i terminalen och `assert` borde ni känna igen. När vi ska navigera på webbsidan via koden och få tag på element fungerar det nästan som när vi kodar vanlig JS och hämtar element med t.ex. `document.getElementById()`, men vi behöver använda Seleniums funktioner. [webdriver.findElement()](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/ie_exports_Driver.html#findElement) eller [webdriver.findElements()](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/ie_exports_Driver.html#findElements) och [By modulen](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/by_exports_By.html).

Vi fortsätter med att bygga den vanliga Mocha strukturen i vår kod för att få Test Suite och Cases.

```javascript
// Test Suite
test.describe("Multipage", function() {

    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).build();

        browser.get("http://localhost:8082/multipage/#!/");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    // Test case
    test.it("Test index", function(done) {
        // Check correct title
        browser.getTitle().then(function(title) {
            assert.equal(title, "Multipage");
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Home");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("multipage/#!/"));
        });

        done();
    });



    test.it("Test go to Home", function(done) {
        // Use nav link to go to home page
        browser.findElement(By.linkText("Home")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Home");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("multipage/#!/"));
        });

        done();
    });
});
```

Vi börjar med att lägga in en beforeEach, där vi bygger vår Firefox webdriver och går till sidan vi vill testa. Med `this.timeout(20000);` ökar vi mängden tid som drivern väntar på att något ska ske i webbläsaren. Att starta webbläsaren och gåt till URL:en tog för lång tid på min datorn så jag behöver öka timeout längen. I afterEach stänger vi ner webbläsaren, detta är för att vi inte vill att val i ett test ska påverka nästa test. Om vi hade haft en mer avancerad sida med cookies och session hade vi behövt göra ytterligare steg för att rensa dem mellan testerna. I och med att Selenium är asynkront behöver vi använda [done()](https://mochajs.org/#asynchronous-code) för meddela Mocha när en funktion är klar. Gäller bara de Mocha specifika funktionerna som "it", "afterEach" och "beforeEach".

Sen har vi två test cases där vi kollar att startsidan har rätt title, rubrik och url. Nästa test cases har vi lagt till att kolla så länken till startsidan fungerar och att det fortfarande är rätt värden. Vi hittar rätt länk med [By.linktext()](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/by_exports_By.html#By.linkText), ett av flera sätt för att hitta element. Vi anropar `.click()` på elementet för att emulera att vi själva hade klickat med musen i webbläsaren, jätte smidigt. Vi ser redan nu att vi har duplikation i koden och vi kommer få mer för de andra undersidorna så därför har jag i exempel koden skapat hjälpfunktioner för de vanliga repeterade handlingarna.

I testfallen för kalkylatorn kan ni se mer exempel på att klicka på element och läsa av CSS värden. För att köra alla tester kan ni använda kommandot `npm test`. Det kör alla "*.js" filer som ligger under mappne "test".

En lyckad körning borde se ut som följer:

```shell
$npm test

> multipage-test@1.0.0 test .../ramverk2/example/test/functiontest-selenium
> mocha test/**/*.js

Multipage
Multipage
Multipage
    ✓ Test index
    ✓ Test go to Home (320ms)
    ✓ Test go to About (47ms)
    ✓ Test go to Calculator (78ms)
    ✓ Test color on Calculator (77ms)
    ✓ Test an addition calculation (984ms)


  6 passing (22s)
```



#### Mer Selenium funktionalitet

Något som inte finns i exempelkoden men som man kan göra är att emulera tangentbordstryck med funktionen [sendKeys](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebElement.html#sendKeys) och skicka formulär med [submit](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebElement.html#submit).

Ni borde ha testat köra testerna några gånger nu och har märkt att det går snabbt när testerna körs och man hinner inte se allt som sker. För att komma runt detta kan man använda [takeScreenshot()](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebElement.html#takeScreenshot). Om ni googlar lite kan ni även hitta olika program för att spela in en video av testerna.



#### Kodtäckning med Selenium

Det ska gå att få kodtäckning av Selenium tester med hjälp av [Istanbul](https://github.com/gotwarlost/istanbul/issues/132). Det krävs lite eget arbete och vi vet inte om det funkar, om någon är intresserad är det fritt fram att försöka. Gör gärna ett forum inlägg om det lyckas.



## Continuous Integration

Nu när vi har en `package.json` på plats kan vi fortsätta och sätta igång en CI-kedja för att automatisera våra tester.

Det som sammanhåller alla tester är nu sekvensen `npm install` och `npm test` som installerar det som behövs via `package.json` och sen kör testerna.

```shell
$npm install   # Installerar allt som finns i package.json
$npm test      # Exekvera validatorer och testfall
```

Då bygger vi en CI kedja. Det finns exempelkod i kursrepot under `/test/ci` och jag använder ett repo [janaxs/blackjack](https://github.com/janaxs/blackjack) för att demonstrera hur det ser ut.



### Byggverktyget Travis

Först tar vi en titt på byggsystemet [Travis](https://travis-ci.org/janaxs/blackjack). Syftet med et byggsystem är att checka ut din kod och köra dina tester varje gång du checkar in en ny version av din kod.

I katalogen `/test/ci` ligger en konfigurationsfil `.travis.yml`  som är exempel på konfigurationsfiler för Travis. Om du kikar i filerna ser du referenser till `npm install` och `npm test`. Kopiera över filen eller skapa en `.travis.yml` fil i dina repon och gör en commit till GitHub.

Jag lägger sedan till mitt repo till Travis genom att gå till [Travis](https://travis-ci.org/) och välja "Sign in with GitHub". Gå sedan till "Settings" i menyn som dyker upp under din profilbild. Slå sedan på att Travis ska bygga ditt repo.

Mikael visar i följande video hur han gör det för modulen rem-server.

<div class='embed-container'><iframe width="560" height="315" src="https://www.youtube.com/embed/KGe6r4B3ZSg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



### Kodkvalitet och kodtäckning med Scrutinizer

Avslutningsvis integrerar jag mitt repo mot [Scrutinizer](https://scrutinizer-ci.com/g/janaxs/blackjack/) som är ett verktyg för kodkvalitet och kodtäckning. Verktyget kan exekvera mina tester, visa kodtäckning och analysera min kod ur olika aspekter.

Vi gör på liknande sätt som för Travis att vi skapar en `.scrutinizer.yml` fil och slår på kollar i Scrutinizers gränssnitt.

Ett exempel på en `.scrutinizer.yml` fil finns i Lager API repot [order_api/.scrutinizer.yml](https://github.com/emilfolino/order_api/blob/master/.scrutinizer.yml).

Mikael visar i följande video hur han gör det för modulen rem-server.

<div class='embed-container'><iframe width="560" height="315" src="https://www.youtube.com/embed/Xzq28ZbX6tc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



### CI kedja klar

Då var vår CI kedja klar med flera alternativ för byggsystem, kodtäckning och kodkvalitet.

Du kan ta en närmare titt på mitt demo repo [janaxs/blackjack](https://github.com/janaxs/blackjack) om du vill se valideringsverktyg, enhetstester och CI-kedjan i ett sammanhang i ett repo med nödvändiga konfigurationsfiler.

Denna CI kedja är bara ett exempel på en CI-kedja och det finns många olika verktyg som bygger och granskar din kod.



## Kravspecifikation

Veckans kravspecifikation är uppdelat på backend och frontend och är beskriven nedan.



### Backend

1. Allt som behövs i ditt repo skall installeras vid `npm install`.

1. Välj och integrera ett verktyg för enhetstester. Verktyget skall exekvera dina enhetstester vid `npm test`.

1. Lägg till ett antal enhetstester och integrationstester så du känner förtroende för din kod.

1. Lägg till så att kodtäckning fungerar vid enhetstester och integrationstester.

1. Bygg en CI-kedja och integrera med byggtjänsten Travis som checkar ut ditt repo och utför `npm install` och `npm test`. Badga din README.

1. Integrera ditt repo med kodkvalitets verktyget Scrutinizer. Badga din README.

1. Committa och tagga ditt repon med 2.0.0 eller senare, ladda upp till GitHub och driftsätt.



### Frontend

1. Lägg till routen `/reports/week/4` där beskriver tre (3) stycken simpla use-cases och skriv sedan Selenium tester för att testa dessa use-cases. Data att fylla sidan sidan ska som vanligt komma från Me-API:t.

> Exempel på use-case: "Användaren ska från förstasidan kunna trycka på en länk för att se redovisningstexten för vecka 1."

2. Skapa Selenium-tester för att testa ovanstående tre use-cases.

3. Bygg en CI-kedja och integrera med byggtjänsten Travis som checkar ut ditt repo och utför `npm install` och `npm test`. Badga din README.

4. Integrera ditt repo med kodkvalitets verktyget Scrutinizer. Badga din README.

5. Committa och tagga ditt repon med 4.0.0 eller senare, ladda upp till GitHub och driftsätt.



## Skriva

Vi flyttar denna och kommande två veckorna fokus från inledning till forskningsfrågor och metod. Forskningsfrågor är till för att avgränsa arbetet och för att fokusera vad man ska arbeta med under studiens gång. För mer kunskap om hur en forskningsfråga ska formuleras titta under skrivguiden [syfte](http://skrivguiden.se/skriva/skrivprocessen/#syfte).

I metod beskrivs hur man har tänkt att svara på sina forskningsfrågor. I skrivguiden beskrivs under Uppsatsens delar [metod](http://skrivguiden.se/skriva/uppsatsens_delar/#metod).

Du ska nu formulera en forskningsfråga relaterad till testning. Välj sedan en en metod som kan användas för att svara på forskningsfrågan och beskriv hur du använder metoden.

**Lämna in texten som PDF bilaga till din inlämning på Canvas.**
