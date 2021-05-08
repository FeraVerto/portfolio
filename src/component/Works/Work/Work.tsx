import React from 'react'
import s from "./Work.module.css"

type WorkType = {
    title: string
    description: string
    link: string
    img: string
}

export const Work: React.FC<WorkType> = ({title, description, link, img}) => {
    return (
        <li className={s.work}>
            <div className={s.work_background}>
                <a href={link}>
                    <div className={s.work_info_block}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <div className={s.work_img}>
                            <img src={img} alt="work"/>
                        </div>
                    </div>
                </a>
            </div>
        </li>
    )
}