import TrophyBadge from "./TrophyBadge";
import {ILevel} from 'interfaces/LevelInterface';

interface IProps {
  levelData: ILevel;
  onClick?(): void;
}

function LevelItem({levelData, onClick}: IProps): JSX.Element {
  return (
    <div className="level-item" onClick={onClick}>
      <TrophyBadge />
      <div className="level-info">
        <div className="level-num">00</div>
        <div className="level-title">{levelData.title}</div>
        <div className="level-subtitle">{levelData.subTitle}</div>
      </div>
    </div>
  );
}

export default LevelItem;
