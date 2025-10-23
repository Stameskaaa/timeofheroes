import type { CSSProperties } from 'react';

const customStyle: CSSProperties & Record<string, string> = {
  '--wave-animation': 'move-forever 32.5s cubic-bezier(.55,.5,.45,.5) infinite',
  '--wave-delay-1': '-3s',
  '--wave-duration-1': '9s',
  '--wave-delay-2': '-4s',
  '--wave-duration-2': '14s',
  '--wave-delay-3': '-6s',
  '--wave-duration-3': '17s',
  '--wave-delay-4': '-7s',
  '--wave-duration-4': '26s',
};

export const Waves = () => {
  return (
    <div className="w-full">
      <div
        className="relative w-full h-[200px] min-h-[200px] max-h-[150px] mb-[-7px]"
        style={customStyle}>
        <style>
          {`
          @keyframes move-forever {
            0% {
              transform: translate3d(-90px, 0, 0);
            }
            100% {
              transform: translate3d(85px, 0, 0);
            }
          }
          .parallax > use {
            animation: var(--wave-animation);
          }
          .parallax > use:nth-child(1) {
            animation-delay: var(--wave-delay-1);
            animation-duration: var(--wave-duration-1);
          }
          .parallax > use:nth-child(2) {
            animation-delay: var(--wave-delay-2);
            animation-duration: var(--wave-duration-2);
          }
          .parallax > use:nth-child(3) {
            animation-delay: var(--wave-delay-3);
            animation-duration: var(--wave-duration-3);
          }
          .parallax > use:nth-child(4) {
            animation-delay: var(--wave-delay-4);
            animation-duration: var(--wave-duration-4);
          }
        `}
        </style>
        <svg
          className="absolute bottom-0 w-full h-full  md:scale-y-100 scale-y-50 md:top-[0px] top-[44px]"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto">
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" className="fill-brand-200/70" />
            <use xlinkHref="#gentle-wave" x="48" y="0" className="fill-brand-400/70" />
            <use xlinkHref="#gentle-wave" x="48" y="3" className="fill-brand-300/50" />
            <use xlinkHref="#gentle-wave" x="48" y="5" className="fill-brand-200/30" />
            <use xlinkHref="#gentle-wave" x="48" y="7" className="fill-brand-400" />
          </g>
        </svg>
      </div>
    </div>
  );
};
