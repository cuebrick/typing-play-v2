import {ILevel} from 'interfaces/LevelInterface';
import TrophyBadge from './TrophyBadge';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: calc(25% - 20px);
  height: 120px;
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  cursor: pointer;
`;
const LevelInfo = styled.div``;
const LevelNum = styled.div``;
const LevelTitle = styled.div``;
const LevelSubTitle = styled.div``;

interface IProps {
  levelData: ILevel;
  onClick?(): void;
}

function LevelItem({levelData, onClick}: IProps): JSX.Element {
  return (
    <Container onClick={onClick}>
      <TrophyBadge />
      <LevelInfo>
        <LevelNum>00</LevelNum>
        <LevelTitle>{levelData.title}</LevelTitle>
        <LevelSubTitle>{levelData.subTitle}</LevelSubTitle>
      </LevelInfo>
    </Container>
  );
}

LevelItem.defaultProps = {
  onClick: undefined
};

export default LevelItem;
