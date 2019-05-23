# Docker som utvecklingsmiljö


![Docker logga](https://dbwebb.se/image/snapht17/docker-logo.png?w=c5)

Vi skall komma igång med virtualiseringsmiljön Docker och se hur den kan användas som stöd för utveckling och test av programvara.

Du kommer se hur du kan jobba med images och kontainrar samt se hur du kan skapa egna images och underhålla dem i ett Git-repo.

Information om Docker hittar du på [docker.com](https://www.docker.com). Låt oss hålla det enkelt och jämföra Docker med virtualiseringsmiljön VirtualBox. Vi kan använda det för att köra andra operativsystem på vår egen dator, eller operativsystem paketerade tillsammans med programvaror. Docker kallar en sådan samling av operativsystem och programvara för en _image_ som körs i en _kontainer_. Vi kan till exempel starta upp en kontainer som bygger på en image med Linux, Apache, PHP och MySQL, och vi kan använda det utan att behöva installera dessa programvaror på vår egen dator.

Vi börjar med att installera Docker för att se hur det fungerar.



## Installera Docker


Webbplatsen för Docker innehåller en del där du kan ladda hem och installera Docker. Det finns en Community Edition (CE) versioner för Windows, Mac och Linux. Kör igenom installationen enligt anvisningarna.

Docker är en virtualiseringsmiljö så den kräver att din datorn är kapabel att köra vissa virtualiseringstekniker.

Du behöver bekanta dig med [dokumentationen för Docker](https://docs.docker.com/). Det är din vägledare för att komma igång med Docker.

Du kan välja att skapa ett konto på Docker. Det kan vara en bra idé om du vill pröva på att göra egna kontainrar. Gör så.



#### Windows, Docker och bcrypt


Ibland kan kombinationen av Windows, Docker och npm modulen bcrypt ställa till med stora problem. Ett tips hämtat från [installationsmanualen för bcrypt](https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions#microsoft-windows) är att installare npm paketet `windows-build-tools` med kommandot nedan. Installera det i kommandotolken (cmd) eller Powershell så Windows har tillgång till det.

```bash
npm install --global --production windows-build-tools
```



## Testa Docker


När du installerat Docker så kommer du åt verktygen via terminalen. Installationsfasen brukar sluta med att du kör följande för att verifiera installationen.

```bash
docker --version
docker-compose --version
docker run hello-world
docker run -it ubuntu bash
```

Det kan se ut så här.

[ASCIINEMA src=143319 caption="Kom igång och verifiera att docker fungerar."]

Det som händer i sista steget är att vi startar upp en kontainer med Ubuntu och startar bash i kontainern. Optionen `-it` står för `--interactive` och `-tty`, vi startar upp en interaktiv session med kontainern och allokerar en tty som agerar som terminalen.

Lär dig mer om kommandot med den inbyggda hjälpen.

```bash
docker help
docker help run
```



## Hitta och ladda hem en image


En image är alltså en samling av operativsystemet och programvarar som installerats. Det finns många färdiga images och vi kan söka bland dem på [Docker Store](https://store.docker.com/). När vi kör dem, eller hämtar dem, så laddas de ned till vår dator och vi kan se vilka som finns installerade lokalt.

```bash
$ docker images
REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
ubuntu                latest              747cb2d60bbe        9 days ago          122MB
hello-world           latest              05a3bd381fc2        5 weeks ago         1.84kB
```

Om vi söker på Docker Store, till exempel på PHP, så kan vi hitta images som innehåller [olika versioner av PHP](https://store.docker.com/images/php). Vi kan ladda hem den imagen och starta den.

```bash
$ docker pull php
$ docker images php
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
php                 latest              c342f917459a        10 days ago         371MB
```

Sedan kan vi köra imagen i en kontainer.

```bash
docker run -it php
docker run -it php bash
```

Det kan se ut så här.

[ASCIINEMA src=143327 caption="Kom igång och verifiera att docker fungerar."]

Det var alltså två olika sätt att koppla sig till kontainern på ett interaktivt sätt.



#### Image har taggar

En image kan ha många taggar som ger olika innehåll. Tittar vi på imagen för PHP så hittar vi olika taggar/versioner, med eller utan Apache installerat. Låt oss pröva att köra en variant som har Apache installerat.

```bash
docker run php:7.1-apache
```

Nåväl, men hur kopplar jag mig till Apache? Hur får jag en webbsida att visas?



###Kör en detached kontainer

Låt oss starta upp kontainern i detached mode och montera katalogen vi står i, som basen för Apache, samt koppla en specifik port 8080 (lokal dator) till Apaches standardport 80 (inuti kontainern).

```bash
docker run --detach --publish 8080:80 --name my-php-app --volume "$PWD":/var/www/html php:7.1-apache
```

Nu snurrar kontainern och via porten 8080 kan vi nå Apache som snurrar på port 80 inuti kontainern. Om vi skapar en fil i vår lokala katalog så kan vi visa den via `curl`.

```bash
$ echo "Moped" > test.php
$ curl localhost:8080/test.php
Moped
```

Ah, nu börjar det se trevligt ut. Vi kan alltså koppla vårt lokala filsystem till kontainerna som kör i sin egen isolerade miljö. Detta ger oss möjligheten att enkelt köra mot många olika versioner av PHP samtidigt. Det kan vara en bra sak när man vill testa om sitt program fungerar i olika versioner.

För att stänga ned kontainern så använder vi `docker container`.

```bash
$ docker container ls
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
1c4add957e71        php:7.1-apache      "docker-php-entryp..."   43 seconds ago      Up 41 seconds       0.0.0.0:8080->80/tcp   myapp
$ docker container stop my-php-app
```

Så här kan det se ut.

[ASCIINEMA src=143333 caption="Starta upp och koppla dig till Apache i en Docker kontainer."]

Glöm inte hjälpkommandot.

```bash
docker help container
```



## Flera kontainer till samma filsystem

Det ser ju spännande ut att kunna ha flera kontainerar, med olika version av programvara, körande mot samma volym, samma källkod på disk.

Låt oss göra ett kort test och se hur det fungerar. Jag startar upp två kontainerar med olika versioner av PHP och kopplar dem mot samma katalog på disken.

```bash
docker run --detach --publish 8071:80 --name php71-app --volume "$PWD":/var/www/html php:7.1-apache
docker run --detach --publish 8070:80 --name php70-app --volume "$PWD":/var/www/html php:7.0-apache
```

Jag kan se att de är uppe och snurrar.

```bash
docker container ls
```

Jag skapar en testfil och accessar den via de båda kontainrarna.

```bash
echo '<?php echo PHP_VERSION . "\n";' > version.php
curl localhost:8071/version.php
curl localhost:8070/version.php
```

Det ser ut att fungera bra. Då stänger jag ned kontainrarna.

```bash
docker container stop php71-app php70-app
```

Så här kan det se ut när du kör kommandona i en sekvens.

[ASCIINEMA src=143337 caption="Två kontainrar kopplade mot samma volym."]

Det känns som detta kan vara ett bra verktyg för test och utveckling.



#### Spara konfigurationen för docker-compose

Låt oss se vad kommandot `docker-compose` kan göra för att underlätta att köra flera servrar, eller kontainrar, samtidigt och låta dem köra mot samma filsystem eller utvecklingsrepo.

Först skapar vi en fil `docker-compose.yml` som innehåller följande.

```bash
version: "3"
services:
    php71:
        image: php:7.1-apache
        ports:
            - "8071:80"
        volumes:
            - ./:/var/www/html/
    php70:
        image: php:7.0-apache
        ports:
            - "8070:80"
        volumes:
            - .:/var/www/html
    php56:
        image: php:5.6-apache
        ports:
            - "8056:80"
        volumes:
            - .:/var/www/html
```

Sen startar vi samtliga kontainrar med kommandot `docker-compose` med eller utan detached läge.

```bash
docker-compose up
docker-compose up -d
```

Vi kan se att de kör med kommandot `docker ps` eller `docker container`.

```bash
docker ps
docker container ls
```

Vi kan testa att ladda en fil från respektive server/kontainer.

```bash
curl localhost:8071/version.php
curl localhost:8070/version.php
curl localhost:8056/version.php
```

Sen stänger vi ned dem.

```bash
docker-compose down
```

Så här kan det se ut.

[ASCIINEMA src=143344 caption="Starta och stoppa flera kontainrar samtidigt med docker-compose."]

Visst känns det rätt behagligt och kraftfullt att jobba med kontainrar?



#### Att inkludera docker-compose i ett repo

Låt oss kika på ett repo som har inkluderat detta sätt att jobba för att testa repot. Vi kikar på [`mos/cimage`](https://packagist.org/packages/mos/cimage). Vi gör ett snabbt test genom att klona repot och köra igång kontainrar med `docker-compose`.

```bash
git clone https://github.com/mosbth/cimage.git
cd cimage
chmod 777 cache
docker-compose up -d
```

Nu kan du öppna länken `localhost:8071/webroot/imgd.php?src=car.png` i din webbläsare. Öppna sedan två flikar till och justera porten till `8070` respektive `8056`.

Du har nu tre flikar som kör mot tre olika installationer och versioner av PHP och testar samma källkod i repot.

![Tre flikar mot tre olika installationer och versioner av PHP, samtidigt.](https://dbwebb.se/image/snapht17/cimage-php56.png?w=w2)

Du kan stänga ned kontainrarna med `docker-compose`.



## Att göra egna images

Om du kikar lite extra på hur `mos/cimage` använder `docker-compose` så kommer du se att det är egna images som bygger på och utökar imagen från PHP.

Börja kika på [filen `docker-compose.yml`](https://github.com/mosbth/cimage/blob/master/docker-compose.yml) så ser du referenser till images som heter `cimage/php*`.

Du kan söka ut dem via Docker Store och du kommer hamna på [organisationen cimage](https://store.docker.com/profiles/cimage).

Klicka på en av imagen, till exempel [`cimage/php71-apache`](https://store.docker.com/community/images/cimage/php71-apache) så kommer du till en sida för den imagen.

Där ser du också en koppling till ett repo [`cimage/docker`](https://github.com/cimage/docker) på GitHub.

Nu har du hamnat på det repo som skapar och underhåller de tre images som är publicerade på Docker Store.

Det som är viktigt i detta repot är respektive `Dockerfile`, kika på [`php71/Dockerfile`](https://github.com/cimage/docker/blob/master/php71/Dockerfile) som ett exempel på hur en image skapas utifrån en annan image.

Det sista som bygger själva imagen, från Dockerfilen, är ett target i [`Makefilen`](https://github.com/cimage/docker/blob/master/Makefile) som heter `make build`.

Makefilen innehåller också `make publish` som laddar upp senaste versionen av de images som är byggda.

Ska vi ta det en gång till?

Om du vill skapa egna images och publicera på Docker Store så börjar du med ett eget repo där du underhåller dina Dockerfiles. Du bygger dem och publicerar dem till Docker Store på det sättet som jag visade att Makefilen gjorde.

För att allt skall fungera så behöver du ditt konto på Docker. Så här ser [mitt konto ut](https://store.docker.com/profiles/mikaelroos).



## Avslutningvis

Vi har gått igenom de första stegen i hur man kommer igång med Docker via kommandot `docker` och `docker-compose`. Vi har också sett hur images och kontainrar fungerar och hur de kan användas för att göra en flexibel test- och utvecklingsmiljö kopplad till ditt repo.

Avslutningsvis såg vi hur man kan göra egna images.

Det finns en [forumtråd kopplad till denna artikeln](t/6956). Där kan du ställa frågor eller bidra med tips och trix.
