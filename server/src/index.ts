// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Web3 from "web3";

const { Conflux, Drip } = require('js-conflux-sdk');
const { MongoClient, ServerApiVersion } = require('mongodb');

const fs = require('fs');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

const web3 = new Web3(new Web3.providers.HttpProvider("https://evmtestnet.confluxrpc.com"));
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
const dbcontract = new web3.eth.Contract(dbcontractABI, dbcontractaddress);

async function dump() {
  const dump = await dbcontract.methods.dump().call();
  //console.log(dump);    
}

dump();

// USED TO PROPOGATE THE MONGODB COLLECTION
async function previous() {
  //console.log(dbcontract);

  const events = await dbcontract.getPastEvents('AddedEntry' as any, {
    fromBlock: 0,
    toBlock: 'latest'
  });
  // @ts-ignore

  for (let i = 0; i < events.length; i++) {
    console.log((events[i] as any).returnValues.newEntry.name);
  }
}
previous();


dbcontract.events.AddedEntry()
  .on("connected", function (subscriptionId) {
    console.log(subscriptionId);
  })


async function uploadscript() {

  const uri = process.env.MDB;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: false,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    console.log(`Current working directory: ${process.cwd()}`);
    const data = fs.readFileSync('./src/upload.json', 'utf8');
    const documents = JSON.parse(data);
    const collection = client.db("alexandria").collection("library");
    const result = await collection.insertMany(documents);
    console.log(`${result.insertedCount} documents were inserted`);

  } finally {
    await client.close();
  }
}
/* uploadscript().catch(console.dir); */




app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port} \n`);
});
