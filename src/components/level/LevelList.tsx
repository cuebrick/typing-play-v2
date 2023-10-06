import LevelItem from './LevelItem';
import {ILevel} from '../../interfaces/LevelInterface';

interface IProps {
  title: string;
  levels: ILevel[];
}

function LevelList({title, levels}: IProps): JSX.Element | null {
  if (!levels || levels.length === 0) {
    return null;
  }

  return (
    <div className="level-list">
      <p className="level-title">{title}</p>
      {levels.map((level: ILevel) => (
        <LevelItem levelData={level} key={level.id} />
      ))}
    </div>
  );
}

export default LevelList;
