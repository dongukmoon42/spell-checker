// pages/char-count.tsx
import { useState } from 'react';
import Head from 'next/head';

export default function CharCount() {
  const [input, setInput] = useState('');
  const withSpace = input.length;
  const withoutSpace = input.replace(/\s/g, '').length;

  return (
    <div style={{ maxWidth: 700, margin: '30px auto', padding: 20 }}>
      <Head>
        <title>글자 수 세기 | 자소서/블로그 검토</title>
        <meta name="description" content="공백 포함/제외 글자 수를 계산하는 웹 도구. 자기소개서, 기사, 블로그 작성 시 글자 제한 확인용." />
      </Head>
      <nav>
        <a href="/">맞춤법 검사기</a> | <a href="/word-count">단어 수</a> | <a href="/char-count">글자 수</a> | <a href="/resume-analyzer">자소서 분석</a>
      </nav>
      <h1>✍️ 글자 수 세기</h1>
      <textarea rows={10} style={{ width: '100%' }} value={input} onChange={(e) => setInput(e.target.value)} />
      <p>공백 포함 글자 수: <strong>{withSpace}</strong></p>
      <p>공백 제외 글자 수: <strong>{withoutSpace}</strong></p>
    </div>
  );
}
