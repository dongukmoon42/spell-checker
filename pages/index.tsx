// pages/index.tsx
// ✅ 수정 파일: pages/index.tsx
import Link from 'next/link';
import { useState } from 'react';
import fs from 'fs';
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

  const handleCheck = () => {
    let corrected = input;
    const highlighted: string[] = [];

    corrections.forEach(({ wrong, correct }) => {
      const regex = new RegExp(wrong, 'gi');
      if (regex.test(corrected)) {
        highlighted.push(wrong);
        corrected = corrected.replace(regex, `<span style="background-color: #ffb3b3">${correct}</span>`);
      }
    });

    setOutput(
      highlighted.length > 0
        ? `❗ 표시된 단어는 자주 틀리는 표현일 수 있어요.<br/><br/><strong>🔧 수정된 문장:</strong><br/>${corrected}`
        : '오타나 자주 틀리는 표현을 찾지 못했어요.'
    );
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>🤪 맞춤법 검사기 (Next.js)</h1>

      <nav style={{ marginBottom: '20px', backgroundColor: '#d7ffd9', padding: '12px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '16px', fontWeight: 500 }}>
        <Link href="/">맞춤법 검사기</Link>
        <Link href="/word-count">단어 수 세기</Link>
        <Link href="/char-count">글자 수 세기</Link>
        <Link href="/resume-analyzer">자소서 분석기</Link>
      </nav>

      <div style={{ backgroundColor: '#cce5ff', padding: '12px', textAlign: 'center', marginBottom: '15px', borderRadius: '6px', border: '1px dashed #0070f3' }}>
        <img src="/ad-placeholder.png" alt="광고 영역" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>

      <textarea
        rows={10}
        style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '6px' }}
        placeholder="여기에 텍스트를 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleCheck}
        style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', borderRadius: '6px', backgroundColor: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        검사하기
      </button>

      <div style={{ marginTop: '20px', padding: '15px', background: '#e6f7ff', borderRadius: '6px' }}>
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>

      {output && output.includes('<span') && (
        <button
          style={{ marginTop: '10px', padding: '8px 16px', fontSize: '14px', backgroundColor: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          onClick={() => navigator.clipboard.writeText(output.replace(/<[^>]+>/g, ''))}
        >
          📋 수정된 문장 복사하기
        </button>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'public', 'data', 'spellcheck_500.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const corrections = JSON.parse(fileContent);
  return {
    props: { corrections },
  };
};
