import {ILevel} from 'interfaces/LevelInterface';
import styled from 'styled-components';
import clsx from 'clsx';

const Container = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  padding: 10px;
  cursor: pointer;

  &.active {
    background-color: #efefef;
  }
`;

const Info = styled.div``;
const Title = styled.div``;
const SubTitle = styled.div``;

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

EditorLevelItem.defaultProps = {
  onClick: undefined
};

export default EditorLevelItem;
