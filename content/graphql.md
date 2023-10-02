# GraphQL

<p class="author">Emil Folino</p>

I denna artikeln tittar vi på hur vi kan använda GraphQL för att skapa en enda endpoint för vår backend.



## Titta

Innan vi kommer allt för långt är det bra att ha referensmanualen för [express-graphql](https://graphql.org/graphql-js/express-graphql/) nära till hands.



#### Kort introduktion till GraphQL

<div class='embed-container'><iframe src="https://www.youtube.com/embed/eIQh02xuVw4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



#### Längre kodexempel i Express

Exempelkod till nedanstående video finns på [GitHub](https://github.com/WebDevSimplified/Learn-GraphQL).

<div class='embed-container'><iframe src="https://www.youtube.com/embed/ZQL7tL2S0oQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>



## Material och tekniker



### GraphQL i backend

I [Kursrepot](https://github.com/emilfolino/jsramverk) finns exemplet [graphql](https://github.com/emilfolino/jsramverk/tree/master/graphql) är koden från detta exemplet som förklaras nedan. Är nog bäst att hålla ganska hårt i exempelkoden i denna artikeln då det är ganska många delar som samverkar. API:t är ett API för att hämta ut data om kurser. Exempeldata innehåller två kurser, två lärare och totalt 4 studenter. API:t använder sig av samma stack som tidigare i kursen, men med ett lager av GraphQL "utanpå".

I vårt API så här långt i kursen har vi haft olika _routes_ för att hämta olika _resurser_. När vi använder oss av GraphQL har vi en enda route och till den skickar vi olika queries för att hämta ut den data vill hämta ut. GraphQL kan också användas för att skapa och ändra data, men i detta materialet tar jag inte upp det. I den länkade tutorial ovan och i den länkade koden på GitHub finns exempel på hur man kan mutera data som det heter inom GraphQL.

Vi börjar med att installera två paket `npm install --save graphql express-graphql` i vårt backend repo. Efter Installationen skapar vi en endpoint för graphql på routen `/graphql`.

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
    type: new GraphQLList(CourseType),
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
        courseCode: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        credits: { type: new GraphQLNonNull(GraphQLFloat) },
        teachers: {
            type: new GraphQLList(TeacherType),
            resolve: (course) => {
                return course.teachers
            }
        },
        students: {
            type: new GraphQLList(StudentType),
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

Vi kan hämta data från en GraphQL server med våra vanliga verktyg för att hämta data. Till exempel `fetch`, `axios` eller services i Angular. Det kan se ut på följande sätt när vi vill hämta alla kursers namn från graphql-servern i exempelkoden ovan.

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



### GraphQL och auth

När vi vill få GraphQL att samverka med autentisering av våra användare är artikeln [Authentication and Express Middleware](https://graphql.org/graphql-js/authentication-and-express-middleware/) en bra utgångspunkt.
