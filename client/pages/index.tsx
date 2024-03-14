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


export default function Index() {

  const [text, setText] = useState("")
  const [results, setResults] = useState<Entry[]>([])


  //Need to add searching animation while its fetching from the blockchain
  async function search(searchTerm: string) {
    // const web3 = new Web3('https://evmtestnet.confluxrpc.com/');
    // const contract = new web3.eth.Contract(contractABI, contractAddress);

    // try {
    //   const result = await contract.methods.search(searchTerm).call();
    //   return result as Entry[];
    // } catch (error) {
    //   console.error('Error:', error);
    //   throw error;
    // }
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
