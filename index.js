const express = require("express");
const connectToCluster = require("./mongo");
const { config } = require("dotenv");

config();
const uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}?authSource=${process.env.MONGODB_AUTH_SOURCE}`;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.get("/", async (req, res) => {
  res.send("Employee service and UP and RUNNING...");
});

app.get("/employee", async (req, res) => {
  let mongoClient;
  try {
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db("company");
    const collection = db.collection("employees");
    const employees = await collection.find().toArray();
    res.send(employees);
  } catch (error) {
    console.log("GET: Connection to MongoDB failed!", error);
    res.send("GET: Connection to MongoDB failed!");
  } finally {
    await mongoClient.close();
  }
});

app.post("/employee/add", async (req, res) => {
  let mongoClient;
  try {
    const employee = req.body;
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db("company");
    const collection = db.collection("employees");
    await collection.insertOne(employee);
    res.send(`${employee.empCode} is created`);
  } catch (error) {
    console.log("POST: Connection to MongoDB failed!", error);
    res.send("POST: Connection to MongoDB failed!");
  } finally {
    await mongoClient.close();
  }
});

app.listen(port, () => {
  console.log(`Employee app listening on port ${port}`);
});
