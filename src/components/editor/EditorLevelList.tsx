import {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {EditorContext} from 'store/EditorContext';
import {ILevel} from 'interfaces/LevelInterface';
import {defaultLevelData} from 'dto/Level';
import EditorLevelItem from 'components/level/EditorLevelItem';
import {ICategory} from 'interfaces/CategoryInterface';

interface IProps {
  categoryData: ICategory | null;
  selectedLevel: ILevel;

  onSelect(levelData: ILevel): void;
}

function EditorLevelList({categoryData, selectedLevel, onSelect}: IProps): JSX.Element {
  const store = useContext(EditorContext);
  const [selectedLevelData, setSelectedLevelData] = useState<ILevel>({...defaultLevelData});

  useEffect(() => {
    if (categoryData?.id) {
      const params = categoryData.id === '__ALL__' ? undefined : {categoryId: categoryData.id};
      store.getLevelList(params);
    }
  }, [store, categoryData?.id]);

  useEffect(() => {
    if (selectedLevel) {
      setSelectedLevelData(selectedLevel);
    }
  }, [selectedLevel]);

  const onClickLevel = (levelData: ILevel): void => {
    setSelectedLevelData(levelData);
    onSelect(levelData);
  };

  return (
    <div className="editor-level-list">
      <div className="header">
        <h3>{categoryData?.title || '전체 카테고리'}</h3>
      </div>
      <div className="list">
        {store.levelList.map((level) => (
          <EditorLevelItem
            key={level.id}
            isActive={level.id === selectedLevelData.id}
            data={level}
            onClick={() => onClickLevel(level)}
          />
        ))}
      </div>
    </div>
  );
}

export default observer(EditorLevelList);
