import {useRouter} from 'next/router';
import {ReactElement, useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {LevelContext, LevelProvider} from 'store/LevelContext';
import Keyboard from 'components/level/Keyboard';
import TypingStage from 'components/level/TypingStage';
import useKeyboardInput from 'hooks/useKeyboardInput';
import {ILetter} from 'interfaces/LevelInterface';
import ScoreBoard from 'components/level/ScoreBoard';

function LevelsIdPage(): JSX.Element {
  const router = useRouter();
  const {levelId} = router.query;
  const store = useContext(LevelContext);

  const [keyInputList, keyInput, nextKey, setTypingText] = useKeyboardInput();
  const [isReadyToFinish, setIsReadyToFinish] = useState(false);
  // const [isFinished, setIsFinished] = useState(false);
  const [letterList, setLetterList] = useState<ILetter[] | null>(null);

  const onProgress = (list: ILetter[]) => {
    console.log('<<<<<', list);
    const lastItem = list[list.length - 1];
    const isEqual = JSON.stringify(lastItem.sampleText) === JSON.stringify(lastItem.typingText);
    // 완료조건
    if (isReadyToFinish && isEqual) {
      // todo: 완료 후 결과 계산해서 표시
      // setIsFinished(true);
      setLetterList(list);
    } else if (isEqual) {
      // 완료대기
      setIsReadyToFinish(true);
    }
  };

  useEffect(() => {
    if (levelId) {
      store.getLevel(levelId as string).then((level) => {
        // useKeyboardInput 에게 알려줌
        setTypingText(level.text);
      });
    }
  }, [store, levelId, setTypingText]);

  return (
    <div className="typing-level">
      <TypingStage keyInputList={keyInputList} level={store.level} onProgress={onProgress} />
      <Keyboard keyInput={keyInput} nextKey={nextKey} />

      {letterList && <ScoreBoard letterList={letterList} keyInputList={keyInputList} />}
    </div>
  );
}

LevelsIdPage.getProvider = (page: ReactElement): ReactElement => {
  return <LevelProvider>{page}</LevelProvider>;
};

export default observer(LevelsIdPage);
