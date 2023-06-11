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
    let list: ILetter[] = [];
    setLetterList((prev) => {
      list = prev.map((letter, index) => {
        letter.typingText = assembled[index] as string[];
        return letter;
      });
      console.log('setLetterList working');
      return list;
    });
    onProgress(list);
    // }, [keyInputList, level?.language, level?.inputType, onProgress]);
  }, [keyInputList, level, onProgress]);

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
