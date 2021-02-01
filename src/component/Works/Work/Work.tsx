import React from 'react'
import s from "./Work.module.css"

export const Work = () => {
    return (
        <li className={s.work}>
            <div className={s.work_img}>
                <a>Смотреть</a>
            </div>
            <h3>Название проекта</h3>
            <p>Краткое описание</p>
        </li>
    )
}