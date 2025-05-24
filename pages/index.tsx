// pages/index.tsx
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [highlighted, setHighlighted] = useState('');
  const [corrected, setCorrected] = useState('');
  const [patterns, setPatterns] = useState<Record<string, string>>({});
  const correctedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/korean_spelling_patterns.json')
      .then(res => res.json())
      .then(data => setPatterns(data))
      .catch(err => console.error('패턴 로딩 실패:', err));
  }, []);

  const checkSpelling = () => {
    let result = input;
    let fixed = input;
    let found = false;

    for (const wrong in patterns) {
      const correct = patterns[wrong];
      const regex = new RegExp(`\\b${wrong}\\b`, 'g');
      if (regex.test(result)) {
        found = true;
        result = result.replace(regex, `<mark>${wrong}</mark>`);
        fixed = fixed.replace(regex, correct);
      }
    }

    setHighlighted(
      found
        ? result + '<br><br><strong>❗ 표시된 단어는 자주 틀리는 표현일 수 있어요.</strong>'
        : '오타나 자주 틀리는 표현을 찾지 못했어요.'
    );

    setCorrected(found ? fixed : '수정할 표현이 없습니다.');
  };

  const copyCorrectedText = () => {
    if (correctedRef.current) {
      const text = correctedRef.current.innerText.replace('🔧 수정된 문장:\n', '').trim();
      navigator.clipboard.writeText(text).then(() => {
        alert('수정된 문장이 복사되었습니다!');
      });
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>🧐 맞춤법 검사기 (Next.js)</h1>

      <nav style={{ marginBottom: '20px', backgroundColor: '#e6ffe6', padding: '12px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '16px', fontWeight: 500 }}>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>맞춤법 검사기</a>
        <a href="/word-count" style={{ color: '#0070f3', textDecoration: 'none' }}>단어 수 세기</a>
        <a href="/char-count" style={{ color: '#0070f3', textDecoration: 'none' }}>글자 수 세기</a>
        <a href="/resume-analyzer" style={{ color: '#0070f3', textDecoration: 'none' }}>자소서 분석기</a>
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

      <button onClick={checkSpelling} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}>검사하기</button>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />

      <div
        ref={correctedRef}
        style={{ marginTop: '10px', padding: '15px', background: '#e2f0ff', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
        <strong>🔧 수정된 문장:</strong><br />{corrected}
      </div>

      <button
        onClick={copyCorrectedText}
        style={{ marginTop: '10px', padding: '8px 15px', fontSize: '14px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px' }}>
        📋 수정된 문장 복사하기
      </button>
    </div>
  );
}
