import Hangul from 'korean-js/src/hangul';
import {useEffect, useRef, useState} from 'react';
import LetterItem from 'components/level/LetterItem';
import {IBuffer, IKeyInput, ILetter, ILevel} from 'interfaces/LevelInterface';
import {arrangeKey} from 'modules/KeyMap';
import {defaultBuffer} from 'dto/Level';

interface IProps {
  level: ILevel | null;
  keyInput: IKeyInput | null;
  onProgress(letterObjectList: ILetter[]): void;
  isFinished: boolean;
}

function TypingStage({level, keyInput, onProgress, isFinished}: IProps): JSX.Element {
  const [letterList, setLetterList] = useState<ILetter[]>([]);
  const [letterIndex, setLetterIndex] = useState(0);
  const [buffer, setBuffer] = useState<IBuffer>(defaultBuffer as IBuffer);
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
    }
  }, [level]);

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

  /* useEffect(() => {
    if (keyInputList.length === 0 || !level?.language) return;

    // 한글모드 지정은 여기
    const isHangulMode = level?.language === 'ko';

    // ILetter[]로 바꾸기
    // setBuffer({typingText: [arrangeKey(keyInput, isHangulMode)]});

    // const getText = (keyInputData): string | undefined => {
    //   const text = arrangeKey(keyInputData, isHangulMode);
    //   if (text === 'SHIFT_KEY' || text === 'HANGUL_MODE') {
    //     return;
    //   } else if (text === 'BACKSPACE_KEY') {
    //     return;
    //   } else {
    //     return text;
    //   }
    // };
    setBuffer((prev) => {
      const data = {...prev};
      const text = arrangeKey(keyInput, isHangulMode);
      if (text === 'BACKSPACE_KEY') {
        if (prev.typingText.length === 0 && letterList.length !== 0) {
          const currentLetterList = letterList;
          currentLetterList.pop();
          setLetterList(currentLetterList);
          decreaseLetterIndex(letterList.length);
          // changeLetterIndex(letterIndex - 1);
          // todo: buffer.length === 0 일때 backspace 누르면 letterList.pop 실행 및 index 감소
        } else {
          prev.typingText.pop();
        }
      } else if (text) {
        data.typingText.push(text);
        console.log('이게 몇번 도는거야');
      }
      console.log('prev >>', prev.typingText);
      console.log('letterList >>', letterList);

      if (Hangul.assemble(data.typingText).length > 1) {
        // increaseLetterIndex();
        // console.log('내역 확인');
        // changeLetterIndex(letterIndex + 1);
        console.log('check >>', Hangul.disassemble(Hangul.assemble(data.typingText)[1]));
        return {...defaultBuffer, typingText: Hangul.disassemble(Hangul.assemble(data.typingText)[1]) as string[]};
      }
      // data.typingText.push(arrangeKey(keyInput, isHangulMode));
      // todo: assembledKey(buffer).length > 1 일 때 buffer 초기화 및 index 증가
      // todo: setLetterList(...letterList, data)
      return data;
    });

    const keyList = arrangeKeyList(keyInputList, isHangulMode);
    const assembled = level.inputType === 'letter' ? keyList : Hangul.disassemble(Hangul.assemble(keyList), true);
    const test =
      assembled.length === 0 || JSON.stringify(assembled[assembled.length - 1]) === JSON.stringify([' '])
        ? assembled.length
        : assembled.length - 1;
    changeLetterIndex(test);
    // setLetterList((prev) => {
    //   const list = prev.map((letter, index) => {
    //     // 이 부분에서 assembled 될 글자가 없으면 undefined로 들어감.
    //     letter.typingText = assembled[index] as string[];
    //     return letter;
    //   });
    //   onProgress(list);
    //   return list;
    // });
    // }, [keyInputList, level?.language, level?.inputType, onProgress]);
  }, [keyInputList, keyInput, level, onProgress, letterList, letterIndex]); */

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
