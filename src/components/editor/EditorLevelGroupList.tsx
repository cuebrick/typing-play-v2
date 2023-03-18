import {ILevelGroup} from 'interfaces/LevelGroupInterface';
import LevelGroupModal from 'components/modal/LevelGroupModal';
import {useContext, useEffect, useState} from 'react';
import {LevelContext} from 'store/LevelContext';
import EditorLevelGroupItem from 'components/editor/EditorLevelGroupItem';

interface IProps {
  onSelect(levelData: ILevelGroup): void;
}

function EditorLevelGroupList({onSelect}: IProps): JSX.Element {
  const store = useContext(LevelContext);
  const [selected, setSelected] = useState<ILevelGroup | null>(null);
  const [isShowGroupLayer, setIsShowGroupLayer] = useState(false);

  useEffect(() => {
    store.getLevelGroupList();
  }, [store]);

  const onClickLevelGroup = (levelGroupData: ILevelGroup): void => {
    onSelect(levelGroupData);
    setSelected(levelGroupData);
  };

  return (
    <div className="editor-level-group-list">
      <div className="header">
        <h3>level group list</h3>
        <button className="default" onClick={() => setIsShowGroupLayer(true)}>레벨 그룹 수정</button>
      </div>
      <div className="list">
        {store.levelGroupList?.map(levelGroup => (
          <EditorLevelGroupItem
            levelData={levelGroup}
            isActive={Boolean(selected) && levelGroup.id === selected?.id}
            onClick={() => onClickLevelGroup(levelGroup)}
          />
        ))}
      </div>
      {isShowGroupLayer && (
        <LevelGroupModal onClose={() => setIsShowGroupLayer(false)} />
      )}
    </div>
  );
}

export default EditorLevelGroupList;
