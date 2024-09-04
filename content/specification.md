# Specifikation

<p class="author">Emil Folino</p>



## Beskrivning

I denna delen av kursen börjar vi med att ta en titt på den befintliga koden och utvärderar frontend ramverk. Målet med denna delen är att ha en applikation som fungerar enligt specifikation och vi samtidigt tagit några beslut kring vägval inför kommande delar.

Börja därför med att ladda ner appen [emilfolino/ssr-editor](https://github.com/emilfolino/ssr-editor/archive/refs/tags/v0.1.zip), som en zip-fil. Skapa sedan ett eget Git och GitHub repo utifrån den koden. Till exempel utifrån [Git guides](https://github.com/git-guides/git-init).



## Läsa och titta

Läs [dokumentationen](https://docs.npmjs.com/cli/v6/commands/npm-audit) för kommandot `npm audit` som utför en säkerhets genomgång av de installerade npm-moduler.

Läs introduktionen till [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow), som är en strategi för att samarbeta kring koden i ett repo.

Artikeln [Frontend](/frontend) introducerar frontend ramverk och går igenom olika kodexempel och jämför kodbaserna.



## Kravspecifikation

1. Skapa er en överblick över applikationen vi ska arbeta med under kursens gång. Se till att ni kan köra den med hjälp av kommandot `node app.mjs`.

1. Skapa ett gemensamt Git-repo med koden för repot. I inlämningen på Canvas länka till repot på GitHub.

1. Försök att under kursens gång jobba enligt GitHub Flow.

1. Se till att ha åtgärdat alla säkerhetshål enligt `npm audit`.

1. Skapa en `README.md` fil i repot. I denna filen kommer ni under hela kursen dokumentera olika val.

1. Beskriv i `README.md` vilka steg ni fick gå igenom för att få applikationen att fungera.

1. Implementera en `POST /update` route för att uppdatera innehåll istället för att skapa nya documents hela tiden.

1. Uppdatera vyerna så det är möjligt att uppdatera ett dokument och att skapa nya.

1. Gör ett val av frontend ramverk och dokumentera det i `README.md`. Ni behöver inte implementera något, men kan vara bra att börja titta på hur implementationen av ett frontend-ramverk kan gå till.



## Redovisning

Svara på nedanstående frågor individuellt och lämna in på Canvas tillsammans med länken till ert gemensamma GitHub-repo.

* Vilka lärdomar gjorde du dig kring ditt sätt att ta dig an kod som du inte själv skrivit?

* Var det enkelt att ta till dig information om de olika frontend-ramverken? Vilken är din uppfattning om ramverkens dokumentation?

* Vilka fördelar och nackdelar ser du med arbetssättet GitHub Flow?
