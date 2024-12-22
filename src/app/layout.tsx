import {PropsWithChildren} from 'react';
import {LevelProvider} from '../store/LevelContext';
import {CommonProvider} from '../store/CommonContext';
import {AuthProvider} from '../store/AuthContext';
import DefaultLayout from '../components/layout/DefaultLayout';
import {EditorProvider} from '../store/EditorContext';

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
            <EditorProvider>
              <LevelProvider>
                <DefaultLayout>{children}</DefaultLayout>
              </LevelProvider>
            </EditorProvider>
          </AuthProvider>
        </CommonProvider>
      </body>
    </html>
  );
}

export default RootLayout;
