/* eslint-disable no-debugger */
import Hangul from 'korean-js/src/hangul';
import {useCallback, useEffect, useReducer, useRef, useState} from 'react';
import LetterItem from 'components/level/LetterItem';
import {IKeyInput, ILetter, ILevel} from 'interfaces/LevelInterface';
import KeyMap, {arrangeKey} from 'modules/KeyMap';

interface IProps {
  level: ILevel | null;
  keyInput: IKeyInput | null;
  onProgress(letterObjectList: ILetter[]): void;
  isFinished: boolean;
}

type InputText = {
  type: 'INPUT_TEXT';
  text: string;
  inputType: 'letter' | 'word';
};
type InputBackspace = {
  type: 'INPUT_BACKSPACE';
  inputType: 'letter' | 'word';
};

type TypingType = InputText | InputBackspace;

let isRemoved = false;
let isWordRemoved = false;

function typingReducer(state: (string | string[])[], action: TypingType): (string | string[])[] {
  switch (action.type) {
    case 'INPUT_TEXT': {
      // 자소 입력 모드
      if (action.inputType === 'letter') return [...state, action.text];

      // 단어 입력 모드 - 지우기 한 직후  // '가나'에서 두 번 지워 '가'를 만든 뒤 'ㄴ' 입력 시 '간'으로 나옴
      if (isRemoved) {
        const list = [...state];
        const lastItem: string[] = list[list.length - 1];
        lastItem.push(action.text);
        isRemoved = false;
        isWordRemoved = false;
        return list;
      }

      // 단어 입력 모드 - 통상
      return Hangul.disassemble(Hangul.assemble([...state.flat(), action.text]), true);
    }
    case 'INPUT_BACKSPACE': {
      if (state.length > 0 && state[0].length > 0) {
        // 자소 입력 모드
        if (action.inputType === 'letter') return state.slice(0, -1);

        if (!isRemoved) isRemoved = true;
        // 단어 입력 모드 - 자소 지우기
        if (state[state.length - 1].length > 0) {
          // 마지막 글자를 구성하는 배열에서 한 글자 씩 제거
          const list = [...state];
          (list[list.length - 1] as string[]).pop();
          return list;
        }

        // 단어 입력 모드 - 단어 지우기
        if (state[state.length - 1].length === 0) {
          if (!isWordRemoved) isWordRemoved = true;

          // 글자를 구성하는 배열 중 마지막 배열 제거(index 변경) 및 마지막 배열 초기화(글자 제거)
          const list = [...state];
          (list as string[][]).pop();
          (list[list.length - 1] as string[]).splice(0);
          return list;
        }
      }
      return state;
    }
    default:
      return state;
  }
}

function TypingStage({level, keyInput, onProgress, isFinished}: IProps): JSX.Element {
  const [letterList, setLetterList] = useState<{id: string; sampleText: string[]}[]>([]);
  const defaultTypingList: (string | string[])[] = [];
  const [typingList, dispatchTypingList] = useReducer(typingReducer, defaultTypingList);
  const [modifyIndexList, setModifyIndexList] = useState<number[]>([]);
  const [letterIndex, setLetterIndex] = useState(0);
  const indexRefs = useRef<number>(0);

  const onRemoveText = useCallback(() => {
    // 자소 입력 모드에선 지울 때 현재 index가 아니라 이전 index를 지워야 함.
    let currentIndex: number;
    if (level?.inputType === 'letter') {
      currentIndex = letterIndex - 1;
    } else if (isWordRemoved) {
      currentIndex = letterIndex - 1; // 단어를 지웠을 땐 -1을 해줘야 함.
    } else {
      currentIndex = letterIndex;
    }

    if (!modifyIndexList.includes(currentIndex)) {
      setModifyIndexList((prev) => {
        return [...prev, currentIndex].sort();
      });
    }
  }, [letterIndex, level?.inputType, modifyIndexList]);

  // entry point
  useEffect(() => {
    if (level?.text) {
      const disassembled = Hangul.disassemble(level.text, true);
      const list = disassembled.map((sampleText, index) => {
        return {
          id: `letter${index}`,
          sampleText // : Hangul.assemble(sampleText as string[])
        } as ILetter;
      });
      setLetterList(list);
    }
  }, [level]);

  useEffect(() => {
    if (!level?.language) return;
    if (isFinished) return;

    const isHangulMode = level?.language === 'ko';

    if (keyInput) {
      const text = arrangeKey(keyInput, isHangulMode);
      if (text === 'BACKSPACE_KEY') {
        dispatchTypingList({type: 'INPUT_BACKSPACE', inputType: level.inputType});
        // onRemoveText();
        setTimeout(onRemoveText, 0); // dispatch 비동기로 인해 함수의 else if 미작동
        return;
      }

      if (text) {
        dispatchTypingList({type: 'INPUT_TEXT', text, inputType: level.inputType});
      }
    }
  }, [isFinished, keyInput, level?.inputType, level?.language]);

  useEffect(() => {
    const list = letterList.map((item, index) => {
      return {...item, typingText: typingList[index]};
    });
    onProgress(list);
  }, [letterList, onProgress, typingList]);

  useEffect(() => {
    if (level?.inputType === 'letter') {
      setLetterIndex(typingList.length);
    } else if (level?.inputType === 'word') {
      const lastItem = typingList[typingList.length - 1]; // 마지막 글자
      const lastJaso = lastItem ? lastItem[lastItem.length - 1] : undefined;

      const calcLetterIndex = () => {
        // 글자를 지워 자소가 없는 경우엔 바로 리턴
        if (!lastJaso) return typingList.length - 1;

        const isCombinable = KeyMap.getKeyDataByHangulKey(lastJaso).combinable;
        return isCombinable ? typingList.length - 1 : typingList.length;
      };
      setLetterIndex(typingList.length > 0 ? calcLetterIndex : 0);
    }
  }, [level?.inputType, typingList]);

  useEffect(() => {
    indexRefs.current = letterIndex;
  }, [letterIndex]);

  const getTypingText = (index: number): string[] => {
    const list = typingList?.[index] ? [typingList?.[index]] : [];
    return (level?.inputType === 'word' ? typingList?.[index] : list) as string[];
  };

  return (
    <div className="typing-stage">
      <div className="text-line">
        {letterList?.map((letter, index) => (
          <LetterItem
            data={{
              ...letter,
              typingText: getTypingText(index)
            }}
            active={index === letterIndex}
            isModify={modifyIndexList.includes(index)}
            itemIndex={index}
            currentIndex={letterIndex}
            key={letter.id}
          />
        ))}
      </div>
    </div>
  );
}

export default TypingStage;
