import s from "./footer.module.scss";

export default function Footer() {

    return (
        <footer className={s.footer}>
            <a href="https://discord.gg/DZQzTN5g5r" target="_blank"><img src="discord-mark-black.png"></img></a>
            <a href="https://twitter.com/libofalexandr1a" target="_blank"><img src="x-logo-black.png"></img></a>
        </footer>
    )
}