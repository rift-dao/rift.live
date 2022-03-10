import { css, keyframes } from 'styled-components';
import { colors } from 'utils/styles';

const IMG_20 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAADdJREFUOE9jZKAiEBeXMWekonkMowZSHpqjYTgahmSEwGiyISPQ0LQMkTAEOZNyz0JMYGJiUAUA0WUKUqPUiU8AAAAASUVORK5CYII=';

const bgWidth = 20;
const bgHeight = 20;

export const animScroll = keyframes`
  0% { background-position: 0 0, 0px 0px; }
  50% {
    background-position: 0 0, ${bgWidth / 2}px ${bgHeight / 2}px;
  }
  100% { background-position: 0 0, ${bgWidth}px ${bgHeight}px; }
`;

export default css`
  background: linear-gradient(to bottom, ${colors.bg} 75%, #0000),
    url(${IMG_20}) repeat 0 0;
  background-size: 100% 100%, ${bgWidth}px, ${bgHeight}px;
  animation: ${animScroll} 15s infinite;
  animation-timing-function: linear;
`;
