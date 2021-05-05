import React from 'react'
import s from './Menu.module.css';
import { Link, animateScroll as scroll } from "react-scroll";

export const Menu = () => {

    return (
        <ul className={s.menu_list}>
            <li className={s.menu_item}>
                <Link className={s.item_link} to="about-me" duration={800} spy={true}
                      smooth={true}>Home</Link>
            </li>
            <li className={s.menu_item}>
                <Link className={s.item_link} to="skills" duration={800} spy={true}
                      smooth={true}>Skills</Link>
            </li>
            <li className={s.menu_item}>
                <Link className={s.item_link} to="works" duration={800} spy={true}
                      smooth={true} >Works</Link>
            </li>
            <li className={s.menu_item}>
                <Link className={s.item_link} to="contacts" duration={800} spy={true}
                      smooth={true}>Contacts</Link>
            </li>
        </ul>
    )
}