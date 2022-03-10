export const zeroAddress = '0x0000000000000000000000000000000000000000';

export const LS_PREFIX = 'RIFT_';

export const MLOOT_OFFSET = 8000;
export const GLOOT_OFFSET = 9997460;
export const MAX_BAGS = 10000000;
export const BAG_TYPES = {
  LOOT: 'LOOT',
  MLOOT: 'MLOOT',
  GLOOT: 'GLOOT',
};

const dayDiff = (timestamp1, timestamp2) => {
  const difference = timestamp1 - timestamp2;
  return Math.floor(difference / 1000 / 60 / 60 / 24);
};

const decodeToken = (encodedToken) => {
  const jsonEncoded = encodedToken.substring(29);
  return JSON.parse(Buffer.from(jsonEncoded, 'base64').toString());
};

const imageFromTokenUri = (tokenUri) => {
  return decodeToken(tokenUri).image;
};

const lsGet = (key, b64Decode = true) => {
  try {
    const data = localStorage.getItem(`${LS_PREFIX}${key}`);
    if (data && b64Decode) return atob(data);
    return data;
  } catch {
    return null;
  }
};

const lsSet = (key, data, b64Encode = true) => {
  localStorage.setItem(`${LS_PREFIX}${key}`, b64Encode ? btoa(data) : data);
};

const getBagType = (bagId) => {
  let bag = bagId;
  if (typeof bagId === 'string') {
    bag = parseInt(bagId, 10);
  }
  let type = BAG_TYPES.LOOT;
  if (bag > MLOOT_OFFSET && bag <= GLOOT_OFFSET) {
    type = BAG_TYPES.MLOOT;
  } else if (bag > GLOOT_OFFSET) {
    type = BAG_TYPES.GLOOT;
  }
  return type;
};

const displayBagType = (bagId) => {
  switch (getBagType(bagId)) {
    case BAG_TYPES.MLOOT:
      return 'MLoot';
    case BAG_TYPES.GLOOT:
      return 'GLoot';
    default:
      return 'Loot';
  }
};

const displayBag = (bagId) => {
  let displayId = parseInt(bagId, 10);

  if (displayId > GLOOT_OFFSET && displayId <= MAX_BAGS) {
    displayId -= GLOOT_OFFSET;
  }

  return `${displayBagType(bagId)} #${displayId}`;
};

const lootMultiplier = () => 100;

const pixelBorderRounded = (fill = 'rgb(255,255,255)') =>
  `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="${fill}" /></svg>')`;

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default {
  dayDiff,
  decodeToken,
  imageFromTokenUri,
  lsGet,
  lsSet,
  getBagType,
  displayBagType,
  displayBag,
  lootMultiplier,
  pixelBorderRounded,
  capitalize,
};
