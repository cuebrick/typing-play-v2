'use client';

import {PropsWithChildren} from 'react';
import {ThemeProvider} from 'styled-components';
import {defaultTheme} from '../../theme/theme';
import Modeless from '../../components/modeless/Modeless';
import {EditorProvider} from '../../store/EditorContext';
import UserInfo from '../../components/layout/UserInfo';
import AppLogo from '../../components/layout/AppLogo';
import DefaultLayoutHeader from '../../components/layout/DefaultLayoutHeader';
import ContentsBody from '../../components/layout/ContentsBody';

function EditorLayout({children}: PropsWithChildren): JSX.Element {
  return (
    <EditorProvider>
      <ThemeProvider theme={defaultTheme}>
        <DefaultLayoutHeader>
          <AppLogo />
          <UserInfo />
        </DefaultLayoutHeader>
        <ContentsBody>{children}</ContentsBody>
        <Modeless />
      </ThemeProvider>
    </EditorProvider>
  );
}

export default EditorLayout;
