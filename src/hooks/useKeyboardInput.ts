import {useCallback, useEffect, useState} from 'react';
import {IKeyData, IKeyInput} from 'interfaces/LevelInterface';
import {Timestamp} from 'firebase/firestore';
import {defaultKeyInputData} from 'dto/KeyInput';
import {checkTypingKey} from 'modules/KeyInputFilter';
import KeyMap from 'modules/KeyMap';
import Hangul from 'korean-js/src/hangul';

function useKeyboardInput(): [IKeyInput[], IKeyInput, IKeyData, (text: string) => void] {
  const [keyInputList, setKeyInputList] = useState<IKeyInput[]>([]);
  const [keyInput, setKeyInput] = useState<IKeyInput>(defaultKeyInputData);
  const [nextKeyData, setNextKeyData] = useState<IKeyData>({} as IKeyData);
  const [typingText, setTypingText] = useState<string[]>([]);

  const setLevelTypingText = (text: string): void => {
    if (text) {
      setTypingText(Hangul.disassemble(text) as string[]);
    }
  };

  const onKeydown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      const {key, code, shiftKey} = e;
      console.log('e>>>', code, e.keyCode, key);
      const obj = {key, code, shiftKey, timestamp: Timestamp.now()};
      if (checkTypingKey(e.code)) {
        const list = [...keyInputList, obj];

        setKeyInputList(list);
        setKeyInput(obj);

        const found = KeyMap.getKeyDataByHangulKey(typingText[list.length]);
        console.log('found', found, list.length, list);
        if (found) {
          // let found = typingText as string[] | string[][]
          setNextKeyData(found);
        }
      }
    },
    [keyInputList]
  );

  const onKeyUp = useCallback(() => {
    setKeyInput(defaultKeyInputData);
  }, [keyInput]);

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeydown, onKeyUp]);
  // return {letters: letterList, e: keyboardEvent}
  return [keyInputList, keyInput, nextKeyData, setLevelTypingText];
}

export default useKeyboardInput;
