import {ILevel, ILevelList} from 'interfaces/LevelInterface';
import {useRouter} from 'next/router';
import LevelItem from './LevelItem';

interface IProps {
  levelList: ILevelList;
}

function LevelList({levelList}: IProps): JSX.Element | null {
  const router = useRouter();

  const onClickLevelItem = (level: ILevel): void => {
    router.push(`/levels/${level.id}`);
  };

  return (
    <div className="level-list">
      <p className="level-title">{levelList.title}</p>
      {levelList.levels.map((level: ILevel) => (
        <LevelItem levelData={level} onClick={() => onClickLevelItem(level)} key={level.id} />
      ))}
    </div>
  );
}

export default LevelList;
