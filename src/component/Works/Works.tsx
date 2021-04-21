import React from 'react'
import {Work} from "./Work/Work";
import s from "./Works.module.css"
import packs from "./../../image/Packs.png"
import counter from "./../../image/counter.png"
import socialN from "./../../image/socialN.png"
import homeworks from "./../../image/homeworks.png"
import todo from "./../../image/todo.png"
import test from "./../../image/test.png"

export const Works = () => {
    return (
        <div className={s.works}>
            <h2>My works</h2>
            <ul className={s.works_list}>
                <Work title={"Mini project"}
                      img={homeworks}
                      link={'https://feraverto.github.io/simple-react-homeworks/'}
                      description={"Social networkSocial network Social networkSocial " +
                      "networkSocial networkSocial networkSocial networkSocial networknetworkSocial networkSocial networkSocial networknetworkSocial networkSocial networkSocial networknetworkSocial networkSocial networkSocial networknetworkSocial networkSocial networkSocial network"}/>

                <Work title={"Social network"}
                      img={socialN}
                      link={"https://feraverto.github.io/network-learning-project-typescript"}
                      description={"Social networkSocial network Social networkSocial " +
                      "networkSocial networkSocial networkSocial networkSocial networknetworkSocial networkSocial network"}/>

                <Work title={"Todolist"}
                      img={todo}
                      link={"http://FeraVerto.github.io/todo"}
                      description={"Social networkSocial network Social networkSocial " +
                      "networkSocial networkSocial networkSocial networkSocial network"}/>

                <Work title={"Cards + Packs"}
                      img={packs}
                      link={"https://FeraVerto.github.io/cards"}
                      description={"https://FeraVerto.github.io/cards"}/>

                <Work title={"Counter"}
                      img={counter}
                      link={'https://feraverto.github.io/counter/'}
                      description={"Social networkSocial network Social networkSocial " +
                      "networkSocial networkSocial networkSocial networkSocial network"}/>

                <Work title={"Counter"}
                      img={counter}
                      link={'https://feraverto.github.io/counter/'}
                      description={"Social networkSocial network Social networkSocial " +
                      "networkSocial networkSocial networkSocial networkSocial network"}/>
            </ul>
        </div>
    )
}