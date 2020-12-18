import React from 'react';
import './App.css';
import {Header} from "./component/Header/Header";
import {AboutMe} from "./component/AboutMe/AboutMe";
import {Skills} from "./component/Skills/Skills";
import {Works} from "./component/Works/Works";
import {HireMe} from "./component/HireMe/ HireMe";
import {Contacts} from "./component/Contacts/Contacts";
import {Footer} from "./component/Footer/Footer";

function App() {
    return (
        <div className="App">
            <div className="app-wrapper">
                <Header/>
                <AboutMe/>
                <Skills/>
                <Works/>
                <HireMe/>
                <Contacts/>
                <Footer/>
            </div>

        </div>
    );
}

export default App;
