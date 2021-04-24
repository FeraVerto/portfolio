import React, {useState} from "react"
import './App.css'
import s from "./AppMyComponent.module.css"
import {Header} from "./component/Header/Header";
import {AboutMe} from "./component/AboutMe/AboutMe";
import {Skills} from "./component/Skills/Skills";
import {Works} from "./component/Works/Works";
import {Contacts} from "./component/Contacts/Contacts";

import {MobileMenu} from "./component/MobileComponent/MobileMenu/MobileMenu";

function App() {

    let [menu, setMenu] = useState(false)

    let onClose = () => setMenu(false)

    return (
        <div className="App">
            <header className={s.app_header_desktop}><Header/></header>
            <header className={s.app_header_mobile}>
                <div style={{position: "relative"}}>
                    {
                        menu
                            ? <MobileMenu onClose={onClose}/>
                            : <div className={s.on_button} onClick={() => setMenu(true)}>"X"</div>
                    }
                </div>
            </header>
            <main className={s.main_wrapper}>
                {/*<ReactPageScroller transitionTimingFunction={"cubic-bezier(0.42,0,1,1)"}
                                   animationTimer={1000}
                                   animationTimerBuffer={200}
                                   className={s.app_list}
                                   renderAllPagesOnFirstRender={true}
                                   >*/}

                <section className={`${s.app} ${s.app_aboutme}`}>
                    <div className="section-wrapper">
                        <AboutMe/>
                    </div>
                </section>
                <section className={`${s.app} ${s.app_skills}`}>
                    <div className="section-wrapper">
                        <Skills/>
                    </div>
                </section>
                <section className={`${s.app} ${s.app_works}`}>
                    <div className="section-wrapper">
                        <Works/>
                    </div>
                </section>
                <section className={`${s.app} ${s.app_contacts}`}>
                    <div className="section-wrapper">
                        <Contacts/>
                    </div>
                </section>

                {/*</ReactPageScroller>*/}
            </main>
        </div>
    );
}

export default App;
