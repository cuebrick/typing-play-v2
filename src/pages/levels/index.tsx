import {observer} from 'mobx-react-lite';
import {ReactElement, useContext, useEffect} from 'react';
import {LevelContext, LevelProvider} from 'store/LevelContext';
import LevelItem from 'components/level/LevelItem';
import {useRouter} from 'next/router';
import {ILevel} from 'interfaces/LevelInterface';

function LevelsIndexPage(): JSX.Element {
  const store = useContext(LevelContext);
  const router = useRouter();

  useEffect(() => {
    if (store.levelList.length === 0) {
      store.getLevelList();
    }
  }, [store]);

  const onClickLevelItem = (level: ILevel): void => {
    router.push(`/levels/${level.id}`);
  };

  return (
    <div className="level-list">
      {store.levelList.map((level) => (
        <LevelItem onClick={() => onClickLevelItem(level)} key={level.id} levelData={level} />
      ))}
    </div>
  );
}

LevelsIndexPage.getProvider = (page: ReactElement): ReactElement => {
  return <LevelProvider>{page}</LevelProvider>;
};

export default observer(LevelsIndexPage);
