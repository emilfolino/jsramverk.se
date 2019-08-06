# Driftsättning av frontend

Vi ska i denna artikel titta på hur vi driftsätter appar vi har skapat med hjälp av dessa ramverk på vår server.



## Domän

Vi vill i de flesta fall lägga våra alster på en domän eller subdomän. Vi har redan pekat al trafik från registratorn namecheap till vårt Cloud i Digital Ocean. Vi behöver därför bara skapa en subdomän i Digital Ocean. Vi gör det på samma sätt som i "[Node.js API med Express](kunskap/nodejs-api-med-express)". Gå till Networking och välj din domän skriv sedan in din subdomän välj din droplet och skapa subdomänen.

[FIGURE src=image/ramverk2/do-subdomain.png?w=w3 caption="Digital Ocean subdomän"]

Ibland kan det ta en liten stund innan subdomäner kommer på plats, så avvakta lite grann om det inte syns direkt.



## Angular

För att driftsätta en Angular app krävs att vi har en statisk fil webbserver (static file web server) till exempel nginx. Om appen är skapat med hjälp av `ng` kan vi skapa produktionsfilerna med hjälp av kommandot `ng build --prod`. Vi har då en `dist/` katalog som innehåller en katalog med applikationens namn och där finns filerna som ska användas när vi vill driftsätta.

Vi skapar en site i nginx med följande konfiguration, där du byter ut `[SERVER_NAME]` med det server namn du vill använda. Vi skapar även root katalogen `/var/www/[SERVER_NAME]/html` med kommandot `sudo mkdir -p /var/www/[SERVER_NAME]/html`.

```shell
server {

        root /var/www/[SERVER_NAME]/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name [SERVER_NAME];

        charset utf-8;

        error_page 404 /index.html;

        location / {
        }
}
```

Skapa en symbolisk länk från `/etc/nginx/sites-enabled` katalogen till din konfigurations-fil i `sites-available`. Kör sedan kommandot `sudo nginx -t` för att testa konfigurationen och `sudo service nginx restart` för att starta om nginx.

Då jag inte vill installera och bygga applikationer på servern väljer jag att använda `rsync` för att överföra filer till servern. Först behöver dock `deploy`-användaren äga och få skriva till katalogen `/var/www/[SERVER_NAME]/html`. Det gör vi med följande kommandon.

```shell
$sudo chown deploy:deploy /var/www/[SERVER_NAME]/html
$sudo chmod 775 /var/www/[SERVER_NAME]/html
```

Jag väljer att använda möjligheten för att skapa npm-scripts i `package.json` och skapar ett deploy script på följande sätt. I nedanstående är `[SERVER]` din domän och `[SERVER_NAME]` samma som tidigare, `[APP_NAME]` är namnet på din applikation.

```json
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "deploy": "ng build --prod && rsync -av dist/[APP_NAME]/* deploy@[SERVER]:/var/www/[SERVER_NAME]/html/"
},
```

Vi kan nu köra kommandot `npm run deploy` och applikationen byggas för produktion samt överföras till rätt katalog på servern.



## Mithril

