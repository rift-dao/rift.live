import { css, keyframes } from 'styled-components';

const IMG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAIAAAAnuUURAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAhdEVYdENyZWF0aW9uIFRpbWUAMjAyMDowMTowOSAxMjowNjoxNsq6AtUAAAERSURBVGhD7ZjLDoMwDARJaQVBwP//Kc9Al9qHnus9FGnnAjHSahyEUJy6rtu2rW3bKkxKad/3dV1zztM0vT6c5+mPfwWxCUGIbprGawGQVkqxnud5fn7gWA7DgFyEei1GXddoGCzLgk1F//4gxsOv/40seciShyx5yJKHLHnIkocseciShyx5yJLHTSyv025KvmJggcDXDHy2cRyHF2JAzo7kOI+XUuIjA+NqGlk5Zy8EQJRNYGzJnMD0fX+DORG4wV7CD3vphRhIsxubZtk9x3IcR1jiBXktBj4dKNrXA2jTLPQab/cbCwS+ZqB/Dw9Z8pAlD1nykCUPWfKQJQ9Z8pAlD1nyuInlddr982lWVb0BBYSLPntvIIAAAAAASUVORK5CYII=';

const bgWidth = 55;
const bgHeight = 55;

export const animScroll = keyframes`
  100% { background-position: ${bgWidth}px ${bgHeight}px; }
`;

export default css`
  background: url(${IMG}) repeat 0 0;
  animation: ${animScroll} 5s infinite;
  animation-timing-function: linear;
`;
