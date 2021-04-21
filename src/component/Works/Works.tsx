import React from 'react'
import {Work} from "./Work/Work";
import s from "./Works.module.css"

export const Works = () => {
    return (
        <div className={s.works}>
            <h2>My works</h2>
            <ul className={s.works_list}>
                <Work title={"Social network"}
                      img={''}
                      link={"https://feraverto.github.io/network-learning-project-typescript"}
                      description={"Social networkSocial network Social networkSocial " +
                      "networkSocial networkSocial networkSocial networkSocial networknetworkSocial networkSocial network"}/>

                <Work title={"Todolist"}
                      img={''}
                      link={"http://FeraVerto.github.io/todo"}
                      description={"Social networkSocial network Social networkSocial " +
                      "networkSocial networkSocial networkSocial networkSocial network"}/>

                <Work title={"Mini project"}
                      img={''}
                      link={'https://feraverto.github.io/simple-react-homeworks/'}
                      description={"Social networkSocial network Social networkSocial " +
                      "networkSocial networkSocial networkSocial networkSocial network"}/>

                <Work title={"Cards + Packs"}
                      img={'../../../image/Packs.png'}
                      link={"https://FeraVerto.github.io/cards"}
                      description={"https://FeraVerto.github.io/cards"}/>

                <Work title={"Counter"}
                      img={''}
                      link={'https://feraverto.github.io/counter-variant/'}
                      description={"Social networkSocial network Social networkSocial " +
                      "networkSocial networkSocial networkSocial networkSocial network"}/>

                <Work title={"Counter"}
                      img={''}
                      link={'https://feraverto.github.io/counter-variant/'}
                      description={"Social networkSocial network Social networkSocial " +
                      "networkSocial networkSocial networkSocial networkSocial network"}/>
            </ul>
        </div>
    )
}