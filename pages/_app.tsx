import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Footer from '@components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="ZO0F_uWh8Y9h0jybKLd4Q8BVaraQ4agZxsEbOI-tec0" />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
