// pages/word-count.tsx
import { useState } from 'react';
import Head from 'next/head';

export default function WordCount() {
  const [input, setInput] = useState('');
  const wordCount = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;

  return (
    <div style={{ maxWidth: 700, margin: '30px auto', padding: 20 }}>
      <Head>
        <title>단어 수 세기 | 글쓰기 도구</title>
        <meta name="description" content="입력한 텍스트의 단어 수를 실시간으로 계산합니다. 자소서, 블로그, 과제 글자 수 확인용 도구." />
      </Head>
      <nav>
        <a href="/">맞춤법 검사기</a> | <a href="/word-count">단어 수</a> | <a href="/char-count">글자 수</a> | <a href="/resume-analyzer">자소서 분석</a>
      </nav>
      <h1>🔢 단어 수 세기</h1>
      <textarea rows={10} style={{ width: '100%' }} value={input} onChange={(e) => setInput(e.target.value)} />
      <p>총 단어 수: <strong>{wordCount}</strong></p>
    </div>
  );
}
