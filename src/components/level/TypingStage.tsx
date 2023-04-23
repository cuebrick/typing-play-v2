import Hangul from 'korean-js/src/hangul';
import {useEffect, useState} from 'react';
import LetterItem from 'components/level/LetterItem';
import {IKeyInput, ILetter, ILevel} from 'interfaces/LevelInterface';
import KeyMap from 'modules/KeyMap';
import StringUtils from 'modules/StringUtils';

interface IProps {
  level: ILevel | null;
  text: string;
  keyInputList: IKeyInput[];
  hangulMode: boolean;
}

function TypingStage({text, keyInputList, hangulMode}: IProps): JSX.Element {
  // const [practiceText, setPracticeText] = useState<string>()

  const [inputText, setInputText] = useState<string[]>();
  // const [disassembledFlatText, setDisassembledFlatText] = useState<string[] | string[][]>()
  // const [disassembledText, setDisassembledText] = useState<string[] | string[][]>()
  // const [assembledInputText, setAssembledInputText] = useState<string>()
  const [arrangedTextList, setArrangedTextList] = useState<ILetter[]>([]);

  useEffect(() => {
    const keyList = keyInputList
      .filter((input) => input.key !== 'Shift')
      .map((input) => {
        // handle key and check HangulMode
        if (input.key === ' ') {
          return ' ';
        }
        if (input.key === 'Enter') {
          // todo: enter key 처리
          return '↵';
        }
        if (input.key === 'Backspace') {
          // todo: backspace key 처리
          return '←';
        }
        if (input.key === 'HangulMode') {
          // todo: enter key 처리
          return '';
        }
        if (hangulMode) {
          return KeyMap.get(input);
        }
        return input.key;

        // todo: keyInputList 모두를 변환하기 때문에 한영 변환 시 기존 텍스트도 모두 영어로 변경됨.
        // todo: keyInput에만 적용하고 배열에 넣는 방식으로 변경해야 함.
      });
    setInputText([...keyList]);
  }, [keyInputList, hangulMode]);

  useEffect(() => {
    if (text) {
      // let disassembled = Hangul.disassemble(text, true)
      // setDisassembledText([...disassembled] as string[])
      // setDisassembledFlatText(Hangul.disassemble(text));
      const sampleTextList = Hangul.disassemble(text, true).map((letter) => ({sampleText: letter}));
      setArrangedTextList(sampleTextList);
    }
  }, [text]);

  useEffect(() => {
    if (inputText) {
      const assembled = Hangul.assemble(inputText);
      const letterList = [];
      for (let i = 0; i < assembled.length; i++) {
        letterList.push(assembled.substring(i, i + 1));
      }
      const result = letterList.map((letter) => ({typingText: Hangul.disassemble(letter)}));
      setArrangedTextList((p) => p.map((obj, i) => ({...obj, ...result[i]})));
    }
  }, [inputText]);

  return (
    <div className="typing-stage">
      <div className="text-line">
        {arrangedTextList?.map((letter) => (
          <LetterItem sampleText={letter.sampleText} typingText={letter.typingText} key={StringUtils.getUniqueKey()} />
        ))}
      </div>
      <div className="typing-line-highlighter" />
    </div>
  );
}

export default TypingStage;
