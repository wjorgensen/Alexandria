import React from "react";
import { EmblaOptionsType } from 'embla-carousel'
import s from "./dao.module.scss";
import Carousel from "@/components/carousel/carousel";
import Divider from "@/components/divider/divider";

export default function Dao() {

    const OPTIONS: EmblaOptionsType = { align: 'start', loop: true}

    const members = [
        {
            name: "Alex",
            description: "the sun of ra",
            link: "@alex"
        },
        {
            name: "Andria",
            description: "the moon of ra",
            link: "@andria"
        }
    ]

    function librarians(): JSX.Element[]{
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

    const proposals = [
        {
            maker: "0x0000000000",
            votes: 0,
            entry: {
                name: "The Illiad",
                author: "Homer",
                medium: "poetry",
                year: "100 Ad",
                language: "greek",
                cid: "Qm1234567890"
            }
        },
        {
            maker: "0x1111111111",
            votes: 0,
            entry: {
                name: "The Odyssey",
                author: "Homer",
                medium: "poetry",
                year: "100 AD",
                language: "greek",
                cid: "Qm1234567890"
            }
        }
    ]

    function entries(): JSX.Element[]{
        return proposals.map((proposal, index) => {
            return (
                <div key={index} className={s.proposal}>
                    <div className={s.hex}>{proposal.entry.cid}</div>
                    <div className={s.entry}>
                        <h2>{proposal.entry.name}</h2>
                        <p>{proposal.entry.author}</p>
                        {/* <p>{proposal.entry.medium}</p>
                        <p>{proposal.entry.year}</p>
                        <p>{proposal.entry.language}</p> */}
                    </div>
                    <div className={s.voting}>
                        {/* <div className={s.maker}>{proposal.maker}</div> */}
                        <div className={s.votes}>- {proposal.votes} votes</div>
                        <button className={s.vote}>vote</button>
                    </div>
                </div>
            )
        })
    }


    return (
        <section className={s.dao}>
            <h1 className={s.librarians}>AL(eX)AN.DAO</h1>

            {/* <Divider content={"bank"}/> */}
            <div className={s.library}>

            </div>

            <Divider content="members" />
            <div className={s.library}>
                <Carousel slides={librarians()} options={OPTIONS} type="quarter"/> 
            </div>

            <Divider content="proposals" />
            <div className={s.library}>
                <Carousel slides={entries()} options={OPTIONS} type="half" /> 
            </div>
        </section>
    );
}