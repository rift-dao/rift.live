import SimplexNoise from 'simplex-noise';

/* UTIL */
const { random, round } = Math;
// const HALF_PI = 0.5 * PI;
// const TAU = 2 * PI;
// const TO_RAD = PI / 180;
// const floor = (n) => n | 0;
const rand = (n) => n * random();
// const randIn = (min, max) => rand(max - min) + min;
// const randRange = (n) => n - rand(2 * n);
// const fadeIn = (t, m) => t / m;
// const fadeOut = (t, m) => (m - t) / m;
// const fadeInOut = (t, m) => {
//   const hm = 0.000001 * m;
//   return abs(((t + hm) % m) - hm) / hm;
// };
// const dist = (x1, y1, x2, y2) => sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
// const angle = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1);
// const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;
/* END UTIL */

const rayCount = 500;
const rayPropCount = 8;
const rayPropsLength = rayCount * rayPropCount;
const baseLength = -600;
const rangeLength = 10;
const baseSpeed = 0.01;
const rangeSpeed = 0.1;
const baseWidth = 10;
const rangeWidth = 20;
const baseHue = 220;
const rangeHue = 60;
const baseTTL = 200;
const rangeTTL = 200;
const noiseStrength = 150;
const xOff = 0.0015;
const yOff = 0.0015;
const zOff = 0.0015;
const backgroundColor = 'hsla(260,60%,5%,1)';

let container;
let canvas;
let ctx;
let center;
let tick;
let simplex;
let rayProps;

/* eslint-disable no-use-before-define */
export const setup = (containerElem) => {
  createCanvas(containerElem);
  resize();
  initRays();
  draw();
};

function initRays() {
  tick = 0;
  simplex = new SimplexNoise();
  rayProps = new Float32Array(rayPropsLength);

  let i;

  for (i = 0; i < rayPropsLength; i += rayPropCount) {
    initRay(i);
  }
}

function initRay(i) {
  const length = baseLength + rand(rangeLength);
  const x = rand(canvas.a.width);
  let y1 = center[1] + noiseStrength;
  let y2 = center[1] + noiseStrength - length;
  const n = simplex.noise3D(x * xOff, y1 * yOff, tick * zOff) * noiseStrength;
  y1 += n;
  y2 += n;
  const life = 0;
  const ttl = baseTTL + rand(rangeTTL);
  const width = baseWidth + rand(rangeWidth);
  const speed = baseSpeed + rand(rangeSpeed) * (round(rand(1)) ? 1 : -1);
  const hue = baseHue + rand(rangeHue);

  rayProps.set([x, y1, y2, life, ttl, width, speed, hue], i);
}

function drawRays() {
  let i;

  for (i = 0; i < rayPropsLength; i += rayPropCount) {
    updateRay(i);
  }
}

function updateRay(i) {
  const i2 = 1 + i;
  const i3 = 2 + i;
  const i4 = 3 + i;
  const i5 = 4 + i;
  const i6 = 5 + i;
  const i7 = 6 + i;
  const i8 = 7 + i;
  let x = rayProps[i];
  const y1 = rayProps[i2];
  const y2 = rayProps[i3];
  let life = rayProps[i4];
  const ttl = rayProps[i5];
  const width = rayProps[i6];
  const speed = rayProps[i7];
  const hue = rayProps[i8];

  drawRay(x, y1, y2, life, ttl, width, hue);

  x += speed;
  life++;

  rayProps[i] = x;
  rayProps[i4] = life;

  if (checkBounds(x)) initRay(i);
}

function drawRay(x, y1, y2, life, ttl, width, hue) {
  const gradient = ctx.a.createLinearGradient(x, y1, x, y2);
  gradient.addColorStop(0, `hsla(${hue},65%,5%,0.1)`);
  gradient.addColorStop(0.5, `hsla(${hue},65%,5%,0.5)`);
  gradient.addColorStop(1, `hsla(${hue},65%,5%,0.1)`);

  ctx.a.save();
  ctx.a.beginPath();
  ctx.a.strokeStyle = gradient;
  ctx.a.lineWidth = width;
  ctx.a.moveTo(x, y1);
  ctx.a.lineTo(x, y2);
  ctx.a.stroke();
  ctx.a.closePath();
  ctx.a.restore();
}

function checkBounds(x) {
  return x < 0 || x > canvas.a.width;
}

function createCanvas(containerElem) {
  container = document.querySelector(containerElem);
  canvas = {
    a: document.createElement('canvas'),
    b: document.createElement('canvas'),
  };
  canvas.b.style = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	`;
  container.appendChild(canvas.b);
  ctx = {
    a: canvas.a.getContext('2d'),
    b: canvas.b.getContext('2d'),
  };
  center = [];
}

export const resize = () => {
  const { innerWidth, innerHeight } = window;

  canvas.a.width = innerWidth;
  canvas.a.height = innerHeight;

  ctx.a.drawImage(canvas.b, 0, 0);

  canvas.b.width = innerWidth;
  canvas.b.height = innerHeight;

  ctx.b.drawImage(canvas.a, 0, 0);

  center[0] = 0.5 * canvas.a.width;
  center[1] = 0.5 * canvas.a.height;
};

function render() {
  ctx.b.save();
  ctx.b.filter = 'blur(6px)';
  ctx.a.globalCompositeOperation = 'lighter';
  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();
}

function draw() {
  tick++;
  ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
  ctx.b.fillStyle = backgroundColor;
  ctx.b.fillRect(0, 0, canvas.b.width, canvas.a.height);
  drawRays();
  render();

  window.requestAnimationFrame(draw);
}
