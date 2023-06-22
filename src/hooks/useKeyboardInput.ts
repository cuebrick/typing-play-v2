import {useCallback, useEffect, useState} from 'react';
import {IKeyData, IKeyInput} from 'interfaces/LevelInterface';
import {Timestamp} from 'firebase/firestore';
import {checkTypingKey} from 'modules/KeyInputFilter';
import KeyMap, {arrangeKeyList} from 'modules/KeyMap';
import Hangul from 'korean-js/src/hangul';

function useKeyboardInput(): [IKeyInput[], IKeyInput | null, IKeyData, (text: string) => void, () => void] {
  const [keyInputList, setKeyInputList] = useState<IKeyInput[]>([]);
  const [keyInput, setKeyInput] = useState<IKeyInput | null>(null);
  const [nextKeyData, setNextKeyData] = useState<IKeyData>({} as IKeyData);
  const [typingText, setTypingText] = useState<string[]>([]);

  const onKeydown = useCallback(
    (e: KeyboardEvent): void => {
      const {key, code, shiftKey} = e;
      if (checkTypingKey(code)) {
        const timestamp = Timestamp.now();
        const id = `${code}_${timestamp.toMillis()}`;
        const obj = {id, key, code, shiftKey, timestamp} as IKeyInput;
        setKeyInput(obj);

        const list = [...keyInputList, obj];
        setKeyInputList(list);
        const arrangeList = arrangeKeyList(list, true);
        const next = KeyMap.getKeyDataByHangulKey(typingText[arrangeList.length]);
        if (next) {
          setNextKeyData(next);
        }
        console.log(id, code, key, '\nKEY', obj, '\nNEXT', next, '\nLIST', list);
      }
    },
    [keyInputList, typingText]
  );

  const setLevelTypingText = useCallback((text: string): void => {
    if (text) {
      const arr = Hangul.disassemble(text) as string[];
      setTypingText(arr);
      const [first] = arr;
      if (first) {
        setNextKeyData(KeyMap.getKeyDataByHangulKey(first));
      }
    }
  }, []);

  const clearAllKeyInputData = (): void => {
    setKeyInput({} as IKeyInput);
    setKeyInputList([]);
  };

  useEffect(() => {
    const onKeyUp = (): void => {
      // setKeyInput(null);
    };

    document.addEventListener('keydown', onKeydown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeydown]);
  // return {letters: letterList, e: keyboardEvent}
  return [keyInputList, keyInput, nextKeyData, setLevelTypingText, clearAllKeyInputData];
}

export default useKeyboardInput;
