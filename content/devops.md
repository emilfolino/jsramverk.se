# (dev)ops

<p class="author">Emil Folino</p>

Vi börjar denna veckan med att skaffa oss en droplet, en server i molnet. På vår server installerar vi programvara och konfigurerar servern för att säkra upp servern och för att vi kan köra nodejs applikationer. Som avslutning på denna veckan driftsätter vi både vår backend och den frontend applikation vi skapade tidigare i kursen.

Vi vänder oss nu till dokumentationen för [Node](https://nodejs.org/en/docs/) och [Express](http://expressjs.com/) för att ytterligare se vad man kan göra med Express. Låt oss komma igång med hur man sätter upp en applikationsserver som även kan fungera som en vanlig webbserver.



## Material

Vi ska i följande stycken först titta på hur vi med hjälp av GitHub Education Pack och DigitalOcean skapar en droplet. I slutet av veckan har vi driftsatt både vår frontend applikation och vårt me-api backend applikation.



### En server i molnet

Se till att ha din student e-postadress nära till hands då den behövs för att få tillgång till GitHub Education Pack.



#### GitHub Education Pack

För att få tillgång till rabatter och rabattkoder som erbjuds i [GitHub Education Pack](https://education.github.com/benefits) behöver du GitHub veta att du är student. Gå till den länkade sidan och tryck på den blåa knappen "Get your Pack". Viktigt att du använder din student mail när du registrerar dig då mailen måste vara kopplat till en undervisningsinstitution.



#### Digital Ocean

När du är verifierad via GitHub får du tillgång till en rabattkod för Digital Ocean. Efter det går du till [Digital Ocean Sign Up](https://cloud.digitalocean.com/registrations/new) och skapar ett konto. Du behöver ange ett kreditkort, men vi kommer sedan använda rabattkoden så det kommer inte kosta något.

När du har skapat kontot gå till Account längst upp till höger under din användare logga. Gå sedan till Billing fliken och scrolla ner till Promo Code. Här lägger du in rabattkoden du fick från Github Education Pack när du tryckte på länken 'request your offer code'.

Gå sedan till första sidan och tryck 'Get started with a Droplet'. Instruktioner i kommande stycken och resten av kursen kommer utgå från en Debian Stretch (9.x) droplet, så en stark rekommendation är att välja en sån droplet. Jag rekommenderar att ni kör en 5$/månad droplet, då man får bra prestanda och samtidigt inte använder hela rabatten under kursens gång. Välj Frankfurt eller London som region och lägg till din `id_rsa.pub` SSH nyckel så du kan logga in på servern.



### Första 10 minuter på en server

Med utgångspunkt i artiklar som [My First 5 Minutes On A Server; Or, Essential Security for Linux Servers](https://plusbryan.com/my-first-5-minutes-on-a-server-or-essential-security-for-linux-servers) och [My First 10 Minutes On a Server - Primer for Securing Ubuntu](https://www.codelitt.com/blog/my-first-10-minutes-on-a-server-primer-for-securing-ubuntu/) ska vi i följande stycke titta på hur vi säkrar upp en Linux-baserad server av Ubuntu eller Debian variant.



#### Logga in på servern

Vi loggar in på servern genom att använda SSH via terminalen med kommandot. `ssh root@[IP]` ersätt din [IP] med den IP som visas för din droplet.



#### Lösenord

Än så länge har vi inte ens ett lösenord till vår `root` användare så låt oss se till att sätter ett lösenord. Välj ett säkert lösenord och med säkert lösenord menas ett slumpat och komplext lösenord. Jag rekommenderar starkt att använda en Password Manager och skapa lösenordet med hjälp av denna Password Manager inställt på den mest komplexa inställningen du kan hitta. För Mac och Linux rekommenderas [pass](https://www.passwordstore.org) och för Windows verkar [LastPass](https://www.lastpass.com) vara det mest använda gratis programmet som finns.

När du har skapat ett slumpmässigt och komplext lösenord skriv följande kommando och följ instruktionerna.

```shell
$passwd
```



#### Uppdatera servern

Nästa steg är att uppdatera serverns programvara till senaste version genom att använda verktyget `apt-get`.

```shell
$apt-get update
$apt-get upgrade
```



#### Skapa din egen användare

Vi vill aldrig logga in som `root` då `root` har tillgång till för mycket. Så vi skapar en egen användare `deploy` med följande kommandon. Du kan byta ut `deploy` mot vad som helst, men då ska du göra det i alla följande kommandon. De två första kommandon är för att rensa bort en befintlig användare Digital Ocean lägger till när debian installeras.

```shell
$apt-get remove --purge unscd
$userdel -r debian
$useradd deploy
$mkdir /home/deploy
$mkdir /home/deploy/.ssh
$chmod 700 /home/deploy/.ssh
```

Vi passar på att i samma veva ställa in vilken förvald terminal vår nya använda ska använda, vi väljer `bash` då vi är vana vid den.

```shell
$usermod -s /bin/bash deploy
```



#### Stänga av inloggning med lösenord

Lösenord kan knäckas.

Därför använder vi istället SSH nycklar för att autentisera oss mot servern. Skapa och öppna filen med kommandot `nano /home/deploy/.ssh/authorized_keys` och lägg innehållet av din lokala `.ssh/id_rsa.pub` nyckel i den filen på en rad.

När du har lagt till nyckeln kör du följande två kommandon för att sätta korrekta rättigheter på katalogen och filen.

```shell
$chmod 400 /home/deploy/.ssh/authorized_keys
$chown deploy:deploy /home/deploy -R
```

Testa nu att logga in i ett nytt terminalfönster med kommandot `ssh deploy@[IP]`. Vi har kvar terminal fönstret där vi loggade in som root om något skulle gå fel.

Vi skapar sedan ett lösenord för `deploy` användaren från root terminalfönstret, `passwd deploy`, använd igen ett långt och slumpmässigt lösenord. Och vi lägger till `deploy` som sudo användare med kommandot `usermod -aG sudo deploy`.

Som vi sagt tidigare vill vi bara kunna logga in med SSH nycklar. Vi gör detta genom att ändra tre rader i filen `/etc/ssh/sshd_config`. Öppna filen med din texteditor på din server till exempel nano med kommandot `nano /etc/ssh/sshd_config`.

Hitta raderna nedan och se till att ändra från yes till no. Raderna ligger inte på samma ställe i filer, så ibland får man leta en liten stund. Den sista raden nedan får du skriva in själv.

```shell
$PermitRootLogin no
$PasswordAuthentication no
$AllowUsers deploy
```

Spara filen och starta om SSH med hjälp av kommandot `service ssh restart`. Testa nu att logga ut och in i ditt andra terminal fönster där du tidigare var inloggat som `deploy`.



#### Brandvägg

Först stänger vi ner uppkopplingen för användaren root genom att skriva exit i terminalfönstret. Alla kommandon vi kommer köra från och med nu körs som användaren deploy.

Vi använder oss av brandväggen `ufw` för att stänga och öppna portar till vår server. Installera med kommandot `sudo apt-get install ufw`.

Vi vill nu öppna upp för trafik på 3 portar 22 för SSH, 80 för HTTP och 443 för HTTPS. Vi gör det med hjälp av följande kommandon.

```shell
$sudo ufw allow 22
$sudo ufw allow 80
$sudo ufw allow 443
$sudo ufw disable
$sudo ufw enable
```



#### Automagiska uppdateringar

Vi vill inte hålla på att manuellt uppdatera vår server, men vi vill inte heller sakna en patch när de kommer så vi kommer använda oss av verktyget unattended-upgrades. Vi installerar med `sudo apt-get install unattended-upgrades`.

Uppdatera filen `/etc/apt/apt.conf.d/10periodic` så den innehåller nedanstående.

```shell
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";
```

Uppdatera även filen `/etc/apt/apt.conf.d/50unattended-upgrades` så den ser ut som nedan.

```shell
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}";
    "${distro_id}:${distro_codename}-security";
    "${distro_id}ESM:${distro_codename}";
    //"${distro_id}:${distro_codename}-updates";
};
```



#### fail2ban

Vårt sista steg är att installera verktyget fail2ban som används för att automatiskt kolla logfiler och stoppa aktivitet som vi inte vill ha på vår server. Vi installerar och låter ursprungsinställningarna göra sitt jobb. Vi installerar med `sudo apt-get install fail2ban`.



### En domän till din server

Som en del av Github Education Pack får du som student även ett domän-namn på top-domänen .me från registratorn namecheap gratis under ett år. Om du vill använda en annan registrator är det fritt fram.

För att använda namecheap tryck på länken "Get access by connecting your GitHub account on Namecheap" och knyta ihop ditt GitHub konto med namecheap och skapa en användare.

När du har kopplat din användare kommer du till en sida där du skapar ditt domännamn. Skriv in din text i kommande bilder har jag använt det domännamn jag valde 'jsramverk.se'.

![Fyll i nameservers hos namecheap.](https://dbwebb.se/image/ramverk2/namecheap-nameservers.png?w=w3)

Gå sedan till Digital Ocean och välj Networking>Domains. Här Väljer du att skapa den valda domänen.

![Skapa domän på Digital Ocean.](https://dbwebb.se/image/ramverk2/do-domains.png?w=w3)

Vi vill sedan peka domänen till vår droplet och för att komma åt root-domänen anger vi @. Vill vi ange en subdomän anger vi subdomänen.

![Peka domän till droplet på Digital Ocean.](https://dbwebb.se/image/ramverk2/do-domain-names.png?w=w3)



### Installera programvara

Vi ska i denna del installera programvara för att vi kan köra både frontend och backend applikationer på vår server.



#### Installera nginx

Vi installerar webbservern nginx med hjälp av kommandot `sudo apt-get install nginx`. Du ska nu kunna gå till din domän-adress och där se Welcome to nginx! Ibland kan det ta en liten stund innan alla ändringar slå igenom, så nu är att bra tillfälle att hämta kaffe eller gå en runda om det inte fungerar direkt.



#### Installera nodejs och npm

Vi vill ha nodejs och npm installerat så vi kan köra en backend på vår server. Vi installerar LTS (Long Term Support) versionen då detta är vår produktionsserver. Vi installerar nodejs och npm med följande kommandon.

```shell
$sudo apt update
$sudo apt install curl
$cd ~
$curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
$sudo bash nodesource_setup.sh
$sudo apt install nodejs
$nodejs -v
```

Här ska du gärna se en utskrift med ett versionsnummer som inledas med `v10.`.

Om du kör kommandot `npm -v` ser du att du även har Node Package Manager npm installerat med ett versionsnummer över 6. För att vissa program ska kunna installeras via npm behöver vi även installera build-essentials. Vi gör det med kommandot `sudo apt install build-essential`.



#### Installera tmux


tmux är ett oerhört trevligt verktyg att använda om man vill komma tillbaka till samma vy när man loggar in på en server från ett antal olika servrar. Installera med kommandot `sudo apt-get install tmux`.

Du öppnar en tmux session genom att skriva `tmux` i terminalen. I sitt grundutförande är Ctrl-b kommandotangenten, du trycker alltså in Ctrl-b släpper och en knapp till för att utföra kommandot. Du kan skapa nya fönster med Ctrl-b följd av c, du kopplar ner från sessionen med Ctrl-b d och vill du tillbaka till sessionen kan du skriva `tmux a -t 0`. Bra och smidigt när man vill logga in från flera olika datorer, men ändå se samma bild.



#### Installera git


För att lättare kunna driftsätta våra git-repon installerar vi även git med kommandot `sudo apt-get install git`.



## Driftsättning av backend

Vi börjar med att klona vårt repo till servern. Använd https länken när du klonar för enklast hantering. Jag har skapat en katalog `~/git` där jag klonar mitt repo till.

Vi installerar först `sqlite3` på servern innan vi kan köra `npm install`. Vi gör detta med `sudo apt-get install sqlite3` som vår `deploy` användare. Vi kan nu hämta senaste versionen av vårt API med `git pull` och köra `npm install` för att installera det nya paketet. Vi behöver även skapa databas filen `db/texts.sqlite` och köra migrations filen.

För att våra klienter ska komma åt API:t ser vi till att driftsätta det på vår server. Vi ska använda oss av det som kallas en "nginx reverse proxy" för att trafiken utifrån på port 80 eller 443 (vanliga portarna för HTTP och HTTPS) ska skickas till vårt API som ligger och lyssnar på en annan port.

När vi installerade nginx fick vi med oss ett antal olika kataloger och konfigurationsfiler. I katalogen `/var/www` kommer vi skapa kataloger för de webbplatser vi vill skapa på vår server. Vi börjar med att logga in på servern som `deploy` och skapar en katalog för vårt API.

Jag kommer i följande exempel utgå ifrån min konfiguration på servern [jsramverk.se](https://jsramverk.se) där mitt API ligger på subdomänen [me-api.jsramverk.se](https://me-api.jsramverk.se).

Jag skapar alltså katalogen `/var/www/me-api.jsramverk.se/html` enklast med kommandot `sudo mkdir -p /var/www/me-api.jsramverk.se/html`. Denna katalog kommer inte användas för filer, men vi kommer använda den i ett senare skede när vi vill spara ett certifikat för HTTPS trafik till vårt API.

Jag har satt i gång API:t med kommandot `npm run production` och API:t ligger och lyssnar på port 8333. Den reverse proxy som vi skapar i följande stycke lyssnar i första skedet på port 80 och skickar vidare förfrågningarna till 8333.

I katalogen `/etc/nginx/sites-available` skapar vi en konfigurationsfil `me-api.jsramverk.se` genom att kopiera standard konfiguration från filen `default` och öppna upp filen i text editorn nano. Vi gör det med följande kommandon.

```shell
$cd /etc/nginx/sites-available
$sudo cp default me-api.jsramverk.se
$sudo nano me-api.jsramverk.se
```

I filen klistrar vi in följande konfiguration. Först skapar vi en server med namnet me-api.jsramverk.se. Vi skapar därefter två stycken `location`. Det är routes där vi vill att nått speciellt ska hända. Den första är för en fil relaterad till det certifikat vi ska installera om ett ögonblick för att fixa HTTPS till vår server. Den andra `location /` är alla andra routes som ska skickas till `http://localhost:8333` där vårt API ligger och lyssnar. Detta kallas en reverse proxy och användas i många sammanhang för att kopplat förfrågningar på port 80 till en annan port. En reverse proxy används då man inte vill öppna portarna utåt, men vill låta nginx ta hand om detta.

```shell
server {
    server_name me-api.jsramverk.se;

    location /.well-known {
        alias /var/www/me-api.jsramverk.se/html/.well-known;
    }

    location / {
        proxy_pass http://localhost:8333;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 80;
}
```

Vi sparar filen genom att trycka `Ctrl-X` och skriva in ett y + Enter. Vi skapar sedan en symbolisk länk i katalogen `/etc/nginx/sites-enabled` till vår konfigurations fil för att sidan blir tillgänglig.

```shell
$cd /etc/nginx/sites-enabled
$sudo ln -s /etc/nginx/sites-available/me-api.jsramverk.se
```

Vi vill sedan testa om konfigurationen är korrekt och sedan starta om nginx och det gör vi med följande kommandon.

```shell
$sudo nginx -t
$sudo service nginx restart
```

För att internet ska veta att vi har en server som ligger här och vill svara på förfrågningar skapar vi en subdomän i Digital Ocean gränssnittet. Gå till Networking och välj din domän skriv sedan in din subdomän välj din droplet och skapa subdomänen.

![Digital Ocean subdomän](https://dbwebb.se/image/ramverk2/do-subdomain.png?w=w3)

Det ska nu gå att se ett JSON svar från API:t om vi går till vår subdomän. Ibland kan det ta en liten stund innan subdomäner kommer på plats, så avvakta lite grann om det inte syns direkt.



### Process manager

När vi har sett till att vår applikation fungerar precis som tänkt vill vi i mångt och mycket automatisera hur vi startar, uppdaterar och startar om våra nodejs applikationer. För detta ändamålet använder vi en process manager. Det finns ett antal olika [process managers för express applikationer](https://expressjs.com/en/advanced/pm.html), men jag har valt att använda [PM2](http://pm2.keymetrics.io/).

Vi installerar PM2 med kommandot:

```shell
$npm install -g pm2
```

Vi går sedan till katalogen där vi startade vårt me-api och stänger av den node-process vi startade med `npm start` eller `node app.js`. Vi startar istället processen som en pm2 kontext så vi får automatisk omstart och kan göra uppdateringar utan neretid. Vi startar appen i pm2 kontext med följande kommando.

```shell
$pm2 start app.js --name me-api
```

Flaggan --name me-api används för att ge processen ett namn. Kan vara bra inför framtiden när vi vill ha flera olika processer igång samtidigt.



## Driftsättning av frontend

Vi vill även driftsätta vår frontend applikation vi har skapat med hjälp av dessa ramverken på vår server.



#### Domän

Vi vill i de flesta fall lägga våra alster på en domän eller subdomän. Vi har redan pekat al trafik från registratorn namecheap till vårt Cloud i Digital Ocean. Vi behöver därför bara skapa en subdomän i Digital Ocean. Vi gör det på samma sätt som i "[Node.js API med Express](kunskap/nodejs-api-med-express)". Gå till Networking och välj din domän skriv sedan in din subdomän välj din droplet och skapa subdomänen.

<img src="https://dbwebb.se/image/ramverk2/do-subdomain.png?w=w3" alt="Digital Ocean subdomän">

Ibland kan det ta en liten stund innan subdomäner kommer på plats, så avvakta lite grann om det inte syns direkt.



### Angular

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

Jag väljer att använda möjligheten för att skapa npm-scripts i `package.json` och skapar ett deploy script på följande sätt. I nedanstående är `[SERVER]` din domän och `[SERVER_NAME]` samma som tidigare, `[APP_NAME]` är namnet på din applikation. Scriptet läggs till i ditt lokala repo och med hjälp av rsync skickar vi det till servern.

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

Vi kan nu köra kommandot `npm run deploy` lokalt på din dator  och applikationen byggas för produktion samt överföras till rätt katalog på servern.



### Mithril

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



### React

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

Jag väljer att använda möjligheten för att skapa npm-scripts i `package.json` och skapar ett deploy script på följande sätt. I nedanstående är `[SERVER]` din domän och `[SERVER_NAME]` samma som tidigare. Scriptet läggs till i ditt lokala repo och med hjälp av rsync skickar vi det till servern.

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "deploy": "npm run build && rsync -av build/* deploy@[SERVER]:/var/www/[SERVER_NAME]/html/"
},
```

Vi kan nu köra kommandot `npm run deploy` lokalt på din dator och applikationen byggas för produktion samt överföras till rätt katalog på servern.



### Vanilla JavaScript

För att driftsätta vanilla JavaScript applikationen använde jag uglifyjs för att minifiera koden. Sedan är det ett liknande `rsync` kommando som för de andra apparna. Jag utgår från fil och katalog strukturen som finns exempel katalogen.

```shell
$uglifyjs main.js -o bundle.min.js
$rsync -av index.html ../style.css bundle.min.js deploy@[SERVER]:/var/www/[SERVER_NAME]/html/
```

På servern skapar vi en likadan nginx konfigurationsfil, som för ramverken.



### Vue

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

Jag väljer att använda möjligheten för att skapa npm-scripts i `package.json` och skapar ett deploy script på följande sätt. I nedanstående är `[SERVER]` din domän och `[SERVER_NAME]` samma som tidigare. Scriptet läggs till i ditt lokala repo och med hjälp av rsync skickar vi det till servern.

```json
"scripts": {
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build",
  "lint": "vue-cli-service lint",
  "deploy": "npm run build && rsync -av dist/* deploy@[SERVER]:/var/www/[SERVER_NAME]/html/"
},
```

Vi kan nu köra kommandot `npm run deploy` lokalt på din dator och applikationen byggas för produktion samt överföras till rätt katalog på servern.



## HTTPS

Då vi är medvetna om våra användares privatliv vill vi att alla anslutningar till våra tjänster och services sker över HTTPS, som krypterar den data som skickas. Vi behöver därför installera ett certifikat. Vi väljer att använda ett certifikat från [Let's Encrypt](https://letsencrypt.org/) och vi installerar det med tjänsten [Certbot](https://certbot.eff.org/) då vi har tillgång till serverns CLI.

Vi behöver först öppna upp så vi kan installera paket från det som heter APT backports. Vi öppnar upp filen `/etc/apt/sources.list` och letar reda på följande två rader som vi avkommenterar. Raderne brukar finnas längst ner i filen.

```shell
$deb http://mirrors.digitalocean.com/debian stretch-backports main contrib non-free
$deb-src http://mirrors.digitalocean.com/debian stretch-backports main contrib non-free
```

Uppdatera apt-get med `sudo apt-get update`. Vi kan nu installera verktyget certbot med kommandot `sudo apt-get install python-certbot-nginx -t stretch-backports`.

Vi startar verktyget genom att köra kommandot `sudo certbot --nginx`. Vi får då välja för vilka domäner och subdomäner vi vill installera certifikat. Efter att vi har vald domänerna får vi frågan om vi vill omdirigera all trafik till HTTPS istället för HTTP och det svarar vi ja till (i certbot gränssnittet motsvarar det en tvåa).

Vi ska nu se en hänglås i adressfältet om vi uppdaterar i webbläsaren.



## Kravspecifikation

1. Driftsätt ditt me-api enligt ovan och lägg den publika adressen i en kommentar till din inlämning på Canvas.

1. Driftsätt din Me-applikation och lägg den publika adressen i en kommentar till din inlämning på Canvas.

1. Skriv på routen `/reports/week/3` om hur det gick med driftsättningen av dina applikationer. Vad är den största lärdom om devops-delen av en webbprogrammerares liv du har gjort?



## Skriva

Vi fortsätter med grunden för vår studie. Vi har med forskningsfrågorna beskrivit för våra läsare **VAD** vi vill undersöka. Vi ska denna och kommande veckan beskriva **VARFÖR** och därigenom formulera ett syfte till de två forskningsfrågor vi gjorde tidigare.

Ett syfte i en akademisk text förklarar för läsaren varför studien genomförs och hur de tänkta resultaten kan bidra till att föra området, som studien görs inom vidare. Gå tillbaka till skrivguiden och titta under [Syfte](http://skrivguiden.se/skriva/skrivprocessen/#syfte) för bra tips. I [mallen](https://dbwebb.se/kurser/exjobb/guide/mall-for-thesis-dokumentet) som används i [kommande exjobbskurs](https://dbwebb.se/kurser/exjobb) står följande om forskningsfrågor och syfte:

> State the RQ:s, and motivate each of them! Describe the goals/objectives with your study, and the expected outcome. The evaluation of the thesis will be very much towards the clarity of the RQ:s and if you answer the RQ:s in your thesis.

För varje forskningsfråga skriver du en text på 5-10 meningar som förklarar **VARFÖR** denna forskningsfrågan är viktig att belysa. Skriv syftet direkt under frågan så man ser att de hör ihop.

I och med att vi börjar få lite mer text blir inlämningen av texten denna och kommande veckor i PDF format. Du väljer själv på vilket sätt och med vilken teknik du vill skriva texten. Under föreläsningen går Emil igenom tre olika sätt att skriva texten: Textbehandlare (Microsoft Word, Google Docs, Apple Pages, LibreOffice Writer eller liknande), [Markdown med Pandoc](http://arthurcgusmao.com/academia/2018/01/27/markdown-pandoc.html) och [LaTeX med Overleaf](https://sv.overleaf.com/edu/bth).

**Lämna in texten som PDF bilaga till din inlämning på Canvas.**
