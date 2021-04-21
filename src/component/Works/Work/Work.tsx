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
            <div className={s.work_img}>
                <img src={img} alt=""/>
                <a href={link}>Смотреть</a>
            </div>
            <h3><a href={link}>{title}</a></h3>
            <p>{description}</p>
        </li>
    )
}