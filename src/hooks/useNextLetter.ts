import {useContext, useEffect, useState} from "react";
import {LevelContext} from "store/LevelContext";
// import useKeyboardInput from "hooks/useKeyboardInput";
import Hangul from "korean-js/src/hangul";
import {IKeyInput, IKeyMap} from "interfaces/LevelInterface";
import KeyMap from "modules/KeyMap";

function useNextLetter(): [IKeyMap, (list: IKeyInput[]) => void] {
  const [typingText, setTypingText] = useState<string[] | string[][]>()
  const [nextLetter, setNextLetter] = useState<IKeyMap>({} as IKeyMap)
  const [keyInputList, setKeyInputList] = useState<IKeyInput[]>([]);
  const store = useContext(LevelContext)
  // let nextIndex

  useEffect(() => {
    if (store.level) {
      let disassembleText = Hangul.disassemble(store.level.text)
      setTypingText(disassembleText)
    }
  }, [store.level])

  useEffect(() => {
    if (typingText) {
      const nextIndex = keyInputList.length
      let found = typingText as string[] | string[][]
      setNextLetter(found[nextIndex] as string)
      // todo: KeyMap.ts에서 한글 자소를 찾은 후 해당하는 key(알파벳)을 전달.
    }
  }, [typingText, keyInputList])

  const onChangeKeyInputList = (list: IKeyInput[]): void => {
    setKeyInputList(list);
  }

  return [nextLetter, onChangeKeyInputList]
}

export default useNextLetter