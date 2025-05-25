// ✅ pages/index.tsx (맞춤법 검사기)
import { useState, useRef } from 'react';
import Link from 'next/link';
import spellcheckDataRaw from '../public/data/spellcheck_500.json';

const spellcheckData: Record<string, string> = spellcheckDataRaw as any;

export default function Home() {
  const [input, setInput] = useState('');
  const [highlighted, setHighlighted] = useState('');
  const [corrected, setCorrected] = useState('');
  const correctedRef = useRef<HTMLDivElement>(null);

  const checkSpelling = () => {
    let result = input;
    let fixed = input;
    let found = false;

    for (const wrong in spellcheckData) {
      const correct = spellcheckData[wrong];
      const regex = new RegExp(`(?:\\s|^)${wrong}(?=\\s|[.,!?\\n]|$)`, 'g');

      if (regex.test(result)) {
        found = true;
        result = result.replace(regex, `<mark>${wrong}</mark>`);
        fixed = fixed.replace(regex, ` ${correct}`);
      }
    }

    setHighlighted(
      found
        ? result + '<br/><br/><strong>❗ 표시된 단어는 자주 틀리는 표현일 수 있어요.</strong>'
        : '오타나 자주 틀리는 표현을 찾지 못했어요.'
    );
    setCorrected(found ? `🛠 수정된 문장:\n${fixed}` : '수정할 표현이 없습니다.');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>🧐 맞춤법 검사기 (Next.js)</h1>

      <nav style={{ marginBottom: '20px', backgroundColor: '#e6ffe6', padding: '12px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '16px', fontWeight: 500 }}>
        <Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>맞춤법 검사기</Link>
        <Link href="/word-count" style={{ color: '#0070f3', textDecoration: 'none' }}>단어 수 세기</Link>
        <Link href="/char-count" style={{ color: '#0070f3', textDecoration: 'none' }}>글자 수 세기</Link>
        <Link href="/resume-analyzer" style={{ color: '#0070f3', textDecoration: 'none' }}>자소서 분석기</Link>
      </nav>

      <div style={{ backgroundColor: '#cce5ff', padding: '12px', textAlign: 'center', marginBottom: '15px', borderRadius: '6px', border: '1px dashed #0070f3' }}>
        <img src="/ad-placeholder.png" alt="광고 영역" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>

      <textarea
        rows={6}
        style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '6px' }}
        placeholder="여기에 텍스트를 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div style={{ marginTop: '10px' }}>
        <button onClick={checkSpelling} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '6px' }}>
          검사하기
        </button>
      </div>

      <div
        style={{ marginTop: '20px', padding: '15px', background: '#e3f2fd', borderRadius: '8px', lineHeight: '1.7' }}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />

      <div
        style={{ marginTop: '10px', padding: '15px', background: '#e8f5e9', borderRadius: '8px', whiteSpace: 'pre-line' }}
        ref={correctedRef}
      >
        {corrected}
      </div>
    </div>
  );
}
