import {IKeyInput} from "interfaces/LevelInterface";


const mapData: {[key: string]: string} = {
  q: 'ㅂ',
  Q: 'ㅃ',
  w: 'ㅈ',
  W: 'ㅉ',
  e: 'ㄷ',
  E: 'ㄸ',
  r: 'ㄱ',
  R: 'ㄲ',
  t: 'ㅅ',
  T: 'ㅆ',
  y: 'ㅛ',
  Y: 'ㅛ',
  u: 'ㅕ',
  U: 'ㅕ',
  i: 'ㅑ',
  I: 'ㅑ',
  o: 'ㅐ',
  O: 'ㅒ',
  p: 'ㅔ',
  P: 'ㅖ',
  a: 'ㅁ',
  A: 'ㅁ',
  s: 'ㄴ',
  S: 'ㄴ',
  d: 'ㅇ',
  D: 'ㅇ',
  f: 'ㄹ',
  F: 'ㄹ',
  g: 'ㅎ',
  G: 'ㅎ',
  h: 'ㅗ',
  H: 'ㅗ',
  j: 'ㅓ',
  J: 'ㅓ',
  k: 'ㅏ',
  K: 'ㅏ',
  l: 'ㅣ',
  L: 'ㅣ',
  z: 'ㅋ',
  Z: 'ㅋ',
  x: 'ㅌ',
  X: 'ㅌ',
  c: 'ㅊ',
  C: 'ㅊ',
  v: 'ㅍ',
  V: 'ㅍ',
  b: 'ㅠ',
  B: 'ㅠ',
  n: 'ㅜ',
  N: 'ㅜ',
  m: 'ㅡ',
  M: 'ㅡ'
};

const mapDataByHangulKey = {
  'ㅂ': {code: 'KeyQ', key: 'q', han: 'ㅂ', shiftKey: false},
  'ㅃ': {code: 'KeyQ', key: 'Q', han: 'ㅃ', shiftKey: true},
  'ㅈ': {code: 'KeyW', key: 'w', han: 'ㅈ', shiftKey: false},
  'ㅉ': {code: 'KeyW', key: 'W', han: 'ㅉ', shiftKey: true}
};

const mapDataByEnglishKey = {
  q: {code: 'KeyQ', key: 'q', han: 'ㅂ', shiftKey: false},
  Q: {code: 'KeyQ', key: 'Q', han: 'ㅃ', shiftKey: true},
  w: {code: 'KeyW', key: 'w', han: 'ㅈ', shiftKey: false},
  W: {code: 'KeyW', key: 'W', han: 'ㅉ', shiftKey: true}
};

const KeyMap = {
  get(keyInput: IKeyInput): string {
    console.log('check >>', keyInput, mapData[keyInput.key]);
    return mapData[keyInput.key];
  }
};
export default KeyMap;
