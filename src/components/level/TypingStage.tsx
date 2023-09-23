/* eslint-disable no-debugger */
import Hangul from 'korean-js/src/hangul';
import {useEffect, useMemo, useRef, useState} from 'react';
// import {useEffect, useMemo, useRef, useState} from 'react';
import LetterItem from 'components/level/LetterItem';
import {IBuffer, IKeyInput, ILetter, ILevel} from 'interfaces/LevelInterface';
import {arrangeKey} from 'modules/KeyMap';

interface IProps {
  level: ILevel | null;
  keyInput: IKeyInput | null;
  onProgress(letterObjectList: ILetter[]): void;
  isFinished: boolean;
}

function TypingStage({level, keyInput, onProgress, isFinished}: IProps): JSX.Element {
  const defaultBuffer: IBuffer = useMemo(() => {
    return {typingText: [], isModify: false};
  }, []);
  const [letterList, setLetterList] = useState<ILetter[]>([]);
  const [letterIndex, setLetterIndex] = useState(0);
  const [, setBuffer] = useState<IBuffer>(defaultBuffer as IBuffer);
  const indexRefs = useRef<number>(letterIndex);

  // entry point
  useEffect(() => {
    if (level?.text) {
      const disassembled = Hangul.disassemble(level.text, true);
      const list = disassembled.map((sampleText, index) => {
        return {
          id: `letter${index}`,
          sampleText, // : Hangul.assemble(sampleText as string[])
          typingText: [] as string[]
        } as ILetter;
      }) as ILetter[];
      setLetterList(list);
      setBuffer(defaultBuffer);
    }
  }, [defaultBuffer, level]);

  const updateLetterList = (data: IBuffer, text: string[], secondText?: string[], isModify?: boolean) => {
    setLetterList((prevLetterList) => {
      const list = [...prevLetterList];
      const item = {...list[indexRefs.current]};
      // 타자 수정 시 true로 설정
      if (isModify) {
        item.isModify = isModify;
      }
      // 입력한 글자를 list에 끼워 넣음.
      item.typingText = text;
      list[indexRefs.current] = item;
      if (secondText) {
        // assemble하여 두 글자가 나온 상황.
        // 동일한 방법으로 다음 인덱스에 글자를 끼워 넣음.
        const secondItem = {...list[indexRefs.current + 1]};
        secondItem.typingText = secondText;
        list[indexRefs.current + 1] = secondItem;
      }
      return list;
    });
  };

  const removeLastLetterItem = () => {
    setLetterList((prevLetterList) => {
      const list = [...prevLetterList];
      const item = {...list[indexRefs.current - 1]};
      item.isModify = true;
      item.typingText = [];
      list[indexRefs.current - 1] = item;
      return list;
    });
  };

  useEffect(() => {
    if (!level?.language) return;
    if (isFinished) return;
    const isHangulMode = level?.language === 'ko';

    if (keyInput) {
      setBuffer((prev) => {
        const data = {...prev};
        const text = arrangeKey(keyInput, isHangulMode);
        if (text === 'BACKSPACE_KEY') {
          if (prev.typingText.length === 0) {
            // remove last word
            removeLastLetterItem();
            setLetterIndex((prevIndex) => {
              return prevIndex > 0 ? prevIndex - 1 : prevIndex;
            });
          } else {
            // remove last letter
            prev.typingText.pop();
            updateLetterList(data, prev.typingText, undefined, true);
          }
        } else if (text) {
          data.typingText.push(text);
          // 마지막 글자 입력 시 넘치지 않게 마지막 자소 제거
          /* if (
            letterList.length === letterIndex + 1 &&
            Hangul.disassemble(Hangul.assemble(data.typingText), true).length > 1
          ) {
            data.typingText.pop();
          } */
          // data.typingText.push('ㅅ');
          const typingText = Hangul.disassemble(Hangul.assemble(data.typingText)[0]) as string[];
          if (Hangul.disassemble(Hangul.assemble(data.typingText), true).length > 1) {
            // assemble하여 두 글자가 나오는 경우. 뒷 글자도 같이 넣어주지 않으면 앞 글자만 보임.
            // ex) '폳' + 'ㅗ' =/= '포도', = '포ᅟ'
            const secondTypingText = Hangul.disassemble(Hangul.assemble(data.typingText)[1]) as string[];
            updateLetterList(data, typingText, secondTypingText);
          } else {
            // assemble하여 한 글자인 경우. 즉, 일반적인 상황.
            updateLetterList(data, typingText);
          }
        }

        if (Hangul.assemble(data.typingText).length > 1) {
          setLetterIndex((prevIndex) => {
            return prevIndex + 1;
          });
          return {...defaultBuffer, typingText: Hangul.disassemble(Hangul.assemble(data.typingText)[1]) as string[]};
        }
        return data;
      });
    }
  }, [keyInput, level?.language, indexRefs, isFinished]);

  useEffect(() => {
    onProgress(letterList);
  }, [letterList, onProgress]);

  useEffect(() => {
    indexRefs.current = letterIndex;
  }, [letterIndex]);

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
