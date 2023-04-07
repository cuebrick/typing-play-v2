import {useCallback, useEffect, useState} from "react";
import {IKeyInput} from "interfaces/LevelInterface";
import {Timestamp} from "firebase/firestore";

function useKeyboardInput(): [IKeyInput[], IKeyInput | undefined] {
  const [keyInputList, setKeyInputList] = useState<IKeyInput[]>([]);
  const [keyInput, setKeyInput] = useState<IKeyInput>();
  const onKeydown = useCallback((e: KeyboardEvent) => {
    const {key, code, shiftKey} = e;
    console.log('e>>>', e)
    const obj = {key, code, shiftKey, timestamp: Timestamp.now()}
    setKeyInputList([...keyInputList, obj])
    setKeyInput(obj)
  }, [keyInputList])

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => {
      document.removeEventListener('keydown', onKeydown)
    }
  }, [onKeydown])
  // return {letters: letterList, e: keyboardEvent}
  return [keyInputList, keyInput]
}

export default useKeyboardInput