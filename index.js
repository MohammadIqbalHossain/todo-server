const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express()

app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.2q1vv.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try{
        await client.connect();

        const billCollection = client.db("billingPage").collection("billingData");

        app.post('/billing-data', async (req, res) => {
            const bill = req.body;
            const result = await billCollection.insertOne(bill);
            res.send(result);

        });


        app.get('/bill', async (req, res) => {
          const query = {};
          const cursor = billCollection.find(query);
          const result = await cursor.toArray();
          res.send(result);
      })



    }
    finally{

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("doctors portal runnning")
  })


app.listen(port, () => {
    console.log("Listenning from doctors posrtal", port);
  });


