import { css, keyframes } from 'styled-components';
import styles from 'theme';

export const animGradient = keyframes`
  0% {
    background-position: 0% 0%;
  }

  50% {
    background-position: 50% 0%;
  }

  100% {
    background-position: 0% 0%;
  }
`;

export const animRotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export default css`
  background: linear-gradient(
    to bottom right,
    #100404,
    ${styles.colors.bg},
    #041004,
    ${styles.colors.bg},
    #040410,
    ${styles.colors.bg},
    #041004,
    ${styles.colors.bg},
    #100404
  );
  background-size: 400% 400%;
  animation: ${animGradient} 50s linear infinite;
`;
