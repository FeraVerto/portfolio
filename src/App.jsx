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
import Particles from "react-particles-js";

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
                            : <ButtonMenu className={s.on_button} setMenu={setMenu}/>
                    }
                </div>
            </header>
            <main className={s.main_wrapper}>
                <div className={s.app_particle_desktop}>
                    <Particles className={s.particles}
                               params={{
                                   "autoPlay": true,
                                   "background": {
                                       "color": {
                                           "value": "transparent"
                                       },
                                       "image": "",
                                       "position": "100% 100%",
                                       "repeat": "no-repeat",
                                       "size": "cover",
                                       "opacity": 1,
                                   },
                                   "backgroundMask": {
                                       "composite": "destination-out",
                                       "cover": {
                                           "color": {
                                               "value": "#fff"
                                           },
                                           "opacity": 1
                                       },
                                       "enable": false
                                   },
                                   "fullScreen": {
                                       "enable": true,
                                       "zIndex": -1
                                   },
                                   "detectRetina": false,
                                   "fpsLimit": 50,
                                   "infection": {
                                       "cure": false,
                                       "delay": 0,
                                       "enable": false,
                                       "infections": 0,
                                       "stages": []
                                   },
                                   "interactivity": {
                                       "detectsOn": "canvas",
                                       "events": {
                                           "onClick": {
                                               "enable": false,
                                               "mode": "push"
                                           },
                                           "onDiv": {
                                               "selectors": "#repulse-div",
                                               "enable": false,
                                               "mode": "repulse",
                                               "type": "circle"
                                           },
                                           "onHover": {
                                               "enable": true,
                                               "mode": "bubble",
                                               "parallax": {
                                                   "enable": false,
                                                   "force": 2,
                                                   "smooth": 10
                                               }
                                           },
                                           "resize": true
                                       },
                                       "modes": {
                                           "attract": {
                                               "distance": 200,
                                               "duration": 0.4,
                                               "speed": 1
                                           },
                                           "bounce": {
                                               "distance": 200
                                           },
                                           "bubble": {
                                               "distance": 40,
                                               "duration": 2,
                                               "opacity": 8,
                                               "size": 6
                                           },
                                           "connect": {
                                               "distance": 80,
                                               "links": {
                                                   "opacity": 0.5
                                               },
                                               "radius": 60
                                           },
                                           "grab": {
                                               "distance": 400,
                                               "links": {
                                                   "blink": false,
                                                   "consent": false,
                                                   "opacity": 1
                                               }
                                           },
                                           "light": {
                                               "area": {
                                                   "gradient": {
                                                       "start": {
                                                           "value": "#ffffff"
                                                       },
                                                       "stop": {
                                                           "value": "#000000"
                                                       }
                                                   },
                                                   "radius": 1000
                                               },
                                               "shadow": {
                                                   "color": {
                                                       "value": "#000000"
                                                   },
                                                   "length": 2000
                                               }
                                           },
                                           "push": {
                                               "quantity": 4
                                           },
                                           "remove": {
                                               "quantity": 2
                                           },
                                           "repulse": {
                                               "distance": 200,
                                               "duration": 0.4,
                                               "speed": 1
                                           },
                                           "slow": {
                                               "factor": 1,
                                               "radius": 0
                                           },
                                           "trail": {
                                               "delay": 1,
                                               "quantity": 1
                                           }
                                       }
                                   },
                                   "manualParticles": [],
                                   "motion": {
                                       "disable": false,
                                       "reduce": {
                                           "factor": 4,
                                           "value": true
                                       }
                                   },
                                   "particles": {
                                       "bounce": {
                                           "horizontal": {
                                               "random": {
                                                   "enable": false,
                                                   "minimumValue": 0.1
                                               },
                                               "value": 1
                                           },
                                           "vertical": {
                                               "random": {
                                                   "enable": false,
                                                   "minimumValue": 0.1
                                               },
                                               "value": 1
                                           }
                                       },
                                       "collisions": {
                                           "bounce": {
                                               "horizontal": {
                                                   "random": {
                                                       "enable": false,
                                                       "minimumValue": 0.1
                                                   },
                                                   "value": 1
                                               },
                                               "vertical": {
                                                   "random": {
                                                       "enable": false,
                                                       "minimumValue": 0.1
                                                   },
                                                   "value": 1
                                               }
                                           },
                                           "enable": false,
                                           "mode": "bounce",
                                           "overlap": {
                                               "enable": true,
                                               "retries": 0
                                           }
                                       },
                                       "color": {
                                           "value": [
                                               "#4285f4",
                                               "#34A853",
                                               "#FBBC05",
                                               "#EA4335"
                                           ],
                                           "animation": {
                                               "h": {
                                                   "count": 0,
                                                   "enable": false,
                                                   "offset": 0,
                                                   "speed": 1,
                                                   "sync": true
                                               },
                                               "s": {
                                                   "count": 0,
                                                   "enable": false,
                                                   "offset": 0,
                                                   "speed": 1,
                                                   "sync": true
                                               },
                                               "l": {
                                                   "count": 0,
                                                   "enable": false,
                                                   "offset": 0,
                                                   "speed": 1,
                                                   "sync": true
                                               }
                                           }
                                       },
                                       "destroy": {
                                           "mode": "none",
                                           "split": {
                                               "count": 1,
                                               "factor": {
                                                   "random": {
                                                       "enable": false,
                                                       "minimumValue": 0
                                                   },
                                                   "value": 3
                                               },
                                               "rate": {
                                                   "random": {
                                                       "enable": false,
                                                       "minimumValue": 0
                                                   },
                                                   "value": {
                                                       "min": 4,
                                                       "max": 9
                                                   }
                                               }
                                           }
                                       },
                                       "life": {
                                           "count": 0,
                                           "delay": {
                                               "random": {
                                                   "enable": false,
                                                   "minimumValue": 0
                                               },
                                               "value": 0,
                                               "sync": false
                                           },
                                           "duration": {
                                               "random": {
                                                   "enable": false,
                                                   "minimumValue": 0.0001
                                               },
                                               "value": 0,
                                               "sync": false
                                           }
                                       },
                                       //links.distance = c:60
                                       //links.frequency:2
                                       "links": {
                                           "blink": false,
                                           "color": {
                                               "value": "random"
                                           },
                                           "consent": false,
                                           "c": 60,
                                           "enable": true,
                                           "frequency": 2,
                                           "opacity": 1,
                                           "shadow": {
                                               "blur": 5,
                                               "color": {
                                                   "value": "#00ff00"
                                               },
                                               "enable": false
                                           },
                                           "triangles": {
                                               "enable": false,
                                               "frequency": 1
                                           },
                                           "width": 1,
                                           "warp": false
                                       },
                                       "move": {
                                           "angle": {
                                               "offset": 60,
                                               "value": 90
                                           },
                                           "attract": {
                                               "enable": false,
                                               "rotate": {
                                                   "x": 600,
                                                   "y": 1200
                                               }
                                           },
                                           "decay": 0,
                                           "distance": 0,
                                           "direction": "none",
                                           "drift": 0,
                                           "enable": true,
                                           "gravity": {
                                               "acceleration": 9.81,
                                               "enable": false,
                                               "maxSpeed": 50
                                           },
                                           "path": {
                                               "clamp": true,
                                               "delay": {
                                                   "random": {
                                                       "enable": false,
                                                       "minimumValue": 0
                                                   },
                                                   "value": 0
                                               },
                                               "enable": false
                                           },
                                           "outModes": {
                                               "default": "bounce",
                                               "bottom": "bounce",
                                               "left": "bounce",
                                               "right": "bounce",
                                               "top": "bounce"
                                           },
                                           "random": false,
                                           "size": false,
                                           "speed": 1,
                                           "straight": false,
                                           "trail": {
                                               "enable": false,
                                               "length": 10,
                                               "fillColor": {
                                                   "value": "#000000"
                                               }
                                           },
                                           "vibrate": false,
                                           "warp": false
                                       },
                                       "number": {
                                           "density": {
                                               "enable": false,
                                               "area": 2000,
                                               "factor": 1000
                                           },
                                           "limit": 0,
                                           "value": 200
                                       },
                                       "opacity": {
                                           "random": {
                                               "enable": false,
                                               "minimumValue": 0.1
                                           },
                                           "value": {
                                               "min": 0.05,
                                               "max": 0.4
                                           },
                                           "animation": {
                                               "count": 0,
                                               "enable": true,
                                               "speed": 2,
                                               "sync": false,
                                               "destroy": "none",
                                               "minimumValue": 0.05,
                                               "startValue": "random"
                                           }
                                       },
                                       "reduceDuplicates": false,
                                       "rotate": {
                                           "random": {
                                               "enable": false,
                                               "minimumValue": 0
                                           },
                                           "value": 0,
                                           "animation": {
                                               "enable": false,
                                               "speed": 0,
                                               "sync": false
                                           },
                                           "direction": "clockwise",
                                           "path": false
                                       },
                                       "shadow": {
                                           "blur": 0,
                                           "color": {
                                               "value": "#000000"
                                           },
                                           "enable": false,
                                           "offset": {
                                               "x": 0,
                                               "y": 0
                                           }
                                       },
                                       "shape": {
                                           "options": {},
                                           "type": "circle",

                                       },
                                       "size": {
                                           "random": {
                                               "enable": true,
                                               "minimumValue": 3
                                           },
                                           "value": 1,
                                           "animation": {
                                               "count": 0,
                                               "enable": false,
                                               "speed": 40,
                                               "sync": false,
                                               "destroy": "none",
                                               "minimumValue": 0.1,
                                               "startValue": "random"
                                           }
                                       },
                                       "stroke": {
                                           "width": 0
                                       },
                                       "twinkle": {
                                           "lines": {
                                               "enable": false,
                                               "frequency": 0.05,
                                               "opacity": 1
                                           },
                                           "particles": {
                                               "enable": false,
                                               "frequency": 0.05,
                                               "opacity": 1
                                           }
                                       }
                                   },
                                   "pauseOnBlur": true,
                                   "pauseOnOutsideViewport": true,
                                   "responsive": [],
                                   "themes": [],
                                   "polygon": {
                                       "draw": {
                                           "enable": false,
                                           "stroke": {
                                               "color": {
                                                   "value": "rgba(255,255,255,0.2)"
                                               },

                                               "width": 1,
                                               "opacity": 0.2
                                           }
                                       },
                                       "enable": true,
                                       "inline": {
                                           "arrangement": "equidistant"
                                       },
                                       "move": {
                                           "radius": 5,
                                           "type": "path"
                                       },
                                       "scale": 2.5,
                                       "type": "inline",
                                       "url": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Cat_black.svg",
                                       "position": {
                                           "x": 60,
                                           "y": 50
                                       }
                                   }
                               }}
                    />
                </div>
                <div className={s.app_particle_mobile}>
                    <Particles className={s.particles}
                               params={{
                                   "autoPlay": true,
                                   "background": {
                                       "color": {
                                           "value": "transparent"
                                       },
                                       "image": "",
                                       "position": "100% 100%",
                                       "repeat": "no-repeat",
                                       "size": "cover",
                                       "opacity": 1,
                                   },
                                   "backgroundMask": {
                                       "composite": "destination-out",
                                       "cover": {
                                           "color": {
                                               "value": "#fff"
                                           },
                                           "opacity": 1
                                       },
                                       "enable": false
                                   },
                                   "fullScreen": {
                                       "enable": true,
                                       "zIndex": -1
                                   },
                                   "detectRetina": false,
                                   "fpsLimit": 50,
                                   "infection": {
                                       "cure": false,
                                       "delay": 0,
                                       "enable": false,
                                       "infections": 0,
                                       "stages": []
                                   },
                                   "interactivity": {
                                       "detectsOn": "canvas",
                                       "events": {
                                           "onClick": {
                                               "enable": false,
                                               "mode": "push"
                                           },
                                           "onDiv": {
                                               "selectors": "#repulse-div",
                                               "enable": false,
                                               "mode": "repulse",
                                               "type": "circle"
                                           },
                                           "onHover": {
                                               "enable": true,
                                               "mode": "bubble",
                                               "parallax": {
                                                   "enable": false,
                                                   "force": 2,
                                                   "smooth": 10
                                               }
                                           },
                                           "resize": true
                                       },
                                       "modes": {
                                           "attract": {
                                               "distance": 200,
                                               "duration": 0.4,
                                               "speed": 1
                                           },
                                           "bounce": {
                                               "distance": 200
                                           },
                                           "bubble": {
                                               "distance": 40,
                                               "duration": 2,
                                               "opacity": 8,
                                               "size": 6
                                           },
                                           "connect": {
                                               "distance": 80,
                                               "links": {
                                                   "opacity": 0.5
                                               },
                                               "radius": 60
                                           },
                                           "grab": {
                                               "distance": 400,
                                               "links": {
                                                   "blink": false,
                                                   "consent": false,
                                                   "opacity": 1
                                               }
                                           },
                                           "light": {
                                               "area": {
                                                   "gradient": {
                                                       "start": {
                                                           "value": "#ffffff"
                                                       },
                                                       "stop": {
                                                           "value": "#000000"
                                                       }
                                                   },
                                                   "radius": 1000
                                               },
                                               "shadow": {
                                                   "color": {
                                                       "value": "#000000"
                                                   },
                                                   "length": 2000
                                               }
                                           },
                                           "push": {
                                               "quantity": 4
                                           },
                                           "remove": {
                                               "quantity": 2
                                           },
                                           "repulse": {
                                               "distance": 200,
                                               "duration": 0.4,
                                               "speed": 1
                                           },
                                           "slow": {
                                               "factor": 1,
                                               "radius": 0
                                           },
                                           "trail": {
                                               "delay": 1,
                                               "quantity": 1
                                           }
                                       }
                                   },
                                   "manualParticles": [],
                                   "motion": {
                                       "disable": true,
                                       "reduce": {
                                           "factor": 4,
                                           "value": true
                                       }
                                   },
                                   "particles": {
                                       "bounce": {
                                           "horizontal": {
                                               "random": {
                                                   "enable": false,
                                                   "minimumValue": 2
                                               },
                                               "value": 1
                                           },
                                           "vertical": {
                                               "random": {
                                                   "enable": false,
                                                   "minimumValue": 2
                                               },
                                               "value": 1
                                           }
                                       },
                                       "collisions": {
                                           "bounce": {
                                               "horizontal": {
                                                   "random": {
                                                       "enable": false,
                                                       "minimumValue": 0.1
                                                   },
                                                   "value": 1
                                               },
                                               "vertical": {
                                                   "random": {
                                                       "enable": false,
                                                       "minimumValue": 0.1
                                                   },
                                                   "value": 1
                                               }
                                           },
                                           "enable": false,
                                           "mode": "bounce",
                                           "overlap": {
                                               "enable": true,
                                               "retries": 0
                                           }
                                       },
                                       "color": {
                                           "value": [
                                               "#4285f4",
                                               "#34A853",
                                               "#FBBC05",
                                               "#EA4335"
                                           ],
                                           "animation": {
                                               "h": {
                                                   "count": 0,
                                                   "enable": false,
                                                   "offset": 0,
                                                   "speed": 1,
                                                   "sync": true
                                               },
                                               "s": {
                                                   "count": 0,
                                                   "enable": false,
                                                   "offset": 0,
                                                   "speed": 1,
                                                   "sync": true
                                               },
                                               "l": {
                                                   "count": 0,
                                                   "enable": false,
                                                   "offset": 0,
                                                   "speed": 1,
                                                   "sync": true
                                               }
                                           }
                                       },
                                       "destroy": {
                                           "mode": "none",
                                           "split": {
                                               "count": 1,
                                               "factor": {
                                                   "random": {
                                                       "enable": false,
                                                       "minimumValue": 0
                                                   },
                                                   "value": 3
                                               },
                                               "rate": {
                                                   "random": {
                                                       "enable": false,
                                                       "minimumValue": 0
                                                   },
                                                   "value": {
                                                       "min": 4,
                                                       "max": 9
                                                   }
                                               }
                                           }
                                       },
                                       "life": {
                                           "count": 0,
                                           "delay": {
                                               "random": {
                                                   "enable": false,
                                                   "minimumValue": 0
                                               },
                                               "value": 0,
                                               "sync": false
                                           },
                                           "duration": {
                                               "random": {
                                                   "enable": false,
                                                   "minimumValue": 0.0001
                                               },
                                               "value": 0,
                                               "sync": false
                                           }
                                       },
                                       //links.distance = c:60
                                       //links.frequency:2
                                       "links": {
                                           "blink": false,
                                           "color": {
                                               "value": "random"
                                           },
                                           "consent": false,
                                           "distance": 60,
                                           "enable": true,
                                           "frequency": 1,
                                           "opacity": 1,
                                           "shadow": {
                                               "blur": 5,
                                               "color": {
                                                   "value": "#00ff00"
                                               },
                                               "enable": false
                                           },
                                           "triangles": {
                                               "enable": false,
                                               "frequency": 1
                                           },
                                           "width": 1,
                                           "warp": false
                                       },
                                       //speed: 0.4
                                       "move": {
                                           "angle": {
                                               "offset": 60,
                                               "value": 90
                                           },
                                           "attract": {
                                               "enable": false,
                                               "rotate": {
                                                   "x": 600,
                                                   "y": 1200
                                               }
                                           },
                                           "decay": 0,
                                           "distance": 0,
                                           "direction": "none",
                                           "drift": 0,
                                           "enable": true,
                                           "gravity": {
                                               "acceleration": 9.81,
                                               "enable": false,
                                               "maxSpeed": 50
                                           },
                                           "path": {
                                               "clamp": true,
                                               "delay": {
                                                   "random": {
                                                       "enable": false,
                                                       "minimumValue": 0
                                                   },
                                                   "value": 0
                                               },
                                               "enable": false
                                           },
                                           "outModes": {
                                               "default": "bounce",
                                               "bottom": "bounce",
                                               "left": "bounce",
                                               "right": "bounce",
                                               "top": "bounce"
                                           },
                                           "random": false,
                                           "size": false,
                                           "speed": 0.4,
                                           "straight": false,
                                           "trail": {
                                               "enable": false,
                                               "length": 10,
                                               "fillColor": {
                                                   "value": "#000000"
                                               }
                                           },
                                           "vibrate": false,
                                           "warp": false
                                       },
                                       //value: 130
                                       "number": {
                                           "density": {
                                               "enable": false,
                                               "area": 2000,
                                               "factor": 1000
                                           },
                                           "limit": 0,
                                           "value": 130
                                       },
                                       "opacity": {
                                           "random": {
                                               "enable": false,
                                               "minimumValue": 0.1
                                           },
                                           "value": {
                                               "min": 0.05,
                                               "max": 0.4
                                           },
                                           "animation": {
                                               "count": 0,
                                               "enable": false,
                                               "speed": 2,
                                               "sync": false,
                                               "destroy": "none",
                                               "minimumValue": 0.05,
                                               "startValue": "random"
                                           }
                                       },
                                       "reduceDuplicates": false,
                                       "rotate": {
                                           "random": {
                                               "enable": false,
                                               "minimumValue": 0
                                           },
                                           "value": 0,
                                           "animation": {
                                               "enable": false,
                                               "speed": 0,
                                               "sync": false
                                           },
                                           "direction": "clockwise",
                                           "path": false
                                       },
                                       "shadow": {
                                           "blur": 0,
                                           "color": {
                                               "value": "#000000"
                                           },
                                           "enable": false,
                                           "offset": {
                                               "x": 0,
                                               "y": 0
                                           }
                                       },
                                       "shape": {
                                           "options": {},
                                           "type": "circle",

                                       },
                                       "size": {
                                           "random": {
                                               "enable": true,
                                               "minimumValue": 3
                                           },
                                           "value": 1,
                                           "animation": {
                                               "count": 0,
                                               "enable": false,
                                               "speed": 40,
                                               "sync": false,
                                               "destroy": "none",
                                               "minimumValue": 0.1,
                                               "startValue": "random"
                                           }
                                       },
                                       "stroke": {
                                           "width": 0
                                       },
                                       "twinkle": {
                                           "lines": {
                                               "enable": false,
                                               "frequency": 0.05,
                                               "opacity": 1
                                           },
                                           "particles": {
                                               "enable": false,
                                               "frequency": 0.05,
                                               "opacity": 1
                                           }
                                       }
                                   },
                                   "pauseOnBlur": true,
                                   "pauseOnOutsideViewport": true,
                                   "responsive": [],
                                   "themes": [],
                                   "polygon": {
                                       "draw": {
                                           "enable": false,
                                           "stroke": {
                                               "color": {
                                                   "value": "rgba(255,255,255,0.2)"
                                               },

                                               "width": 1,
                                               "opacity": 0.2
                                           }
                                       },
                                       "enable": true,
                                       "inline": {
                                           "arrangement": "equidistant"
                                       },
                                       "move": {
                                           "radius": 5,
                                           "type": "path"
                                       },
                                       "scale": 2,
                                       "type": "inline",
                                       "url": "https://upload.wikimedia.org/wikipedia/commons/8/88/NintendogsSymbol.svg",
                                       "position": {
                                           "x": 50,
                                           "y": 260
                                       }
                                   }
                               }}
                    />

                </div>
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


