import s from "./footer.module.scss";
import Link from "next/link";
import Router, { useRouter } from "next/router";

export default function Footer() {

    return (
        <footer className={s.footer}>
            <a href="https://discord.gg/RvNdnmZUpk"><img src="discord-mark-blacl.png"></img></a>
            
        </footer>
    )
}