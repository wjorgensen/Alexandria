import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.query;

    console.log("query", query);

    if (!query) {
        return res.status(400).json({ error: 'query is required' });
    }

    const client = await clientPromise;

    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("ping success!");


        const collection = client.db("alexandria").collection("library");
        const q = query.toString();
        const agg = [
            {
                $search: {
                    index: "entries", 
                    compound: {
                        should: [
                            {
                                autocomplete: {
                                    query: q, 
                                    path: "name",
                                    score: { boost: { value: 2 } } 
                                }
                            },
                            {
                                autocomplete: {
                                    query: q,
                                    path: "author",
                                    score: { boost: { value: 1 } }
                                }
                            },
                            {
                                autocomplete: {
                                    query: q,
                                    path: "medium",
                                    score: { boost: { value: 1 } } 
                                }
                            }
                        ]
                    }
                }
            },
            { $limit: 20 }, 
        ];

        const cursor = collection.aggregate(agg);
        const results = await cursor.toArray();
        console.log(results);

        res.status(200).json({ results });
    } catch (e) {
        res.status(500).json({ error: "" });
    }
    finally {
        await client.close();
    }
}