import React from "react"
import './App.css'
import s from "./AppMyComponent.module.css"
import {Header} from "./component/Header/Header";
import {AboutMe} from "./component/AboutMe/AboutMe";
import {Skills} from "./component/Skills/Skills";
import {Works} from "./component/Works/Works";
import {HireMe} from "./component/HireMe/ HireMe";
import {Contacts} from "./component/Contacts/Contacts";
import {Footer} from "./component/Footer/Footer";

import ReactPageScroller from "react-page-scroller";
import {Exp} from "./component/Experimental/Experimental";

function App() {

    return (
        <div className="App">

            <header className={s.app_header}><Header/></header>
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
                <section className={`${s.app} ${s.app_hireme}`}>
                    <div className="section-wrapper">
                        <HireMe/>
                    </div>
                </section>
                <section className={`${s.app} ${s.app_contacts}`}>
                    <div className="section-wrapper">
                        <Contacts/>
                    </div>
                </section>
                <section className={`${s.app} ${s.app_footer}`}>
                    <div className="section-wrapper">
                        <Footer/>
                    </div>
                </section>
                {/*</ReactPageScroller>*/}
            </main>
        </div>
    );
}

export default App;
