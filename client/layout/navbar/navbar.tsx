import React from "react";
import s from "./navbar.module.scss";
import Link from "next/link";
import Router, { useRouter } from "next/router";

export default function Navbar() {

    const router = useRouter();

    function Navigation(): JSX.Element {
        if (router.pathname === "/" || router.pathname === "/how-to") {
            return (
                <Link href={"/dao"}><button className={s.dao}>dao</button></Link>
            )
        } 
        if (router.pathname === "/dao") {
            return (
                <Link href={"/"}><button className={s.home}>library</button></Link>
            )
        }
        

        return <></>
    }

    return (
        <nav className={s.nav}>
            <div>
                <Link href={"/"}>
                    <h1 className={s.alexandria}>AL(eX)ANDRIA</h1>
                </Link>
            </div>
            <div>
                <a href="https://evmtestnet.confluxscan.net/address/0xb301186922d32b9af3d5a8078090e2184c41c246?tab=contract-viewer" target="_blank"><button>contract</button></a>
                <Link href="/how-to"><button>how to use</button></Link>
                {Navigation()}
            </div>
        </nav>
    )
}