export const checkTypingKey = (code: string): boolean => {
  switch (code) {
    // case 'Escape':
    // case 'F1':
    // case 'F2':
    // case 'F3':
    // case 'F4':
    // case 'F5':
    // case 'F6':
    // case 'F7':
    // case 'F8':
    // case 'F9':
    // case 'F10':
    // case 'F11':
    // case 'F12':
    case 'Tab':
    case 'ControlLeft':
    case 'MetaLeft':
    case 'AltLeft':
    case 'ContextMenu':
    case 'ControlRight':
    case 'ScrollLock':
    case 'HanjaMode':
    case 'Pause':
    case 'Insert':
    case 'Delete':
    case 'Home':
    case 'End':
    case 'PageUp':
    case 'PageDown':
    case 'ArrowUp':
    case 'ArrowLeft':
    case 'ArrowDown':
    case 'ArrowRight':
      return false;

    case 'Backquote':
    case 'Digit1':
    case 'Digit2':
    case 'Digit3':
    case 'Digit4':
    case 'Digit5':
    case 'Digit6':
    case 'Digit7':
    case 'Digit8':
    case 'Digit9':
    case 'Digit0':
    case 'Minus':
    case 'Equal':
    case 'Backspace':
    case 'KeyQ':
    case 'KeyW':
    case 'KeyE':
    case 'KeyR':
    case 'KeyT':
    case 'KeyY':
    case 'KeyU':
    case 'KeyI':
    case 'KeyO':
    case 'KeyP':
    case 'BracketLeft':
    case 'BracketRight':
    case 'Backslash':
    case 'KeyA':
    case 'KeyS':
    case 'KeyD':
    case 'KeyF':
    case 'KeyG':
    case 'KeyH':
    case 'KeyJ':
    case 'KeyK':
    case 'KeyL':
    case 'Semicolon':
    case 'Quote':
    case 'Enter':
    case 'ShiftLeft':
    case 'KeyZ':
    case 'KeyX':
    case 'KeyC':
    case 'KeyV':
    case 'KeyB':
    case 'KeyN':
    case 'KeyM':
    case 'Comma':
    case 'Period':
    case 'Slash':
    case 'ShiftRight':
    case 'Space':
    case 'AltRight':
    case 'NumLock':
      return true;

    default:
      return false;
  }
};

/* const checkTypingKey = (key: string): boolean => {
  switch (key) {
    case 'Escape':
    case 'F1':
    case 'F2':
    case 'F3':
    case 'F4':
    case 'F5':
    case 'F6':
    case 'F7':
    case 'F8':
    case 'F9':
    case 'F10':
    case 'F11':
    case 'F12':
    case 'Tab':
    case 'Control':
    case 'Meta':
    case 'Alt':
    case 'ContextMenu':
    case 'ScrollLock':
    case 'HanjaMode':
    case 'Pause':
    case 'Insert':
    case 'Delete':
    case 'Home':
    case 'End':
    case 'PageUp':
    case 'PageDown':
    case 'ArrowUp':
    case 'ArrowLeft':
    case 'ArrowDown':
    case 'ArrowRight':
      return false;

    case '`':
    case '~':
    case '1':
    case '!':
    case '2':
    case '@':
    case '3':
    case '#':
    case '4':
    case '$':
    case '5':
    case '%':
    case '6':
    case '^':
    case '7':
    case '&':
    case '8':
    case '*':
    case '9':
    case '(':
    case '0':
    case ')':
    case '-':
    case '_':
    case '=':
    case '+':
    case 'Backspace':
    case 'q':
    case 'Q':
    case 'w':
    case 'W':
    case 'e':
    case 'E':
    case 'r':
    case 'R':
    case 't':
    case 'T':
    case 'y':
    case 'Y':
    case 'u':
    case 'U':
    case 'i':
    case 'I':
    case 'o':
    case 'O':
    case 'p':
    case 'P':
    case '[':
    case '{':
    case ']':
    case '}':
    case '\\':
    case '|':
    case 'a':
    case 'A':
    case 's':
    case 'S':
    case 'd':
    case 'D':
    case 'f':
    case 'F':
    case 'g':
    case 'G':
    case 'h':
    case 'H':
    case 'j':
    case 'J':
    case 'k':
    case 'K':
    case 'l':
    case 'L':
    case ';':
    case ':':
    case "'":
    case '"':
    case 'Enter':
    case 'Shift':
    case 'z':
    case 'Z':
    case 'x':
    case 'X':
    case 'c':
    case 'C':
    case 'v':
    case 'V':
    case 'b':
    case 'B':
    case 'n':
    case 'N':
    case 'm':
    case 'M':
    case ',':
    case '<':
    case '.':
    case '>':
    case '/':
    case '?':
    case ' ':
    case 'HangulMode':
    case 'NumLock':
      return true

    default:
      return false
  }
} */

// export default {checkTypingKey}
