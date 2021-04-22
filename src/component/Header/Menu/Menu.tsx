import React from 'react'
import s from './Menu.module.css'
import {NavLink} from "react-router-dom";

export const Menu = () => {

    return (
        <ul className={s.menu_list}>
            <li className={s.menu_item}>
                <NavLink className={s.item_link} to="/">Home</NavLink>
            </li>
            <li className={s.menu_item}>
                <NavLink className={s.item_link} to="/skills">Skills</NavLink>
            </li>
            <li className={s.menu_item}>
                <NavLink className={s.item_link} to="/works">Works</NavLink>
            </li>
            <li className={s.menu_item}>
                <NavLink className={s.item_link} to="/contacts">Contacts</NavLink>
            </li>
        </ul>
    )
}