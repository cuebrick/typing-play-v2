import '../assets/styles/globals.css'
import {ReactElement, ReactNode} from "react";
import type {NextPage} from "next";
import type { AppProps } from 'next/app'
import DefaultLayout from "../components/layout/DefaultLayout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => (
      <DefaultLayout>{page}</DefaultLayout>
  ))

  return getLayout(<Component {...pageProps} />)
  // return <Component {...pageProps} />
}

export default MyApp
