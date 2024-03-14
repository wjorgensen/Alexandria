import s from './divider.module.scss';

export default function Divider({content}: {content: string}) {
    return (
        <div className={s.divider}>
                <div className={s.bar}></div>
                <div className={s.content}>{content}</div>
                <div className={s.bar}></div>
            </div>
    )
}