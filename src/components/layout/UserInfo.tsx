'use client';

import Image from 'next/image';
import {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import userIcon from '../../assets/images/user-icon.svg';
import {AuthContext} from '../../store/AuthContext';

function UserInfo(): JSX.Element {
  const authStore = useContext(AuthContext);

  return (
    <div className="user-info">
      {authStore.user?.email}
      {authStore.userData?.name}
      <Image src={userIcon} alt="User Icon" />
    </div>
  );
}

export default observer(UserInfo);
