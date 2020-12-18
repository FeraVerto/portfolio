import React from 'react'
import {Skill} from "./Skill/Skill";
import s from "./Skills.module.css"

export const Skills = () => {
    return (
        <div className={s.skills}>
            <h2>Мои скиллы</h2>
            <ul className={s.skills_list}>
                <Skill/>
                <Skill/>
                <Skill/>
            </ul>
        </div>
    )
}