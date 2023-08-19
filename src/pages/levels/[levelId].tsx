import {useRouter} from 'next/router';
import {ReactElement, useCallback, useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {EditorContext, EditorProvider} from 'store/EditorContext';
import Keyboard from 'components/level/Keyboard';
import TypingStage from 'components/level/TypingStage';
import useKeyboardInput from 'hooks/useKeyboardInput';
import {ILetter, IScoreData} from 'interfaces/LevelInterface';
import ScoreBoard from 'components/level/ScoreBoard';
import {defaultUserTypingData} from 'dto/Level';
import {AuthContext} from 'store/AuthContext';
import {CommonContext} from 'store/CommonContext';

function LevelsIdPage(): JSX.Element {
  const router = useRouter();
  const {levelId} = router.query;
  const store = useContext(EditorContext);
  const authStore = useContext(AuthContext);
  const commonStore = useContext(CommonContext);

  const [keyInputList, keyInput, nextKey, setTypingText, clearAllKeyInputData] = useKeyboardInput();
  const [letterList, setLetterList] = useState<ILetter[] | null>(null);
  // `while rendering a different component` error 해결 위해 여기에 isFinished 작성
  const [isFinished, setIsFinished] = useState(false);

  const onProgress = useCallback(
    (list: ILetter[]) => {
      if (list.length === 0) return;
      const lastItem = list[list.length - 1];
      const isEqual = JSON.stringify(lastItem.sampleText) === JSON.stringify(lastItem.typingText);

      // 완료조건
      if (isEqual && !isFinished) {
        setLetterList(list);
      }
    },
    [isFinished]
  );

  const clearKeyInputData = () => {
    setLetterList([]);
    clearAllKeyInputData();
  };

  useEffect(() => {
    if (store.levelList.length === 0) {
      store.getLevelList();
    }

    if (levelId) {
      // store.getLevel(levelId as string).then((level) => {
      //   // useKeyboardInput 에게 알려줌
      //   setTypingText(level.text);
      // });
      const level = store.getLevel(levelId as string);
      setTypingText(level.text);
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
    <div className="typing-level">
      <TypingStage keyInput={keyInput} level={store.level} onProgress={onProgress} isFinished={isFinished} />
      <Keyboard keyInput={keyInput} nextKey={nextKey} isFinished={isFinished} />

      <ScoreBoard
        letterList={letterList}
        keyInputList={keyInputList}
        clearKeyInputData={clearKeyInputData}
        onSaveUserTypingData={onSaveUserTypingData}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
      />
    </div>
  );
}

LevelsIdPage.getProvider = (page: ReactElement): ReactElement => {
  return <EditorProvider>{page}</EditorProvider>;
};

export default observer(LevelsIdPage);
