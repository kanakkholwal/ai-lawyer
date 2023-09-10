import 'styles/global.scss'
import type { AppProps } from 'next/app'
import type { sessionType } from 'src/types/session'

import Progress from 'src/components/progress';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SessionProvider } from "next-auth/react"
import Head from 'next/head';


export default function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps & {
  session: sessionType
}) {

  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);



  return <>
    <Head>
      {/* <!-- Preload Cdns --> */}

      <meta name="googlebot" content="all" />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#11a6d3" />
      <link rel="apple-touch-icon" href="/favicon.ico" />

    </Head>
    <Progress isAnimating={isAnimating} />
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </>
}