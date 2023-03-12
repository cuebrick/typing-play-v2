import {observer} from 'mobx-react-lite';
import {ReactElement, useContext, useEffect} from 'react';
import {LevelContext, LevelProvider} from 'store/LevelContext';
import LevelItem from 'components/level/LevelItem';
import {ILevel} from 'interfaces/LevelInterface';

function LevelIndexPage(): JSX.Element {
  const store = useContext(LevelContext);

  useEffect(() => {
    if (store) {
      store.getLevelList();
    }
  }, [store]);

  const onClickLevel = (levelData: ILevel): void => {
    console.log('levelData', levelData);
  }

  return (
    <div className="editor-index-page">
      <div className="level-list">
        {store.levelList.map(level => <LevelItem key={level.id} levelData={level} onClick={() => onClickLevel(level)} />)}
      </div>
    </div>
  )
}

LevelIndexPage.getProvider = (page: ReactElement): ReactElement => {
  return <LevelProvider>{page}</LevelProvider>
}

export default observer(LevelIndexPage);
