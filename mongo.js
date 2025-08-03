const { MongoClient, ServerApiVersion } = require("mongodb");
const { config } = require("dotenv");

config();
const uri = process.env.DB_URI;
// console.log("****", uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

module.exports = async function connectToCluster(uri) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri);
    console.log("Connecting to MongoDB Atlas cluster...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
  }
};

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await connectToCluster(uri);
//   } catch (error) {
//     console.log("RUN: Connection to MongoDB Atlas failed!", error);
//   }
// }
// run().catch(console.dir);
