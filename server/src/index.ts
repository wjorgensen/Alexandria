// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Web3 from "web3";
/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
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
const dbcontract = new web3.eth.Contract(dbcontractABI, dbcontractaddress)

const daocontractaddress = '';
const daocontractABI = [];

dbcontract.events.AddedEntry()
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
});


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port} \n`);
});
