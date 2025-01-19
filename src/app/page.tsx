import CardItem from 'components/root/CardItem';
import WelcomeCardItem from 'components/pages/WelcomeCardItem';
import LoginCardItem from 'components/pages/LoginCardItem';
import Welcome from 'components/root/Welcome';
import CardWrap from 'components/root/CardWrap';

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
