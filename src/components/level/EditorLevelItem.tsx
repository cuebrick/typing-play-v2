import TrophyBadge from "./TrophyBadge";
import {ILevel} from 'interfaces/LevelInterface';

interface IProps {
  levelData: ILevel;
  isActive: boolean;

  onClick?(): void;
}

function EditorLevelItem({levelData, isActive, onClick}: IProps): JSX.Element {
  return (
    <div className={`editor-level-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <TrophyBadge />
      <div className="info">
        <div className="title">{levelData.title}</div>
        <div className="subtitle">{levelData.subTitle}</div>
      </div>
    </div>
  );
}

export default EditorLevelItem;
