import React from 'react'
import {Skill} from "./Skill/Skill";
import s from "./Skills.module.css"
import jsIcon from "./../../image/js.svg"
import tsIcon from "./../../image/ts.svg"
import reactIcon from "./../../image/atom-symbol.svg"
import apiIcon from "./../../image/api.svg"
import cssIcon from "./../../image/css-3.svg"

export const Skills = () => {
    return (
        <div className={s.skills}>
            <h2 className={s.h2}>My skills</h2>
            <ul className={s.skills_list}>
                <Skill title={"React"} icon={reactIcon}
                       description={"Hook, Class Components, Lifecycle, HOC, Flux, ReactDOM"}/>
                <Skill title={"TypeScript"} icon={tsIcon} description={"base types, enum base types, enum base types, enum"}/>
                <Skill title={"JS"} icon={jsIcon}
                       description={"ECMAScript 6, DOM, async await , promise, event loop,  classes, OOP"}/>
                <Skill title={"Rest API"} icon={apiIcon} description={"axios axios axios axios axios axios axios axios axios"}/>
                <Skill title={"CSS"} icon={cssIcon} description={"base types, enum base types, enum base types, enum base types, enum base types, enum base types, enum"}/>
                <Skill title={"JS"} icon={jsIcon}
                       description={"ECMAScript 6, DOM, async await , promise, event loop,  classes, OOP"}/>
            </ul>
        </div>
    )
}