import {ILevel} from 'interfaces/level-interface';
import styled from 'styled-components';
import TrophyBadge from './TrophyBadge';

const Container = styled.div`
  display: flex;
  width: calc(25% - 20px);
  height: 120px;
  margin: ${({theme}) => theme.layout.itemGap}px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  cursor: pointer;
`;
const LevelInfo = styled.div``;
const LevelNum = styled.div``;
const LevelTitle = styled.div`
  flex-basis: 100%;
  margin-left: ${({theme}) => theme.layout.itemGap}px;
  margin-top: ${({theme}) => theme.layout.itemGap}px;
`;
const LevelSubTitle = styled.div`
  margin-left: ${({theme}) => theme.layout.itemGap}px;
  margin-top: ${({theme}) => theme.layout.itemGap}px;
`;

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

export default LevelItem;
