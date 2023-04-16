import {useCallback, useEffect, useState} from "react";
import {IKeyInput} from "interfaces/LevelInterface";
import {Timestamp} from "firebase/firestore";
import {defaultKeyInputData} from "dto/KeyInput";
import {checkTypingKey} from 'modules/KeyInputFilter';

function useKeyboardInput(): [IKeyInput[], IKeyInput] {
  const [keyInputList, setKeyInputList] = useState<IKeyInput[]>([]);
  const [keyInput, setKeyInput] = useState<IKeyInput>(defaultKeyInputData);
  const onKeydown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    const {key, code, shiftKey} = e;
    console.log('e>>>', code, e.keyCode, key);
    const obj = {key, code, shiftKey, timestamp: Timestamp.now()};
    if (checkTypingKey(e.code)) {
      setKeyInputList([...keyInputList, obj]);
      setKeyInput(obj);
    }
  }, [keyInputList]);

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
  }, [onKeydown]);
  // return {letters: letterList, e: keyboardEvent}
  return [keyInputList, keyInput];
}

export default useKeyboardInput;
