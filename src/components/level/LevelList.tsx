'use client';

import {ILevelInfo, ILevelWithUserRecord} from 'interfaces/level-interface';
import styled from 'styled-components';
import {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import LevelItem from './LevelItem';
import {LevelContext} from '../../store/LevelContext';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;

  @media screen and (min-width: 360px) {
    padding: 10px;
  }
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
  const store = useContext(LevelContext);
  const [levels, setLevels] = useState<ILevelWithUserRecord[]>([]);

  useEffect(() => {
    const merged = levelList.levels.map((level) => {
      const userRecord = store.getUserLevelRecord(level.id);
      return {...level, userRecord} as ILevelWithUserRecord;
    });

    setLevels(merged);
  }, [levelList, store.levelRecord]);

  return (
    <Container>
      <GroupTitle>{levelList.title}</GroupTitle>
      {levels.map((level: ILevelWithUserRecord, index: number) => (
        <LevelItem levelData={level} index={index} key={level.id} />
      ))}
    </Container>
  );
}

export default observer(LevelList);
