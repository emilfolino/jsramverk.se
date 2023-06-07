# Driftsättning

Molnet eller _the cloud_ har under de senaste 10 åren växt fram enormt fort. Om du vill ha en kort introduktion till molnet kan Bill Laberis' bok _"What is the cloud?"_ rekommenderas. Är inte nödvändigt för att klara kursen, men är snabbläst. Du kommer åt boken via [biblioteket på BTH](https://bibliotek.bth.se/databases?q=o%27reilly) och välj O'reilly. Du ska nu kunna söka på "What is the cloud?" i Sökrutan och första träffen bör vara _"What is the cloud?"_.



## MongoDB

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

Jag väljer att använda mig av [npm paketet](https://www.npmjs.com/package/dotenv) `dotenv` för att hantera användarnamn och lösenord till databasen. Vi installerar paketet genom att skriva `npm install --save dotenv`. Vi kan sedan skapa en fil `.env` i roten av vår backend-katalog. Jag har exkluderat `.env` från Git genom att fylla i sökvägen till filen i repots `.gitignore`-fil.

Vi nu fylla i användarnamn och lösenord i filen `.env`:

```text
ATLAS_USERNAME="YOUR_USERNAME"
ATLAS_PASSWORD="YOUR_PASSWORD"
```
Högst upp i din fil `app.js` kan du nu köra anropet `require('dotenv').config()`.


Vilket gör att jag kan skapa min dsn sträng på följande sätt.

```javascript
let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.hkfbt.mongodb.net/folinodocs?retryWrites=true&w=majority`;
```

Vi kan nu verifiera att kopplingen till mongodb atlas fungerar genom att köra igång vår backend lokalt och se att det fungerar som tidigare.



## Express Appen

Med databasen på plats och vi har verifierad att det fungerar bra fortsätter vi med backend. Vi ska driftsätta vår Express/Node applikation i Microsofts Azure Cloud, men innan vi kommer så långt behöver vi uppdatera så cloudet kan ändra porten som vårt API lyssnar på.

Vi kan utnyttja `process`, som är en global variabel med innehåll om den Node process som vi kör vårt API i. I den kan vi hämta ut miljövariabler och i detta fallet `PORT`. Om vi ändrar till nedanstående kod får vi miljövariabelns värde om den är satt annars vår standard port 1337.

```javascript
const port = process.env.PORT || 1337;
```

Nedanstående är en översiktlig genomgång av denna [Microsoft Guide](https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?pivots=platform-linux), så om du vill ha med alla detaljer välj guiden.

Vi kommer göra driftsättningen automagiskt via Visual Studio Code, så har du inte den [installerad](https://code.visualstudio.com) är det dags nu.

I Visual Studio Code installerar vi pluginen Azure App Services med hjälp av plugin menyn.

![Installerar pluginen Azure App Services](https://dbwebb.se/image/jsramverk/code-azure-install.png)

För att vi ska ha säker tillgång till våra konto på Azure är Multi-Factor Authentication (MFA) påslaget. Via [Studentportalen](https://studentportal.bth.se/genomfor-studierna/it-verktyg/studentkonto/) finns det guider för hur man använder MFA. Se bilden under för att hitta guiderna.

![Multi-Factor Authentication](https://dbwebb.se/image/jsramverk/mfa.png)

Logga sedan in i Azure App Services genom att klicka på länken Sign in to Azure under den nya fliken Azure i din aktivitetsflik längst till vänster. Du ska logga in med din Studentkonto-mail: abcdxx@student.bth.se.

![Logga in i Azure App Services](https://dbwebb.se/image/jsramverk/code-azure-login.png)

Se till att du har Code öppnat för din backend app och klicka sedan på lilla krysset bredvid App Service rubriken. Välj sedan den subscription som dyker upp. Första steget är sedan att välja ett unikt namn. Jag har valt _jsramverk-editor-efostud_ som är mitt fejkade student-akronym så kan vara smart att använda _jsramverk-editor-abcdxx_.

![Namn för din app service](https://dbwebb.se/image/jsramverk/code-azure-deploy-name.png)

Välj sedan stack för din app, senaste LTS är bästa valet.

![Stack för din app service](https://dbwebb.se/image/jsramverk/code-azure-deploy-stack.png)

Välj sedan prisnivå för appen. Ni ska kunna välja mellan Free och B1. Free kan vara lite trögt, så är bäst med B1.

![Price för din app service](https://dbwebb.se/image/jsramverk/code-azure-deploy-pricing.png)

Välj sedan Deploy i den dialog ruta som dyker upp. Nu sätter Code och Azure igång med att driftsätta din app. Efter en stund får du upp en länk med texten Browse Website och du kommer nu till din app.

Om du får problem med att inte ha rättigheter att skapa en server utanför North Europe kan meny-valet "Create New Web app (Advanced)" som nås via att högerklicka på prenumerationen under App Service i Code vara en bra lösning.

![Price för din app service](https://dbwebb.se/image/jsramverk/code-azure-create-advanced.png)



## Driftsättning frontend

Vi har än så länge visat upp våra applikationer med hjälp av ramverkens inbyggda webbservrar. Men för att de applikationer vi skapar med hjälp av ramverken ska få ett värde för andra än oss själva ska de självklart ut på internet och ha ett liv.

Vi har under utvecklingen av vår applikation använd oss av ett `start` eller `serve` kommando. Dessa kommandon bygger i botten på `webpack` och sedan en inbyggt webbserver som har använts för att visa upp filerna.

När vi ska driftsätta sker det på ett lite annat sätt. Alla ramverken har ett inbyggt `build` kommando som med hjälp av webpack packar ihop filerna till produktionsfiler och lägger dessa i en `dist/` eller `build/` katalog. Dessa filer kan vi sedan visa upp med en vanlig webbserver till exempel studentservern. Vi har tidigare använt `dbwebb`-kommandot för att publicera innehåll till studentservern. Vi ska nu titta på hur vi kan göra det med hjälp av `rsync`, som ligger till grund för mycket av `dbwebb publish`.



### Angular

Angulars CLI ger oss möjlighet för att skapa produktionsfiler med kommandot `ng build` som kan anropas med `npm run build` i vårt projekt. `build` kommandot skapar en katalog `dist/projekt_namn/` som innehåller HMTL, CSS och JavaScript filer, samt lite annat smått och gott.

Om vi skickar upp denna katalogen till vår användares `www`-katalog på studentservern har vi driftsatt vår applikation. Vi kommer använda `rsync` för att kopiera upp filerna till studentservern. `-av` står för archive och verbose, så vi tar med kataloger och vi skriver ut vad som händer. `--delete` gör att vi tar bort filer på mottagersidan som inte finns lokalt.

```shell
$rsync -av --delete dist/projekt_namn/ AKRONYM@ssh.student.bth.se:www/editor
```

Om `rsync` inte hittar rätt ssh nyckel kan man testa med kommandot nedan där vi specificerar vilken nyckel vi vill använda.

```shell
$rsync -av --delete -e "ssh -i $HOME/.ssh/dbwebb" dist/projekt_namn/ AKRONYM@ssh.student.bth.se:www/editor
```

Vi kan nu gå till `www.student.bth.se/~AKRONYM/editor` och se en vit sida. Detta beror på att filerna skapas med utgångspunkten att de ska driftsättas i en rot-katalog och inte som vi har gjort det i editor katalogen. Vi kan se till att vår sida kan driftsättas i editor-katalogen genom att skicka med `--base-href './'` till `ng build` kommandot så vårt kommando blir:

```shell
$ng build --prod --base-href './'
```

Vi kan förenkla flödet ytterligare genom att lägga till ett npm script som vi kan använda varje gång vi vill driftsätta.

```json
"scripts": {

  "deploy": "ng build --prod --base-href './' && rsync -av --delete build/ AKRONYM@ssh.student.bth.se:www/editor"

}
```



### React

När vi skapade vår app med hjälp av `create-react-app` fick vi med ett `npm script` för att skapa produktionsfiler. Vi kan köra detta sciptet med `npm run build`. Scriptet skapar en katalog `build/` som innehåller HMTL, CSS och JavaScript filer, samt lite annat smått och gott.

Om vi skickar upp denna katalogen till vår användares `www`-katalog på studentservern har vi driftsatt vår applikation. Vi kommer använda `rsync` för att kopiera upp filerna till studentservern. `-av` står för archive och verbose, så vi tar med kataloger och vi skriver ut vad som händer. `--delete` gör att vi tar bort filer på mottagersidan som inte finns lokalt.

```shell
$rsync -av --delete build/ AKRONYM@ssh.student.bth.se:www/editor
```

Om `rsync` inte hittar rätt ssh nyckel kan man testa med kommandot nedan där vi specificerar vilken nyckel vi vill använda.

```shell
$rsync -av --delete -e "ssh -i $HOME/.ssh/dbwebb" build/ AKRONYM@ssh.student.bth.se:www/editor
```

Vi kan nu gå till `www.student.bth.se/~AKRONYM/editor` och se en vit sida. Anledningen till detta är att React skapar `build`-katalogen med utgångspunkt i att den ska driftsättas i en rot-katalog och inte som vi har gjort det i editor katalogen. Vi kan använda oss av `homepage`-attributet i vår `package.json`. Vi sätter det till `"homepage": "."` vilket gör att de första raderna i min fil ser ut så här:

```json
{
  "name": "jsramverk-editor",
  "version": "0.1.0",
  "private": true,
  "homepage": ".",
  "dependencies": {

  }
}
```

Vi kan förenkla flödet ytterligare genom att lägga till ett npm script som vi kan använda varje gång vi vill driftsätta.

```json
"scripts": {

  "deploy": "npm run build && rsync -av --delete build/ AKRONYM@ssh.student.bth.se:www/editor"

}
```



### Vue

Vues CLI ger oss möjlighet för att skapa produktionsfiler med kommandot  `npm run build` i vårt projekt. `build` kommandot skapar en katalog `dist/` som innehåller HMTL, CSS och JavaScript filer, samt lite annat smått och gott.

Om vi skickar upp denna katalogen till vår användares `www`-katalog på studentservern har vi driftsatt vår applikation. Vi kommer använda `rsync` för att kopiera upp filerna till studentservern. `-av` står för archive och verbose, så vi tar med kataloger och vi skriver ut vad som händer. `--delete` gör att vi tar bort filer på mottagersidan som inte finns lokalt.

```shell
$rsync -av --delete dist/ AKRONYM@ssh.student.bth.se:www/editor
```

Om `rsync` inte hittar rätt ssh nyckel kan man testa med kommandot nedan där vi specificerar vilken nyckel vi vill använda.

```shell
$rsync -av --delete -e "ssh -i $HOME/.ssh/dbwebb" dist/projekt_namn/ AKRONYM@ssh.student.bth.se:www/editor
```

Vi kan nu gå till `www.student.bth.se/~AKRONYM/editor` och se en vit sida. Detta beror på att filerna skapas med utgångspunkten att de ska driftsättas i en rot-katalog och inte som vi har gjort det i editor katalogen. Vi kan se till att vår sida kan driftsättas i editor-katalogen genom att använda oss av [Vues konfigurationsfil](https://cli.vuejs.org/config/#global-cli-config) `vue.config.js`. Skapa filen i roten av ditt projekt med följande innehåll.

```javascript
module.exports = {
  publicPath: "./",
};
```

Vi kan förenkla flödet ytterligare genom att lägga till ett npm script som vi kan använda varje gång vi vill driftsätta.

```json
"scripts": {

  "deploy": "npm run build && rsync -av --delete dist/ efostud@ssh.student.bth.se:www/editor"

}
```
