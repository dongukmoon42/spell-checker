import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>문의하기 - 맞춤형 글 도구</title>
        <meta name="description" content="서비스 관련 문의사항은 아래 이메일을 통해 연락주시기 바랍니다." />
      </Head>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', backgroundColor: 'var(--background)', color: 'var(--foreground)', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>문의하기</h1>
        <p>서비스와 관련된 궁금한 사항이나 제안은 아래 이메일로 보내주세요.</p>
        <p><strong>이메일:</strong> <a href="mailto:dongukmoon42@gmail.com">dongukmoon42@gmail.com</a></p>
      </div>
    </>
  );
}
