import React from 'react'
import {Menu} from "./Menu/Menu";
import s from "./Header.module.css"
import "./../../App.css"
import github from "../../image/github.svg";
import telegram from "../../image/telegram.svg";
import linkedin from "../../image/linkedin.svg";
import {SocialIcon} from "../Contacts/socialIcon/sociallcon";

export const Header = () => {
    return (
        <div className={s.header}>
            <SocialIcon/>
            <Menu/>
        </div>
    )
}