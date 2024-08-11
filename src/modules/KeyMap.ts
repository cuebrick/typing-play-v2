import {IKeyInput, IKeyData, IHangulKeyData} from 'interfaces/LevelInterface';

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

const mapDataByHangulKey: {[key: string]: IHangulKeyData} = {
  // 이하 주석은 키가 중복되는 값임.
  '`': {code: 'Backquote', key: '`', han: '`', shiftKey: false, combinable: false},
  '~': {code: 'Backquote', key: '~', han: '~', shiftKey: true, combinable: false},
  '1': {code: 'Digit1', key: '1', han: '1', shiftKey: false, combinable: false},
  '!': {code: 'Digit1', key: '!', han: '!', shiftKey: true, combinable: false},
  '2': {code: 'Digit2', key: '2', han: '2', shiftKey: false, combinable: false},
  '@': {code: 'Digit2', key: '@', han: '@', shiftKey: true, combinable: false},
  '3': {code: 'Digit3', key: '3', han: '3', shiftKey: false, combinable: false},
  '#': {code: 'Digit3', key: '#', han: '#', shiftKey: true, combinable: false},
  '4': {code: 'Digit4', key: '4', han: '4', shiftKey: false, combinable: false},
  $: {code: 'Digit4', key: '$', han: '$', shiftKey: true, combinable: false},
  '5': {code: 'Digit5', key: '5', han: '5', shiftKey: false, combinable: false},
  '%': {code: 'Digit5', key: '%', han: '%', shiftKey: true, combinable: false},
  '6': {code: 'Digit6', key: '6', han: '6', shiftKey: false, combinable: false},
  '^': {code: 'Digit6', key: '^', han: '^', shiftKey: true, combinable: false},
  '7': {code: 'Digit7', key: '7', han: '7', shiftKey: false, combinable: false},
  '&': {code: 'Digit7', key: '&', han: '&', shiftKey: true, combinable: false},
  '8': {code: 'Digit8', key: '8', han: '8', shiftKey: false, combinable: false},
  '*': {code: 'Digit8', key: '*', han: '*', shiftKey: true, combinable: false},
  '9': {code: 'Digit9', key: '9', han: '9', shiftKey: false, combinable: false},
  '(': {code: 'Digit9', key: '(', han: '(', shiftKey: true, combinable: false},
  '0': {code: 'Digit0', key: '0', han: '0', shiftKey: false, combinable: false},
  ')': {code: 'Digit0', key: ')', han: ')', shiftKey: true, combinable: false},
  '-': {code: 'Minus', key: '-', han: '-', shiftKey: false, combinable: false},
  _: {code: 'Minus', key: '_', han: '_', shiftKey: true, combinable: false},
  '=': {code: 'Equal', key: '=', han: '=', shiftKey: false, combinable: false},
  '+': {code: 'Equal', key: '+', han: '+', shiftKey: true, combinable: false},
  Backspace: {code: 'Backspace', key: 'Backspace', han: 'Backspace', shiftKey: false, combinable: false},
  Tab: {code: 'Tab', key: 'Tab', han: 'Tab', shiftKey: false, combinable: false},
  ㅂ: {code: 'KeyQ', key: 'q', han: 'ㅂ', shiftKey: false, combinable: true},
  ㅃ: {code: 'KeyQ', key: 'Q', han: 'ㅃ', shiftKey: true, combinable: true},
  ㅈ: {code: 'KeyW', key: 'w', han: 'ㅈ', shiftKey: false, combinable: true},
  ㅉ: {code: 'KeyW', key: 'W', han: 'ㅉ', shiftKey: true, combinable: true},
  ㄷ: {code: 'KeyE', key: 'e', han: 'ㄷ', shiftKey: false, combinable: true},
  ㄸ: {code: 'KeyE', key: 'E', han: 'ㄸ', shiftKey: true, combinable: true},
  ㄱ: {code: 'KeyR', key: 'r', han: 'ㄱ', shiftKey: false, combinable: true},
  ㄲ: {code: 'KeyR', key: 'R', han: 'ㄲ', shiftKey: true, combinable: true},
  ㅅ: {code: 'KeyT', key: 't', han: 'ㅅ', shiftKey: false, combinable: true},
  ㅆ: {code: 'KeyT', key: 'T', han: 'ㅆ', shiftKey: true, combinable: true},
  ㅛ: {code: 'KeyY', key: 'y', han: 'ㅛ', shiftKey: false, combinable: true},
  // 'ㅛ': {code: 'KeyY', key: 'Y', han: 'ㅛ', shiftKey: true, combinable: true},
  ㅕ: {code: 'KeyU', key: 'u', han: 'ㅕ', shiftKey: false, combinable: true},
  // 'ㅕ': {code: 'KeyU', key: 'U', han: 'ㅕ', shiftKey: true, combinable: true},
  ㅑ: {code: 'KeyI', key: 'i', han: 'ㅑ', shiftKey: false, combinable: true},
  // 'ㅑ': {code: 'KeyI', key: 'I', han: 'ㅑ', shiftKey: true, combinable: true},
  ㅐ: {code: 'KeyO', key: 'o', han: 'ㅐ', shiftKey: false, combinable: true},
  ㅒ: {code: 'KeyO', key: 'O', han: 'ㅒ', shiftKey: true, combinable: true},
  ㅔ: {code: 'KeyP', key: 'p', han: 'ㅔ', shiftKey: false, combinable: true},
  ㅖ: {code: 'KeyP', key: 'P', han: 'ㅖ', shiftKey: true, combinable: true},
  '[': {code: 'BracketLeft', key: '[', han: '[', shiftKey: false, combinable: false},
  '{': {code: 'BracketLeft', key: '{', han: '{', shiftKey: true, combinable: false},
  ']': {code: 'BracketRight', key: ']', han: ']', shiftKey: false, combinable: false},
  '}': {code: 'BracketRight', key: '}', han: '}', shiftKey: true, combinable: false},
  '\\': {code: 'Backslash', key: '\\', han: '\\', shiftKey: false, combinable: false},
  '|': {code: 'Backslash', key: '|', han: '|', shiftKey: true, combinable: false},
  CapsLock: {code: 'CapsLock', key: 'CapsLock', han: 'CapsLock', shiftKey: false, combinable: false},
  ㅁ: {code: 'KeyA', key: 'a', han: 'ㅁ', shiftKey: false, combinable: true},
  // 'ㅁ': {code: 'KeyA', key: 'A', han: 'ㅁ', shiftKey: true, combinable: true},
  ㄴ: {code: 'KeyS', key: 's', han: 'ㄴ', shiftKey: false, combinable: true},
  // 'ㄴ': {code: 'KeyS', key: 'S', han: 'ㄴ', shiftKey: true, combinable: true},
  ㅇ: {code: 'KeyD', key: 'd', han: 'ㅇ', shiftKey: false, combinable: true},
  // 'ㅇ': {code: 'KeyD', key: 'D', han: 'ㅇ', shiftKey: true, combinable: true},
  ㄹ: {code: 'KeyF', key: 'f', han: 'ㄹ', shiftKey: false, combinable: true},
  // 'ㄹ': {code: 'KeyF', key: 'F', han: 'ㄹ', shiftKey: true, combinable: true},
  ㅎ: {code: 'KeyG', key: 'g', han: 'ㅎ', shiftKey: false, combinable: true},
  // 'ㅎ': {code: 'KeyG', key: 'G', han: 'ㅎ', shiftKey: true, combinable: true},
  ㅗ: {code: 'KeyH', key: 'h', han: 'ㅗ', shiftKey: false, combinable: true},
  // 'ㅗ': {code: 'KeyH', key: 'H', han: 'ㅗ', shiftKey: true, combinable: true},
  ㅓ: {code: 'KeyJ', key: 'j', han: 'ㅓ', shiftKey: false, combinable: true},
  // 'ㅓ': {code: 'KeyJ', key: 'J', han: 'ㅓ', shiftKey: true, combinable: true},
  ㅏ: {code: 'KeyK', key: 'k', han: 'ㅏ', shiftKey: false, combinable: true},
  // 'ㅏ': {code: 'KeyK', key: 'K', han: 'ㅏ', shiftKey: true, combinable: true},
  ㅣ: {code: 'KeyL', key: 'l', han: 'ㅣ', shiftKey: false, combinable: true},
  // 'ㅣ': {code: 'KeyL', key: 'L', han: 'ㅣ', shiftKey: true, combinable: true},
  ';': {code: 'Semicolon', key: ';', han: ';', shiftKey: false, combinable: false},
  ':': {code: 'Semicolon', key: ':', han: ':', shiftKey: true, combinable: false},
  "'": {code: 'Quote', key: "'", han: "'", shiftKey: false, combinable: false},
  '"': {code: 'Quote', key: '"', han: '"', shiftKey: true, combinable: false},
  Enter: {code: 'Enter', key: 'Enter', han: 'Enter', shiftKey: false, combinable: false},
  Shift: {code: 'ShiftLeft', key: 'Shift', han: 'Shift', shiftKey: true, combinable: false},
  ㅋ: {code: 'KeyZ', key: 'z', han: 'ㅋ', shiftKey: false, combinable: true},
  // 'ㅋ': {code: 'KeyZ', key: 'Z', han: 'ㅋ', shiftKey: true, combinable: true},
  ㅌ: {code: 'KeyX', key: 'x', han: 'ㅌ', shiftKey: false, combinable: true},
  // 'ㅌ': {code: 'KeyX', key: 'X', han: 'ㅌ', shiftKey: true, combinable: true},
  ㅊ: {code: 'KeyC', key: 'c', han: 'ㅊ', shiftKey: false, combinable: true},
  // 'ㅊ': {code: 'KeyC', key: 'C', han: 'ㅊ', shiftKey: true, combinable: true},
  ㅍ: {code: 'KeyV', key: 'v', han: 'ㅍ', shiftKey: false, combinable: true},
  // 'ㅍ': {code: 'KeyV', key: 'V', han: 'ㅍ', shiftKey: true, combinable: true},
  ㅠ: {code: 'KeyB', key: 'b', han: 'ㅠ', shiftKey: false, combinable: true},
  // 'ㅠ': {code: 'KeyB', key: 'B', han: 'ㅠ', shiftKey: true, combinable: true},
  ㅜ: {code: 'KeyN', key: 'n', han: 'ㅜ', shiftKey: false, combinable: true},
  // 'ㅜ': {code: 'KeyN', key: 'N', han: 'ㅜ', shiftKey: true, combinable: true},
  ㅡ: {code: 'KeyM', key: 'm', han: 'ㅡ', shiftKey: false, combinable: true},
  // 'ㅡ': {code: 'KeyM', key: 'M', han: 'ㅡ', shiftKey: true, combinable: true},
  ',': {code: 'Comma', key: ',', han: ',', shiftKey: false, combinable: false},
  '<': {code: 'Comma', key: '<', han: '<', shiftKey: true, combinable: false},
  '.': {code: 'Period', key: '.', han: '.', shiftKey: false, combinable: false},
  '>': {code: 'Period', key: '>', han: '>', shiftKey: true, combinable: false},
  '/': {code: 'Slash', key: '/', han: '/', shiftKey: false, combinable: false},
  '?': {code: 'Slash', key: '?', han: '?', shiftKey: true, combinable: false},
  // 'Shift': {code: 'ShiftRight', key: 'Shift', han: 'Shift', shiftKey: true, combinable: false},
  Control: {code: 'ControlLeft', key: 'Control', han: 'Control', shiftKey: false, combinable: false},
  Alt: {code: 'AltLeft', key: 'Alt', han: 'Alt', shiftKey: false, combinable: false},
  ' ': {code: 'Space', key: ' ', han: ' ', shiftKey: false, combinable: false},
  HangulMode: {code: 'AltRight', key: 'HangulMode', han: 'HangulMode', shiftKey: false, combinable: false},
  HanjaMode: {code: 'ControlRight', key: 'HanjaMode', han: 'HanjaMode', shiftKey: false, combinable: false}
};

