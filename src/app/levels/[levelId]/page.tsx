'use client';

import {useCallback, useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import Keyboard from 'components/level/Keyboard';
import TypingStage from 'components/level/TypingStage';
import useKeyboardInput from 'hooks/useKeyboardInput';
import {IKeyData, ILetter, ILevel, ILevelList, IScoreData} from 'interfaces/level-interface';
import ScoreBoard from 'components/level/ScoreBoard';
import {defaultUserTypingData} from 'default-objects/Level';
import {AuthContext} from 'store/AuthContext';
import {CommonContext} from 'store/CommonContext';
import {LevelContext} from 'store/LevelContext';
import styled from 'styled-components';

const TypingLevel = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

function LevelsIdPage({params}: {params: {levelId: string}}): JSX.Element {
  const {levelId} = params;
  const store = useContext(LevelContext);
  const authStore = useContext(AuthContext);
  const commonStore = useContext(CommonContext);

  const [keyInputList, keyInput, setTypingText, clearAllKeyInputData] = useKeyboardInput();
  const [letterList, setLetterList] = useState<ILetter[] | null>(null);
  // `while rendering a different component` error 해결 위해 여기에 isFinished 작성
  const [isFinished, setIsFinished] = useState(false);
  const [showChildComponent, setShowChildComponent] = useState(true);
  const [level, setLevel] = useState<ILevel | null>(null);
  const [nextKey, setNextKey] = useState<IKeyData>({} as IKeyData);

  const onProgress = useCallback(
    (list: ILetter[]) => {
      if (list.length === 0) return;
      const lastItem = list[list.length - 1];
      const lastTypingText = level?.inputType === 'word' ? lastItem.typingText : [lastItem.typingText];

      const isEqual = JSON.stringify(lastItem.sampleText) === JSON.stringify(lastTypingText);

      // 완료조건 1. 마지막 글자가 동일. 2. 타이핑이 샘플의 길이를 넘어감.
      if (isEqual && !isFinished) {
        setLetterList(list);
      }
    },
    [isFinished, level?.inputType]
  );

  const clearKeyInputData = () => {
    setLetterList(null);
    clearAllKeyInputData();
    setShowChildComponent(false);
    setIsFinished(false);
    setTimeout(() => setShowChildComponent(true), 0);
  };

  useEffect(() => {
    if (!localStorage.getItem('levelList')) {
      store.getLevelList();
    }

    if (levelId) {
      const levelList: ILevelList[] = JSON.parse(localStorage.getItem('levelList')!);

      const levelData: ILevel | null = levelList.reduce(
        (foundLevel: ILevel | null, item: ILevelList): ILevel | null => {
          if (foundLevel !== null) {
            return foundLevel;
          }
          const found = item.levels.find((levelItem: ILevel) => levelItem.id === levelId);
          return found || null;
        },
        null as ILevel | null
      );

      if (levelData) {
        setTypingText(levelData.text);
        setLevel(levelData);
      }
    }
  }, [store, levelId, setTypingText]);

  const onSaveUserTypingData = (scoreData: IScoreData) => {
    const data = {
      ...defaultUserTypingData,
      ...scoreData,
      userId: authStore.userData?.uid,
      levelId: levelId as string,
      keyInputList
    };
    store.saveUserTypingData(data);
    commonStore.addModeless('타자 결과가 서버에 저장되었습니다.');
  };

  return (
    <TypingLevel>
      {showChildComponent && (
        <>
          <TypingStage
            keyInput={keyInput}
            level={level}
            onProgress={onProgress}
            isFinished={isFinished}
            setNextKey={setNextKey}
          />
          <Keyboard keyInput={keyInput} nextKey={nextKey} />
          <ScoreBoard
            levelData={level}
            letterList={letterList}
            keyInputList={keyInputList}
            clearKeyInputData={clearKeyInputData}
            onSaveUserTypingData={onSaveUserTypingData}
            isFinished={isFinished}
            setIsFinished={setIsFinished}
          />
        </>
      )}
    </TypingLevel>
  );
}

export default observer(LevelsIdPage);
