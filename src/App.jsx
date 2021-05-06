import React, {useState} from "react"
import './App.css'
import s from "./AppMyComponent.module.css"
import {Header} from "./component/Header/Header";
import {AboutMe} from "./component/AboutMe/AboutMe";
import {Skills} from "./component/Skills/Skills";
import {Works} from "./component/Works/Works";
import {Contacts} from "./component/Contacts/Contacts";
import svg from "./image/space.svg"
import videoMP4 from "./image/space.mp4"
import videoWEBM from "./image/space.webm"


import {MobileMenu} from "./component/MobileComponent/MobileMenu/MobileMenu";
import {ButtonMenu} from "./component/MobileComponent/ButtonMenu/ButtonMenu";
import {Particles} from "./particles/particles";

/*import Particles from "react-particles-js";*/


function App() {

    let [menu, setMenu] = useState(false)

    let onClose = () => setMenu(false)

    return (
        <div className="App">
            <div className={s.app_particle_desktop}>
                <Particles/>
            </div>

            <div className={s.app_particle_mobile}>
                <video loop muted autoPlay poster={svg} className={s.fullscreen_bg__video}>
                    <source src={videoMP4} type="video/mp4"/>
                    <source src={videoWEBM} type="video/webm"/>
                </video>
            </div>

            <header className={s.app_header_desktop}><Header/></header>
            <header className={s.app_header_mobile}>
                <div style={{position: "relative"}}>
                    {
                        menu
                            ? <MobileMenu onClose={onClose}/>
                            : <ButtonMenu className={s.on_button} setMenu={setMenu}/>
                    }
                </div>
            </header>
            <section id="about-me" className={`${s.app} ${s.app_aboutme}`}>
                <div className="section-wrapper">
                    <AboutMe/>
                </div>
            </section>

            <div className="App-container">

                <main className={s.main_wrapper}>

                    <section id="skills" className={`${s.app} ${s.app_skills}`}>
                        <div className="section-wrapper">
                            <Skills/>
                        </div>
                    </section>
                    <section id="works" className={`${s.app} ${s.app_works}`}>
                        <div className="section-wrapper">
                            <Works/>
                        </div>
                    </section>
                    <section id="contacts" className={`${s.app} ${s.app_contacts}`}>
                        <div className="section-wrapper">
                            <Contacts/>
                        </div>
                    </section>
                </main>
            </div>
        </div>

    );
}

export default App;


