import styled from 'styled-components';

export const Layer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const depth = (z) =>
  `transform: translateZ(${z}px) scale(${1 + (z * -1) / 1});`;

export default styled.div`
  /* position: relative;
  height: 100vh;
  transform-style: preserve-3d;

  perspective: 1px;
  perspective-origin: 0 0; */

  position: relative;
  height: 100vh;
  transform-style: preserve-3d;
`;
