import React, {useState} from "react"
import './App.css'
import s from "./AppMyComponent.module.css"
import {Header} from "./component/Header/Header";
import {AboutMe} from "./component/AboutMe/AboutMe";
import {Skills} from "./component/Skills/Skills";
import {Works} from "./component/Works/Works";
import {Contacts} from "./component/Contacts/Contacts";
import svg from "./image/atom-symbol.svg"


import {MobileMenu} from "./component/MobileComponent/MobileMenu/MobileMenu";
import {ButtonMenu} from "./component/MobileComponent/ButtonMenu/ButtonMenu";
import {Particles} from "./particles/particles";

/*import Particles from "react-particles-js";*/


function App() {

    let [menu, setMenu] = useState(false)

    let onClose = () => setMenu(false)

    //links.distance = c:60
    //links.frequency:2

    //links.distance = c:60
    //links.frequency:2
    //particles.speed: 0.4

    //number.value: 130

    return (
        <div className="App">
            <Particles/>
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


