import React from 'react'
import s from "./Skill.module.css"

type SkillType = {
    title: string,
    icon: string,
    description: string
}

export const Skill: React.FC<SkillType> = ({title, description, icon}) => {
    return (
        <li className={s.skill_item}>
            <div className={s.skill_background}>
                <div className={s.skill_background2}>
                    <img className={s.skill_img} src={icon} width={100} height={100} alt="skill"/>
                    <h3>{title}</h3>
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        </li>
    )
}