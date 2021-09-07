# Backend

<p class="author">Emil Folino och Mikael Roos</p>

Denna veckan tittar vi på hur vi kan skapa ett API som svarar med JSON med hjälp av Express och en dokument-orienterad databas. Databasen vi ska använda heter mongodb och är av typen [NoSQL](https://en.wikipedia.org/wiki/NoSQL).





## Läsa
<!--
Vi ska som en sista del av detta kursmoment bygga ut vår frontend applikation från förra veckan med ett formulär. Nielsen Norman Group är världsledande inom forskningsbaserad User Experience (UX). Följande två artiklar har bra riktlinjer för att skapa formulär.

[Website Forms Usability: Top 10 Recommendations](https://www.nngroup.com/articles/web-form-design/)

[A Checklist for Registration and Login Forms on Mobile](https://www.nngroup.com/articles/checklist-registration-login/) -->

1. Vi vänder oss till dokumentationen för [Node](https://nodejs.org/en/docs/) och [Express](http://expressjs.com/) för att ytterligare se hur vi kan skapa ett API med Express.

1. Bekanta dig översiktligt med [organisationen kring databasen MongoDB](https://www.mongodb.com/). Övningen (längre ned) kommer vidare utgå från informationen på denna webbplatsen.

1. Bekanta dig översiktligt med dokumentationen för "[MongoDB Node.js driver](https://docs.mongodb.com/drivers/node/)" vilken är den driver vi kommer använda för att koppla JavaScript i Node.js till MongoDB. Det handlar både om referens-dokumentationen och API-dokumentationen. [Användarexemplen](https://docs.mongodb.com/drivers/node/current/usage-examples/) är ett bra ställe att börja.



## Titta

Vi ska denna veckan skriva en del asynkron kod och det kan vara bra att ha lite extra bra koll på hur "Event-loop" fungerar i JavaScript. Denna video ger en bra introduktion till hur det fungerar både för frontend och backend.

<div class='embed-container'><iframe src="https://www.youtube.com/embed/8aGhZQkoFbQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

Sen låter vi Chief Technical Officer Eliot Horowitz hos [MongoDB](https://www.mongodb.com/) berätta om Dokumentorienterade databaser.

<div class='embed-container'><iframe src="https://www.youtube.com/embed/EE8ZTQxa0AM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



## Exempelkod

Om ni vill titta på ett fullständigt exempelprogram som använder alla dessa tekniker är [auth_mongo](https://github.com/emilfolino/auth_mongo) ett bra ställe att börja. auth_mongo repot är en klon av det auth repo som användes i projektet i kursen webapp. Jag har bytt databasen från SQLite till mongodb.



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
            msg: "Got a POST request, sending back 201 Created"
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

Ett annat sätt att uppnå samma funktionalitet finns numer tillgängligt direkt i [express](http://expressjs.com/en/api.html).

```javascript
app.use(express.json());
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

![Ett standard felmeddelande när routen saknas.](https://dbwebb.se/image/snapvt17/express-default-404.png?w=w2)

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

![I produktion så visas inte stacktrace för klienten.](https://dbwebb.se/image/snapvt17/express-error-handling-production.png?w=w2)

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



### MongoDB som databas

I denna artikel installerar vi MongoDB lokalt på din utvecklingsdator, om du vill och har möjlighet kan du använda MongoDB i Docker. Artikeln [MongoDB i Docker](mongodb-docker) visar hur det kan gå till.

Vi kommer sedan använda oss av MongoDB Atlas för att driftsätta vår databas, men mer om det [senare](#mongodb).

I kursrepot finns exempelkod under [db/mongodb](https://github.com/emilfolino/jsramverk/tree/master/db/mongodb).

Om du vill lära dig mer om mongodb utanför kursen är [MongoDB University](https://university.mongodb.com/) en bra resurs.



#### Installation MongoDB

##### Windows

Gå till [MongoDB Community Server](https://www.mongodb.com/download-center/community) och välj ditt operativsystem i listan. Följ sedan installationsinstruktionerna.



##### MacOS

Installera med hjälp av pakethanteraren brew med kommandona:

```shell
$brew tap mongodb/brew
$brew install mongodb-community@5.0
```

Starta sedan mongodb som en service med kommandot: `brew services start mongodb-community@5.0`.



##### Linux (Debian/Ubuntu)

Vi börjar med att installera `dirmngr`, för att kunna ta hand gpg nycklar, med kommandot `sudo apt-get install dirmngr`. Vi följer sedan de rekommenderade [installationsinstruktionerna hos MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/#using-deb-packages-recommended). Se till att välja rätt operativsystem i menyn.



#### Starta klienten

Det ska nu gå att starta mongodb klienten med kommandot `mongosh` i din terminal. Kommandot `help` inne i mongodb klienten ger en översikt över tillgängliga kommandon.

```shell
$mongosh
> help
    db.help()                    help on db methods
    db.mycoll.help()             help on collection methods
    sh.help()                    sharding helpers
    rs.help()                    replica set helpers
    help admin                   administrative help
    help connect                 connecting to a db help
    help keys                    key shortcuts
    help misc                    misc things to know
    help mr                      mapreduce

    show dbs                     show database names
    show collections             show collections in current database
    show users                   show users in current database
    show profile                 show most recent system.profile entries with time >= 1ms
    show logs                    show the accessible logger names
    show log [name]              prints out the last segment of log in memory, 'global' is default
    use <db_name>                set current database
    db.foo.find()                list objects in collection foo
    db.foo.find( { a : 1 } )     list objects in foo where a == 1
    it                           result of the last line evaluated; use to further iterate
    DBQuery.shellBatchSize = x   set default number of items to display on shell
    exit                         quit the mongo shell
```

Du som är van vid liknande klienter till andra databaser kan känna igen dig bland de kommandon som erbjuds.

Det finns en manual som hjälper dig igång med [grunderna och baskommandona](https://docs.mongodb.com/manual/mongo/).



#### Skapa en databas

Vi prövar att använda klienten för att skapa en databas och lägga in ett dokument i en collection.

Först skapar vi databasen.

```shell
> use mumin
> show collections
```

Den är tom och innehåller inga collections ännu. Vi skapar en collection genom att lägga ett dokument i den.

```shell
> db.crowd.insertOne( { name: "Mumintrollet" } )
{
        "acknowledged" : true,
        "insertedId" : ObjectId("5a13069000b2ff0b912aeeb6")
}
> show collections
crowd
```

Om jag fyller på ytterligare några dokument så kan det se ut så här när vi frågar efter innehållet i en collection.

```shell
> db.crowd.find()
{ "_id" : ObjectId("5a13069000b2ff0b912aeeb6"), "name" : "Mumintrollet" }
{ "_id" : ObjectId("5a13079100b2ff0b912aeeb7"), "name" : "Sniff" }
{ "_id" : ObjectId("5a13079b00b2ff0b912aeeb8"), "name" : "Snusmumriken" }
{ "_id" : ObjectId("5a1307a900b2ff0b912aeeb9"), "name" : "Snorkfröken" }
```

Vi kan uppdatera samtliga dokument/objekt i vår collection.

```shell
> db.crowd.updateMany({}, {$set: { bor: "Mumindalen" }})
{ "acknowledged" : true, "matchedCount" : 4, "modifiedCount" : 4 }
> db.crowd.find().pretty()
{
        "_id" : ObjectId("5a13069000b2ff0b912aeeb6"),
        "name" : "Mumintrollet",
        "bor" : "Mumindalen"
}
{
        "_id" : ObjectId("5a13079100b2ff0b912aeeb7"),
        "name" : "Sniff",
        "bor" : "Mumindalen"
}
{
        "_id" : ObjectId("5a13079b00b2ff0b912aeeb8"),
        "name" : "Snusmumriken",
        "bor" : "Mumindalen"
}
{
        "_id" : ObjectId("5a1307a900b2ff0b912aeeb9"),
        "name" : "Snorkfröken",
        "bor" : "Mumindalen"
}
>
```

Det finns alltså ett antal vanliga CRUD-operationer vi kan göra för att jobba med datat i databasen. Du kan läsa mer om dessa [CRUD-operationer i manualen](https://docs.mongodb.com/manual/crud/).

Låt oss gå vidare och skapa ett program som använder vår nyskapade databas.



#### Node till MongoDB

Först installerar vi npm-paketet `mongodb` som är en Node driver till databasen MongoDB. Det finns redan i `package.json` så följande kommandon fungerar.

```shell
npm install
npm install mongodb --save
```

Vi kan läsa om [MongoBD Node.JS Driver i dokumentationen](https://mongodb.github.io/node-mongodb-native/). Där finner vi också dokumentationen för API:et och dess metoder.



#### Setup med grunddata

I filen `src/setup.js` finns kod som kopplar upp sig mot MongoDB och skapar databasen mumin, rensar den från innehåll och lägger in en del av befolkningen från mumindalen i en collection `crowd` genom att hämta data från filen `src/setup.json`.

Du kan pröva köra programmet och därefter koppla dig med klienten mongo för att se att datan ligger på plats.

```shell
$node src/setup.js
$mongo --eval "db.crowd.find().pretty()"
MongoDB shell version v3.4.10
connecting to: mongodb://mongodb/mumin
MongoDB server version: 3.4.10
{
        "_id" : ObjectId("5a134ec3c28e762f068f48f1"),
        "name" : "Mumintrollet",
        "bor" : "Mumindalen"
}
{
        "_id" : ObjectId("5a134ec3c28e762f068f48f2"),
        "name" : "Sniff",
        "bor" : "Mumindalen"
}
{
        "_id" : ObjectId("5a134ec3c28e762f068f48f3"),
        "name" : "Snusmumriken",
        "bor" : "Mumindalen"
}
{
        "_id" : ObjectId("5a134ec3c28e762f068f48f4"),
        "name" : "Snorkfröken",
        "bor" : "Mumindalen"
}
```



#### Söka information från databasen

I filen `src/search.js` finns kod som kopplar upp sig mot MongoDB och söker i databasen. Kodexemplet visar på ett par alternativa sätt att jobba med MongoDB avseende den asynkrona biten. Det API som erbjuds bygger på att man kan välja callbacks eller Promise för att hantera det asynkrona flödet.

Låt oss titta på koden.

Först har vi en funktion som kopplar sig mot databasen och en colletion samt utför själva find-operationen.

```javascript
/**
 * Find documents in an collection by matching search criteria.
 *
 * @async
 *
 * @param {string} dsn        DSN to connect to database.
 * @param {string} colName    Name of collection.
 * @param {object} criteria   Search criteria.
 * @param {object} projection What to project in results.
 * @param {number} limit      Limit the number of documents to retrieve.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<array>} The resultset as an array.
 */
async function findInCollection(dsn, colName, criteria, projection, limit) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const res = await col.find(criteria, projection).limit(limit).toArray();

    await client.close();

    return res;
}
```

Funktionen använder konstruktionen async/await för att serialisera flödet mot databasen. Varje metod som jobbar mot databasen, i exemplet ovan, är asynkron och har alternativet att använda callbacks, eller Promise. I koden ovan bygger vi på att ett Promise returneras när respektive metod är avklarad.

En vanlig frågeställning i en async funktion är om await behövs eller inte. För att besvara det behöver man delvis veta om metoden/funktionen returnerar ett Promise eller ej. Här vänder vi oss till API-manualen för respektive metod. Man kommer inte framåt utan att bli bekant med det API man jobbar med. En vanlig fråga är till exempel vad som returneras inom ett Promise, vilka argument man har tillgång till. API manualen ger svaret.

Låt oss titta på hur vi kan använda funktionen ovan. Jag kan visa två alternativ och vi börjar med async/await.

Jag lägger premisserna för sökningen i variabler, för tydlighetens skull.

```javascript
// Find documents where namn starts with string
const criteria2 = {
    namn: /^Sn/
};
const projection2 = {
    _id: 1,
    namn: 1
};
const limit2 = 3;
```

Sedan wrappar jag koden i en _Immediately Invoked Async Arrow Function_ för att kunna använda await inom funktionen.

```javascript
// Do it within an Immediately Invoked Async Arrow Function.
// This is to enable usage of await within the function scope.
(async () => {
    // Find using await
    try {
        let res = await findInCollection(
            dsn, "crowd", criteria2, projection2, limit2
        );
        console.log(res);
    } catch(err) {
        console.log(err);
    }
})();
```

Jag lägger koden inom en traditionell try/catch för att hantera eventuella fel som uppkommer. Jag använder await på `findInCollection()` och lägger svaret i en variabel. På det sättet löser jag serialiseringen.

Vi tittar på en annan variant.

```javascript
(() => {
    // Find using .then()
    findInCollection(dsn, "crowd", criteria1, projection1, limit1)
    .then(res => console.log(res))
    .catch(err => console.log(err));
})();
```

Här finns inget krav på att använda async, ej heller att wrappa koden inom ett funktionsscope. Serialiseringen sköts av `.then()` och felhanteringen i `.catch()`.

Vi hade också kunnat tänka oss en variant av `findInCollection()` som jobbar med callbacks. Funkionen hade isåfall tagit ytterligare ett argument `callback` som hade anropats när funktionen var klar.



#### Lägga till och uppdatera data

Vi har i ovanstående sett hur vi läser data från databasen och i exempelkoden `db/mongodb/src/setup.js` finns ett exempel där funktionen [insertMany](https://docs.mongodb.com/drivers/node/current/fundamentals/crud/write-operations/insert/#insert-multiple-documents) används.

Förutom `insertMany` finns `insertOne` funktionen där man lägger [till ett dokument i databasen](https://docs.mongodb.com/drivers/node/current/fundamentals/crud/write-operations/insert/#insert-a-single-document). Om vi vill lägga till ett dokument med attributen `name` och `html` gör vi på följande sätt.

```javascript
const doc = {
    name: body.name,
    html: body.html,
};

const result = await db.collection.insertOne(doc);
```

MongoDB lägger automatiskt till ett `_id` fält i dokumentet/objektet och vi kan kolla om allt gått bra och titta på det objekt vi har lagt till med följande kod. `result.ops` innehåller det objekt som har lagts till i databasen bland annat det automatgenererade `_id`.

```javascript
if (result.result.ok) {
    return res.status(201).json({ data: result.ops });
}
```

Detta `_id` behövs sedan när vi vill uppdatera dokumentet i databasen. Vi gör det med funktionen [updateOne](https://docs.mongodb.com/drivers/node/current/fundamentals/crud/write-operations/change-a-document/#update). Först importerar vi ObjectId funktionen för att kunna hitta rätt `_id` i databasen. Vi skapar sedan ett `filter` och ett `updateDocument` och använder oss av `updateOne`. Bara de fält som skickas in uppdateras, vill vi ersätta dokumentet istället kan vi använda `replaceOne`.

```javascript
const ObjectId = require('mongodb').ObjectId;

const filter = { _id: ObjectId(body["_id"]) };
const updateDocument = {
    name: body.name,
    html: body.html,
};

const result = await db.collection.updateOne(
    filter,
    updateDocument,
);
```



#### Express till MongoDB

Hur kan det se ut om vi kopplar in databasen MongoDB mot en instans av Express? Låt oss titta på ett exempel i `src/server.js` som exponerar en route `/list` som visar allt innehåll i en collection i databasen.

Vi kan starta upp server och testa att accessa routen.

```shell
$npm start
Server is listening on 1337
```

Via en webbläsare eller curl kan vi nu komma åt routen och med kommadnot jq får vi en renare utskift.

```shell
$curl -s http://localhost:1337/list | jq
[
  {
    "_id": "5a13efb54dbe18550bce601b",
    "namn": "Mumintrollet",
    "bor": "Mumindalen"
  },
  {
    "_id": "5a13efb54dbe18550bce601c",
    "namn": "Sniff",
    "bor": "Mumindalen"
  },
  {
    "_id": "5a13efb54dbe18550bce601d",
    "namn": "Snusmumriken",
    "bor": "Mumindalen"
  },
  {
    "_id": "5a13efb54dbe18550bce601e",
    "namn": "Snorkfröken",
    "bor": "Mumindalen"
  }
]
```

Som vi kunde ana var det inget större bekymmer att flytta in vår kod i en route i express som stödjer async funktioner som callbacks till en route.



#### Bryta ut databas koden

För att få mer DRY kod och för att underlätta för testning lite längre fram i kursen är detta ett bra tillfälle att bryta ut hanteringen av databas uppkopplingen till en egen modul. Jag har i mitt projekt skapat en katalog `db` där jag har lagt filen `database.js`. Här skapar jag först en `dsn` sträng. Om vi håller på att testa koden ändrar jag den till en test databas istället, mer om detta när vi senare i kursen ska testa vår applikation.

Nästa steg är som vi tidigare har gjort i exempelprogrammen att koppla oss mot databasen och som det sista steget att returnera `client` och `collection`.

```javascript
const mongo = require("mongodb").MongoClient;
const config = require("./config.json");
const collectionName = "docs";

const database = {
    getDb: async function getDb () {
        let dsn = `mongodb://localhost:27017/folinodocs`;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;
```

Vi kan sedan i koden hämta databasen, ställa frågor och sedan stänga ner databasen.

```javascript
const db = await database.getDb();
const resultSet = await db.collection.find({}).toArray();

await db.client.close();
```



#### Felhantering av frågor till databasen

Vi har ovan sett en kort introduktion till felhantering. Och här kommer ett lite längre exempel där vi även tittar på hur vi kan stänga ner databasen. Vi använder oss av konstruktionen `try-catch-finally` ([Dokumentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#syntax)).

```javascript
let db;

try {
    db = await database.getDb();

    const filter = { email: email };
    const keyObject = await db.collection.findOne(filter);

    if (keyObject) {
        return res.json({ data: keyObject });
    }
} catch (e) {
    return res.status(500).json({
        errors: {
            status: 500,
            source: "/",
            title: "Database error",
            detail: e.message
        }
    });
} finally {
    await db.client.close();
}
```

Finally delen av konstuktionen utförs alltid både när det har gått bra och vid fel.



## Driftsättning

Molnet eller _the cloud_ har under de senaste 10 åren växt fram enormt fort. Om du vill ha en kort introduktion till molnet kan Bill Laberis' bok _"What is the cloud?"_ rekommenderas. Är inte nödvändigt för att klara kursen, men är snabbläst. Du kommer åt boken via [biblioteket på BTH](https://bibliotek.bth.se/databases?q=o%27reilly) och välj O'reilly. Du ska nu kunna söka på "What is the cloud?" i Sökrutan och första träffen bör vara _"What is the cloud?"_.



#### MongoDB

Vi börjar med att skaffa oss en plats för vår mongodb databas. Vi kommer i kursen använda oss av [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Atlas är en moln-tjänst för databaser.

Skapa en användare genom att klicka på "Start free". Skapa sedan ett cluster genom knappen "Create a New Cluster". Bilden nedan visar de tre olika cluster-typerna och välj här "Shared Clusters" då de är gratis.

![Clusters](https://dbwebb.se/image/jsramverk/mongodb-atlas-choose.png?w=778)

Skapa sedan ett cluster där du väljer en cloud provider och en plats för vart servern ska stå. Se till att under Cluster Tier välja M0 som är gratis varianten.

![Cloud Providers](https://dbwebb.se/img/jsramverk/mongodb-atlas-create.png?w=778)

Efter att vi skapat ett cluster vill vi skapa en användare som får komma åt clustret och de databaser som kommer skapas i clustret. Nedan väljer vi först Database Access och sedan Add New Database User.

![Create User overview](https://dbwebb.se/image/jsramverk/mongodb-atlas-db-user.png?w=778)

Sedan skapar vi en användare för att koppla oss mot databaserna. Välj att vi vill använda lösenord som autentiseringsmetod.

![Create User specifics](https://dbwebb.se/image/jsramverk/mongodb-atlas-create-user.png?w=778)

För att skydda databasen ytterligare kan vi bestämma vilka IP-adresser som får komma åt databasen. Välj Network Access och sedan Add IP Adress.

![Add IP](https://dbwebb.se/image/jsramverk/mongodb-atlas-ip.png?w=778)

Tryck på knappen Allow Access From Anywhere för att lägga till alla IP-adresser det kommer underlätta när vi har driftsatt backend. Blir lite sämre säkerhet, men vi är medvetna om detta och förstår innebörden.

![Add Allow Anywhere](https://dbwebb.se/image/jsramverk/mongodb-atlas-allow-anywhere.png?w=778)

Låt oss nu koppla upp vår applikation mot vår nya databas hos MongoDB atlas. Gå till Clusters fliken i mongodb atlas gränssnittet och tryck på Connect, välj sedan Connect Your application.

![Choose App](https://dbwebb.se/image/jsramverk/mongodb-atlas-connect-app.png?w=778)

Välj sedan korrekt driver och version, senaste bör vara korrekt. Kopiera sedan in detta i din `db/database.js`.

![Choose Driver](https://dbwebb.se/image/jsramverk/mongodb-atlas-connect-url.png?w=778)

Jag valde att skapa en JSON fil för att hantera användarnamn och lösenord till databasen. Jag har exkluderat den från Git genom att fylla i sökvägen till filen i repots `.gitignore`-fil. Min `config.json` fil ser ut som nedan, med ett långt och svårt lösenord skapat i gränssnittet, som värde för password attributet.

```json
{
    "username": "texteditor",
    "password": "..."
}
```

Vilket gör att jag kan skapa min dsn sträng på följande sätt.

```javascript
const config = require("./config.json");

let dsn = `mongodb+srv://${config.username}:${config.password}@cluster0.hkfbt.mongodb.net/folinodocs?retryWrites=true&w=majority`;
```

Vi kan nu verifiera att kopplingen till mongodb atlas fungerar genom att köra igång vår backend lokalt och se att det fungerar som tidigare.



#### Express Appen

Med databasen på plats och vi har verifierad att det fungerar bra fortsätter vi med backend. Vi ska driftsätta vår Express/Node applikation i Microsofts Azure Cloud, men innan vi kommer så långt behöver vi uppdatera så cloudet kan ändra porten som vårt API lyssnar på.

Vi kan utnyttja `process`, som är en global variabel med innehåll om den Node process som vi kör vårt API i. I den kan vi hämta ut miljövariabler och i detta fallet `PORT`. Om vi ändrar till nedanstående kod får vi miljövariabelns värde om den är satt annars vår standard port 1337.

```javascript
const port = process.env.PORT || 1337;
```

Nedanstående är en översiktlig genomgång av denna [Microsoft Guide](https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?pivots=platform-linux), så om du vill ha med alla detaljer välj guiden.

Vi kommer göra dirftsättningen automagiskt via Visual Studio Code, så har du inte den [installerad](https://code.visualstudio.com) är det dags nu.

I Visual Studio Code installerar vi pluginen Azure App Services med hjälp av plugin menyn.

![Installerar pluginen Azure App Services](https://dbwebb.se/image/jsramverk/code-azure-install.png)

Logga sedan in i Azure App Services genom att klicka på länken Sign in to Azure under den nya fliken Azure i din aktivitetsflik längst till vänster. Du ska logga in med din Studentkonto-mail: abcdxx@student.bth.se.

![Logga in i Azure App Services](https://dbwebb.se/image/jsramverk/code-azure-login.png)

Se till att du har Code öppnat för din backend app och klicka sedan på lilla krysset bredvid App Service rubriken. Välj sedan den subscription som dyker upp. Första steget är sedan att välja ett unikt namn. Jag har valt _jsramverk-editor-efostud_ som är mitt fejkade student-akronym så kan vara smart att använda _jsramverk-editor-abcdxx_.

![Namn för din app service](https://dbwebb.se/image/jsramverk/code-azure-deploy-name.png)

Välj sedan stack för din app, 14 LTS är bästa valet.

![Stack för din app service](https://dbwebb.se/image/jsramverk/code-azure-deploy-stack.png)

Välj sedan prisnivå för appen. Ni ska kunna välja mellan Free och B1. Free kan vara lite trögt, så är bäst med B1.

![Price för din app service](https://dbwebb.se/image/jsramverk/code-azure-deploy-pricing.png)

Välj sedan Deploy i den dialog ruta som dyker upp. Nu sätter Code och Azure igång med att driftsätta din app. Efter en stund får du upp en länk med texten Browse Website och du kommer nu till din app.

Om du får problem med att inte ha rättigheter att skapa en server utanför North Europe kan meny-valet "Create New Web app (Advanced)" som nås via att högerklicka på prenumerationen under App Service i Code vara en bra lösning.

![Price för din app service](https://dbwebb.se/image/jsramverk/code-azure-create-advanced.png)



## Kravspecifikation

Denna veckan är uppgiften uppdelat i två delar. En del handlar om backend och en del om hur din frontend applikation ska konsumera backend API:t.



### Del 1: Backend

1. Skapa ett API för att kunna spara dokument från din editor.

1. Se till att det finns en `package.json` i katalogen. Filen skall innehålla alla beroenden som krävs.

1. Skapa en `README.md` fil i ditt repo som beskriver hur man installerar moduler och startar ditt Me-API. Beskriv även hur du har valt att strukturera dina routes.

1. Det ska gå att skapa (**C**reate) och uppdatera (**U**pdate) dokumenter via din editor. Förslagsvis har ett dokument minst namn och innehåll förutom det automatgenererade _id.

1. Det ska gå att hämta alla dokument från API't för att sedan kunna visas upp i din frontend.

1. Committa alla filer och lägg till en tagg (1.0.0) med hjälp av `npm version 1.0.0`. Det skapas automatiskt en motsvarande tagg i ditt GitHub repo. Lägg till fler taggar efterhand som det behövs. Var noga med din commit-historik.

1. Pusha upp repot till GitHub, inklusive taggarna.



### Del 2: Frontend

1. Gör om din editor så att dokument kan skapas och hämtas in i editorn.

1. När ett befintligt dokument ändras ska det uppdateras istället för att skapas om på nytt.

1. Committa alla filer och lägg till en tagg (2.0.0) med hjälp av `npm version 2.0.0`. Det skapas automatiskt en motsvarande tagg i ditt GitHub repo. Lägg till fler taggar efterhand som det behövs. Var noga med din commit-historik.

1. Pusha upp repot till GitHub, inklusive taggarna.

1. Länka till båda dina GitHub repon och den driftsatta klienten i en kommentar till din inlämning på Canvas.



## Skriva

Vi fortsätter iterativt med att förbättra våra forskningsfrågor. Använd den återkopplingen du fick på första veckans frågor och förbättra frågorna.

Gå tillbaka till skrivguiden och titta under [Syfte, problemformulering och forskningsfrågor – att begränsa ämne](http://skrivguiden.se/skriva/skrivprocessen/#syfte) för bra tips.

**Lämna in texten som PDF bilaga till din inlämning på Canvas.**
