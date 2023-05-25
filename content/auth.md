# Auth

<p class="author">Emil Folino</p>

I denna artikeln tittar vi på hur vi kan lägga till autentisering i vårt API.



## Läsa

Nielsen Norman Group är världsledande inom forskningsbaserad User Experience (UX). Följande två artiklar introducerar bra råd för att skapa användbara formulär:

* [Website Forms Usability: Top 10 Recommendations](https://www.nngroup.com/articles/web-form-design/)

* [A Checklist for Registration and Login Forms on Mobile](https://www.nngroup.com/articles/checklist-registration-login/)



## Autentisering

När vi vill autentisera en användare kan det gå till på lite olika sätt. Vi tittade i webapp-kursen hur man kan använda JWT för att autentisera sig mot ett API. Det är även det sättet som beskrivs nedan och som är i implementerad i [auth_mongo](https://github.com/emilfolino/auth_mongo/blob/main/models/auth.js#L217).

Ett annat sätt är att använda sessions-baserad inloggning som vi har tittat på tidigare i programmen. I de allra flesta fallen vill man använda sig av ett befintligt paket för att hantera sessionsinloggning. I node.js är det mest använda paketet [passport.js](http://www.passportjs.org/). passport.js hanterar även olika strategier för att hantera autentisering till exempel via olika sociala medier med hjälp av OAuth.



### Säker hantering av lösenord

När vi sparar lösenord i en databas vill vi göra det så säkert som möjligt. Därför använder vi [bcrypt](https://codahale.com/how-to-safely-store-a-password/).

Vi installerar ett bcrypt paket med npm med hjälp av kommandot `npm install bcryptjs --save`. [Dokumentationen för modulen](https://www.npmjs.com/package/bcryptjs) är som alltid vår bästa vän.

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
const secret = process.env.JWT_SECRET;

jwt.verify(token, secret, function(err, decoded) {
    if (err) {
        // not a valid token
    }

    // valid token
});
```



#### JWT middleware

Vi såg i kmom02 hur vi kan skapa routes som tar emot POST anrop och hur vi kan använda middleware för att köra en funktion varje gång vi har ett anrop till specifika routes. Om vi skapar nedanstående route i vår me-api ser vi hur middleware funktionen `checkToken` ligger som första funktion på routen. Den anropas först och beroende på om `next()` anropas funktionen efter middleware. Vi observerar även hur vi från klientens sida har skickat med token som en del av headers och hur vi hämtar ut det från request-objektet `req`.

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

Vi ser i kodexemplet ovan att vi använder `req.body` när vi tar emot en POST request från en klient och skickar med det in till modulen/modellen vi använder för att skapa rapporten. För att kunna använda `req.body` har vi dessa två rader längst upp i vår `app.js`.

Vi såg i artikeln [Login med JWT](https://dbwebb.se/kunskap/login-med-jwt) kursen webapp hur man kan skicka lösenord med [postman](https://www.getpostman.com/). postman är ett utmärkt verktyg för att manuellt testa ett API. I postman kan man även sätta headers under headers fliken för varje request.

![Postman](https://dbwebb.se/image/ramverk2/postman-headers.png?w=c18)
