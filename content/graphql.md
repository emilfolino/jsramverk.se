# GraphQL

<p class="author">Emil Folino</p>

Denna veckan tittar vi på hur vi kan använda GraphQL som ett lager framför vårt REST-API.



## Titta

#### Kort introduktion till GraphQL

<div class='embed-container'><iframe src="https://www.youtube.com/embed/eIQh02xuVw4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



#### Längre kodexempel i Express

Exempelkod till nedanstående video finns på [GitHub](https://github.com/WebDevSimplified/Learn-GraphQL).

<div class='embed-container'><iframe src="https://www.youtube.com/embed/ZQL7tL2S0oQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



## Material och tekniker



### GraphQL i backend

[Kursrepot](https://github.com/emilfolino/jsramverk) har uppdaterats med ett nytt exempel [graphql](https://github.com/emilfolino/jsramverk/tree/master/graphql). Gör en `git pull` för att ladda ner senaste. Är exempelkoden från detta exemplet som förklaras nedan. Är nog bäst att hålla ganska hårt i exempelkoden i denna artikeln då det är ganska många delar som samverkar. API:t är ett API för att hämta ut data om kurser. Exempeldata innehåller två kurser, två lärare och totalt 4 studenter. API:t använder sig av samma stack som tidigare i kursen, men med ett lager av GraphQL "utanpå".

I vårt API så här långt i kursen har vi haft olika _routes_ för att hämta olika _resurser_. När vi använder oss av GraphQL har vi en enda route och till den skickar vi olika queries för att hämta ut den data vill hämta ut. GraphQL kan också användas för att skapa och ändra data, men i detta materialet tar jag inte upp det. I den länkade tutorial ovan och i den länkade koden på GitHub finns exempel på hur man kan mutera data som det heter inom GraphQL.

Vi börjar därför med att skapa en endpoint för graphql på routes `/graphql`.

```javascript
// app.js
const { graphqlHTTP } = require('express-graphql');

...

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: visual, // Visual är satt till true under utveckling
}));
```

I och med att visual är satt till `true` får man upp ett trevligt utvecklingsgränssnitt GraphiQL när man går till `/graphql`-routen. **Viktigt dock att sätta `visual` till `false` i produktion**.

Det vi behöver göra nu är att definiera ett `schema` för vår data vi vill exponera via GraphQL. Vi är duktiga och välorganiserade programmerare så vi delar självklart upp koden i mindre moduler för att underlätta vidareutveckling i framtiden. Vi använder `graphql`-modulens inbyggda GraphQLSchema typ och skickar med ett root-query objekt. Hade vi även velat mutera data hade vi här skickat med hur vi kan göra det.

```javascript
// app.js
const visual = true;
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema
} = require("graphql");

const RootQueryType = require("./graphql/root.js");

...

const schema = new GraphQLSchema({
    query: RootQueryType
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: visual,
}));
```

`RootQueryType` definierar sedan i sin tur vilka fält (`fields`) vi vill exponera via `/graphql`. I detta fallet vill vi exponera `course(s)`, `teacher(s)` och `students`. Vi definierar för varje fält vilken sorts typ det är och en beskrivning av vad vi får tillbaka för resultat och hur vi hämtar data med hjälp av en `resolver`-funktion. Nedan syns exemplet för `courses`, `courses.getAll()` är en funktion som hämtar alla kurser i mongodb databasen.

```javascript
courses: {
    type: GraphQLList(CourseType),
    description: 'List of all courses',
    resolve: async function() {
        return await courses.getAll();
    }
},
```

I exemplet ovan använder vi oss av `GraphQLList`, som är en inbyggt GraphQL typ och sedan vår egna typ `CourseType` där vi har definierat hur en kurs ska exponeras via GraphQL. Precis som för `RootQueryType` definierar vi de olika fält vi vill ska exponeras och hur vi kommer åt data. Om fältet vi får tillbaka från databasen heter samma som det vi vill att det ska heta i svaret från GraphQL behöver vi ingen `resolve`.

```javascript
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
    GraphQLNonNull
} = require('graphql');

const TeacherType = require("./teacher.js");
const StudentType = require("./student.js");

const CourseType = new GraphQLObjectType({
    name: 'Course',
    description: 'This represents a course',
    fields: () => ({
        courseCode: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        credits: { type: GraphQLNonNull(GraphQLFloat) },
        teachers: {
            type: GraphQLList(TeacherType),
            resolve: (course) => {
                return course.teachers
            }
        },
        students: {
            type: GraphQLList(StudentType),
            resolve: (course) => {
                return course.students
            }
        }
    })
})

module.exports = CourseType;
```

Vi kan nu genom att definiera även `TeacherType` och `StudentType få fram följande i graphiql gränssnittet.

![GraphiQL gränssnittet med courses query](https://dbwebb.se/img/jsramverk/graphiql.png)




### GraphQL i frontend

Vi kan hämta data från en GraphQL kan vi göra det med våra vanliga verktyg för att hämta data. Till exempel `fetch`, `axios` eller services i Angular. Det kan se ut på följande sätt när vi vill hämta alla kursers namn från graphql-servern i exempelkoden ovan.

```javascript
fetch('/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({ query: "{ courses { name } }" })
})
    .then(r => r.json())
    .then(data => console.log('data returned:', data));
```

Om man vill ha en mer fullständig GraphQL-klient att använda kan [Relay](https://relay.dev/) för React eller [Apollo-client](https://www.apollographql.com/docs/react/#community-integrations) som finns för Angular och Vue rekommenderas.



## Kravspecifikation

1. Implementera ett GraphQL schema för ditt API.

1. Din frontend bör använda GraphQL för minst en (1) del av ditt gränssnitt.

1. Committa och tagga dina repon med 5.0.0 och 6.0.0 eller senare, ladda upp till GitHub och driftsätt.

1. Länka till båda dina GitHub repon och den driftsatta klienten i en kommentar till din inlämning på Canvas.



## Skriva

Vi fortsätter iterativt med att förbättra vårt akademiska skrivande. Använd den återkopplingen du fick på förra veckans metodbeskrivning och förbättra beskrivningen.

Gå tillbaka till skrivguiden och titta under [metod](http://skrivguiden.se/skriva/uppsatsens_delar/#metod) för bra tips.

**Lämna in texten som PDF bilaga till din inlämning på Canvas.**
