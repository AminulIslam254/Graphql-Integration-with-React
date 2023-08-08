const express = require('express')
const cors = require('cors');
const {graphqlHTTP } = require('express-graphql');
const port=5000;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()
app.use(cors());

const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]


const AuthorType=new GraphQLObjectType({
  name:'AuthorType',
  fields:()=>({
    id:{type: GraphQLInt},
    name:{type: GraphQLString},
  })
})

const BookType=new GraphQLObjectType({
  name:'BookType',
  fields:()=>({
    id:{type: GraphQLInt},
    name:{type: GraphQLString},
    authorId:{type: GraphQLInt},
    authors:{
      type:AuthorType,
      resolve:(book)=>{return authors.find(authors=>authors.id===book.authorId)}
    }
  })
})



const RootQueryType=new GraphQLObjectType({
  name:'Book',
  description:"Returns books by author",
  fields:()=>({
    books:{
      type:new GraphQLList(BookType),
      resolve:()=>books
    },
    
    
  })
})



const schema = new GraphQLSchema({
  query: RootQueryType,
 
})

app.use('/graphql', graphqlHTTP ({
  schema: schema,
  graphiql: true
}))

app.get('/',(req,res)=>{
  res.send("Hi");
})


app.listen(port, () => console.log(`Server Running at port ${port}`))
