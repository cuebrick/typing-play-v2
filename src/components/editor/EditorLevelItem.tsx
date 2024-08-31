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
    <Container className={isActive ? 'active' : ''} onClick={onClick}>
      <Info>
        <Title>{data.title}</Title>
        <SubTitle>{data.subTitle}</SubTitle>
      </Info>
    </Container>
  );
}

EditorLevelItem.defaultProps = {
  onClick: undefined
};

export default EditorLevelItem;
