import Hangul from 'korean-js/src/hangul';
import {useEffect, useState} from 'react';
import LetterItem from 'components/level/LetterItem';
import {IKeyInput, ILetter, ILevel} from 'interfaces/LevelInterface';
import {arrangeKeyList} from 'modules/KeyMap';

interface IProps {
  level: ILevel | null;
  keyInputList: IKeyInput[];
  onProgress(letterObjectList: ILetter[]): void;
}

function TypingStage({level, keyInputList, onProgress}: IProps): JSX.Element {
  const [letterList, setLetterList] = useState<ILetter[]>([]);
  const [letterIndex, setLetterIndex] = useState(0);

  // entry point
  useEffect(() => {
    if (level?.text) {
      const disassembled = Hangul.disassemble(level.text, true);
      const list = disassembled.map((sampleText, index) => {
        return {
          id: `letter${index}`,
          sampleText // : Hangul.assemble(sampleText as string[])
        } as ILetter;
      }) as ILetter[];
      setLetterList(list);
    }
  }, [level]);

  useEffect(() => {
    if (keyInputList.length === 0 || !level?.language) return;

    // 한글모드 지정은 여기
    const isHangulMode = level?.language === 'ko';

    const keyList = arrangeKeyList(keyInputList, isHangulMode);
    const assembled = level.inputType === 'letter' ? keyList : Hangul.disassemble(Hangul.assemble(keyList), true);
    setLetterIndex(() => {
      return assembled.length === 0 ? 0 : assembled.length - 1;
    });
    let list: ILetter[] = [];
    setLetterList((prev) => {
      list = prev.map((letter, index) => {
        // 이 부분에서 assembled 될 글자가 없으면 undefined로 들어감.
        letter.typingText = assembled[index] as string[];
        return letter;
      });
      return list;
    });
    // setState 함수가 여러개면 뒤 함수가 늦게 작동
    setLetterIndex(() => {
      // 띄어쓰기는 assembled.length로 바꿔야 입력 위치와 일치함.
      return assembled.length === 0 || JSON.stringify(assembled[assembled.length - 1]) === JSON.stringify([' '])
        ? assembled.length
        : assembled.length - 1;
    });
    onProgress(list);
    // }, [keyInputList, level?.language, level?.inputType, onProgress]);
  }, [keyInputList, level, onProgress]);

  return (
    <div className="typing-stage">
      <div className="text-line">
        {letterList?.map((letter, index) => (
          <LetterItem data={letter} key={letter.id} active={index === letterIndex} />
        ))}
      </div>
    </div>
  );
}

export default TypingStage;
