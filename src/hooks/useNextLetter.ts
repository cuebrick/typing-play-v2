import {useContext, useEffect, useState} from 'react';
import {EditorContext} from 'store/EditorContext';
import Hangul from 'korean-js/src/hangul';
import {IKeyInput, IKeyData} from 'interfaces/level-interface';
import KeyMap from 'modules/key-map';

function useNextLetter(): [IKeyData, (list: IKeyInput[]) => void] {
  const [typingText, setTypingText] = useState<string[] | string[][]>();
  const [nextLetter, setNextLetter] = useState<IKeyData>({} as IKeyData);
  const [keyInputList, setKeyInputList] = useState<IKeyInput[]>([]);
  const store = useContext(EditorContext);
  // let nextIndex

  useEffect(() => {
    if (store.level.text) {
      const disassembleText = Hangul.disassemble(store.level.text);
      setTypingText(disassembleText);
    }
  }, [store.level.text]);

  useEffect(() => {
    if (typingText) {
      const found = KeyMap.getKeyDataByHangulKey(typingText[keyInputList.length] as string);
      if (found) {
        // let found = typingText as string[] | string[][]
        setNextLetter(found);
      }
      // todo: KeyMap.ts에서 한글 자소를 찾은 후 해당하는 key(알파벳)을 전달.
    }
  }, [typingText, keyInputList]);

  const onChangeKeyInputList = (list: IKeyInput[]): void => {
    setKeyInputList(list);
  };

  return [nextLetter, onChangeKeyInputList];
}

export default useNextLetter;
