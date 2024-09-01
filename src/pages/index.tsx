import CardItem from 'components/CardItem';
import WelcomeCardItem from 'components/pages/WelcomeCardItem';
import LoginCardItem from 'components/pages/LoginCardItem';
import styled from 'styled-components';

const Welcome = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
`;
const CardWrap = styled.div`
  width: 1120px;
  display: flex;
  justify-content: space-between;
  margin: auto;
`;

function IndexPage(): JSX.Element {
  return (
    <Welcome>
      <CardWrap>
        <CardItem title="타플 에 오신것을 환영합니다." width={700} height={500}>
          <WelcomeCardItem />
        </CardItem>
        <CardItem title="수련생 출석" width={400} height={500}>
          <LoginCardItem />
        </CardItem>
      </CardWrap>
    </Welcome>
  );
}

export default IndexPage;
