import Hangul from 'korean-js/src/hangul';
import {useEffect, useState} from 'react';
import LetterItem from 'components/level/LetterItem';
import {IKeyInput, ILetter, ILevel} from 'interfaces/LevelInterface';
import KeyMap from 'modules/KeyMap';

interface IProps {
  level: ILevel | null;
  keyInputList: IKeyInput[];
  onProgress(letterObjectList: ILetter[]): void;
  isLetter: boolean;
}

function TypingStage({level, keyInputList, onProgress, isLetter}: IProps): JSX.Element {
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
      }) as ILetter[];
      setLetterObjectList(list);

      // setIsHangulMode(level.language === 'ko');
      console.log('>>>>>>>>', level.text, list);
    }
  }, [level]);

  useEffect(() => {
    if (keyInputList.length === 0 || !level?.language) return;

    // 한글모드 지정은 여기
    let isHangulMode = level?.language === 'ko';

    const keyList = keyInputList.reduce((acc: string[], curr) => {
      switch (curr.key) {
        case 'Shift':
          // do nothing... // shift 키 입력은 글자를 입력하지 않음.
          break;
        case 'Enter': {
          acc.push('↵');
          break;
        }
        case 'Backspace': {
          acc.pop(); // Backspace 키 입력은 마지막에 입력한 글자를 빼줌
          break;
        }
        case 'HangulMode': {
          // 한글모드를 변경
          isHangulMode = !isHangulMode;
          break;
        }
        default: {
          const keyData = KeyMap.getKeyDataByEnglishKey(curr.key);
          acc.push(isHangulMode ? keyData.han : keyData.key);
        }
      }
      return acc;
    }, []);

    setInputTextList(keyList);
  }, [keyInputList, level?.language]);
  useEffect(() => {
    if (inputTextList) {
      const assembled = isLetter ? inputTextList : Hangul.disassemble(Hangul.assemble(inputTextList), true);
      console.log('letterObjectList >>', letterObjectList);
      const list = letterObjectList.map((letter, index) => {
        letter.typingText = assembled[index] as string[];
        return letter;
      });
      setLetterList(list);
      onProgress(list);
      // if (lastItem.typingText?.length > lastItem.sampleText.length) {
      // }
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
