// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Web3 from "web3";

const { Conflux, Drip } = require('js-conflux-sdk');


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

const web3 = new Web3('https://evmtestnet.confluxrpc.com');
const dbcontractaddress = '0x2689df809bc5735334bb873e1db1a143b2e639fa';
const dbcontractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "NotDAO",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotOwner",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "author",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "medium",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "yearReleased",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "language",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "cid",
              "type": "string"
            }
          ],
          "indexed": false,
          "internalType": "struct Database.Entry",
          "name": "newEntry",
          "type": "tuple"
        }
      ],
      "name": "AddedEntry",
      "type": "event"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "author",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "medium",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "yearReleased",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "language",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "cid",
              "type": "string"
            }
          ],
          "internalType": "struct Database.Entry",
          "name": "_entry",
          "type": "tuple"
        }
      ],
      "name": "addEntry",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "dump",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "author",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "medium",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "yearReleased",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "language",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "cid",
              "type": "string"
            }
          ],
          "internalType": "struct Database.Entry[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_search",
          "type": "string"
        }
      ],
      "name": "search",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "author",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "medium",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "yearReleased",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "language",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "cid",
              "type": "string"
            }
          ],
          "internalType": "struct Database.Entry[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_dao",
          "type": "address"
        }
      ],
      "name": "setDao",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
}];

const dbcontractcfx = new Conflux({
  url: 'https://evmtestnet.confluxrpc.com',
  networkId: 1,  // Note: network is required
  logger: console, // for debug
});

/* dbcontract.events.AddedEntry()
  .on("connected", function(subscriptionId){ 
    console.log(subscriptionId);
  })

dbcontract.events.AddedEntry()
  .on("data", function(event){
    console.log(event);
  })


dbcontract.getPastEvents('AddedEntry' as any, {}, function(error: Error, events: any){ console.log(events); } as any)
.then(function(events){
    console.log("past events", events)
}); */


const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const uri = "mongodb+srv://alexandria:alexandria@alexandria-cluster.wsztfdy.mongodb.net/?retryWrites=true&w=majority&appName=alexandria-cluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    /* console.log(`Current working directory: ${process.cwd()}`);
    const data = fs.readFileSync('./src/upload.json', 'utf8');
    const documents = JSON.parse(data); 

    const collection = client.db("alexandria").collection("library");
    const result = await collection.insertMany(documents);
    console.log(`${result.insertedCount} documents were inserted`); */

    const collection = client.db("alexandria").collection("library");
    const q = "constitution north carolina";
    const agg = [
      {
          $search: {
              index: "entries", // make sure this matches the name of your Atlas Search index
              compound: {
                  should: [
                      {
                          autocomplete: {
                              query: q, // this is the search string, you might want to parameterize it
                              path: "name",
                              score: { boost: { value: 2 } } // Optional: Boost the relevance score for matches in the 'name' field
                          }
                      },
                      {
                          autocomplete: {
                              query: q,
                              path: "author",
                              score: { boost: { value: 1 } } // Optional: You can adjust the boost value
                          }
                      },
                      {
                          autocomplete: {
                              query: q,
                              path: "medium",
                              score: { boost: { value: 1 } } // Optional: Adjust boost value as needed
                          }
                      }
                  ]
              }
          }
      },
      {$limit: 20}, // Limits the number of results
  ];

    const cursor = collection.aggregate(agg);
    await cursor.forEach((entry: any) => {
      console.log(entry);
    })

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port} \n`);
});
