import {observer} from 'mobx-react-lite';
import {ReactElement, useContext, useEffect, useState} from 'react';
import {ILevelList} from 'interfaces/LevelInterface';
import {LevelContext, LevelProvider} from 'store/LevelContext';
import LevelList from '../../components/level/LevelList';

function LevelsIndexPage(): JSX.Element {
  const store = useContext(LevelContext);
  // const [levelData, setLevelData] = useState<ILevel[]>([]);
  const [levelData, setLevelData] = useState<ILevelList[]>([]);
  useEffect(() => {
    setLevelData(JSON.parse(localStorage.getItem('levelList') as string));
  }, [store.checkedApp]);

  return (
    <div className="level-wrap">
      {levelData &&
        levelData.map((levelList: ILevelList) => (
          <LevelList key={levelList.id} levelList={levelList} />
          // <LevelList key={levelList.id} title={levelList.title} levels={levelList.levels} />
          // <LevelItem onClick={() => onClickLevelItem(level)} key={level.id} levelData={level} />
        ))}
    </div>
  );
}

LevelsIndexPage.getProvider = (page: ReactElement): ReactElement => {
  return <LevelProvider>{page}</LevelProvider>;
};

export default observer(LevelsIndexPage);
