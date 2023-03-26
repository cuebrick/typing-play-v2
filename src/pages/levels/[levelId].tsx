import {useRouter} from "next/router";
import {ILevel} from "interfaces/LevelInterface";
import {ReactElement, useContext, useEffect, useState} from "react";
import {LevelContext, LevelProvider} from "store/LevelContext";
import {observer} from "mobx-react-lite";
import TypingStage from 'components/level/TypingStage';
import Keyboard from 'components/level/Keyboard';
import useKeyboardInput from "hooks/useKeyboardInput";

function LevelsIdPage(): JSX.Element {
  const router = useRouter();
  const {levelId}: any = router.query;
  const store = useContext(LevelContext);
  const [levelData, setLevelData] = useState<ILevel>();

  // use getLevel fn
  useEffect(() => {
    if (levelId) {
      store.getLevel(levelId as string);
    }
  }, [levelId, store]);

  useEffect(() => {
    if (store.level) {
      setLevelData({...store.level});
    }
  }, [store.level]);

  const [letterList, keyboardEvent] = useKeyboardInput()

  useEffect(() => {
    console.log('letterList >>', letterList)
  }, [letterList])

  return (
    <div className="typing-level">
      <TypingStage text={levelData?.text} />
      <Keyboard keyCode={81} isShift={true}/>
    </div>
  );
}

LevelsIdPage.getProvider = (page: ReactElement): ReactElement => {
  return (
    <LevelProvider>{page}</LevelProvider>
  );
};

export default observer(LevelsIdPage);
