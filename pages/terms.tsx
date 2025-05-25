import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>이용약관 - 맞춤형 글 도구</title>
        <meta name="description" content="이 웹사이트의 서비스 이용을 위한 기본적인 약관을 안내합니다." />
      </Head>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', backgroundColor: 'var(--background)', color: 'var(--foreground)', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>이용약관</h1>
        <p>본 웹사이트는 사용자의 편의를 위한 텍스트 도구 서비스를 제공합니다. 사용자는 본 사이트를 비상업적인 용도로 자유롭게 사용할 수 있습니다.</p>
        <p>모든 콘텐츠는 참고용이며, 사용자 입력 데이터는 서버에 저장되지 않습니다.</p>
        <p>서비스는 사전 예고 없이 수정 또는 중단될 수 있으며, 이에 따른 책임은 지지 않습니다.</p>
      </div>
    </>
  );
}
