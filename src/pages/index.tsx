// import styles from 'assets/styles/index-page.module.scss'
import CardItem from 'components/CardItem';
import WelcomeCardItem from 'components/pages/WelcomeCardItem';
import LoginCardItem from 'components/pages/LoginCardItem';

function IndexPage(): JSX.Element {
  return (
    <div className="welcome">
      <div className="card-wrap">
        <CardItem title="타플 에 오신것을 환영합니다." width={700} height={500}>
          <WelcomeCardItem />
        </CardItem>
        <CardItem title="수련생 출석" width={400} height={500}>
          <LoginCardItem />
        </CardItem>
      </div>
    </div>
  );
}

export default IndexPage;
