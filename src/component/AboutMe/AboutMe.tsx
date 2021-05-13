import React from 'react'
import s from './AboutMe.module.css'

export const AboutMe = () => {
    return (
        <div className={s.about}>
            <div className={s.about_container}>
                <h1 className={s.about_h1}>
                    <span className={s.about_h1_part}>I'm</span>
                    <span className={s.p_name}> Mariya Klevakina</span>
                    <span className={s.about_h1_part}>front-end developer.</span>
                </h1>
            </div>
        </div>
    )
}

