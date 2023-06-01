import {ReactElement} from 'react';
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';

import 'assets/styles/index.scss';

import {AuthProvider} from 'store/AuthContext';
import DefaultLayout from 'components/layout/DefaultLayout';
import {CommonProvider} from 'store/CommonContext';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?(page: ReactElement): ReactElement;
  getProvider?(page: ReactElement): ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  const getProvider = Component.getProvider ?? ((page: ReactElement) => page);

  return (
    <AuthProvider>
      <CommonProvider>{getProvider(getLayout(<Component {...pageProps} />))}</CommonProvider>
    </AuthProvider>
  );
  // return <Component {...pageProps} />
}

export default MyApp;
