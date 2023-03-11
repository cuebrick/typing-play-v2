import {observer} from 'mobx-react-lite';
import {ReactElement, useContext, useEffect} from 'react';
import {LevelContext, LevelProvider} from 'store/LevelContext';
import LevelItem from "components/level/LevelItem";

function LevelsIndexPage(): JSX.Element {
  const store = useContext(LevelContext);

  useEffect(() => {
    if (store.levelList.length === 0) {
      store.getLevelList();
    }
  }, [store]);

  return (
    <div className="level-list">
      {store.levelList.map(level => (
        <LevelItem key={level.levelId} levelData={level} />
      ))}
    </div>
  );
}

LevelsIndexPage.getProvider = (page: ReactElement): ReactElement => {
  return <LevelProvider>{page}</LevelProvider>;
};

export default observer(LevelsIndexPage);
