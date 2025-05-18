const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');

const PROTO_PATH = './recommendation.proto';
const DATA_PATH = '../consumer/data.json';

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const recoPackage = grpcObj.recoPackage;

const server = new grpc.Server();

server.addService(recoPackage.Reco.service, {
  GetRecommendations: (call, callback) => {
    const userId = call.request.user_id;
    let userData = {};
    try {
      userData = JSON.parse(fs.readFileSync(DATA_PATH));
    } catch (e) {
      // If file doesn't exist or is empty, return empty recommendations
      return callback(null, { items: [] });
    }
    const recommendations = [];
    if (userData[userId]) {
      for (let category in userData[userId]) {
        const contents = Object.entries(userData[userId][category])
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([content_id]) => ({ content_id, category }));
        recommendations.push(...contents);
      }
    }
    callback(null, { items: recommendations });
  }
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});
