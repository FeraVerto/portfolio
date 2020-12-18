import React from 'react'
import {Menu} from "./Menu/Menu";
import s from "./Header.module.css"
import "./../../App.css"

export const Header = () => {
    return (
        <div className={s.header}>
            <Menu/>
        </div>
    )
}