import { useState } from "react";
import s from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import Web3 from 'web3';


interface Entry {
  name: string;
  author: string;
  medium: string;
  yearReleased: number;
  language: string;
  cid: string;
}

const example = [
  {
    title: "The Iliad",
    author: "Homer",
    link: "https://ipfs.io/ipfs/iliad"
  },
  {
    title: "The Odyssey",
    author: "Homer",
    link: "https://ipfs.io/ipfs/odyssey"
  }
]

export default function Index() {

  const [text, setText] = useState("")
  const [results, setResults] = useState<Entry[]>([])

  const contractAddress = '0x2689DF809bC5735334bb873e1dB1A143B2e639FA';
  const contractABI = [{
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

  //Need to add searching animation while its fetching from the blockchain
  async function search(searchTerm: string) {
    const web3 = new Web3('https://evmtestnet.confluxrpc.com');
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    let result;

    try {
      console.log('searching for:', searchTerm);
      result = await contract.methods.search(searchTerm).call();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
      setResults(result as Entry[]);
  }

  return (
    <section className={s.main}>
      <h1 className={s.alexandria}>AL(eX)ANDRIA</h1>
      <div className={s.search}>
        <input type="text" placeholder="Search Literature"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => search(text)}>Search</button>
      </div>
      {
        results.length > 0 ?
          <div className={s.books}>
            {
              results.map((book, index) => {
                return (
                  <div key={index} className={s.book}>
                    <h2>{book.name}</h2>
                    <p>{book.author}</p>
                    <a href={`https://ipfs.io/ipfs/${book.cid}`} target="_blank">{book.cid}</a>
                  </div>
                )
              })
            }
          </div>
          : 
          <div className={s.library}>
            <Image src="/Ancient.jpg" alt="Alexandria Library" width={500} height={500} />
            <p>
              In the year 48 BC, flames devoured the Library of Alexandria, an unparalleled citadel of wisdom, reducing centuries of accumulated knowledge to ashes. Inspired by this monumental beacon of erudition that was tragically extinguished by the whims of fate, we have christened our new sanctum of learning "Alexandria" in solemn tribute. This modern Alexandria is not merely a homage to the past; it is a defiant stand against the ravages of time, calamity, and those who wish to stop the flow of knowledge. Anchored in the immutable bedrock of blockchain technology, our library is designed to be an indestructible vault of knowledge, a testament to the enduring human spirit of preservation and enlightenment. As long as the blockchain endures, Alexandria shall remain invincible, a phoenix arisen from the ashes of its ancient namesake, offering a sanctuary of wisdom to the ages.
            </p>
          </div>
      }
    </section>
  );
}
