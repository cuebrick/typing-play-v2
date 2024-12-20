'use client';

import {observer} from 'mobx-react-lite';
import {useContext, useEffect, useState} from 'react';
import {ILevelList} from 'interfaces/level-interface';
import {LevelContext} from 'store/LevelContext';
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
      {levelData && levelData.map((levelList: ILevelList) => <LevelList key={levelList.id} levelList={levelList} />)}
    </div>
  );
}

export default observer(LevelsIndexPage);
