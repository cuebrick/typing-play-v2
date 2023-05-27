import {useRouter} from 'next/router';
import {ReactElement, useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {LevelContext, LevelProvider} from 'store/LevelContext';
import Keyboard from 'components/level/Keyboard';
import TypingStage from 'components/level/TypingStage';
import useKeyboardInput from 'hooks/useKeyboardInput';

function LevelsIdPage(): JSX.Element {
  const router = useRouter();
  const {levelId} = router.query;
  const store = useContext(LevelContext);

  const [keyInputList, keyInput, nextKey, setTypingText] = useKeyboardInput();

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
      <TypingStage keyInputList={keyInputList} level={store.level} />
      <Keyboard keyInput={keyInput} nextKey={nextKey} />
    </div>
  );
}

LevelsIdPage.getProvider = (page: ReactElement): ReactElement => {
  return <LevelProvider>{page}</LevelProvider>;
};

export default observer(LevelsIdPage);
