import { css, keyframes } from 'styled-components';
import { fadeIn } from 'utils/animations';

import randoms from './randoms';

const rgb = ['#f55', '#3f4', '#f5f', '#33f', '#2ff'];

function multipleBoxShadow(n) {
  let output = `${randoms[0]}px ${randoms[1]}px #fff`;
  for (let i = 2; i < n; i += 2) {
    output += `, ${randoms[i]}px ${randoms[i + 1]}px ${rgb[i % rgb.length]}`;
  }

  return output;
}

const shadowsSmall = multipleBoxShadow(400);

export const animStar = (animX) => keyframes`
    from {
      transform: translate(0px, 0px);
    }

    to {	
      transform: translate(${animX ? '-2000px' : '-3000px'}, -3000px);
    }
`;

export default (speed = 300, animX = false) => css`
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: ${shadowsSmall};
  opacity: 0;

  animation-name: ${fadeIn}, ${animStar(animX)};
  animation-delay: ${animX ? 8 : 1}s, 0s;
  animation-duration: ${animX ? 10 : 5}s, ${speed}s;
  animation-timing-function: ease-in-out, linear;
  animation-iteration-count: 1, infinite;
  animation-fill-mode: forwards, none;

  &:after {
    content: ' ';
    position: absolute;
    left: 2000px;
    top: 3000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: ${shadowsSmall};
  }
`;
