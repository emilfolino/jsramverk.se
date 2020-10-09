# NoSQL

<p class="author">Emil Folino, Mikael Roos</p>

Vi användar en NoSQL databas för att spara data och jämför med relationsdatabaser.

## Läsa

Kika igenom följande material.

1. Bekanta dig översiktligt med [organisationen kring databasen MongoDB](https://www.mongodb.com/). Övningen (längre ned) kommer vidare utgå från informationen på denna webbplatsen.

1. Läs översiktligt igenom [Wikipedia om NoSQL](https://en.wikipedia.org/wiki/NoSQL) för en introduktion till konceptet NoSQL samt en översikt av de olika typer av databaser som ligger under samlingsnamnet. Du kan se att MongoDB är en dokumentorienterad databas.

1. Bekanta dig översiktligt med dokumentationen för "[MongoDB Node.js driver](http://mongodb.github.io/node-mongodb-native/)" vilken är den driver vi kommer använda för att koppla JavaScript i Node.js till MongoDB. Det handlar både om referens-dokumentationen och API-dokumentationen.

1. Läs igenom inledande tutorials för MongoDB Node.js driver som du hittar i Referensmanualen. Titta främst i "Connect to MongoDB", "Collections", "CRUD Operations" och "Projections". De ger dig snabbt en känsla av hur man jobbar med datan.



## Titta

Vi låter Chief Technical Officer Eliot Horowitz hos [MongoDB](https://www.mongodb.com/) berätta om Dokumentorienterade databaser.

<div class='embed-container'><iframe width="560" height="315" src="https://www.youtube.com/embed/EE8ZTQxa0AM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



## Material och tekniker

I denna artikel installerar vi MongoDB lokalt på din utvecklingsdator, om du vill och har möjligt kan du använda MongoDB i Docker. Artikeln [MongoDB i Docker](mongodb-docker) visar hur det kan gå till.

I kursrepot finns exempelkod under [db/mongodb](https://github.com/emilfolino/jsramverk/tree/master/db/mongodb).



### Installera MongoDB

#### Windows

Gå till [MongoDB Community Server](https://www.mongodb.com/download-center/community) och välj ditt operativsystem i listan. Följ sedan installationsinstruktionerna.



#### MacOS

Installera med hjälp av pakethanteraren brew med kommandona:

```shell
$brew tap mongodb/brew
$brew install mongodb-community
```

Starta sedan mongodb som en service med kommandot: `brew services start mongodb-community`.



#### Linux (Debian/Ubuntu)

Följ installationsinstruktionerna under [Driftsättning på servern](#driftsattning-pa-servern).



### Starta klienten

Det ska nu gå att starta mongodb klienten med kommandot `mongo` i din terminal. Kommandot `help` inne i mongodb klienten ger en översikt över tillgängliga kommandon.

```shell
$mongo
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



### Skapa en databas

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



### Node till MongoDB

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



<!-- ### Vilken asynkron programmeringsteknik är bäst?

Att koda i Node.js innebär asynkron programmering. Det finns olika alternativ till att serialisera flödet där det behövs, eller att göra det mer öppet för parallell exekvering. Asynkron programmering kan kräva lite tid att anpassa sig till, om man är ovan. Man behöver få en känsla för var som är synkront och vad som är asynkront. Man vill få en känsla för hur man kan debugga flödet i en asynkron applikation.

De konstruktioner vi har tittat på är kopplade till olika delar av standarden för JavaScript, det innebär att det kan finnas restriktioner för vilket stöd de har, beroende på den miljö man jobbar i.

Mitt bästa tips är att ge den asynkrona programmeringsmodellen tid att sätta sig och skriv om din kod tills den blir läsbar och har ett tydligt flöde.



#### Asynkrona enhetstester


När man tänker asynkrona enhetstester så är det inget större bekymmer. Tittar vi på Mocha så ser vi att [deras asynkrona enhetester](https://mochajs.org/#asynchronous-code) fungerar med både callbacks, Promise och async/await. -->



### Express till MongoDB

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



## Driftsättning

Vi börjar med att installera `dirmngr`, för att kunna ta hand gpg nycklar, med kommandot `sudo apt-get install dirmngr`. Vi följer sedan de rekommenderade [installationsinstruktionerna hos MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/#using-deb-packages-recommended).

Vi startar mongodb servicen med kommandot `sudo service mongod start` och kollar sedan i log filen att allt har gått bra, vi använder kommandot nedan.

```shell
$sudo cat /var/log/mongodb/mongod.log | grep 27017
```

I utskriften ser vi (förhoppningsvis) längst ner: `I NETWORK  [initandlisten] waiting for connections on port 27017`.

Nu kan vi köra kommandot `mongo` och använda mongodb databasen och mongodb skalet precis som tidigare, när mongodb låg i Docker. Ett fungerande driftsatt exempel finns på följande sida [https://mongodb.jsramverk.se/](https://mongodb.jsramverk.se/).



## Kravspecifikation

I denna veckans inlämningsuppgift ska både backend och frontend uppdateras så att det är möjligt att spara meddelanden från chatten.

1. Skapa en möjlighet för att spara de nuvarande inlägg som finns i chatten. Ett tips är att spara undan alla inlägg när de kommer in till en passande datastruktur i klienten.

1. Skapa en möjlighet för att läsa de gamla sparade inläggen i chatten.

1. Committa alla filer och lägg till en tagg (6.0.\*) för frontend och (4.0.\*) för backend.

1. Pusha upp repon till GitHub, inklusive taggarna.

1. Driftsätt på din server.



## Skriva

Vi fortsätter iterativt med att förbättra vårt akademiska skrivande. Använd den återkopplingen du fick på förra veckans metodbeskrivning och förbättra beskrivningen.

Gå tillbaka till skrivguiden och titta under [metod](http://skrivguiden.se/skriva/uppsatsens_delar/#metod) för bra tips.

**Lämna in texten som PDF bilaga till din inlämning på Canvas.**
