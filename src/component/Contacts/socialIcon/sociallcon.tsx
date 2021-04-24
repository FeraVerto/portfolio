import s from ".//sociallcon.module.css";
import github from "../../../image/github.svg";
import telegram from "../../../image/telegram.svg";
import linkedin from "../../../image/linkedin.svg";
import React from "react";

export const SocialIcon = () => {
    return (
        <ul className={s.social_list}>
            <li className={s.social_item}>
                <img src={github} alt="github" width={30} height={30}/>
            </li>
            <li className={s.social_item}>
                <img src={telegram} alt="telegram" width={30} height={30}/>
            </li>
            <li className={s.social_item}>
                <img src={linkedin} alt="linkedin" width={30} height={30}/>
            </li>
        </ul>
    )
}