Då vi i mithril använder webpack för att bygga våra JavaScript fil skapar vi ytterligare ett npm script för att göra en produktionsfil.

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "webpack -d",
  "production": "webpack -p"
},
```

Vi kan nu köra kommandot med `npm run production` och då skapas en ny `bundle.js` fil, som är redo för produktion. På samma sätt som för vanilla JavaScript appen använder vi rsync för att föra över de tre filerna till servern. Jag utgår från fil och katalog strukturen som finns exempel katalogen.

```shell
$rsync -av index.html ../style.css dist/bundle.js deploy@[SERVER]:/var/www/[SERVER_NAME]/html/
```

På servern skapar vi en likadan nginx konfigurationsfil, som för ramverken.



## React

För att driftsätta en React app krävs att vi har en statisk fil webbserver (static file web server) till exempel nginx. Om appen är skapat med hjälp av `create.react-app` kan vi skapa produktionsfilerna med hjälp av kommandot `npm run build`. Vi har då en `build/` katalog som är de filerna som ska användas när vi vill driftsätta.

Vi skapar en site i nginx med följande konfiguration, där du byter ut `[SERVER_NAME]` med det server namn du vill använda. Vi skapar även root katalogen `/var/www/[SERVER_NAME]/html` med kommandot `sudo mkdir -p /var/www/[SERVER_NAME]/html`.

```shell
server {

        root /var/www/[SERVER_NAME]/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name [SERVER_NAME];

        charset utf-8;

        error_page 404 /index.html;

        location / {
        }
}
```

Skapa en symbolisk länk från `/etc/nginx/sites-enabled` katalogen till din konfigurations-fil i `sites-available`. Kör sedan kommandot `sudo nginx -t` för att testa konfigurationen och `sudo service nginx restart` för att starta om nginx.

Då jag inte vill installera och bygga applikationer på servern väljer jag att använda `rsync` för att överföra filer till servern. Först behöver dock `deploy`-användaren äga och få skriva till katalogen `/var/www/[SERVER_NAME]/html`. Det gör vi med följande kommandon.

```shell
$sudo chown deploy:deploy /var/www/[SERVER_NAME]/html
$sudo chmod 775 /var/www/[SERVER_NAME]/html
```

Jag väljer att använda möjligheten för att skapa npm-scripts i `package.json` och skapar ett deploy script på följande sätt. I nedanstående är `[SERVER]` din domän och `[SERVER_NAME]` samma som tidigare.

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "deploy": "npm run build && rsync -av build/* deploy@[SERVER]:/var/www/[SERVER_NAME]/html/"
},
```

Vi kan nu köra kommandot `npm run deploy` och applikationen byggas för produktion samt överföras till rätt katalog på servern.



## Vanilla JavaScript

För att driftsätta vanilla JavaScript applikationen använde jag uglifyjs för att minifiera koden. Sedan är det ett liknande `rsync` kommando som för de andra apparna. Jag utgår från fil och katalog strukturen som finns exempel katalogen.

```shell
$uglifyjs main.js -o bundle.min.js
$rsync -av index.html ../style.css bundle.min.js deploy@[SERVER]:/var/www/[SERVER_NAME]/html/
```

På servern skapar vi en likadan nginx konfigurationsfil, som för ramverken.



## Vue

För att driftsätta en Vue app krävs att vi har en statisk fil webbserver (static file web server) till exempel nginx. Om appen är skapat med hjälp av `vue-cli` kan vi skapa produktionsfilerna med hjälp av kommandot `npm run build`. Vi har då en `dist/` katalog som är de filerna som ska användas när vi vill driftsätta.

Vi skapar en site i nginx med följande konfiguration, där du byter ut `[SERVER_NAME]` med det server namn du vill använda. Vi skapar även root katalogen `/var/www/[SERVER_NAME]/html` med kommandot `sudo mkdir -p /var/www/[SERVER_NAME]/html`.

```shell
server {

        root /var/www/[SERVER_NAME]/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name [SERVER_NAME];

        charset utf-8;

        error_page 404 /index.html;

        location / {
        }
}
```

Skapa en symbolisk länk från `/etc/nginx/sites-enabled` katalogen till din konfigurations-fil i `sites-available`. Kör sedan kommandot `sudo nginx -t` för att testa konfigurationen och `sudo service nginx restart` för att starta om nginx.

Då jag inte vill installera och bygga applikationer på servern väljer jag att använda `rsync` för att överföra filer till servern. Först behöver dock `deploy`-användaren äga och få skriva till katalogen `/var/www/[SERVER_NAME]/html`. Det gör vi med följande kommandon.

```shell
$sudo chown deploy:deploy /var/www/[SERVER_NAME]/html
$sudo chmod 775 /var/www/[SERVER_NAME]/html
```

Jag väljer att använda möjligheten för att skapa npm-scripts i `package.json` och skapar ett deploy script på följande sätt. I nedanstående är `[SERVER]` din domän och `[SERVER_NAME]` samma som tidigare.

```json
"scripts": {
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build",
  "lint": "vue-cli-service lint",
  "deploy": "npm run build && rsync -av dist/* deploy@[SERVER]:/var/www/[SERVER_NAME]/html/"
},
```

Vi kan nu köra kommandot `npm run deploy` och applikationen byggas för produktion samt överföras till rätt katalog på servern.
