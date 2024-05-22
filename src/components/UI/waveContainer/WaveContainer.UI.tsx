import React from 'react';
import styles from './WaveContainer.module.scss';

type WaveContainerProps = {
  children?: React.ReactNode;
  // accept an array of colors here, we will use some logic to set the gradient at equal points
  colors?: string[];
};

const WaveContainer = ({ children, colors }: WaveContainerProps) => {
  return (
    <div className={styles.waveContainer}>
      {children}
      <svg
        id="wave"
        viewBox="0 0 1440 490"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            {/* map over the colors array inserting a gradient at equal points */}
            {colors &&
              colors.map((color, index) => {
                // if its the last color, set the offset to 100%
                if (index === colors.length - 1) {
                  return (
                    <stop
                      key={`stop-${index}`}
                      stopColor={color}
                      offset="100%"
                    ></stop>
                  );
                }
                return (
                  <stop
                    key={`stop-${index}`}
                    stopColor={color}
                    offset={`${(index * 100) / colors.length}%`}
                  ></stop>
                );
              })}
            {/* <stop stopColor="rgba(0, 11, 32, .25)" offset="0%"></stop>
            <stop stopColor="rgba(0, 204, 255, .75)" offset="100%"></stop> */}
          </linearGradient>
        </defs>
        <path
          fill="url(#sw-gradient-0)"
          d="M0,147L120,163.3C240,180,480,212,720,196C960,180,1200,114,1440,106.2C1680,98,1920,147,2160,196C2400,245,2640,294,2880,261.3C3120,229,3360,114,3600,89.8C3840,65,4080,131,4320,179.7C4560,229,4800,261,5040,245C5280,229,5520,163,5760,187.8C6000,212,6240,327,6480,359.3C6720,392,6960,343,7200,269.5C7440,196,7680,98,7920,98C8160,98,8400,196,8640,220.5C8880,245,9120,196,9360,147C9600,98,9840,49,10080,73.5C10320,98,10560,196,10800,245C11040,294,11280,294,11520,261.3C11760,229,12000,163,12240,130.7C12480,98,12720,98,12960,98C13200,98,13440,98,13680,130.7C13920,163,14160,229,14400,261.3C14640,294,14880,294,15120,318.5C15360,343,15600,392,15840,400.2C16080,408,16320,376,16560,334.8C16800,294,17040,245,17160,220.5L17280,196L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
        ></path>
      </svg>
    </div>
  );
};

export default WaveContainer;
