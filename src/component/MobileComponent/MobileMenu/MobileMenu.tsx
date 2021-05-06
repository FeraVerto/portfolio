import React from 'react'
import s from './MobileMenu.module.css'
import {NavLink} from "react-router-dom";

type MobileMenuType = {
    onClose: () => void
}

export const MobileMenu: React.FC<MobileMenuType> = ({onClose}) => {

    return (
        <div className={s.mobile_menu_container}>
            <div className={s.mobile_menu_position}>
                <button onClick={onClose}>Close</button>
                <ul className={s.mobile_menu_list}>
                    <li className={s.mobile_menu_item}>
                        <NavLink className={s.item_link} to="/">Home</NavLink>
                    </li>
                    <li className={s.mobile_menu_item}>
                        <NavLink className={s.item_link} to="/skills">Skills</NavLink>
                    </li>
                    <li className={s.mobile_menu_item}>
                        <NavLink className={s.item_link} to="/works">Works</NavLink>
                    </li>
                    <li className={s.mobile_menu_item}>
                        <NavLink className={s.item_link} to="/contacts">Contacts</NavLink>
                    </li>
                </ul>
            </div>


        </div>

    )
}