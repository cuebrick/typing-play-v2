import {useRouter} from "next/router";
import {ILevel} from "interfaces/LevelInterface";
import {ReactElement, useContext, useEffect, useState} from "react";
import {LevelContext, LevelProvider} from "store/LevelContext";
import {observer} from "mobx-react-lite";
import TypingStage from 'components/level/TypingStage';
import Keyboard from 'components/level/Keyboard';

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

  // find in store.levelList
  // useEffect(() => {
  //   if (store.levelList.length === 0) {
  //     store.getLevelList()
  //   }
  // }, [store])
  //
  // useEffect(() => {
  //   if (levelId) {
  //     let found = store.levelList.find((item) =>
  //       item.id === levelId
  //     )
  //     setLevelData(found)
  //   }
  // }, [levelId, store.levelList])

  return (
    <div className="typing-level">
      <TypingStage text={levelData.text} />
      <Keyboard keyCode={12} />
      <div className="wrap">
        <p>params : {levelId}</p>
      </div>
      <div>
        <p>그룹 ID : {levelData?.categoryId}</p>
        <p>그룹 타이틀 : {levelData?.categoryTitle}</p>
        <p>제목 : {levelData?.title}</p>
        <p>부제목 : {levelData?.subTitle}</p>
        <p>설명 : {levelData?.description}</p>
        <p>타자 데이터 : {levelData?.text}</p>
      </div>
    </div>
  );
}

LevelsIdPage.getProvider = (page: ReactElement): ReactElement => {
  return (
    <LevelProvider>{page}</LevelProvider>
  );
};

export default observer(LevelsIdPage);
