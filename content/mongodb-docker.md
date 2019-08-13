# MongoDB i Docker

<p class="author">Emil Folino, Mikael Roos</p>

I denna artikel tänkte jag använda Docker och den [officiella imagen mongo](https://store.docker.com/images/mongo).

Så här blir min `docker-compose.yml` för att starta upp servern. Du hittar den i kursrepot i katalogen `example/db/mongodb`.

```shell
version: '3'
services:
    mongodb:
        image: mongo
        environment:
            - MONGO_DATA_DIR=/data/db
        volumes:
            - ./data/db:/data/db
        ports:
            - 27017:27017
        command: mongod --bind_ip_all
```

Lokalt i min katalog har jag `data/db` som kommer att innehålla själva databasen, katalogen skapas om jag inte har den. Porten 27017 är standardporten för MongoDB.

Nu kan du starta kontainern.

```shell
$docker-compose up mongodb
```

Utskrifterna som kommer från kontainern visar du om allt går bra.

Då behöver vi en klient.



## Klient till MongoDB


Klienten heter `mongo` och finns redan installerad i kontainern. Vi kan använda den för att koppla upp oss mot servern. För att göra det så använder vi kontainerns service namn som är `mongodb` enligt `docker-compose.yml`.

Vi kör alltså klienten inuti kontainern och koppar oss till servern som ligger i kontainern som har service namnet `mongodb`. Kommandot blir `mongo mongdb://[service name]`.

```shell
$docker-compose run mongodb mongo mongodb://mongodb/
MongoDB shell version v3.4.10
connecting to: mongodb://mongodb/
Welcome to the MongoDB shell.
>
```

Det blev många _mongo_ på den raden. Se till att du har koll på vad som är applikationen, service namnet och protokolldelen (`mongodb://`).


Om vi har installerat klienten lokalt så kan vi koppla upp oss direkt mot servern då kontainern lyssnar på standardporten som är mappad till vår localhost.

```shell
$mongo
MongoDB shell version: 3.2.17
connecting to: test
>
```

Vi kan alltså installera klienten via vår pakethanterare till vår lokala dator. Det skadar inte att ha en sådan installation tillhanda. Konsultera [manualen](https://docs.mongodb.com/manual/administration/install-community/) för instruktioner om hur du installerar på ditt system.

Använd den inbyggda hjälpen via `mongo --help` eller läs i [referensmanualen för kommandot mongo](https://docs.mongodb.com/manual/reference/program/mongo/).

När du väl har startat en koppling så man du skriva `help` för att se vilka möjligheter som finns.

```shell
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



## Docker till Docker

Kan vi då köra en kontainer med Express och en kontainer med MongoDB och låta kontainern för Express komma åt databasen i kontainern som kör MongoDB? Vi vill alltså köra hela vår applikation i en svärm av Docker-kontainers.

Vi har sedan tidigare sett hur kontainern för MongoDB ser ut. Nu lägger vi till en kontainer för Express i vår `docker-compose.yml` och låter dem samverka.

Till vår kontainer för Express bygger vi en egen image baserad på en Dockerfile `Dockerfile` som du ser i exempelkatalogen.

```shell
# Use a base image
FROM node:alpine

# Create a workdir
RUN mkdir -p /app
WORKDIR /app

# Install npm packages
COPY package.json /app
RUN npm install
```

Vi använder en alpine-image för att spara utrymme på disk. Alla npm-moduler installeras i imagen, inklusive paketen express och mongodb.

I `docker-compose.yml` definierar vi tjänsten för `express`.

```shell
version: '3'
services:
    express:
        build:
            context: .
            dockerfile: Dockerfile
        volumes:
            - ./:/app/
            - /app/node_modules/
        ports:
            - 1337:1337
        command: "node src/server.js"
```

Om vi startar upp kontainern enligt ovan så kan vi nå tjänsten med curl.

```shell
$docker-compose up express
```

```shell
$curl http://localhost:1337
Hello World
```

Om vi startar upp kontainern för mongodb så vet vi sedan tidigare att den går att nå utifrån.

```shell
$docker-compose up mongodb
```

```shell
$docker-compose run mongodb mongo mongodb://mongodb/mumin --eval "db.crowd.find().pretty()"
```

Då har vi två kontainer och båda svarar var för sig. Så långt är allt väl.

Om vi försöker nå routen `/list` så innebär det att express-applikationen försöker koppla sig till databasen med den hårdkodade DSN som vi valt. I exemplet var det `mongodb://localhost:27017/mumin`. Nu lär det inte fungera längre eftersom MongoDB inte snurrar på localhost, utifrån express-kontainerns perspektiv.

Det kan se ut så här.

```javascript
$curl -s http://localhost:1337/list | jq
{
  "name": "MongoError",
  "message": "failed to connect to server [localhost:27017] on first connect [MongoError: connect ECONNREFUSED 127.0.0.1:27017]"
}
```

Nåväl, vi hade förberett oss och kan använda environmentvariabler för att berätta vilken DSN som skall användas.

```javascript
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/mumin";
```

En mindre uppdatering till express-kontainern ger följande.

```shell
express:
    environment:
        - DBWEBB_DSN=mongodb://mongodb:27017/mumin
    links:
        - mongodb
```

Märk att `//mongodb` är namnet på den kontainer som kör MongoDB. Docker har ett eget nätverk där tjänsternas namn identifierar dem och gör det enkelt att koppla ihop kommunikationen mellan flera kontainrar.

Den andra delen med `links` är inte nödvändig för att kommunikation skall ske. Men den uttrycker ett beroende mellan kontainrar och bestämmer ordningen för uppstart av kontainera. I detta fallet kommer tjänsten `mongodb` att starta upp innan tjänsten `express`.

Om vi nu försöker nå routen `/list` igen så bör vi få ett lyckat resultat.

```shell
$curl -s http://localhost:1337/list | jq .[0]
{
  "_id": "5a13efb54dbe18550bce601b",
  "namn": "Mumintrollet",
  "bor": "Mumindalen"
}
```

[Kommandot jq](https://stedolan.github.io/jq/manual/) hjälpte oss att bara visa första elementet i arrayen.

Som referens kan vi så se den slutliga filen `docker-compose.yml`.

```shell
version: '3'
services:
    express:
        build:
            context: .
            dockerfile: Dockerfile
        environment:
            - DBWEBB_DSN=mongodb://mongodb:27017/mumin
        volumes:
            - ./:/app/
            - /app/node_modules/
        ports:
            - 1337:1337
        links:
            - mongodb
        command: "node src/server.js"

    mongodb:
        image: mongo
        environment:
            - MONGO_DATA_DIR=/data/db
        volumes:
            - ./data/db:/data/db
        ports:
            - 27017:27017
        command: mongod
```

Det får avsluta ett gott dagsverke.

Så här kan det se ut när du kör igenom allt i en terminal.

![Databasen MongoDB tillsammans med klient, express och samlad i Docker.](https://dbwebb.se/image/snapht17/kmom05-summary.png?w=w3)
