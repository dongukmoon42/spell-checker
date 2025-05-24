// pages/index.tsx
import { useState, useRef } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [highlighted, setHighlighted] = useState('');
  const [corrected, setCorrected] = useState('');
  const correctedRef = useRef<HTMLDivElement>(null);

  const patterns: Record<string, string> = {
    "되요": "돼요",
    "안되": "안 돼",
    "왠지": "왜인지",
    "잇습니다": "있습니다",
    "하겠읍니다": "하겠습니다"
  };

  const checkSpelling = () => {
    let result = input;
    let fixed = input;
    let found = false;

    for (const wrong in patterns) {
      const correct = patterns[wrong];
      const regex = new RegExp(wrong, 'g');
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
    <div style={{ maxWidth: '700px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🧐 맞춤법 검사기 (Next.js)</h1>
      
      <nav>
        <a href="/">맞춤법 검사기</a> | <a href="/word-count">단어 수</a> | <a href="/char-count">글자 수</a> | <a href="/resume-analyzer">자소서 분석</a>
      </nav>

      <textarea
        rows={10}
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="여기에 텍스트를 입력하세요..."
      />
      <button
        onClick={checkSpelling}
        style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}>
        검사하기
      </button>
      <div
        style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}
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
// for vercel redeploy
// redeploy test

