import { specialColors } from './crystalColors';

const { keyframes } = require('styled-components');

export const cycleColors = (
  colors = [...specialColors],
  callback = function defaultCallback(color) {
    return `color: ${color};`;
  },
) => {
  let output = '';
  colors.forEach((color, index) => {
    output += (index + 1) * Math.floor(100 / (colors.length + 1));
    output += '% {';
    output += callback(color);
    output += '}';
  });
  output += `100% { ${callback(colors[0])} }`;
  return keyframes`${output}`;
};

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const hueRotate = (start, end, reverse = true) => {
  return keyframes`
    0% {
      filter: hue-rotate(${start});
    }

    25% {
      filter: hue-rotate(${end});
    }

    50% {
      filter: hue-rotate(${start});
    }

    75% {
      filter: hue-rotate(${reverse ? '-' : ''}${end});
    }

    100% {
      filter: hue-rotate(${start});
    }
  `;
};

export const blink = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const customBlink = ({ min = 0, max = 1 }) => keyframes`
  0% {
    opacity: ${max};
  }

  50% {
    opacity: ${min};
  }

  100% {
    opacity: ${max};
  }
`;

export const hover = keyframes`
  0% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(-1.5px);
  }

  75% {
    transform: translateY(.5px);
  }

  100% {
    transform: translateY(0);
  }
`;

export const shiftGradient = (color1, color2) => keyframes`
  0% {
    background: repeating-radial-gradient(
      circle at bottom center,
      ${color1},
      ${color1} 10px,
      transparent 10px,
      transparent 20px,
      ${color2} 20px,
      ${color2} 30px,
      transparent 30px,
      transparent 40px
    );
    /* repeating-linear-gradient(45deg, , ${color1} 10px, transparent 10px, transparent 20px); */
  }

  100% {
    background: repeating-radial-gradient(
      circle at bottom center,
      transparent,
      transparent 10px,
      ${color1} 10px,
      ${color1} 20px,
      transparent 20px,
      transparent 30px,
      ${color2} 30px,
      ${color2} 40px
    );
    /* background: repeating-linear-gradient(-45deg, ${color2}, ${color2} 10px, transparent 10px, transparent 20px); */
  }
`;
