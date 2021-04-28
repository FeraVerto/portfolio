import React from 'react'
import s from './AboutMe.module.css'
import photo from './../../image/avatar.jpg'
import ReactTypingEffect from 'react-typing-effect'
import Particles from "react-particles-js";

export const AboutMe = () => {
    return (
        <div className={s.about}>
            <div className={s.about_block}>
                <h1 className={s.about_h1}>
                    <p className={s.p_hi}>I'm</p>
                    <p className={s.p_name}> Mariya Klevakina</p>
                    <p className={s.p_hi}>front-end developer.</p>
                    {/*<ReactTypingEffect
                            text={["Hello.", "World!"]}
                        />*/}

                    <span className={s.typing_effect_desktop}>

                            {/*<ReactTypingEffect
                                className={s.react_typing}
                                text={["All I need is code", "Code is all I need"]}
                                eraseDelay={1000}
                                eraseSpeed={20}
                                //@ts-ignore
                                cursorRenderer={(cursor: any) => <h1>{cursor}</h1>}
                                displayTextRenderer={(text: any, i: any) => {
                                    return (
                                        <span>
                                            {text.split('').map((char: any, i: any) => {
                                                const key = `${i}`;
                                                return (
                                                    <span
                                                        key={key}
                                                        style={{height: "60px"}}
                                                    >{char}</span>
                                                );
                                            })}
                                     </span>
                                    );
                                }}
                            />*/}

                    </span>
                </h1>
            </div>
        </div>
    )
}

