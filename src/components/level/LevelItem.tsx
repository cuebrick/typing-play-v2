'use client';

import {ILevelWithUserRecord} from 'interfaces/level-interface';
import styled from 'styled-components';
import {useRouter} from 'next/navigation';
import Trophy from 'components/level/Trophy';

const Container = styled.div`
  width: 100%;
  //height: 120px;
  padding: 2%;

  @media screen and (min-width: 431px) {
    width: 50%;
    padding: 1%;
  }
  @media screen and (min-width: 1025px) {
    width: 25%;
    padding: 0.8%;
  }
`;
const Card = styled.div`
  display: flex;
  padding: 10px;
  background-color: #fff;
  cursor: pointer;
  box-sizing: border-box;
`;
const LevelInfo = styled.div`
  width: calc(100% - 100px);
`;
const LevelNum = styled.div``;
const LevelTitle = styled.div`
  flex-basis: 100%;
  margin-left: ${({theme}) => theme.layout.itemGap}px;
  margin-top: ${({theme}) => theme.layout.itemGap}px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const LevelSubTitle = styled.div`
  font-size: 0.9em;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #aaa;

  margin-left: ${({theme}) => theme.layout.itemGap}px;
  margin-top: ${({theme}) => theme.layout.itemGap}px;
`;

interface IProps {
  index: number;
  levelData: ILevelWithUserRecord;
}

function LevelItem({index, levelData}: IProps): JSX.Element {
  const router = useRouter();

  const onClickLevelItem = (level: ILevelWithUserRecord): void => {
    console.log('level = ', level);
    router.push(`/levels/${level.id}`);
  };

  return (
    <Container>
      <Card onClick={() => onClickLevelItem(levelData)}>
        <Trophy trophy={levelData.userRecord?.trophy} />
        <LevelInfo>
          <LevelNum>{index + 1}</LevelNum>
          <LevelTitle>{levelData.title}</LevelTitle>
          <LevelSubTitle>{levelData.subTitle}</LevelSubTitle>
        </LevelInfo>
      </Card>
    </Container>
  );
}

export default LevelItem;
