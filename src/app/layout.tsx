import {PropsWithChildren} from 'react';
import {CommonProvider} from '../store/CommonContext';
import {AuthProvider} from '../store/AuthContext';
import Modeless from '../components/modeless/Modeless';
import UserInfo from '../components/layout/UserInfo';
import AppLogo from '../components/layout/AppLogo';
import StyledComponentsRegistry from '../lib/styles/registry';
import DefaultLayoutHeader from '../components/layout/DefaultLayoutHeader';
import ContentsBody from '../components/layout/ContentsBody';

export const metadata = {
  title: 'Typing play',
  description: '타플은 한글 타자 연습을 위한 프로그램입니다.'
};

function RootLayout({children}: PropsWithChildren) {
  return (
    <html lang="ko">
      <body>
        <CommonProvider>
          <AuthProvider>
            <StyledComponentsRegistry>
              <DefaultLayoutHeader>
                <AppLogo />
                <UserInfo />
              </DefaultLayoutHeader>
              <ContentsBody>{children}</ContentsBody>
              <Modeless />
            </StyledComponentsRegistry>
          </AuthProvider>
        </CommonProvider>
      </body>
    </html>
  );
}

export default RootLayout;
