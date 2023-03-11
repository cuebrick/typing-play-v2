import {useRouter} from 'next/router';

function WelcomeCardItem(): JSX.Element {
  const router = useRouter();

  const onClickLevelList = (): void => {
    router.push('/levels')
  };

  const onClickContinue = (): void => {
    // TODO: 사용자 정보로부터 이전 레벨 정보를 가져와 -> router 이동
  }

  return (
    <div className="welcome-card-item">
      타플은 한글 타자 연습을 위한 프로그램 입니다.
      <button onClick={onClickLevelList}>목록에서 시작</button>
      <button onClick={onClickContinue}>이어서 시작</button>
    </div>
  );
}

export default WelcomeCardItem;
