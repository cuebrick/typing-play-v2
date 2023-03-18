import {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {LevelContext} from 'store/LevelContext';
import {ILevel} from 'interfaces/LevelInterface';
import {defaultLevelData} from 'dto/Level';
import EditorLevelItem from 'components/level/EditorLevelItem';
import {ILevelGroup} from 'interfaces/LevelGroupInterface';

interface IProps {
  levelGroupData: ILevelGroup | null;

  onSelect(levelData: ILevel): void;
}

function EditorLevelList({levelGroupData, onSelect}: IProps): JSX.Element {
  const store = useContext(LevelContext);
  const [selectedLevel, setSelectedLevel] = useState<ILevel>({...defaultLevelData});

  useEffect(() => {
    if (levelGroupData?.id) {
      store.getLevelList({groupId: levelGroupData.id});
    }
  }, [store, levelGroupData?.id]);

  const onClickLevel = (levelData: ILevel): void => {
    setSelectedLevel(levelData);
    onSelect(levelData);
  };

  const onClickCreate = (withClear?: boolean) => {
    const data = withClear ? {...defaultLevelData} : {...selectedLevel, id: ''};
    setSelectedLevel(data);
    onSelect(data);
  };

  return (
    <div className="editor-level-list">
      <div className="header">
        <h3>level group list</h3>
        <button className="default" onClick={() => onClickCreate(true)}>새 레벨</button>
        <button className="default" onClick={() => onClickCreate()}>선택 데이터를 이용해 새 레벨</button>
      </div>
      <div className="list">
        {store.levelList.map(level => (
          <EditorLevelItem
            key={level.id}
            isActive={level.id === selectedLevel.id}
            levelData={level}
            onClick={() => onClickLevel(level)}
          />
        ))}
      </div>

    </div>
  );
}

export default observer(EditorLevelList);
