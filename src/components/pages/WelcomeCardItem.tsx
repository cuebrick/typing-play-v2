import {useRouter} from 'next/router';
import {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {AuthContext} from 'store/AuthContext';
import styled from 'styled-components';

const Container = styled.div`
  width: 700px;
  height: 500px;
`;

function WelcomeCardItem(): JSX.Element {
  const authStore = useContext(AuthContext);
  const router = useRouter();

  const onClickLevelList = (): void => {
    router.push('/levels');
  };

  const onClickStart = (): void => {
    // TODO: 사용자 정보로부터 이전 레벨 정보를 가져와 -> router 이동
  };

  return (
    <Container>
      타플은 한글 타자 연습을 위한 프로그램 입니다.
      <button onClick={onClickLevelList}>목록에서 시작</button>
      <button onClick={onClickStart}>{authStore.userData?.levelId ? '이어서 시작' : '처음 시작'}</button>
    </Container>
  );
}

export default observer(WelcomeCardItem);
