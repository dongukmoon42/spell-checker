import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Footer from '@components/Footer';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}