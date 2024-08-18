import {ReactNode, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import Image from 'next/image';
import logo from 'assets/images/logo.svg';
import userIcon from 'assets/images/user-icon.svg';
import {AuthContext} from 'store/AuthContext';
import Modeless from 'components/modeless/Modeless';
import {ThemeProvider} from 'styled-components';
import {defaultTheme} from 'theme/theme';

type Props = {children: ReactNode};

function DefaultLayout({children}: Props): JSX.Element {
  const authStore = useContext(AuthContext);

  return (
    <ThemeProvider theme={defaultTheme}>
      <header className="default-layout-header">
        <div className="logo">
          <Image src={logo} alt="Typing Play" />
        </div>
        <div className="user-info">
          {authStore.user?.email}
          {authStore.userData?.name}
          <Image src={userIcon} alt="User Icon" />
        </div>
      </header>
      <div className="contents-body">{children}</div>
      <Modeless />
    </ThemeProvider>
  );
}

export default observer(DefaultLayout);
