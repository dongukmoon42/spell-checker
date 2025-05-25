import Head from 'next/head';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>개인정보처리방침 - 맞춤형 글 도구</title>
        <meta name="description" content="본 웹사이트는 개인정보를 수집하지 않으며, 안전한 사용 환경을 제공합니다." />
      </Head>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', backgroundColor: 'var(--background)', color: 'var(--foreground)', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>개인정보처리방침</h1>
        <p>본 웹사이트는 개인정보를 저장하거나 수집하지 않습니다.</p>
        <p>사용자가 입력한 모든 데이터는 브라우저 내에서만 처리되며, 외부로 전송되지 않습니다.</p>
        <p>문의사항은 아래 문의 페이지를 통해 전달 부탁드립니다.</p>
      </div>
    </>
  );
}
