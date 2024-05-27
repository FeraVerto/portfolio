import React, { useEffect } from 'react';
import 'particles.js';
import config from './particles-config.json';

const ParticlesComponent = () => {
  useEffect(() => {
    window.particlesJS('particles_js', config);
  }, []);

  return (
    <div
      id="particles_js"
      style={{
        position: 'fixed',
        width: '100%',
        height: '100vh',
        zIndex: '0',
      }}
    />
  );
};

export default ParticlesComponent;
