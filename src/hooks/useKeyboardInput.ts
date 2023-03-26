import {useCallback, useEffect, useState} from "react";

function useKeyboardInput(): [string[], KeyboardEvent | undefined] {
  const [letterList, setLetterList] = useState<string[]>([]);
  const [keyboardEvent, setKeyboardEvent] = useState<KeyboardEvent>();
  const onKeydown = useCallback((e: KeyboardEvent) => {
    setLetterList([...letterList, e.key])
    setKeyboardEvent(e)
  }, [letterList])

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => {
      document.removeEventListener('keydown', onKeydown)
    }
  }, [onKeydown])
  // return {letters: letterList, e: keyboardEvent}
  return [letterList, keyboardEvent]
}

export default useKeyboardInput