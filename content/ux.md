# UX

<p class="author">Emil Folino</p>

<div class="under-construction" id="under-construction">
    <div class="under-construction-text">
        <p><strong>Uppdatering</strong></p>
        <p>Denna inlämningsuppgift uppdateras och kravspecifikation samt material kan ändras.</p>
    </div>
</div>

Vi fortsätter med att bekanta oss med vårt valda JavaScript frontend ramverk, men tittar denna veckan på hur vi kan använda ramverket för att skapa goda användareupplevelser. Vi ska titta på hur vi byggar ett registreringsformulär med validering och hur vi i det sambandet utnyttjar en modell i ramverket.

Som en del av registreringsformuläret skapas en date-picker för att välja datum



## Läsa

Nielsen Norman Group är världsledande inom forskningsbaserad User Experience (UX). Följande två artiklar introducerar veckans utforskande på ett koncist sätt.

[Website Forms Usability: Top 10 Recommendations](https://www.nngroup.com/articles/web-form-design/)

[A Checklist for Registration and Login Forms on Mobile](https://www.nngroup.com/articles/checklist-registration-login/)



## Titta

Ofta fokuserar vi inom webbutvecklingen på det allra senaste inom en given teknologi. Det viktiga att lära sig är dock i långt större grad vad som inte ändrar, vilka tekniker, metoder och verktyg är det som består och som även om 20 år kommer användas. I nedanstående keynote pratar UX gurun Jakob Nielsen från Nielsen Norman Group om de bestående tekniker inom User Experience.

<div class='embed-container'><iframe width="560" height="315" src="https://www.youtube.com/embed/OtBeg5eyEHU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



## Material och tekniker

Förutom ovanstående artiklar från Nielsen/Norman Group i [Läsa](#lasa) ska vi i detta avsnittet titta lite närmare på hur vi med hjälp av JavaScript kan förbättra formulär. Veckans inlämningsuppgift handlar om att skapa ett registreringsformulär, som vi sedan i nästa vecka kopplar till en backend. Vi ska dock titta på hur vi kan använda en modell i frontend för att validera data från ett formulär.



### Formulär validering

Ibland vill vi hantera data även i frontend utan att skicka det till backend. Validering av formulär är ett exempel på detta. I såna fall är en modell eller module som hanterar form data ett bra sätt att gå. De ramverken som introducerades under vecka 1 är alla komponent baserade och ett bra sätt att tänka runt form valideringen är att bygga själva formuläret eller till och med varje formulär fält som en egen komponent med kopplat validering för lätt återanvändning. Till exempel vill man ha samma validering av e-post i både ett registreringsformulär och i ett inloggningsformulär.

Ramverken har olika sätt att hantera form validering. React verkar inte ha något officiellt sätt att hantera detta på, men både [Angular](https://angular.io/guide/form-validation) och [Vue](https://vuejs.org/v2/cookbook/form-validation.html) har exempel och dokumentation för form validering. För React finns dock många olika exempel på hur man kan hantera form validering.



### Date Picker

Som en del av registreringsformuläret ska det finns ett fält för att användaren att fylla i födelsedag. Och för detta ändamålet är en väl designat date picker det bästa verktyget.

Smashing Magazine samlar praktiska artiklar om webb design och utveckling och [Designing The Perfect Date And Time Picker](https://www.smashingmagazine.com/2017/07/designing-perfect-date-time-picker/) ger ett inblick i hur designprocessen för en date picker kan gå till

[Dribbble](https://dribbble.com/tags/date_picker) är ett bra ställe att hämta inspiration till olika GUI-komponenters design och jag låter en av grundarna i Apple Steve Jobs berätta om hur han ser på att skaffa inspiration.

<div class='embed-container'><iframe width="560" height="315" src="https://www.youtube.com/embed/CW0DUg63lqU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



#### Last Used First Out

Som ytterligare ett exempel på hur JavaScript kan användas för att förbättra användareupplevelsen introducerar Nathan Kontny konceptet [Lufo, Last Used First Out](https://m.signalvnoise.com/lufo--last-used-first-out---an-easy-way-to-drastically-improve-the-user-experience-of-long-select/) och hur han skapade ett jQuery plugin för detta. På detta sätt kan man förbättra användandet av dropdowns med hjälp av konceptet Last-Used-First-Out (LUFO).



## Kravspecifikation

1. Skapa ett registreringsformulär för att registrera användare i din Me-applikation.

1. Formuläret ska innehålla minst följande fält: Namn, e-post, lösenord och födelsedatum.

1. Alla fält ska valideras så att de innehåller rimlig data för fältet.

1. Se till att använda rätt HTML5 input-typ på alla fält.

1. Födelsedatum fältet ska vara en egen designat date-picker.

1. `/reports/week/2` ska innehålla en länk till GitHub repot och 5-10 meningar om vart du fick inspiration till ditt registreringsformulär och date picker.

1. Committa alla filer och lägg till en tagg (2.0.\*).

1. Pusha upp repot till GitHub, inklusive taggarna.

1. Länka till ditt GitHub repo i din inlämning på Canvas.



## Skriva

Vi fortsätter iterativt med att förbättra vårt akademiska skrivande. Använd den återkopplingen du fick på första veckans text och förbättra din inledning.

Gå tillbaka till skrivguiden och titta under [Inledning](http://skrivguiden.se/skriva/uppsatsens_delar/#inledning) för bra tips.

**Lämna in texten som PDF bilaga till din inlämning på Canvas.**
