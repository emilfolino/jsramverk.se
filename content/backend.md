# Backend

<p class="author">Emil Folino och Mikael Roos</p>

Denna veckan tittar vi på hur vi kan skapa ett API som svarar med JSON med hjälp av Express och en SQLite databas. Vi vänder oss till dokumentationen för [Node](https://nodejs.org/en/docs/) och [Express](http://expressjs.com/) för att ytterligare se vad man kan göra med Express. Låt oss komma igång med grunderna i Express.



## Läsa

Vi ska som en sista del av detta kursmoment bygga ut vår frontend applikation från förra veckan med ett formulär. Nielsen Norman Group är världsledande inom forskningsbaserad User Experience (UX). Följande två artiklar har bra riktlinjer för att skapa formulär.

[Website Forms Usability: Top 10 Recommendations](https://www.nngroup.com/articles/web-form-design/)

[A Checklist for Registration and Login Forms on Mobile](https://www.nngroup.com/articles/checklist-registration-login/)



## Titta

Vi ska denna veckan skriva en del asynkron kod och det kan vara bra att ha lite extra bra koll på hur "Event-loop" fungerar i JavaScript. Denna video ger en bra introduktion till hur det fungerar både för frontend och backend.

<div class='embed-container'><iframe width="560" height="315" src="https://www.youtube.com/embed/8aGhZQkoFbQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



## Exempelkod

Om ni vill titta på två fullständiga exempelprogram som använder alla dessa tekniker är [auth](https://github.com/emilfolino/auth) eller [Lager API:t](https://github.com/emilfolino/order_api) från [webapp-kursen](https://dbwebb.se/kurser/webapp-v3) bra exempel.



## Material

Modulen [Express finns på npm](https://www.npmjs.com/package/express). Express är en del av [MEAN](http://mean.io/) som är en samling moduler för att bygga webbapplikationer med Node.js. I denna artikeln kommer vi att använda Express (E) och Node.js (N) i MEAN.

Innan vi börjar så skapar vi en `package.json` som kan spara information om de moduler vi nu skall använda.

```shell
# Ställ dig i katalogen du vill jobba
$npm init
```

När du ombeds döpa paketet så ange "me-api" eller något liknande (det spelar ingen roll). Använd bara inte "express" eftersom det paketnamnet redan finns och du får problem i nästa steg. Du kan köra om `npm init` om du vill ändra namn, eller redigera namnet direkt i filen `package.json`.

Nu kan vi installera paketen vi skall använda `express`, `cors` och `morgan`. Vi väljer att spara dem i vår `package.json`.

```shell
$npm install express cors morgan --save
```

Vi använder oss av `cors` för att hantera Cross-Origin Sharing problematik och `morgan` för loggning av händelser i API:t.

Då vi inte vill ha `node_modules` katalogen versionshanterad i git skapar vi filen `.gitignore` och lägger "node_modules/" som första rad i den filen.



#### Verifiera att Express fungerar


Låt oss starta upp en server för att se att installationen gick bra.

Jag börjar med kod som startar upp servern tillsammans med en route för `/` och sparar i en fil du själv skapar `app.js`.

```javascript
const express = require("express");
const app = express();

const port = 1337;

// Add a route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
```

Sedan startar jag servern.

```shell
$node app.js
Example API listening on port 1337!
```

Nu kan jag skicka requester till servern via curl.

```shell
$curl localhost:1337
Hello World
```

Om jag använder en route som inte finns så får jag en 404 tillsammans med ett svar som säger att routen inte finns.

```shell
$curl -i localhost:1337/asd
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 134
Date: Wed, 15 Mar 2017 08:47:43 GMT
Connection: keep-alive

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /asd</pre>
</body>
```

Pröva nu samma routes via din webbläsare. Du bör få motsvarande svar även i din webbläsare.

Det verkar som allt gick bra och Express är uppe och snurrar och svarar på tilltal.



#### Låt npm köra dina skript

I filen `package.json` kan du lägga in skript och köra dem via `npm`. Du kan till exempel lägga till skriptet för att starta servern så här.

```json
{
    "scripts": {
        "start": "node app.js"
    }
}
```

Nu kan du starta servern via `npm start`. Det blir ett sätt att samla enklare skript in i din `package.json`.



#### Svara med JSON

I de allra flesta fall vill vi att vårt API svarar med ett JSON svar. För det använder vi `response` objektets inbyggda funktion `json` istället för `send` som vi såg ovan.

```javascript
const express = require("express");
const app = express();

const port = 1337;

// Add a route
app.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
```

I exemplet ovan skickar vi ett JSON objekt när vi skickar en förfrågan till `/`. Vi startar om servern och vi får följande svar om vi testar med curl i terminalen.

```shell
$curl localhost:1337
{"data":{"msg":"Hello World"}}
```



#### Automatisk omstart av node-appen

Vid det har laget har du nog redan börjat tröttna på att starta om din server varje gång du har ändrat i koden, så låt oss göra nått åt detta. Vi använder oss av npm modulen `nodemon` ([Dokumentation](https://www.npmjs.com/package/nodemon)) för att starta om vår node applikation varje gång vi sparar. Vi installerar `nodemon` som ett globalt paket, så vi kan använda det för alla vår node applikationer.

```shell
$npm install -g nodemon
```

För att starta vår applikation i nodemon kontext ändrar vi vårt `npm start` skript.

```json
{
    "scripts": {
        "start": "nodemon app.js"
    }
}
```



#### Routing mot olika request metoder

En route sätts upp för att svara mot en speciell request metod såsom GET, POST, PUT, DELETE. Det är på det sättet man bygger upp en RESTful tjänst.

Här är fyra routes som har samma url, men skiftar i requestens metod.

```javascript
// Testing routes with method
app.get("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a GET request"
        }
    });
});

app.post("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a POST request"
        }
    });
});

app.put("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a PUT request"
        }
    });
});

app.delete("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a DELETE request"
        }
    });
});
```

Om du testar med din webbläsare så blir det en GET request.

För att testa de andra metoderna så använder jag verktygen Postman eller RESTClient som är ett plugin in till Firefox. Med de verktygen kan jag välja om jag skall skicka en GET, POST, PUT, DELETE eller någon annan av de HTTP-metoder som finns. En sådan REST-klient är ett värdefullt utvecklingsverktyg.

Så här ser det ut när jag skickar en request med en annan metod än GET.

![En DELETE request skickas tll servern som svarar från rätt route.](https://dbwebb.se/image/snapvt17/express-rest-client.png?w=w2)

Det var routes och stöd för olika metoder det. Se till att du installerar en klient motsvarande RESTClient och testa din egen server.

Man vill ofta skicka en annan statuskod än 200 när man gör andra typer av requests än GET. Det kan vi göra med `response` objektets inbyggda funktion `status`.

```javascript
// Testing routes with method
app.get("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a GET request, sending back default 200"
        }
    });
});

app.post("/user", (req, res) => {
    res.status(201).json({
        data: {
            msg: "Got a POST request, sending back 201 Created");
        }
    });
});

app.put("/user", (req, res) => {
    // PUT requests should return 204 No Content
    res.status(204).send();
});

app.delete("/user", (req, res) => {
    // DELETE requests should return 204 No Content
    res.status(204).send();
});
```

Vi skickar alltså tillbaka statusen 201 när vi skapar objekt med POST anrop och 204 när vi uppdaterar eller tar bort. Det är enkelt gjort med `status` funktion. Innebörden av alla HTTP status koder finns i [följande lista](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).



#### Route med dynamiskt innehåll

Vi skapar nya routes för att se hur routern hanterar dynamiskt innehåll i form av parametrar.

```javascript
const express = require("express");
const app = express();

const port = 1337;

// Add a route
app.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});

app.get("/hello/:msg", (req, res) => {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
```

Vi kan nu använda följande routes och se vad som händer.

```shell
/
/hello/Hello-World
/hello/Hello World
/hello/Jag kan svenska ÅÄÖ
```

Vi ser att parametern hanteras och kan nås i routen via `req.params`. Vi ser också att mellanslag och svenska tecken hanteras och översätts med `encodeURIComponent()`.

I webbsidan ser det ut som det ska.

![I webbläsaren ser det bra ut, ungefär som man tänkte.](https://dbwebb.se/image/ramverk2/dynamic-routing.png?w=w3)

I terminalen där servern kör ser det ut så här.

```shell
GET
/hello/Jag%20kan%20svenska%20%C3%85%C3%84%C3%96
```

Det vi ser är exempel på hur webbläsaren och servern hanterar encodning av udda tecken.

Webbläsaren konverterar länken, urlencodar, så att mellanslagen byts ut mot `%20`. När länken tas emot som en route och översätts till parametrar, så gör Express en urldecode på innehållet. Detta är sättet som används för att hantera udda tecken i en webblänk och det sker automatiskt av webbläsaren och Express.

Det fungerar så här, om man översätter det till ren JavaScript.

```shell
$node
> a = encodeURIComponent("Jag kan svenska åäö")
'Jag%20kan%20svenska%20%C3%A5%C3%A4%C3%B6'
> b = decodeURIComponent(a)
'Jag kan svenska åäö'
>
```

Det är bra att veta om att det finns en hantering av udda tecken som sker i bakgrunden.

Om man vill använda sig av parametrar tillsammans med HTTP metoderna POST, PUT och DELETE används `body-parser`. Vi importerar modulen längst upp i `app.js`. Och lägger sen till att vi vill göra en parse på bodyn genom följande rader kod.

```javascript
const bodyParser = require("body-parser");

...

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
```



### Middleware - CORS och loggning

I express finns termen "middleware" som benämning på callbacks som anropas innan själva routens hanterare anropas. En middleware kan också vara en hanterare som alltid anropas för alla routes.

Låt oss skapa en sådan middleware, som alltid anropas, oavsett route. Den skall skriva ut vilken route som accessades och med vilken metod.

Vi lägger till middleware via metoden `app.use()`. Vi kan lägga till dem för en specifik route, eller för alla routes.

```javascript
// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});
```

Middleware anropas i den ordningen de är definierade, när de matchar en route. Använd ett anrop till `next()` när du är klar och vill skicka vidare kontrollen till nästa middleware och slutligen till routens hanterare.

Om du vill att denna middleware alltid skall anropas så behöver du lägga den högst upp i din kod.

På serversidan ser du nu delar av innehållet i request-objektet som visar metoden och pathen som anropats, samt eventuellt inkommande parametrar.



#### Loggning med tredjepartsmodul

Vi väljer i vårt API att använda en tredje parts modul `morgan` för loggning. Vi har redan installerad `morgan` som en del av `node_modules` och vi lägger till modulen i `app.js` enligt nedan och använder den inbyggda middleware för att skriva ut loggen. Vi lägger in anropet till `morgan` innan vi anropar några routes då vi vill att loggningen sker för alla routes.

```javascript
const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 1337;

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}
```



### Cross-Origin Resource Sharing (CORS)

Då vi vill att vårt API ska kunna konsumeras av många olika klienter vill vi tillåta att klienter från andra domäner kan hämta information från vårt API. Vi gör även detta med en tredjepartsmodul `cors`, som vi installerade i början av artikeln. På samma sätt som för `morgan` använder vi den inbyggda middleware och använder funktionen `use`.

```javascript
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = 1337;

app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}
```



#### 404 med routes

När användaren försöker nå en route som inte finns så blir det ett svar med statuskod 404.

![Ett standard felmeddelande när routen saknas.](image/snapvt17/express-default-404.png?w=w2)

Man kan lägga till en egen route som blir en "catch all" och agerar kontrollerad hantering av 404.

```javascript
// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});
```

Ovan så använder min hanterare för 404 den inbyggda felhanteraren. Det sker via anropet `next(err)` där `err` är ett objekt av typen `Error`. Min variant är alltså att säga att nu är det felkod 404 och jag överlämnar till den inbyggda felhanteraren att skriva ut felmeddelandet.

![Den inbyggda felhanteraren ger ett fel och en stacktrace.](https://dbwebb.se/image/snapvt17/express-default-error-handler.png?w=w2)

Det finns alltså en inbyggd felhanterare som visar upp information om felet, tillsammans med en stacktrace. Det är användbart när man utvecklar.

När node startar upp Express så är det default i utvecklingsläge. Du kan testa att starta upp i produktionsläge, det ger mindre information i felmeddelandena.

```shell
$NODE_ENV="production" node app.js
```

Nu försvann stacktracen från klienten, men den syns fortfarande i terminalen där servern körs.

![I produktion så visas inte stacktrace för klienten.](image/snapvt17/express-error-handling-production.png?w=w2)

Vi ser till att även skapa ett npm skript för att köra i produktion som vi sedan kan använda på servern. Vi kan då köra `npm run production` för att starta i i produktion.

```json
{
    "scripts": {
        "start": "node app.js",
        "production": "NODE_ENV='production' node app.js"
    }
}
```

När vi utvecklar så blir det enklast att köra development läge (standard). Men när man sätter en server i produktion så får man se till att det också är produktionsläge för felmeddelandena, vilket innebär att visa så lite information som möjligt.



#### En egen hanterare för felutskrift

Vi kan skapa vår egen felhanterare och skicka felmeddelandet som JSON.

En egen felhanterare i Express kan se ut som det `app.use` funktionsanrop längst ner. Vi kombinerar det med vår hanterare för 404 felmeddelande och använder `next(err);` för att skicka vidare felmeddelandet till vår egen hanterare.

```javascript
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});
```

Kom ihåg att en sådan här felhanterare är som all annan middleware och det är viktigt i vilken ordning de ligger. De kan anropas i den ordningen som de definieras.



### Uppdelning av routes

Med tanke på de få routes vi kommer ha tillgängliga i våra API:er hade det inte varit helt orimligt att ha all hantering i `app.js`, men vi väljer ändå att dela upp våra routes då vi gillar bra struktur inför framtida uppskalningar.

Vi skapar katalogen `routes` och i den katalogen skapar vi två stycken filer `index.js` och `hello.js`. Här skapar vi och returnerar ett objekt av typen `express.Router()`.

```javascript
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});

module.exports = router;
```

Vi importerar sedan dessa filer i `app.js` och använder de som routehanterare med ett funktionsanrop till `use`.

```javascript
...

const index = require('./routes/index');
const hello = require('./routes/hello');

...

app.use('/', index);
app.use('/hello', hello);
```

På det sättet håller vi `app.js` liten i storlek och var sak har sin plats.



### En databas

Vi vill koppla vårt API mot en databas för att vi ska kunna hämta och spara data där istället för att bara ha statisk data. I denna del av kursen väljer vi att använda den filbaserade relationsdatabasen SQLite. Senare i kursen kommer vi bekanta oss med [Dokument-orienterade databaser](nosql).

Om du inte har SQLite installerat på din utvecklingsdator installera det via ett installationspaket eller pakethanteraren i ditt operativsystem.

För att kunna spara användare och så småningom redovisningstexter installerar vi npm modulen node-sqlite3 i vårt me-api repo med följande kommando. [Dokumentationen för modulen](https://www.npmjs.com/package/sqlite3) är som alltid vår bästa vän.

```shell
$npm install sqlite3 --save
```

Vi skapar sedan katalogen `db` i vårt repo och i den katalogen filen `texts.sqlite`. Vi ville inte att denna och andra sqlite filer är under versionshantering då de isåfall skriver över vår produktions databas när vi driftsätter så vi lägger till `*.sqlite` i `.gitignore`.

Ett smart drag i detta skedet är att skapa en migrations-fil `db/migrate.sql` som du kan använda för att skapa tabeller. Min migrate-fil innehåller än så länge följande SQL.

```shell
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);
```

Vi har alltså två kolumner `email` och `password` och vi vill att `email` är unik. Vi kan nu med hjälp av följande kommandon skapa tabellen i vår `texts.sqlite` databas.

```shell
$cd db
$sqlite3 texts.sqlite
sqlite> .read migrate.sql
sqlite> .exit
```

Vi kan nu använda `sqlite3` modulen för att lägga till en användare i vår `texts.sqlite` databas på följande sätt.

```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

db.run("INSERT INTO users (email, password) VALUES (?, ?)",
    "user@example.com",
    "superlonghashedpasswordthatwewillseehowtohashinthenextsection", (err) => {
    if (err) {
        // returnera error
    }

    // returnera korrekt svar
});
```



### Säker hantering av lösenord

När vi sparar lösenord i en databas vill göra det så säkert som möjligt. Därför använder vi [bcrypt](https://codahale.com/how-to-safely-store-a-password/).

Ibland kan kombinationen av Windows och npm modulen bcrypt ställa till med stora problem. Ett tips hämtat från [installationsmanualen för bcrypt](https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions#microsoft-windows) är att installare npm paketet `windows-build-tools` med kommandot nedan. Installera det i kommandotolken (cmd) eller Powershell så Windows har tillgång till det.

```shell
$npm install --global --production windows-build-tools
```

Vi installerar bcrypt paketet med npm med hjälp av kommandot `npm install bcryptjs --save`. [Dokumentationen för modulen](https://www.npmjs.com/package/bcryptjs) är som alltid vår bästa vän.

För att hasha ett lösenord med bcrypt modulen importerar vi först modulen och sedan använder vi `bcrypt.hash` funktionen. Antal `saltRounds` definierar hur svåra lösenord vi vill skapa. Ju fler `saltRounds` är svårare att knäcka, men tar också längre tid att skapa och jämföra.

```javascript
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const myPlaintextPassword = 'longandhardP4$$w0rD';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // spara lösenord i databasen.
});
```

Det finns även en promise version av biblioteket om man gillar promise eller async/await teknikerna. Läs mer om det i dokumentationen.

För att jämföra ett sparad lösenord med det användaren skrivit in använder vi `bcrypt.compare`.

```javascript
const bcrypt = require('bcryptjs');
const myPlaintextPassword = 'longandhardP4$$w0rD';
const hash = 'superlonghashedpasswordfetchedfromthedatabase';

bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // res innehåller nu true eller false beroende på om det är rätt lösenord.
});
```

<div class="under-construction">
    <p>Tidigare användes npm-modulen <code>bcrypt</code>, men verkar finnas installationsproblem med modulen i produktion. Därför används nu bcryptjs istället.</p>
</div>



### JSON Web Tokens

Vi har i tidigare kurser använt både sessioner och tokens för att autentisera klienter mot en server. Vi ska i detta stycke titta på hur vi implementerar logiken bakom att skicka JSON Web Tokens från servern till en klient. Vi använder modulen `jsonwebtoken` som vi installerar med kommandot `npm install jsonwebtoken --save` och [dokumentationen finns på npm](https://www.npmjs.com/package/jsonwebtoken).

Vi använder här de två funktioner `sign` och `verify`.

```javascript
const jwt = require('jsonwebtoken');

const payload = { email: "user@example.com" };
const secret = process.env.JWT_SECRET;

const token = jwt.sign(payload, secret, { expiresIn: '1h'});
```

I ovanstående exempel skapar vi `payload` som i detta fallet enbart innehåller klientens e-post. Vi hämtar sedan ut vår `JWT_SECRET` från environment variablerna. En environment variabel sätts i terminalen, både lokalt på din dator och på servern med kommandot `export JWT_SECRET='longsecret'`, där du byter 'longsecret' mot nått långt och slumpmässigt. Se till att denna secret är lång och slumpmässig, gärna 64 karaktärer. `payload` och `secret` blir sedan tillsammans med ett konfigurationsobjekt argument till funktionen `jwt.sign` och returvärdet är vår `token`.

När vi sen vill verifiera en token använder vi funktionen `jwt.verify`. Här skickar vi med token och vår secret som argument. Om token kan verifieras får vi dekrypterat payload och annars ett felmeddelande.

```javascript
jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
        // not a valid token
    }

    // valid token
});
```



#### JWT middleware

Vi såg i guiden [Node.js API med Express](kunskap/nodejs-api-med-express) hur vi kan skapa routes som tar emot POST anrop och hur vi kan använda middleware för att köra en funktion varje gång vi har ett anrop till specifika routes. Om vi skapar nedanstående route i vår me-api ser vi hur middleware funktionen `checkToken` ligger som första funktion på routen. Den anropas först och beroende på om `next()` anropas funktionen efter middleware. Vi observerar även hur vi från klientens sida har skickat med token som en del av headers och hur vi hämtar ut det från request-objektet `req`.

```javascript
router.post("/reports",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => reports.addReport(res, req.body));

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            // send error response
        }

        // Valid token send on the request
        next();
    });
}
```

Vi ser i kodexemplet ovan att vi använder `req.body` när vi tar emot en POST request från en klient och skickar med det in till modulen/modellen vi använder för att skapa rapporten. För att kunna använda `req.body` har vi dessa två rader längst upp i vår `app.js`. Vi har även sett detta i artikeln [Node.js API med Express](kunskap/nodejs-api-med-express#dynamiskt).

```javascript
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
```

I Postman väljer vi att fylla i body fliken istället för params fliken.

Vi såg i artikeln [Login med JWT](https://dbwebb.se/kunskap/login-med-jwt) kursen webapp hur man kan skicka lösenord med [postman](https://www.getpostman.com/). postman är ett utmärkt verktyg för att manuellt testa ett API. I postman kan man även sätta headers under headers fliken för varje request.

![Postman](https://dbwebb.se/image/ramverk2/postman-headers.png?w=c18)



## Kravspecifikation

Denna veckan är uppgiften uppdelat i två delar. En del handlar om backend och en del om hur din frontend applikation ska konsumera backend API:t.



### Del 1: Backend

1. Skapa ett Me-API med nedanstående router.

1. Se till att det finns en `package.json` i katalogen. Filen skall innehålla alla beroenden som krävs.

1. Skapa en `README.md` fil i ditt repo som beskriver hur man installerar moduler och starter ditt Me-API.

1. Skapa routen `GET /` där du ger en presentation av dig själv.

1. Skapa routerna `GET /reports/week/1`, `GET /reports/week/2`, som innehåller data/text för att fylla motsvarande sidor i din Me-applikation.

1. `GET /reports/week/2` ska innehålla en länk till GitHub repot och innehållet från din `README.md` fil.

1. Skapa routerna `POST /register` och `POST /login` för att registrera en användare och logga in.

1. Skapa routen `POST /reports` för att lägga till data. För att kunna använda denna route ska klienten vara autentiserad med hjälp av JWT.

1. Committa alla filer och lägg till en tagg (1.0.0) med hjälp av `npm version 1.0.0`. Det skapas automatiskt en motsvarande tagg i ditt GitHub repo. Lägg till fler taggar efterhand som det behövs. Var noga med din committ-historik.

1. Pusha upp repot till GitHub, inklusive taggarna.



### Del 2: Frontend

1. Din frontend Me-applikation ska hämta innehåll från Me-API:t.

1. Skapa ett registreringsformulär för registrering av användare i Me-API:t.

1. Skapa ett inloggningsformulär för att kunna autentisera användare mot API:t.

1. När en användare är inloggat ska det gå att skapa nya texter för kommande veckor och redigera befintliga texter.

1. Committa alla filer och lägg till en tagg (3.0.0) med hjälp av `npm version 2.0.0`. Det skapas automatiskt en motsvarande tagg i ditt GitHub repo. Lägg till fler taggar efterhand som det behövs. Var noga med din commit-historik.

1. Pusha upp repot till GitHub, inklusive taggarna.

1. Länka till båda dina GitHub repon i en kommentar till din inlämning på Canvas.



## Skriva

Vi fortsätter iterativt med att förbättra våra forskningsfrågor. Använd den återkopplingen du fick på första veckans frågor och förbättra frågorna.

Gå tillbaka till skrivguiden och titta under [Syfte, problemformulering och forskningsfrågor – att begränsa ämne](http://skrivguiden.se/skriva/skrivprocessen/#syfte) för bra tips.

**Lämna in texten som PDF bilaga till din inlämning på Canvas.**
