import React from 'react'
import {Work} from "./Work/Work";
import s from "./Works.module.css"
import packs from "./../../image/Packs.png"
import counter from "./../../image/counter.png"
import socialN from "./../../image/socialN.png"
import homeworks from "./../../image/homeworks.png"
import todo from "./../../image/todo.png"
import listOfbooks from "./../../image/ListOfBooks.jpg"
import inProgress from "./../../image/projectInProgress.jpg"
import {Zoom} from "react-awesome-reveal";

export const Works = () => {
    return (
        <div className={s.works}>
            <h2>My works</h2>
            <Zoom>
                <ul className={s.works_list}>
                    <Work title={"Mini project"}
                          img={homeworks}
                          link={'https://feraverto.github.io/simple-react-homeworks/'}
                          description={"A project with various mini-components"}/>

                    <Work title={"Social network"}
                          img={socialN}
                          link={"https://feraverto.github.io/network-learning-project-typescript"}
                          description={"project on class component and typescript"}/>

                    <Work title={"Todolist"}
                          img={todo}
                          link={"http://FeraVerto.github.io/todo"}
                          description={"classic todolist written with the material ui library"}/>

                    <Work title={"Counter"}
                          img={counter}
                          link={'https://feraverto.github.io/counter/'}
                          description={"Counter with validation and start value setting"}/>

                    <Work title={"List of books"}
                          img={listOfbooks}
                          link={'https://feraverto.github.io/books/#/'}
                          description={"application for saving a list of books in localStorage"}/>

                    <Work title={"Project in progress..."}
                          img={inProgress}
                          link={''}
                          description={"Project in progress... Maybe this is your project"}/>
                </ul>
            </Zoom>
        </div>
    )
}