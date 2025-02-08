'use client';

import {ILevelWithUserRecord} from 'interfaces/level-interface';
import styled from 'styled-components';
import {useRouter} from 'next/navigation';
import Trophy from 'components/level/Trophy';

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
  levelData: ILevelWithUserRecord;
}

function LevelItem({levelData}: IProps): JSX.Element {
  const router = useRouter();

  // todo: store.getLevelRecord 실행 전에 store.getUserLevelRecord 먼저 작동함.
  // todo: store.levelRecord 갱신 후 store.getUserLevelRecord 작동하도록 수정해야 함.

  /* const [trophy, setTrophy] = useState<number>(-99);
  useEffect(() => {
    setTrophy(store.getUserLevelRecord(levelData.id));
  }, [store.levelRecord]); */

  const onClickLevelItem = (level: ILevelWithUserRecord): void => {
    router.push(`/levels/${level.id}`);
  };

  return (
    <Container onClick={() => onClickLevelItem(levelData)}>
      <Trophy trophy={levelData.userRecord?.trophy} />
      <LevelInfo>
        <LevelNum>00</LevelNum>
        <LevelTitle>{levelData.title}</LevelTitle>
        <LevelSubTitle>{levelData.subTitle}</LevelSubTitle>
      </LevelInfo>
    </Container>
  );
}

// export default observer(LevelItem);
export default LevelItem;
