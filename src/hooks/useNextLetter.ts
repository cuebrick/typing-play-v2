import {useContext, useEffect, useState} from "react";
import {LevelContext} from "store/LevelContext";
import useKeyboardInput from "hooks/useKeyboardInput";
import Hangul from "korean-js/src/hangul";

function useNextLetter() {
  const [typingText, setTypingText] = useState<string[] | string[][]>()
  const [nextLetter, setNextLetter] = useState<string>()
  const [keyInputList] = useKeyboardInput()
  const store = useContext(LevelContext)
  let nextIndex

  useEffect(() => {
    if (store.level) {
      let disassembleText = Hangul.disassemble(store.level.text)
      setTypingText(disassembleText)
    }
  }, [store.level])

  useEffect(() => {
    if (typingText) {
      nextIndex = keyInputList.length
      let found = typingText as string[] | string[][]
      setNextLetter(found[nextIndex] as string)
    }
  }, [typingText, keyInputList])

  return [nextLetter]
}

export default useNextLetter