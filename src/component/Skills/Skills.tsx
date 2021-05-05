import React from 'react'
import {Skill} from "./Skill/Skill";
import s from "./Skills.module.css"
import jsIcon from "./../../image/js.svg"
import tsIcon from "./../../image/ts.svg"
import reactIcon from "./../../image/atom-symbol.svg"
import apiIcon from "./../../image/api.svg"
import cssIcon from "./../../image/css-3.svg"
import redux from "./../../image/redux.svg"
import {Slide} from "react-awesome-reveal";

export const Skills = () => {
    return (

        <div className={s.skills}>
            <h2 className={s.h2}>My skills</h2>

            <ul className={s.skills_list}>
                <Slide direction={"left"}>
                    <Skill title={"HTML+CSS"} icon={cssIcon}
                           description={"semantics, аdaptive, flexbox, grid"}/>
                    <Skill title={"JS"} icon={jsIcon}
                           description={"ECMAScript 6, DOM, async await, this, promise, event loop,  classes, OOP"}/>
                    <Skill title={"Rest API"} icon={apiIcon}
                           description={"HTTP codes, HTTP methods, axios"}/>
                </Slide>
                <Slide direction={"right"}>
                    <Skill title={"React"} icon={reactIcon}
                           description={"Hook, Class Components, Lifecycle, HOC, Flux, ReactDOM"}/>
                    <Skill title={"Redux"} icon={redux}
                           description={"Thunk, Redux Toolkit, combineReducers, Reducers, Action creators"}/>
                    <Skill title={"TypeScript"} icon={tsIcon}
                           description={"base types, enum base types"}/>
                </Slide>
            </ul>

        </div>

    )
}