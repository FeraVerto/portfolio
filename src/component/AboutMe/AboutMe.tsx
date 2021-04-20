import React from 'react'
import s from './AboutMe.module.css'
import photo from './../../image/avatar.jpg'

export const AboutMe = () => {
    return (
        <div className={s.about}>
            <div className={s.about_block}>
                <h1 className={s.about_h1}>
                    <p className={s.p_hi}>I'm</p>
                    <p className={s.p_name}> Mariya Klevakina.</p>
                    <p className={s.p_hi}>front-end developer.</p>
                </h1>
                <div className={s.about_photo}>
                    <img src={photo} alt="photo" width={400} height={500}/>
                </div>
            </div>
        </div>
    )
}