'use client';

import {ILevelInfo, ILevelWithUserRecord} from 'interfaces/level-interface';
import styled from 'styled-components';
import {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import LevelItem from './LevelItem';
import {LevelContext} from '../../store/LevelContext';

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
  const store = useContext(LevelContext);

  useEffect(() => {
    levelList.levels.forEach((level: ILevelWithUserRecord) => {
      const result = store.getUserLevelRecord(level.id);
      if (result) {
        level.userRecord = result;
        // TODO: level의 변화를 감지하지 못해 리렌더링 작동 X.
        // react dev tools로 확인 시 LevelItem의 props는 변화함. 리렌더링 X.
        // trophy의 props 변화 X, 리렌더링 X.
      }
    });
  }, [levelList, store.levelRecord]);

  return (
    <Container>
      <GroupTitle>{levelList.title}</GroupTitle>
      {levelList.levels.map((level: ILevelWithUserRecord) => (
        <LevelItem levelData={level} key={level.id} />
      ))}
    </Container>
  );
}

export default observer(LevelList);
