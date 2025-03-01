'use client';

import CardWrap from '../../components/root/CardWrap';
import CardItem from '../../components/root/CardItem';
import ProfileCardItem from '../../components/profile/ProfileCardItem';

function ProfilePage(): JSX.Element {
  return (
    <CardWrap>
      <CardItem title="프로필" width={600} height={600}>
        <ProfileCardItem />
      </CardItem>
    </CardWrap>
  );
}

export default ProfilePage;
