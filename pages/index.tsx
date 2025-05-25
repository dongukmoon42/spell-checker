// pages/index.tsx

import { useState, useEffect } from 'react';
import path from 'path';
import { GetStaticProps } from 'next';

interface CorrectionPair {
  wrong: string;
  correct: string;
}

interface HomeProps {
  corrections: CorrectionPair[];
}

export default function Home({ corrections }: HomeProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [highlightedOutput, setHighlightedOutput] = useState('');

  const handleCheck = () => {
    let corrected = input;
    let highlighted = input;

    corrections.forEach(({ wrong, correct }) => {
      const regex = new RegExp(`\\b${wrong}\\b`, 'g');
      corrected = corrected.replace(regex, correct);
      highlighted = highlighted.replace(regex, `<span style="background-color:#ffb3b3">${wrong}</span>`);
    });

    setOutput(corrected);
    setHighlightedOutput(highlighted);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>🤯 맞춤법 검사기 (Next.js)</h1>

      <nav style={{ marginBottom: '20px', backgroundColor: '#d6f5d6', padding: '12px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '16px', fontWeight: 500 }}>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>맞춤법 검사기</a>
        <a href="/word-count" style={{ color: '#0070f3', textDecoration: 'none' }}>단어 수 세기</a>
        <a href="/char-count" style={{ color: '#0070f3', textDecoration: 'none' }}>글자 수 세기</a>
        <a href="/resume-analyzer" style={{ color: '#0070f3', textDecoration: 'none' }}>자소서 분석기</a>
      </nav>

      <div style={{ backgroundColor: '#cce5ff', padding: '12px', textAlign: 'center', marginBottom: '15px', borderRadius: '6px', border: '1px dashed #0070f3' }}>
        <img src="/ad-placeholder.png" alt="광고 영역" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>

      <textarea
        rows={6}
        placeholder="여기에 텍스트를 입력하세요..."
        style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '6px' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleCheck}
        style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        검사하기
      </button>

      <div style={{ marginTop: '20px', padding: '15px', background: '#e6f7ff', borderRadius: '8px' }}>
        <h3>🔧 수정된 문장:</h3>
        <p>{output || '수정할 표현이 없습니다.'}</p>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#fffbe6', borderRadius: '8px' }}>
        <h3>❗ 하이라이트:</h3>
        <div dangerouslySetInnerHTML={{ __html: highlightedOutput }} />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fs = require('fs');
  const correctionsPath = path.join(process.cwd(), 'public', 'data', 'spellcheck_500.json');
  const corrections = JSON.parse(fs.readFileSync(correctionsPath, 'utf-8'));
  return {
    props: {
      corrections,
    },
  };
};
