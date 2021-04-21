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
                <NavLink className={s.item_link} to="/skills">Скиллы</NavLink>
            </li>
            <li className={s.menu_item}>
                <NavLink className={s.item_link} to="/works">Работы</NavLink>
            </li>
            <li className={s.menu_item}>
                <NavLink className={s.item_link} to="/contacts">Контакты</NavLink>
            </li>
        </ul>
    )
}