import React from 'react'
import {Work} from "./Work/Work";
import s from "./Works.module.css"

export const Works = () => {
    return (
        <div className={s.works}>
            <h2>Мои работы</h2>
            <ul className={s.works_list}>
                <Work/>
                <Work/>
            </ul>
        </div>
    )
}