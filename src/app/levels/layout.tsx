'use client';

import {PropsWithChildren} from 'react';
import {ThemeProvider} from 'styled-components';
import {defaultTheme} from '../../theme/theme';
import Modeless from '../../components/modeless/Modeless';
import {LevelProvider} from '../../store/LevelContext';
import UserInfo from '../../components/layout/UserInfo';
import AppLogo from '../../components/layout/AppLogo';
import DefaultLayoutHeader from '../../components/layout/DefaultLayoutHeader';
import ContentsBody from '../../components/layout/ContentsBody';

function LevelsLayout({children}: PropsWithChildren): JSX.Element {
  return (
    <LevelProvider>
      {/* <ThemeProvider theme={defaultTheme}>
        <DefaultLayoutHeader>
          <AppLogo />
          <UserInfo />
        </DefaultLayoutHeader>
        <ContentsBody>{children}</ContentsBody>
        <Modeless />
      </ThemeProvider> */}
      {children}
    </LevelProvider>
  );
}

export default LevelsLayout;
