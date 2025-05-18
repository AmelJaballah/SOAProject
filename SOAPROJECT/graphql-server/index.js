const { ApolloServer, gql } = require('apollo-server');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = '../grpc-server/recommendation.proto';
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const client = new grpcObj.recoPackage.Reco('localhost:50051', grpc.credentials.createInsecure());

const typeDefs = gql`
  type Content {
    content_id: String
    category: String
  }

  type Query {
    recommendations(user_id: String!): [Content]
  }
`;

const resolvers = {
  Query: {
    recommendations: (_, { user_id }) => new Promise((resolve, reject) => {
      client.GetRecommendations({ user_id }, (err, response) => {
        if (err) reject(err);
        else resolve(response.items);
      });
    })
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000).then(({ url }) => console.log(`GraphQL ready at ${url}`));