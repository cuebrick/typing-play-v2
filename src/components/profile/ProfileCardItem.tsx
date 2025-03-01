import styled from 'styled-components';
import ProfileRow from './ProfileRow';
import ProfileContents from './ProfileContents';
import Button from '../forms/Button';
import {useContext} from 'react';
import {AuthContext} from '../../store/AuthContext';
import VerticalInfoItem from './VerticalInfoItem';
import {observer} from 'mobx-react-lite';

const Container = styled.div`
  padding: 20px;
`;

const RowText = styled.span`
  margin-right: auto;
`;

function ProfileCardItem(): JSX.Element {
  const authStore = useContext(AuthContext);

  return (
    <Container>
      <ProfileContents>
        <ProfileRow title="이메일">
          <RowText>{authStore.user?.email}</RowText>
        </ProfileRow>
        <ProfileRow title="닉네임">
          <RowText>{authStore.userData?.name}</RowText>
          <Button>수정</Button>
        </ProfileRow>
        <ProfileRow title="비밀번호">
          <RowText />
          <Button>수정</Button>
        </ProfileRow>
      </ProfileContents>
      <ProfileContents>
        <ProfileRow justifyContents="space-between">
          <VerticalInfoItem title="평균 타자 속도" data={600} unit="타" />
          <VerticalInfoItem title="평균 정확도" data={97} unit="%" />
          <VerticalInfoItem title="최고 타자 속도" data={713} unit="타" />
        </ProfileRow>
      </ProfileContents>
      <ProfileContents>
        <ProfileRow justifyContents="space-between">
          <VerticalInfoItem title="완료한 타자 개수" data={13} unit="개" />
          <VerticalInfoItem title="획득한 별 개수" data={25} unit="개" />
        </ProfileRow>
      </ProfileContents>
    </Container>
  );
}

export default observer(ProfileCardItem);
