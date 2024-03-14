import React from "react";
import { EmblaOptionsType } from 'embla-carousel'
import s from "./dao.module.scss";
import EmblaCarousel from "@/components/carousel/carousel";
import Divider from "@/components/divider/divider";

export default function Dao() {


    const OPTIONS: EmblaOptionsType = { align: 'start', loop: true}
    const SLIDE_COUNT = 6
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


    return (
        <section className={s.dao}>
            <h1 className={s.librarians}>AL(eX)AN.DAO</h1>

            {/* <Divider content={"bank"}/> */}
            <div className={s.library}>

            </div>

            <Divider content="members" />
            <div className={s.library}>
                <EmblaCarousel slides={SLIDES} options={OPTIONS} /> 
            </div>

            <Divider content="proposals" />
            <div className={s.library}>
                <EmblaCarousel slides={SLIDES} options={OPTIONS} /> 
            </div>
        </section>
    );
}