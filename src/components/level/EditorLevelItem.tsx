import {ILevel} from 'interfaces/LevelInterface';

interface IProps {
  data: ILevel;
  isActive: boolean;

  onClick?(): void;
}

function EditorLevelItem({data, isActive, onClick}: IProps): JSX.Element {
  return (
    <div className={`editor-level-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className="info">
        <div className="title">{data.title}</div>
        <div className="subtitle">{data.subTitle}</div>
      </div>
    </div>
  );
}

export default EditorLevelItem;
