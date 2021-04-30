import s from ".//sociallcon.module.css";
import github from "../../../image/github.svg";
import telegram from "../../../image/telegram.svg";
import linkedin from "../../../image/linkedin.svg";
import React from "react";

export const SocialIcon = () => {
    return (
        <ul className={s.social_list}>
            <li className={s.social_item}>
                <a href="https://github.com/FeraVerto">
                    <img src={github} alt="github" width={30} height={30}/>
                </a>
            </li>
            <li className={s.social_item}>
                <a href="https://t.me/Mariya_Klevakina">
                    <img src={telegram} alt="telegram" width={30} height={30}/>
                </a>
            </li>
            <li className={s.social_item}>
                <a href="https://www.linkedin.com/in/maria-klevakina/">
                    <img src={linkedin} alt="linkedin" width={30} height={30}/>
                </a>
            </li>
        </ul>
    )
}