const mapDataByEnglishKey: {[key: string]: IKeyData} = {
  '`': {code: 'Backquote', key: '`', han: '`', shiftKey: false},
  '~': {code: 'Backquote', key: '~', han: '~', shiftKey: true},
  1: {code: 'Digit1', key: '1', han: '1', shiftKey: false},
  '!': {code: 'Digit1', key: '!', han: '!', shiftKey: true},
  2: {code: 'Digit2', key: '2', han: '2', shiftKey: false},
  '@': {code: 'Digit2', key: '@', han: '@', shiftKey: true},
  3: {code: 'Digit3', key: '3', han: '3', shiftKey: false},
  '#': {code: 'Digit3', key: '#', han: '#', shiftKey: true},
  4: {code: 'Digit4', key: '4', han: '4', shiftKey: false},
  $: {code: 'Digit4', key: '$', han: '$', shiftKey: true},
  5: {code: 'Digit5', key: '5', han: '5', shiftKey: false},
  '%': {code: 'Digit5', key: '%', han: '%', shiftKey: true},
  6: {code: 'Digit6', key: '6', han: '6', shiftKey: false},
  '^': {code: 'Digit6', key: '^', han: '^', shiftKey: true},
  7: {code: 'Digit7', key: '7', han: '7', shiftKey: false},
  '&': {code: 'Digit7', key: '&', han: '&', shiftKey: true},
  8: {code: 'Digit8', key: '8', han: '8', shiftKey: false},
  '*': {code: 'Digit8', key: '*', han: '*', shiftKey: true},
  9: {code: 'Digit9', key: '9', han: '9', shiftKey: false},
  '(': {code: 'Digit9', key: '(', han: '(', shiftKey: true},
  0: {code: 'Digit0', key: '0', han: '0', shiftKey: false},
  ')': {code: 'Digit0', key: ')', han: ')', shiftKey: true},
  '-': {code: 'Minus', key: '-', han: '-', shiftKey: false},
  _: {code: 'Minus', key: '_', han: '_', shiftKey: true},
  '=': {code: 'Equal', key: '=', han: '=', shiftKey: false},
  '+': {code: 'Equal', key: '+', han: '+', shiftKey: true},
  Backspace: {code: 'Backspace', key: 'Backspace', han: 'Backspace', shiftKey: false},
  Tab: {code: 'Tab', key: 'Tab', han: 'Tab', shiftKey: false},
  q: {code: 'KeyQ', key: 'q', han: 'ㅂ', shiftKey: false},
  Q: {code: 'KeyQ', key: 'Q', han: 'ㅃ', shiftKey: true},
  w: {code: 'KeyW', key: 'w', han: 'ㅈ', shiftKey: false},
  W: {code: 'KeyW', key: 'W', han: 'ㅉ', shiftKey: true},
  e: {code: 'KeyE', key: 'e', han: 'ㄷ', shiftKey: false},
  E: {code: 'KeyE', key: 'E', han: 'ㄸ', shiftKey: true},
  r: {code: 'KeyR', key: 'r', han: 'ㄱ', shiftKey: false},
  R: {code: 'KeyR', key: 'R', han: 'ㄲ', shiftKey: true},
  t: {code: 'KeyT', key: 't', han: 'ㅅ', shiftKey: false},
  T: {code: 'KeyT', key: 'T', han: 'ㅆ', shiftKey: true},
  y: {code: 'KeyY', key: 'y', han: 'ㅛ', shiftKey: false},
  Y: {code: 'KeyY', key: 'Y', han: 'ㅛ', shiftKey: true},
  u: {code: 'KeyU', key: 'u', han: 'ㅕ', shiftKey: false},
  U: {code: 'KeyU', key: 'U', han: 'ㅕ', shiftKey: true},
  i: {code: 'KeyI', key: 'i', han: 'ㅑ', shiftKey: false},
  I: {code: 'KeyI', key: 'I', han: 'ㅑ', shiftKey: true},
  o: {code: 'KeyO', key: 'o', han: 'ㅐ', shiftKey: false},
  O: {code: 'KeyO', key: 'O', han: 'ㅒ', shiftKey: true},
  p: {code: 'KeyP', key: 'p', han: 'ㅔ', shiftKey: false},
  P: {code: 'KeyP', key: 'P', han: 'ㅖ', shiftKey: true},
  '[': {code: 'BracketLeft', key: '[', han: '[', shiftKey: false},
  '{': {code: 'BracketLeft', key: '{', han: '{', shiftKey: true},
  ']': {code: 'BracketRight', key: ']', han: ']', shiftKey: false},
  '}': {code: 'BracketRight', key: '}', han: '}', shiftKey: true},
  '\\': {code: 'Backslash', key: '\\', han: '\\', shiftKey: false},
  '|': {code: 'Backslash', key: '|', han: '|', shiftKey: true},
  CapsLock: {code: 'CapsLock', key: 'CapsLock', han: 'CapsLock', shiftKey: false},
  a: {code: 'KeyA', key: 'a', han: 'ㅁ', shiftKey: false},
  A: {code: 'KeyA', key: 'A', han: 'ㅁ', shiftKey: true},
  s: {code: 'KeyS', key: 's', han: 'ㄴ', shiftKey: false},
  S: {code: 'KeyS', key: 'S', han: 'ㄴ', shiftKey: true},
  d: {code: 'KeyD', key: 'd', han: 'ㅇ', shiftKey: false},
  D: {code: 'KeyD', key: 'D', han: 'ㅇ', shiftKey: true},
  f: {code: 'KeyF', key: 'f', han: 'ㄹ', shiftKey: false},
  F: {code: 'KeyF', key: 'F', han: 'ㄹ', shiftKey: true},
  g: {code: 'KeyG', key: 'g', han: 'ㅎ', shiftKey: false},
  G: {code: 'KeyG', key: 'G', han: 'ㅎ', shiftKey: true},
  h: {code: 'KeyH', key: 'h', han: 'ㅗ', shiftKey: false},
  H: {code: 'KeyH', key: 'H', han: 'ㅗ', shiftKey: true},
  j: {code: 'KeyJ', key: 'j', han: 'ㅓ', shiftKey: false},
  J: {code: 'KeyJ', key: 'J', han: 'ㅓ', shiftKey: true},
  k: {code: 'KeyK', key: 'k', han: 'ㅏ', shiftKey: false},
  K: {code: 'KeyK', key: 'K', han: 'ㅏ', shiftKey: true},
  l: {code: 'KeyL', key: 'l', han: 'ㅣ', shiftKey: false},
  L: {code: 'KeyL', key: 'L', han: 'ㅣ', shiftKey: true},
  ';': {code: 'Semicolon', key: ';', han: ';', shiftKey: false},
  ':': {code: 'Semicolon', key: ':', han: ':', shiftKey: true},
  "'": {code: 'Quote', key: "'", han: "'", shiftKey: false},
  '"': {code: 'Quote', key: '"', han: '"', shiftKey: true},
  Enter: {code: 'Enter', key: 'Enter', han: 'Enter', shiftKey: false},
  Shift: {code: 'ShiftLeft', key: 'Shift', han: 'Shift', shiftKey: true},
  z: {code: 'KeyZ', key: 'z', han: 'ㅋ', shiftKey: false},
  Z: {code: 'KeyZ', key: 'Z', han: 'ㅋ', shiftKey: true},
  x: {code: 'KeyX', key: 'x', han: 'ㅌ', shiftKey: false},
  X: {code: 'KeyX', key: 'X', han: 'ㅌ', shiftKey: true},
  c: {code: 'KeyC', key: 'c', han: 'ㅊ', shiftKey: false},
  C: {code: 'KeyC', key: 'C', han: 'ㅊ', shiftKey: true},
  v: {code: 'KeyV', key: 'v', han: 'ㅍ', shiftKey: false},
  V: {code: 'KeyV', key: 'V', han: 'ㅍ', shiftKey: true},
  b: {code: 'KeyB', key: 'b', han: 'ㅠ', shiftKey: false},
  B: {code: 'KeyB', key: 'B', han: 'ㅠ', shiftKey: true},
  n: {code: 'KeyN', key: 'n', han: 'ㅜ', shiftKey: false},
  N: {code: 'KeyN', key: 'N', han: 'ㅜ', shiftKey: true},
  m: {code: 'KeyM', key: 'm', han: 'ㅡ', shiftKey: false},
  M: {code: 'KeyM', key: 'M', han: 'ㅡ', shiftKey: true},
  ',': {code: 'Comma', key: ',', han: ',', shiftKey: false},
  '<': {code: 'Comma', key: '<', han: '<', shiftKey: true},
  '.': {code: 'Period', key: '.', han: '.', shiftKey: false},
  '>': {code: 'Period', key: '>', han: '>', shiftKey: true},
  '/': {code: 'Slash', key: '/', han: '/', shiftKey: false},
  '?': {code: 'Slash', key: '?', han: '?', shiftKey: true},
  // 'Shift': {code: 'ShiftRight', key: 'Shift', han: 'Shift', shiftKey: true},
  Control: {code: 'ControlLeft', key: 'Control', han: 'Control', shiftKey: false},
  Alt: {code: 'AltLeft', key: 'Alt', han: 'Alt', shiftKey: false},
  ' ': {code: 'Space', key: ' ', han: ' ', shiftKey: false},
  HangulMode: {code: 'AltRight', key: 'HangulMode', han: 'HangulMode', shiftKey: false},
  HanjaMode: {code: 'ControlRight', key: 'HanjaMode', han: 'HanjaMode', shiftKey: false}
};

