'use client';

import Image from 'next/image';
import {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import styled from 'styled-components';
import Link from 'next/link';
import userIcon from '../../assets/images/user-icon.svg';
import {AuthContext} from '../../store/AuthContext';

const Container = styled.div``;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 40px;
  height: 40px;
  padding: 10px;
`;

function UserInfo(): JSX.Element {
  const authStore = useContext(AuthContext);

  return (
    <>
      {authStore.user?.email && (
        <Container>
          {authStore.user?.email}
          {authStore.userData?.name}
          <StyledLink href="/profile">
            <Image src={userIcon} alt="User Icon" />
          </StyledLink>
        </Container>
      )}
    </>
  );
}

export default observer(UserInfo);
