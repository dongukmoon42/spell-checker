// pages/resume-analyzer.tsx
import { useState } from 'react';
import Head from 'next/head';

export default function ResumeAnalyzer() {
  const [input, setInput] = useState('');
  const sentences = input.split(/[.!?\n]+/).filter(s => s.trim().length > 0);
  const totalChars = input.replace(/\s/g, '').length;
  const avgLength = sentences.length ? (totalChars / sentences.length).toFixed(1) : 0;
  const endings = input.match(/입니다|습니다|합니다|고 있습니다/g) || [];

  return (
    <div style={{ maxWidth: 700, margin: '30px auto', padding: 20 }}>
      <Head>
        <title>자소서 문장 분석기 | 문장 수 · 길이 분석</title>
        <meta name="description" content="자기소개서나 에세이 문장을 분석합니다. 문장 수, 평균 길이, 종결어미 사용 빈도까지 한눈에 확인하세요." />
      </Head>
      <nav>
        <a href="/">맞춤법 검사기</a> | <a href="/word-count">단어 수</a> | <a href="/char-count">글자 수</a> | <a href="/resume-analyzer">자소서 분석</a>
      </nav>
      <h1>📄 자소서 문장 분석기</h1>
      <textarea rows={10} style={{ width: '100%' }} value={input} onChange={(e) => setInput(e.target.value)} />
      <p>총 문장 수: <strong>{sentences.length}</strong></p>
      <p>평균 문장 길이 (공백 제외): <strong>{avgLength}자</strong></p>
      <p>'입니다/습니다/합니다' 사용 횟수: <strong>{endings.length}</strong></p>
    </div>
  );
}
