const { ApolloServer, gql } = require('apollo-server');
const { parseNodeId, generateNodeId } = require('./utils'); 


/*
  node id 
    for a person: "UGVyc29uOjEyMzQ="
    for an article: "QXJ0aWNsZTo1Njc4"
HEYEYEYEYEYEYE

*/




// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    node(id: ID!): Node
  }

  interface Node {
    id: Int!
  }

  type Article implements Node {
    id: Int!
    title: String
  }

  type Person implements Node {
    id: Int!
    name: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    node: (_, { id }, { models }) => {
      let getNodeById;
      const { type, id: entityId } = models.node.parseNodeId(id); 
      
      switch(type){
        case 'Person': 
          getNodeById = models.person.getById;
          break;
        case 'Article': 
          getNodeById = models.article.getById;
          break;
      }
      
      return getNodeById(entityId);
    }
  },
  Node: {
    __resolveType: ({ __type }) => __type
  }
};

const models = {
  node: {
    parseNodeId,
    generateNodeId
  },
  person: { getById: (id) => { console.log('person'); return {id, __type: 'Person', name: 'Jane Doe'}; } },
  article: { getById: (id) => { console.log('article'); return {id, __type: 'Article', title: 'A Great Article'}; } }
};

const server = new ApolloServer({ typeDefs, resolvers, context: { models } });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
