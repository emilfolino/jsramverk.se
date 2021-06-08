# Auth

<p class="author">Emil Folino</p>

> **Kursmomentet uppdateras** Kursen håller på att göras om inför kurstillfället HT2021. Kursmaterial för 2020 finns på [https://2020.jsramverk.se/](https://2020.jsramverk.se/).

Denna veckan tittar vi på hur vi kan lägga till autentisering i vårt API och implementerar login-formulär på frontend.

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

Vi såg i guiden [Node.js API med Express](https://dbwebb.se/kunskap/nodejs-api-med-express) hur vi kan skapa routes som tar emot POST anrop och hur vi kan använda middleware för att köra en funktion varje gång vi har ett anrop till specifika routes. Om vi skapar nedanstående route i vår me-api ser vi hur middleware funktionen `checkToken` ligger som första funktion på routen. Den anropas först och beroende på om `next()` anropas funktionen efter middleware. Vi observerar även hur vi från klientens sida har skickat med token som en del av headers och hur vi hämtar ut det från request-objektet `req`.

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

Vi ser i kodexemplet ovan att vi använder `req.body` när vi tar emot en POST request från en klient och skickar med det in till modulen/modellen vi använder för att skapa rapporten. För att kunna använda `req.body` har vi dessa två rader längst upp i vår `app.js`. Vi har även sett detta i artikeln [Node.js API med Express](https://dbwebb.se/kunskap/nodejs-api-med-express#dynamiskt).

```javascript
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
```

I Postman väljer vi att fylla i body fliken istället för params fliken.

Vi såg i artikeln [Login med JWT](https://dbwebb.se/kunskap/login-med-jwt) kursen webapp hur man kan skicka lösenord med [postman](https://www.getpostman.com/). postman är ett utmärkt verktyg för att manuellt testa ett API. I postman kan man även sätta headers under headers fliken för varje request.

![Postman](https://dbwebb.se/image/ramverk2/postman-headers.png?w=c18)
