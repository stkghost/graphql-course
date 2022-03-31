import { createServer } from 'graphql-yoga'


// 5 main graphql types
// Scalar types: String, Boolean, Int, Float, ID

const posts = [
  {
    id: '1',
    title: "Como fazer maconha com javascript e maizena",
    description: "SQSDafsaifioghaçeurgherçõghaergoe",
    author: '1'
  },
  {
    id: '2',
    title: "Como fazer maconha com javascript e maizena",
    description: "SQSDafsaifioghaçeurgherçõghaergoe ",
    author: '2'
  },
  {
    id: '3',
    title: "Como fazer maconha com javascript e maizena",
    description: "SQSDafsaifioghaçeurgherçõghaergoe ",
    author: '3'
  },
]

const users = [
  {
    id: '1',
    name: "Gabriel Souza",
    age: 24
  },
  {
    id: '2',
    name: "Rafael Souza",
    age: 25
  },
  {
    id: '3',
    name: "Lucas Souza",
    age: 8
  },
]

const typeDefs = /* GraphQL */`
  type Query {
    posts(query: String): [Post!]!
    users(query: String): [User!]!
  }

  type Post {
    id: ID!
    title: String!
    description: String!
    author: User!
  }

  type User {
    id: String!
    name: String!
    age: Int!
    posts: [Post!]!
  }
`

const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }
      return users.filter(user => {
        return user.title.toLowerCase().includes(args.query.toLowerCase())
      })
    },
  },
  Post: {
    author(parent, a, c, i) {
      return users.find(user => {
        return user.id === parent.id
      })
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        const data = post.author === parent.id
        console.log(data)
        return data
      })
    }
  }
}

const server = createServer({
  schema: {
    typeDefs,
    resolvers
  },
})
server.start()