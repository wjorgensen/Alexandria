# Alexandria

### directions to running locally
\$ `cd client`  
\$ `npm i`  
\$ `npm run dev`

--- 

### structure
| - Client  
| - Contracts  
| - Scrape  
| - Server  

CLIENT: the nextjs frontend which provides a way of interacting with our smart contract.  

SCRAPE: this was used as a temporary directory to do a lot of our scraping of books and internet content to populate our blockchain with. Mainly scraped from gutenberg project

SERVER: this is what syncs our blockchain on conflux with our mongodb Atlas Search instance. All the blockchain content is dumped to a mongodb database instance, which is then indexed and atlas search is used which allows for super quick "near-to" searching. This allows for the blockchain to be a source of truth, while also allowing for quick searches for the client

CONTRACTS: all of our blockchain code, our dao, and database.

---

In the year 48 BC, flames devoured the Library of Alexandria, an unparalleled citadel of wisdom, reducing centuries of accumulated knowledge to ashes. Inspired by this monumental beacon of erudition that was tragically extinguished by the whims of fate, we have christened our new sanctum of learning "Alexandria" in solemn tribute. This modern Alexandria is not merely a homage to the past; it is a defiant stand against the ravages of time, calamity, and those who wish to stop the flow of knowledge. Anchored in the immutable bedrock of blockchain technology, our library is designed to be an indestructible vault of knowledge, a testament to the enduring human spirit of preservation and enlightenment. As long as the blockchain endures, Alexandria shall remain invincible, a phoenix arisen from the ashes of its ancient namesake, offering a sanctuary of wisdom to the ages.

We have developed an innovative way of perpetual storage for the internet age. Projects like The Internet Archive, Project Gutenberg and Google Scholar are indispensible for the modern internet but they all come with an inhernent problem. Servers at scale are expensive to run and time consuming. We developed a different way to perpetually store information by using blockchain technology. Alexandria is a combination of the IPFS protocol and a smart contarct on any EVM compatible chain to store the CID's of the files after they have been uploaded to IPFS. IPFS allows anyone to host and distribute files at scale as long as they have a server hosting the files and pinning them to IPFS. In our case it is a Raspberry Pi. Once files have been uploaded anyone can view and download them as long as they have the files CID. We take the CID's of the files we want to host and upload them into our smart contract. Once there they can be viewed and searched by anyone worldwide and becuase of the stability of blockchain they can never be taken down or changed once uploaded. This system allows us to have the same files and reach as the Internet Archive, Project Gutenberg, and Google Scholar at a fraction of the cost and ten times the reliability. 
