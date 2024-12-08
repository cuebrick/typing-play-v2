'use client';

import {ReactNode, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import Image from 'next/image';
import logo from 'assets/images/logo.svg';
import userIcon from 'assets/images/user-icon.svg';
import {AuthContext} from 'store/AuthContext';
import Modeless from 'components/modeless/Modeless';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import {defaultTheme} from 'theme/theme';

const GlobalStyle = createGlobalStyle`
  // reset
  body, p {
      margin: 0;
  }

  div, header {
      box-sizing: border-box;
  }

  // base style
  body {
      background-color: ${({theme}) => theme.presets.light.background};
      font-size: ${({theme}) => theme.fonts.size}px;
  }

  input[type=text],
  input[type=password],
  textarea,
  select {
      font-size: ${({theme}) => theme.fonts.size}px;
  }

  input, textarea, select {
      outline: none;
  }
`;

const DefaultLayoutHeader = styled.header`
  width: 100%;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 5px 1px rgba(0, 0, 0, 0.2);
`;

const ContentsBody = styled.div`
  height: calc(100vh - 80px);
`;

type Props = {children: ReactNode};

function DefaultLayout({children}: Props): JSX.Element {
  const authStore = useContext(AuthContext);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <DefaultLayoutHeader>
        <div className="logo">
          <Image src={logo} alt="Typing Play" />
        </div>
        <div className="user-info">
          {authStore.user?.email}
          {authStore.userData?.name}
          <Image src={userIcon} alt="User Icon" />
        </div>
      </DefaultLayoutHeader>
      <ContentsBody>{children}</ContentsBody>
      <Modeless />
    </ThemeProvider>
  );
}

export default observer(DefaultLayout);
