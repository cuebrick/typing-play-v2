import {useRouter} from "next/router";
import {ILevel} from "interfaces/LevelInterface";
import {ReactElement, useContext, useEffect, useState} from "react";
import {LevelContext, LevelProvider} from "store/LevelContext";
import {observer} from "mobx-react-lite";
import TypingStage from 'components/level/TypingStage';
import Keyboard from 'components/level/Keyboard';
import useKeyboardInput from "hooks/useKeyboardInput";
import useNextLetter from "hooks/useNextLetter";
import Keymap from "sample/json/keymap.json";

function LevelsIdPage(): JSX.Element {
  const router = useRouter();
  const {levelId}: any = router.query;
  const store = useContext(LevelContext);
  // const [levelData, setLevelData] = useState<ILevel>();
  const [nextKey, onChangeKeyInputList] = useNextLetter();
  const [nextCode, setNextCode] = useState<string>('');
  const [hangulMode, setHangulMode] = useState<boolean>(true);

  // use getLevel fn
  useEffect(() => {
    if (levelId) {
      store.getLevel(levelId as string);
    }
  }, [levelId, store]);

  // useEffect(() => {
  //   if (store.level) {
  //     setLevelData({...store.level});
  //   }
  // }, [store.level]);

  const [keyInputList, keyInput] = useKeyboardInput();

  useEffect(() => {
    if (nextKey) {
      setNextCode(getCode(nextKey));
    }
  }, [nextKey]);

  useEffect(() => {
    onChangeKeyInputList(keyInputList);
  }, [keyInputList]);

  useEffect(() => {
    if (keyInput?.key === 'HangulMode') {
      setHangulMode(!hangulMode);
    }
  }, [keyInput]);

  function getCode(alphabet: string) {
    for (let key in Keymap) {
      let keymap = Keymap as any;
      if (keymap[key].krn === alphabet) {
        return keymap[key].enn;
      }
    }
    return '';
  }

  return (
    <div className="typing-level">
      <TypingStage keyInput={keyInput} keyInputList={keyInputList} level={store.level} text={store.level.text}
                   hangulMode={hangulMode} />
      <Keyboard keyInput={keyInput} nextKey={nextKey} keyCode={81} isShift={false} />
    </div>
  );
}

LevelsIdPage.getProvider = (page: ReactElement): ReactElement => {
  return (
    <LevelProvider>{page}</LevelProvider>
  );
};

export default observer(LevelsIdPage);
