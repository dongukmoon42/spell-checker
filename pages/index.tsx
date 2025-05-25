// pages/index.tsx
import { useEffect, useState } from 'react';

type Rule = {
  wrong: string;
  correct: string;
};

export default function SpellChecker() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    fetch('/data/spellcheck_500.json')
      .then(res => res.json())
      .then(setRules)
      .catch(err => console.error('불러오기 오류:', err));
  }, []);

  const checkSpelling = (text: string): string => {
    let corrected = text;
    rules.forEach(rule => {
      const regex = new RegExp(rule.wrong, 'g');
      corrected = corrected.replace(regex, rule.correct);
    });
    return corrected;
  };

  const handleCheck = () => {
    const corrected = checkSpelling(input);
    setOutput(corrected);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>🥴 맞춤법 검사기 (Next.js)</h1>

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

      <button onClick={handleCheck} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        검사하기
      </button>

      <div style={{ marginTop: '20px', padding: '15px', background: '#eaf4ff', borderRadius: '8px' }}>
        <strong>🔧 수정된 문장:</strong>
        <pre>{output || '수정할 표현이 없습니다.'}</pre>
      </div>
    </div>
  );
}
