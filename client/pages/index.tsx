import { useState } from "react";
import s from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import Web3 from 'web3';
const { Conflux } = require('js-conflux-sdk');


interface Entry {
  name: string;
  author: string;
  medium: string;
  yearReleased: number;
  language: string;
  cid: string;
}


export default function Index() {

  const [text, setText] = useState("")
  const [results, setResults] = useState<Entry[]>([])


  const conflux = new Conflux({
    url: 'https://evmtestnet.confluxrpc.com/',
    logger: console,
    networkId: 1,
  });
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
  const contract = conflux.Contract({ abi: contractABI, address: contractAddress });


  //Need to add searching animation while its fetching from the blockchain
  async function search(searchTerm: string) {
    /* let result;

    try {
      console.log('searching for:', searchTerm);
      result = await contract.methods.search(searchTerm).call();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    setResults(result as Entry[]); */
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
                    <p>{book.medium}</p>
                    <p>{book.yearReleased}</p>
                    <p>{book.language}</p>
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
              Alexandria is the world's first blockchain-based public library. At Alexandria, we believe that information should be free, easily accessible, and free from censorship. For much of the internet's history this has been the case however we've identified a flaw in the model used by platforms such as The Internet Archive and Google Scholar. These sites, despite their value, are costly to operate and maintain due to their reliance on centralized servers. While generous donations have sustained them thus far, future financial stability is uncertain. To address this, we've developed a new, more economical and sustainable method for storing digital content. Utilizing blockchain technology, specifically IPFS and an EVM-compatible chain, we can permanently archive digital information at a minimal cost. The only expense is maintaining an IPFS node, which, in our case, is a Raspberry Pi. Through this innovative approach, we aim to preserve and provide open access to a wealth of copyright-free books, news articles, research papers, and more, ensuring they remain free and accessible for everyone.
            </p>
          </div>
      }
    </section>
  );
}
