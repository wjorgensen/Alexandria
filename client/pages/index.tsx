import { useState } from "react";
import s from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";

interface Book {
  title: string;
  author: string;
  link: string;
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
  const [results, setResults] = useState<Book[]>([])

  function search() {
    console.log(text)
    setResults(example)
  }

  return (
    <main className={s.main}>
      <h1 className={s.alexandria}>ALEXANDRIA</h1>
      <div className={s.search}>
        <input type="text" placeholder="Search Literature"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </div>
      {
        results.length > 0 ?
          <div className={s.books}>
            {
              results.map((book, index) => {
                return (
                  <div key={index} className={s.book}>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <Link href={book.link} target="_blank">{book.link}</Link>
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
    </main>
  );
}
