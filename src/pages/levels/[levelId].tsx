import {useRouter} from 'next/router';
import {ReactElement, useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {LevelContext, LevelProvider} from 'store/LevelContext';
import Keyboard from 'components/level/Keyboard';
import TypingStage from 'components/level/TypingStage';
import useKeyboardInput from 'hooks/useKeyboardInput';
import {ILetter, ILevel, IScoreData} from 'interfaces/LevelInterface';
import ScoreBoard from 'components/level/ScoreBoard';
import {defaultUserTypingData} from 'dto/Level';
import {AuthContext} from 'store/AuthContext';
import {CommonContext} from 'store/CommonContext';

function LevelsIdPage(): JSX.Element {
  const router = useRouter();
  const {levelId} = router.query;
  const store = useContext(LevelContext);
  const authStore = useContext(AuthContext);
  const commonStore = useContext(CommonContext);

  const [keyInputList, keyInput, nextKey, setTypingText, clearAllKeyInputData] = useKeyboardInput();
  const [isReadyToFinish, setIsReadyToFinish] = useState(false);
  // const [isFinished, setIsFinished] = useState(false);
  const [letterList, setLetterList] = useState<ILetter[] | null>(null);
  const [nextLevel, setNextLevel] = useState<ILevel>({} as ILevel);

  const getNextLevelId = () => {
    const currentCategory = store.levelList.filter((item) => {
      return item.categoryId === store.level.categoryId;
    });
    const currentLevelIndex = currentCategory.findIndex((item) => {
      return item.id === store.level.id;
    });
    setNextLevel(currentCategory[currentLevelIndex + 1]);
  };

  const onProgress = (list: ILetter[]) => {
    if (list.length === 0) return;
    console.log('<<<<<', list);
    const lastItem = list[list.length - 1];
    const isEqual = JSON.stringify(lastItem.sampleText) === JSON.stringify(lastItem.typingText);
    // 완료조건
    if (isReadyToFinish && isEqual) {
      // setIsFinished(true);
      setLetterList(list);
      setIsReadyToFinish(false);
      // todo: score db에 저장
    } else if (isEqual) {
      // 완료대기
      setIsReadyToFinish(true);
      getNextLevelId();
    }
  };

  const clearKeyInputData = () => {
    setLetterList([]);
    clearAllKeyInputData();
  };

  useEffect(() => {
    if (store.levelList.length === 0) {
      store.getLevelList();
    }

    if (levelId) {
      store.getLevel(levelId as string).then((level) => {
        // useKeyboardInput 에게 알려줌
        setTypingText(level.text);
      });
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
    console.log('타자 결과 저장 완료');
  };

  return (
    <div className="typing-level">
      <TypingStage keyInputList={keyInputList} level={store.level} onProgress={onProgress} />
      <Keyboard keyInput={keyInput} nextKey={nextKey} />

      {letterList && (
        <ScoreBoard
          letterList={letterList}
          keyInputList={keyInputList}
          nextLevel={nextLevel}
          clearKeyInputData={clearKeyInputData}
          onSaveUserTypingData={onSaveUserTypingData}
        />
      )}
    </div>
  );
}

LevelsIdPage.getProvider = (page: ReactElement): ReactElement => {
  return <LevelProvider>{page}</LevelProvider>;
};

export default observer(LevelsIdPage);
