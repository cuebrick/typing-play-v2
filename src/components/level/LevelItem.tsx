import TrophyBadge from "./TrophyBadge";
import {ILevel} from 'interfaces/LevelInterface';

interface IProps {
  levelData: ILevel;
}

function LevelItem({levelData}: IProps): JSX.Element {
  return (
    <div className="level-item">
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
