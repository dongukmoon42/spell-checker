import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Footer from '@components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Google Search Console 인증 */}
        <meta name="google-site-verification" content="ZO0F_uWh8Y9h0jybKLd4Q8BVaraQ4agZxsEbOI-tec0" />

        {/* ✅ 애드센스 자동 광고 스크립트 */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3136907678966893"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}