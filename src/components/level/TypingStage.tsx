import Hangul from 'korean-js/src/hangul'
import {ChangeEvent, useEffect, useState} from "react";
import LetterItem from "components/level/LetterItem";

interface IProps {
  text: string | undefined;
}

function TypingStage({text}: IProps): JSX.Element {
  const [practiceText, setPracticeText] = useState<string>()
  const [inputText, setInputText] = useState<string>()
  const [disassembledText, setDisassembledText] = useState<string[] | string[][]>()

  useEffect(() => {
    if (text) {
      setPracticeText(text)
      let disassembled = Hangul.disassemble(text, true)
      setDisassembledText([...disassembled] as string[])
    }
  }, [text])

  const onChange = (e: ChangeEvent): void => {
    const {value} = e.target as HTMLInputElement;
    console.log('onChange 확인 >>', e, value);
    setInputText(value)
  }

  return (
      <div className="typing-stage">
        <div className="real-text-line">
          {practiceText}
        </div>
        <div className="practice-text-line">
          {disassembledText?.map((alphabet, index) => (
              <LetterItem letter={alphabet} key={index} />
          ))}
        </div>
        <input onChange={onChange} className="input-typing-line" spellCheck="false"></input>
      </div>
  );
}

export default TypingStage;
