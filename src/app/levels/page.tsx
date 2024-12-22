'use client';

import {ILevelInfo} from 'interfaces/level-interface';
import LevelList from '../../components/level/LevelList';

function LevelsIndexPage(): JSX.Element {
  // const store = useContext(LevelContext);
  // const levelData = store.checkedApp ? JSON.parse(localStorage.getItem('levelList') as string) : [];

  const levelData = JSON.parse(localStorage.getItem('levelList') as string) || [];

  return (
    <div className="level-wrap">
      {levelData && levelData.map((levelInfo: ILevelInfo) => <LevelList key={levelInfo.id} levelList={levelInfo} />)}
    </div>
  );
}

export default LevelsIndexPage;
