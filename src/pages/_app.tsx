import {ReactElement} from "react";
import type {NextPage} from "next";
import type {AppProps} from 'next/app'

import 'assets/styles/index.scss';

import DefaultLayout from "components/layout/DefaultLayout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?(page: ReactElement): ReactElement;
  getProvider?(page: ReactElement): ReactElement;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => (
      <DefaultLayout>{page}</DefaultLayout>
  ))

  const getProvider = Component.getProvider ?? ((page: ReactElement) => page);

  return getProvider(getLayout(<Component {...pageProps} />))
  // return <Component {...pageProps} />
}

export default MyApp
