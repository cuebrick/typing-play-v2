'use client';

import {ILevel, ILevelInfo} from 'interfaces/level-interface';
import {useRouter} from 'next/navigation';
import styled from 'styled-components';
import LevelItem from './LevelItem';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const GroupTitle = styled.p`
  flex-basis: 100%;
  margin-left: 10px;
  margin-top: 10px;
`;

interface IProps {
  levelList: ILevelInfo;
}

function LevelList({levelList}: IProps): JSX.Element | null {
  return (
    <Container>
      <GroupTitle>{levelList.title}</GroupTitle>
      {levelList.levels.map((level: ILevel) => (
        <LevelItem levelData={level} key={level.id} />
      ))}
    </Container>
  );
}

export default LevelList;
