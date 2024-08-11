import {ILevel, ILevelList} from 'interfaces/LevelInterface';
import {useRouter} from 'next/router';
import LevelItem from './LevelItem';
import styled from 'styled-components';

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
  levelList: ILevelList;
}

function LevelList({levelList}: IProps): JSX.Element | null {
  const router = useRouter();

  const onClickLevelItem = (level: ILevel): void => {
    router.push(`/levels/${level.id}`);
  };

  return (
    <Container>
      <GroupTitle>{levelList.title}</GroupTitle>
      {levelList.levels.map((level: ILevel) => (
        <LevelItem levelData={level} onClick={() => onClickLevelItem(level)} key={level.id} />
      ))}
    </Container>
  );
}

export default LevelList;
