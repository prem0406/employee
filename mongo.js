const { MongoClient } = require("mongodb");

module.exports = async function connectToCluster(uri) {
  let mongoClient;

  mongoClient = new MongoClient(uri);
  console.log("Connecting to MongoDB Atlas cluster...");
  await mongoClient.connect();
  console.log("Successfully connected to MongoDB Atlas!");

  return mongoClient;
};
