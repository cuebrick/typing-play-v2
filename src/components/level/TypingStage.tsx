import Hangul from 'korean-js/src/hangul';
import {useEffect, useState} from 'react';
import LetterItem from 'components/level/LetterItem';
import {IKeyInput, ILetter, ILevel} from 'interfaces/LevelInterface';
import KeyMap from 'modules/KeyMap';

interface IProps {
  level: ILevel | null;
  keyInputList: IKeyInput[];
}

function TypingStage({level, keyInputList}: IProps): JSX.Element {
  const [inputTextList, setInputTextList] = useState<string[]>();
  const [letterObjectList, setLetterObjectList] = useState<ILetter[]>([]);
  const [letterList, setLetterList] = useState<ILetter[]>([]);

  useEffect(() => {
    if (level?.text) {
      const disassembled = Hangul.disassemble(level.text, true);
      const list = disassembled.map((sampleText, index) => {
        return {
          id: `letter${index}`,
          sampleText // : Hangul.assemble(sampleText as string[])
        } as ILetter;
      });
      setLetterObjectList(list);

      // setIsHangulMode(level.language === 'ko');
      console.log('>>>>>>>>', level.text, list);
    }
  }, [level]);

  useEffect(() => {
    // 한글모드 지정은 여기
    let isHangulMode = level?.language === 'ko';

    const keyList = keyInputList.reduce((prev: string[], curr) => {
      switch (curr.key) {
        case 'Shift':
          return prev; // shift 키 입력은 글자를 입력하지 않음.
        case 'Enter':
          prev.push('↵');
          break;
        case 'Backspace':
          prev.pop(); // Backspace 키 입력은 마지막에 입력한 글자를 빼줌
          break;
        case 'HangulMode': // 한글모드를 변경
          isHangulMode = !isHangulMode;
          break;
        default: {
          const keyData = KeyMap.getKeyDataByEnglishKey(curr.key);
          prev.push(isHangulMode ? keyData.han : keyData.key);
        }
      }
      return prev;
    }, []);

    setInputTextList(keyList);
  }, [keyInputList]);

  useEffect(() => {
    if (inputTextList) {
      const assembled = Hangul.disassemble(Hangul.assemble(inputTextList), true);
      const list = letterObjectList.map((letter, index) => {
        letter.typingText = assembled[index] as string[];
        return letter;
      });

      setLetterList(list);
    }
  }, [letterObjectList, inputTextList]);

  return (
    <div className="typing-stage">
      <div className="text-line">
        {letterList?.map((letter) => (
          <LetterItem data={letter} key={letter.id} />
        ))}
      </div>
      <div className="typing-line-highlighter" />
    </div>
  );
}

export default TypingStage;
