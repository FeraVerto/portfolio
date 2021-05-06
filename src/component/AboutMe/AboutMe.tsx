import React from 'react'
import s from './AboutMe.module.css'

export const AboutMe = () => {
    return (
        <div className={s.about}>
            <div className={s.about_block}>
                <h1 className={s.about_h1}>
                    <p className={s.p_hi}>I'm</p>
                    <p className={s.p_name}> Mariya Klevakina</p>
                    <p className={s.p_hi}>front-end developer.</p>
                    <span className={s.typing_effect_desktop}>
                    </span>
                </h1>
            </div>
        </div>
    )
}

