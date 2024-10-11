const { MongoClient, ServerApiVersion } = require('mongodb');
const http = require('http');
const url = require('url');
const cors = require('cors'); // Add this line
const express = require('express'); // Using Express for simplicity
const app = express(); // Create an Express application

const uri = "mongodb+srv://Pratham:Raj9428048743@e-decor.meaj1.mongodb.net/?retryWrites=true&w=majority&appName=E-Decor";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  await client.connect();
}

async function registerUser(username, email, password) {
  const db = client.db("E-DecorUsers");
  const users = db.collection("Users");

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return "User already exists";
  }

  await users.insertOne({ username, email, password });
  return "User registered successfully";
}

// Use CORS middleware
app.use(cors());
app.use(express.json()); // Add this to parse JSON request bodies

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const result = await registerUser(username, email, password);
  res.status(200).send(result);
});

connectToMongoDB()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(err => {
    console.error('Connection to MongoDB failed:', err);
  });
