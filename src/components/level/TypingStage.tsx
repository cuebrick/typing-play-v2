import Hangul from 'korean-js/src/hangul'
import {useEffect, useState} from "react";
import LetterItem from "components/level/LetterItem";
import {IKeyInput, ILetter} from "interfaces/LevelInterface";
import KeyMap from "modules/KeyMap";

interface IProps {
  text: string | undefined;
  keyInput: IKeyInput | undefined;
  keyInputList: IKeyInput[];
}

function TypingStage({text, keyInput, keyInputList}: IProps): JSX.Element {
  // const [practiceText, setPracticeText] = useState<string>()
  const [inputText, setInputText] = useState<string[]>()
  // const [disassembledFlatText, setDisassembledFlatText] = useState<string[] | string[][]>()
  // const [disassembledText, setDisassembledText] = useState<string[] | string[][]>()
  // const [assembledInputText, setAssembledInputText] = useState<string>()
  const [arrangedTextList, setArrangedTextList] = useState<ILetter[]>([])

  useEffect(() => {
    const keyList = keyInputList.filter(input => input.key !== 'Shift').map((input) => {
      if (input.key === ' ') {
        return ' '
      } else if (input.key === 'Enter') {
        // todo: enter key 처리
        return ' '
        // } else if (anotherKey) {
        // todo: 숫자/특문, tab, ctrl, fn 등 키 처리
      } else {
        return KeyMap.get(input)
      }
    })
    setInputText([...keyList])
  }, [keyInputList])

  useEffect(() => {
    if (text) {
      // let disassembled = Hangul.disassemble(text, true)
      // setDisassembledText([...disassembled] as string[])
      // setDisassembledFlatText(Hangul.disassemble(text));
      let sampleTextList = Hangul.disassemble(text, true).map((letter) => (
          {sampleText: letter}
      ))
      setArrangedTextList(sampleTextList)
    }
  }, [text])

  useEffect(() => {
    if (inputText) {
      let assembled = Hangul.assemble(inputText)
      let letterList = []
      for (let i = 0; i < assembled.length; i++) {
        letterList.push(assembled.substring(i, i + 1))
      }
      let result = letterList.map((letter) => ((
          {typingText: Hangul.disassemble(letter)}
      )))
      setArrangedTextList(p => (
          p.map((obj, i) => ({...obj, ...result[i]}))
      ))
    }
  }, [inputText])

  return (
      <div className="typing-stage">
        <div className="text-line">
          {arrangedTextList?.map((letter, index) => (
              <LetterItem sampleText={letter.sampleText} typingText={letter.typingText} key={index}/>
          ))}
        </div>
        <div className="typing-line-highlighter"></div>
      </div>
  );
}

export default TypingStage;
