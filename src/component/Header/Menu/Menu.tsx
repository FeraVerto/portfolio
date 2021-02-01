import React from 'react'
import s from './Menu.module.css'
import {NavLink} from "react-router-dom";

export const Menu = () => {
    return (
        <ul className={s.menu_list}>
            <li className={s.menu_item}>
                <NavLink className={s.item_link} to="/">Главная</NavLink>
            </li>
            <li className={s.menu_item}>
                <NavLink className={s.item_link} to="/">Скиллы</NavLink>
            </li>
            <li className={s.menu_item}>
                <NavLink className={s.item_link} to="/">Работы</NavLink>
            </li>
            <li className={s.menu_item}>
                <NavLink className={s.item_link} to="/">Контакты</NavLink>
            </li>
        </ul>
    )
}