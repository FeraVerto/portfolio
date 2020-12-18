import React from 'react'
import s from "./Footer.module.css"

export const Footer = () => {
    return (
        <div className={s.social}>
            <h3>Мария Клевакина</h3>
            <ul className={s.social_list}>
                <li className={s.social_item}></li>
                <li className={s.social_item}></li>
                <li className={s.social_item}></li>
                <li className={s.social_item}></li>
            </ul>
        </div>
    )
}