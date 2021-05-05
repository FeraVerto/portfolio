import React from 'react';
import ParticleField from 'react-particles-webgl';
import s from "./Particles.module.css"

/**
 * The default configuation for the ParticleField component
 *
 * Any option passed in via props will overwrite the default config
 */
/**
 * Tim Ellenberger
 *
 * docs@tim-soft/react-particles-webgl
 */

/**
 * Tim Ellenberger
 *
 * docs@tim-soft/react-particles-webgl
 */

const config = {
    showCube: false,
    dimension: '3D',
    velocity: 0,
    boundaryType: 'bounce',
    antialias: false,
    direction: {
        xMin: -1,
        xMax: -0.8,
        yMin: -0.9,
        yMax: -0.9,
        zMin: -0.9,
        zMax: -0.9
    },
    lines: {
        colorMode: 'solid',
        color: '#cb1c1f',
        transparency: 0.1,
        limitConnections: true,
        maxConnections: 20,
        minDistance: 10,
        visible: true
    },
    particles: {
        colorMode: 'solid',
        color: '#ffffff',
        transparency: 0.4,
        shape: 'circle',
        boundingBox: 'canvas',
        count: 1408,
        minSize: 3,
        maxSize: 26,
        visible: true
    },
    cameraControls: {
        enabled: true,
        enableDamping: true,
        dampingFactor: 0.4,
        enableZoom: false,
        autoRotate: true,
        autoRotateSpeed: 0.5,
        resetCameraFlag: true
    },
    maxConnections: 0,
    limitConnections: false
}

export let Particles = () =>  {
    return <div style={{ height: "100vh", width: "100%", position: "fixed", outline: "0px solid black"}}>
        <ParticleField config={config} className={s.particles}/>
    </div>
}
