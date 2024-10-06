/* eslint-disable no-debugger */
import Hangul from 'korean-js/src/hangul';
import {useCallback, useEffect, useReducer, useRef, useState} from 'react';
import LetterItem from 'components/level/LetterItem';
import {IKeyData, IKeyInput, ILetter, ILevel} from 'interfaces/level-interface';
import KeyMap, {arrangeKey} from 'modules/key-map';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  width: 600px;
  min-height: 130px;
  font-size: 32px;
`;

const TextLine = styled.div`
  width: 540px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 3px;
  row-gap: 20px;
`;

interface IProps {
  level: ILevel | null;
  keyInput: IKeyInput | null;
  onProgress(letterObjectList: ILetter[]): void;
  isFinished: boolean;
  setNextKey(key: IKeyData): void;
}

type InputRightAltKey = {
  type: 'INPUT_RIGHT_ALT_KEY';
  isHangulMode: boolean;
};
type InputText = {
  type: 'INPUT_TEXT';
  text: string;
  inputType: 'letter' | 'word';
};
type InputBackspace = {
  type: 'INPUT_BACKSPACE';
  inputType: 'letter' | 'word';
};

type TypingType = InputRightAltKey | InputText | InputBackspace;

let isRemoved = false;
let isWordRemoved = false;
let isHangulMode = false;

function typingReducer(state: (string | string[])[], action: TypingType): (string | string[])[] {
  switch (action.type) {
    case 'INPUT_RIGHT_ALT_KEY': {
      isHangulMode = action.isHangulMode;
      return state;
    }
    case 'INPUT_TEXT': {
      // 자소 입력 모드
      if (action.inputType === 'letter') return [...state, action.text];

      // 단어 입력 모드 - 지우기 한 직후  // '가나'에서 두 번 지워 '가'를 만든 뒤 'ㄴ' 입력 시 '간'으로 나옴
      if (isRemoved) {
        const list = [...state];
        const lastItem: string[] = list[list.length - 1] as string[];
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

function TypingStage({level, keyInput, onProgress, isFinished, setNextKey}: IProps): JSX.Element {
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
      isHangulMode = level?.language === 'ko'; // 레벨의 언어에 맞게 최초 언어 설정
    }
  }, [level]);

  useEffect(() => {
    if (!level?.language) return;
    if (isFinished) return;

    if (keyInput) {
      const text = arrangeKey(keyInput, isHangulMode);
      if (text === 'HANGUL_MODE') {
        dispatchTypingList({type: 'INPUT_RIGHT_ALT_KEY', isHangulMode: !isHangulMode});
        return;
      }
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
    let nextTextData: string = '';
    if (level?.inputType === 'letter') {
      setLetterIndex(typingList.length);
      nextTextData = Hangul.disassemble(level?.text)[typingList.length] as string;
    } else if (level?.inputType === 'word') {
      const flatTypingList = typingList.length === 0 ? [] : typingList.reduce((acc, curr) => acc.concat(curr, []));
      nextTextData = Hangul.disassemble(level?.text)[Hangul.disassemble(flatTypingList as string).length] as string;

      const lastItem = typingList[typingList.length - 1]; // 마지막 글자
      const lastJaso = lastItem ? lastItem[lastItem.length - 1] : undefined;

      const calcLetterIndex = () => {
        // 글자를 지워 자소가 없는 경우엔 바로 리턴
        if (!lastJaso) return typingList.length - 1;

        // 한글일 땐 글자의 조합 가능 여부 판단, 영어는 바로 false
        const isCombinable = isHangulMode ? KeyMap.getKeyDataByHangulKey(lastJaso).combinable : false;
        return isCombinable ? typingList.length - 1 : typingList.length;
      };
      setLetterIndex(typingList.length > 0 ? calcLetterIndex : 0);
    }
    const next = checkKoreanText(nextTextData)
      ? KeyMap.getKeyDataByHangulKey(nextTextData)
      : KeyMap.getKeyDataByEnglishKey(nextTextData);
    setNextKey(next || ({} as IKeyData)); // 다음 글자가 없을 때는 빈 객체를 전달
  }, [level?.inputType, typingList]);

  useEffect(() => {
    indexRefs.current = letterIndex;
  }, [letterIndex]);

  const getTypingText = (index: number): string[] => {
    const list = typingList?.[index] ? [typingList?.[index]] : [];
    return (level?.inputType === 'word' ? typingList?.[index] : list) as string[];
  };

  const checkKoreanText = (text: string): boolean => {
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
    return korean.test(text);
  };

  return (
    <Container>
      <TextLine>
        {letterList?.map((letter, index) => (
          <LetterItem
            data={{
              ...letter,
              typingText: getTypingText(index)
            }}
            active={index === letterIndex}
            modified={modifyIndexList.includes(index)}
            itemIndex={index}
            currentIndex={letterIndex}
            key={letter.id}
          />
        ))}
      </TextLine>
    </Container>
  );
}

export default TypingStage;
