# MongoDB



## Läs och titta

Bekanta dig översiktligt med [organisationen kring databasen MongoDB](https://www.mongodb.com/). Övningen (längre ned) kommer vidare utgå från informationen på denna webbplatsen.

Bekanta dig översiktligt med dokumentationen för "[MongoDB Node.js driver](https://docs.mongodb.com/drivers/node/)" vilken är den driver vi kommer använda för att koppla JavaScript i Node.js till MongoDB. Det handlar både om referens-dokumentationen och API-dokumentationen. [Användarexemplen](https://docs.mongodb.com/drivers/node/current/usage-examples/) är ett bra ställe att börja.

Sen låter vi Chief Technical Officer Eliot Horowitz hos [MongoDB](https://www.mongodb.com/) berätta om Dokumentorienterade databaser.

<div class='embed-container'><iframe src="https://www.youtube.com/embed/EE8ZTQxa0AM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



## Exempelkod

Om ni vill titta på ett fullständigt exempelprogram som använder alla dessa tekniker är [auth_mongo](https://github.com/emilfolino/auth_mongo) ett bra ställe att börja. auth_mongo repot är en klon av det auth repo som användes i projektet i kursen webapp. Jag har bytt databasen från SQLite till mongodb.



## Installation MongoDB


I denna artikel installerar vi MongoDB lokalt på din utvecklingsdator, om du vill och har möjlighet kan du använda MongoDB i Docker. Artikeln [MongoDB i Docker](mongodb-docker) visar hur det kan gå till.

Vi kommer sedan använda oss av MongoDB Atlas för att driftsätta vår databas, men mer om det [senare](#mongodb).

I kursrepot finns exempelkod under [db/mongodb](https://github.com/emilfolino/jsramverk/tree/master/db/mongodb).

Om du vill lära dig mer om mongodb utanför kursen är [MongoDB University](https://university.mongodb.com/) en bra resurs.

### Windows

Gå till [MongoDB Community Server](https://www.mongodb.com/download-center/community) och välj ditt operativsystem i listan. Följ sedan installationsinstruktionerna.



### MacOS

Installera med hjälp av pakethanteraren brew med kommandona:

```shell
$brew tap mongodb/brew
$brew install mongodb-community@5.0
```

Starta sedan mongodb som en service med kommandot: `brew services start mongodb-community@5.0`.



### Linux (Debian/Ubuntu)

Vi börjar med att installera `dirmngr`, för att kunna ta hand gpg nycklar, med kommandot `sudo apt-get install dirmngr`. Vi följer sedan de rekommenderade [installationsinstruktionerna hos MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/#using-deb-packages-recommended). Se till att välja rätt operativsystem i menyn.



## Starta klienten

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



### Setup med grunddata

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



### Söka information från databasen

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



### Lägga till och uppdatera data

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



### Bryta ut databas koden

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



### Felhantering av frågor till databasen

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

Finally delen av konstruktionen utförs alltid både när det har gått bra och vid fel.
