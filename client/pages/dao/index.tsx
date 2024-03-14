import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from 'embla-carousel'
import s from "./dao.module.scss";
import Carousel from "@/components/carousel/carousel";
import Divider from "@/components/divider/divider";
import { dbcontractABI } from "@/abi/db";
import Web3 from "web3";
import { DAOABI } from "@/abi/dao";
const { Conflux, Drip } = require('js-conflux-sdk');

export default function Dao() {

    const web3 = new Web3(new Web3.providers.HttpProvider("https://evmtestnet.confluxrpc.com"));
    const dbcontractaddress = '0x2689df809bc5735334bb873e1db1a143b2e639fa';
    const dbcontract = new web3.eth.Contract(dbcontractABI, dbcontractaddress);

    const daocontractaddress = "0xf3c4b26f6e92d2358dc66b99fd6cc3471b531071"
    const daocontract = new web3.eth.Contract(DAOABI, daocontractaddress);

    const [proposals, setProposals] = useState<any[]>([]);
    async function getproposals() {
        try {
            const res = await daocontract.methods.getEntryProposals().call();

            const newproposals = []

            for (let i = 0; i < res!.length; i++) {
                console.log((res as any)[i].creator);
                console.log((res as any)[i].votes);
                console.log((res as any)[i]['0'].name);
                console.log((res as any)[i]['0'].author);
                console.log((res as any)[i]['0'].medium);
                console.log((res as any)[i]['0'].yearReleased);
                console.log((res as any)[i]['0'].language);
                console.log((res as any)[i]['0'].cid);
                console.log("-------------------")

                if ((res as any)[i]['0'].cid == "") continue;

                let newproposal = {
                    maker: (res as any)[i].creator,
                    votes: (res as any)[i].votes.toString(),
                    entry: {
                        name: (res as any)[i]['0'].name,
                        author: (res as any)[i]['0'].author,
                        medium: (res as any)[i]['0'].medium,
                        year: (res as any)[i]['0'].yearReleased,
                        language: (res as any)[i]['0'].language,
                        cid: (res as any)[i]['0'].cid
                    }
                }

                newproposals.push(newproposal)
            }

            setProposals(newproposals);
        } catch (e) {
            console.error(e);
        }
    }

    const moniesexample = [
        {
            reason: "maintenance",
            to: "0x0000000000",
            value: 100,
            creator: "0x1111111111",
            votes: 0
        },
        {
            reason: "acquisition",
            to: "0x0000000000",
            value: 100,
            creator: "0x1111111111",
            votes: 0
        }
    ]
    const [monies, setMonies] = useState<any[]>([]);


    async function getmonies() {
        try {
            const res = await daocontract.methods.getSpendMoneyProposals().call();
            console.log(res);
            const newmonies = []

            for (let i = 0; i < res!.length; i++) {
                console.log((res as any)[i].creator);
                console.log((res as any)[i].votes);
                console.log((res as any)[i]['0'].reason);
                console.log((res as any)[i]['0'].to);
                console.log((res as any)[i]['0'].value);
                console.log("-------------------")

                let newmoney = {
                    creator: (res as any)[i].creator,
                    votes: (res as any)[i].votes.toString(),
                    reason: (res as any)[i]['0'].reason,
                    to: (res as any)[i]['0'].to,
                    value: (res as any)[i]['0'].value
                }

                newmonies.push(newmoney)
            }

            setMonies(newmonies);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getproposals();
        getmonies();
    }, []);

    const [donation, setDonation] = useState<number>()
    async function donate() {
        // @ts-ignore
        await window.ethereum.enable();
        console.log("donating", donation);
        try {
            if (!donation || donation <= 0) {
                return;
            }

            console.log("getting acc")
            const accounts = await web3.eth.getAccounts(); 
            if (accounts.length === 0) {
                console.error('No account found');
                return;
            }
            const account = accounts[0]; 

            const donationAmount = web3.utils.toWei(donation.toString(), 'ether');
            await daocontract.methods.donate().send({ from: account, value: donationAmount });

            setDonation(undefined);
        } catch (error) {
            console.error('Donation error:', error);
        }
    }


    const OPTIONS: EmblaOptionsType = { align: 'start', loop: true }

    const members = [
        {
            name: "Wes",
            description: "Co-founder of AL(eX)ANDRIA",
            link: "@wezabis"
        },
        {
            name: "Saad",
            description: "Co-founder of AL(eX)ANDRIA",
            link: "@gi1lgamesh"
        }
    ]

    function librarians(): JSX.Element[] {
        return members.map((member, index) => {
            return (
                <div key={index} className={s.member}>
                    <h2>{member.name}</h2>
                    <p>{member.description}</p>
                    <a href={`https://twitter.com/${member.link}`}>{member.link}</a>
                </div>
            )
        })
    }

    function entries(): JSX.Element[] {
        return proposals.map((proposal, index) => {
            return (
                <div key={index} className={s.proposal}>
                    <div className={s.hex}>{proposal.entry.cid}</div>
                    <div className={s.entry}>
                        <h2>{proposal.entry.name}</h2>
                        <p>{proposal.entry.author}</p>
                        <p>{proposal.entry.medium}</p>
                        {/* <p>{proposal.entry.year}</p> */}
                        {/*  <p>{proposal.entry.language}</p> */}
                    </div>
                    <div className={s.voting}>
                        {/* <div className={s.maker}>{proposal.maker}</div> */}
                        <div className={s.votes}>{proposal.votes} votes</div>
                        <button className={s.vote}>vote</button>
                    </div>
                </div>
            )
        })
    }

    function monetaries(): JSX.Element[] {
        return moniesexample.map((money, index) => {
            return (
                <div key={index} className={s.monetary}>
                    <div className={s.value}>{money.value} ETH</div>
                    <h2 className={s.reason}>{money.reason}</h2>
                    <div className={s.addr}>
                        <div className={s.to}>{money.to}</div>
                        <div className={s.creator}>{money.creator}</div>
                    </div>
                    <div className={s.voting}>
                        <div className={s.votes}>{money.votes} votes</div>
                        <button className={s.vote}>vote</button>
                    </div>
                </div>
            )
        })
    }

    return (
        <section className={s.dao}>
            <h1 className={s.librarians}>AL(eX)AN.DAO</h1>

            <Divider content="banking" />
            <div className={s.bank}>
                <h2>balance: 30 ETH</h2>
                <div>
                    <input type="number" value={donation} onChange={(e) => setDonation(parseInt(e.target.value))}
                        placeholder="donate"
                    />
                    <button className={s.vote} onClick={donate}>donate</button>
                </div>
            </div>
            <Divider content="members" />
            <div className={s.library}>
                <Carousel slides={librarians()} options={OPTIONS} type="quarter" />
            </div>

            <Divider content="proposals" />
            <div className={s.library}>
                <Carousel slides={entries()} options={OPTIONS} type="half" />
            </div>

            <Divider content="monetary" />
            <div className={s.library}>
                <Carousel slides={monetaries()} options={OPTIONS} type="half" />
            </div>
        </section>
    );
}