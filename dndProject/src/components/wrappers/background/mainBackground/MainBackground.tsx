import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFirePreset } from '@tsparticles/preset-fire';

export const MainBackground: React.FC = () => {
  const [inited, setInited] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFirePreset(engine);
    }).then(() => setInited(true));
  }, []);

  const options = useMemo(() => {
    return {
      preset: 'fire',
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      background: {
        color: { value: '#141a1b' },
        image: 'radial-gradient(circle at left, #141a1b,   #141a1b)',
      },
      detectRetina: true,
      particles: {
        color: {
          // value: ['#c7805d', '#a36145', '#8a4f36'],
          value: ['#7f9a89', '#415554', '#2f3b3b'],
        },
        size: {
          value: { min: 1, max: 3 },
        },
        opacity: {
          value: 0.85,
        },
        move: {
          enable: true,
          speed: 0.75,
          direction: 'none',
          outModes: { default: 'out' },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: false },
          onClick: { enable: false },
        },
      },
    };
  }, []);

  if (!inited) return null;

  return <Particles id="fire-bg" options={options as any} style={{ position: 'absolute' }} />;
};
