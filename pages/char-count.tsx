// ✅ pages/char-count.tsx
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CharCount() {
  const [input, setInput] = useState('');

  const countChars = (text: string) => {
    return text.replace(/\s/g, '').length;
  };

  const totalChars = countChars(input);

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: 'var(--background)', color: 'var(--foreground)', borderRadius: '10px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>✍️ 글자 수 세기</h1>

      <nav style={{ marginBottom: '20px', backgroundColor: '#e6ffe6', padding: '12px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '16px', fontWeight: 500 }}>
        <Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>맞춤법 검사기</Link>
        <Link href="/word-count" style={{ color: '#0070f3', textDecoration: 'none' }}>단어 수 세기</Link>
        <Link href="/char-count" style={{ color: '#0070f3', textDecoration: 'none' }}>글자 수 세기</Link>
        <Link href="/resume-analyzer" style={{ color: '#0070f3', textDecoration: 'none' }}>자소서 분석기</Link>
      </nav>

      <div style={{ backgroundColor: 'var(--ad-bg)', padding: '12px', textAlign: 'center', marginBottom: '15px', borderRadius: '6px', border: '1px dashed #0070f3' }}>
        <Image src="/ad-placeholder.png" alt="광고 영역" width={600} height={60} style={{ height: 'auto' }} />
      </div>

      <textarea
        rows={10}
        style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '6px', backgroundColor: 'var(--textarea-bg)', color: 'var(--foreground)' }}
        placeholder="여기에 텍스트를 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>총 글자 수 (공백 제외): <span style={{ color: '#0070f3' }}>{totalChars}</span></p>
    </div>
  );
}
