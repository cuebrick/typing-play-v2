import {useRouter} from 'next/router';
import {ReactElement, useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {LevelContext, LevelProvider} from 'store/LevelContext';
import Keyboard from 'components/level/Keyboard';
import TypingStage from 'components/level/TypingStage';
import useKeyboardInput from 'hooks/useKeyboardInput';

function LevelsIdPage(): JSX.Element {
  const router = useRouter();
  const {levelId} = router.query;
  const store = useContext(LevelContext);

  const [keyInputList, keyInput, nextKey] = useKeyboardInput();

  useEffect(() => {
    if (levelId) {
      store.getLevel(levelId as string);
    }
  }, [levelId, store]);

  return (
    <div className="typing-level">
      <TypingStage keyInputList={keyInputList} level={store.level} />
      <Keyboard keyInput={keyInput} nextKey={nextKey} keyCode={81} isShift={false} />
    </div>
  );
}

LevelsIdPage.getProvider = (page: ReactElement): ReactElement => {
  return <LevelProvider>{page}</LevelProvider>;
};

export default observer(LevelsIdPage);
