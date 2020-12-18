import React from 'react'
import s from './AboutMe.module.css'

export const AboutMe = () => {
    return (
        <div className={s.about}>
            <div className={s.about_block}>
                <p className={s.about_info}>
                    Привет!<br/> Меня зовут Мария Клевакина.<br/>
                    Я front-end разработчик.
                </p>
                <div className={s.about_photo}>
                    <img src="" alt=""/>
                </div>
            </div>
        </div>
    )
}