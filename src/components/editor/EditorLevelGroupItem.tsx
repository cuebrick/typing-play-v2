import {ILevelGroup} from 'interfaces/LevelGroupInterface';

interface IProps {
  levelData: ILevelGroup;
  isActive: boolean;

  onClick?(): void;
}

function EditorLevelGroupItem({levelData, isActive, onClick}: IProps): JSX.Element {
  return (
    <div className={`editor-level-group-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className="info">
        <div className="title">{levelData.title}</div>
      </div>
    </div>
  );
}

export default EditorLevelGroupItem;