const KeyMap = {
  get(keyInput: IKeyInput): string {
    console.log('check >>', keyInput, mapData[keyInput.key]);
    return mapData[keyInput.key];
  },
  getKeyDataByHangulKey(han: string): IHangulKeyData {
    return mapDataByHangulKey[han] as IHangulKeyData;
  },
  getKeyDataByEnglishKey(eng: string): IKeyData {
    return mapDataByEnglishKey[eng] as IKeyData;
  }
};

export const arrangeKey = (keyInput: IKeyInput, isHangulMode: boolean): string | undefined => {
  let text;
  switch (keyInput.key) {
    case 'Shift':
      // do nothing... // shift 키 입력은 글자를 입력하지 않음.
      // text = 'SHIFT_KEY';
      break;
    case 'Enter': {
      text = '↵';
      break;
    }
    case 'Backspace': {
      text = 'BACKSPACE_KEY';
      break;
    }
    case 'HangulMode': {
      // 한글모드를 변경
      // isHangulMode = !isHangulMode;
      text = 'HANGUL_MODE';
      break;
    }
    default: {
      const keyData = KeyMap.getKeyDataByEnglishKey(keyInput.key);
      text = isHangulMode ? keyData.han : keyData.key;
    }
  }
  return text;
};

export const arrangeKeyList = (keyInputList: IKeyInput[], isHangulMode: boolean): string[] => {
  return keyInputList.reduce((acc: string[], curr) => {
    switch (curr.key) {
      case 'Shift':
        // do nothing... // shift 키 입력은 글자를 입력하지 않음.
        break;
      case 'Enter': {
        acc.push('↵');
        break;
      }
      case 'Backspace': {
        acc.pop(); // Backspace 키 입력은 마지막에 입력한 글자를 빼줌
        break;
      }
      case 'HangulMode': {
        // 한글모드를 변경
        isHangulMode = !isHangulMode;
        break;
      }
      default: {
        const keyData = KeyMap.getKeyDataByEnglishKey(curr.key);
        acc.push(isHangulMode ? keyData.han : keyData.key);
      }
    }
    return acc;
  }, []);
};

export default KeyMap;
