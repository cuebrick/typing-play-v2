import Hangul from 'korean-js/src/hangul'
import {useEffect, useState} from "react";
import LetterItem from "components/level/LetterItem";
import {IKeyInput} from "interfaces/LevelInterface";
import KeyMap from "modules/KeyMap";

interface IProps {
  text: string | undefined;
  keyInput: IKeyInput | undefined;
  keyInputList: IKeyInput[];
}

function TypingStage({text, keyInput, keyInputList}: IProps): JSX.Element {
  // const [practiceText, setPracticeText] = useState<string>()
  const [inputText, setInputText] = useState<string[]>()
  const [disassembledFlatText, setDisassembledFlatText] = useState<string[] | string[][]>()
  const [disassembledText, setDisassembledText] = useState<string[] | string[][]>()

  useEffect(() => {
    const keyList = keyInputList.filter(input => input.key !== 'Shift').map((input) => (KeyMap.get(input)))
    setInputText(keyList)
    console.log('disassembled>>>', disassembledFlatText, disassembledText)
    console.log('inputText>>>', keyList)
  }, [keyInputList])

  useEffect(() => {
    if (text) {
      // setPracticeText(text)
      let disassembled = Hangul.disassemble(text, true)
      setDisassembledText([...disassembled] as string[])
      setDisassembledFlatText(Hangul.disassemble(text));
    }
  }, [text])

  return (
      <div className="typing-stage">
        <div className="real-text-line">
          {text}
        </div>
        <div className="practice-text-line">
          {disassembledText?.map((alphabet, index) => (
              <LetterItem letter={alphabet} key={index} />
          ))}
        </div>
      </div>
  );
}

export default TypingStage;
