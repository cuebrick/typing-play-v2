import {useCallback, useEffect, useState} from 'react';
import {IKeyInput} from 'interfaces/level-interface';
import {Timestamp} from 'firebase/firestore';
import {checkTypingKey} from 'modules/key-input-filter';
import Hangul from 'korean-js/src/hangul';

function useKeyboardInput(): [IKeyInput[], IKeyInput | null, (text: string) => void, () => void] {
  const [keyInputList, setKeyInputList] = useState<IKeyInput[]>([]);
  const [keyInput, setKeyInput] = useState<IKeyInput | null>(null);
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
        console.log(id, code, key, '\nKEY', obj, '\nLIST', list);
      }
    },
    [keyInputList, typingText]
  );

  const setLevelTypingText = useCallback((text: string): void => {
    if (text) {
      const arr = Hangul.disassemble(text) as string[];
      setTypingText(arr);
    }
  }, []);

  const clearAllKeyInputData = (): void => {
    setKeyInput(null);
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
  return [keyInputList, keyInput, setLevelTypingText, clearAllKeyInputData];
}

export default useKeyboardInput;
