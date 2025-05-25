// ✅ pages/resume-analyzer.tsx
import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ResumeAnalyzer() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState('');

  const analyzeText = () => {
    const sentences = input.split(/[.!?\n]/).filter((s) => s.trim().length > 0);
    const sentenceCount = sentences.length;
    const totalLength = sentences.reduce((acc, s) => acc + s.replace(/\s/g, '').length, 0);
    const avgLength = sentenceCount > 0 ? (totalLength / sentenceCount).toFixed(1) : '0';

    const endings = ['입니다', '습니다', '합니다'];
    const endingCounts = endings.map((ending) => {
      const regex = new RegExp(ending, 'g');
      const count = (input.match(regex) || []).length;
      return `${ending} (${count}회)`;
    });

    const words = input.replace(/\n/g, ' ').split(/\s+/);
    const freqMap: Record<string, number> = {};
    words.forEach((word) => {
      if (word.length < 2) return;
      freqMap[word] = (freqMap[word] || 0) + 1;
    });

    const topWords = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .filter(([, count]) => count >= 4);

    let longCount = 0;
    let shortCount = 0;
    const sentenceHighlights = sentences.map((s) => {
      const len = s.replace(/\s/g, '').length;
      if (len > 40) {
        longCount++;
        return `<span style="background-color:#ccffcc">${s}</span>`;
      } else if (len < 15) {
        shortCount++;
        return `<span style="background-color:#ffffcc">${s}</span>`;
      } else {
        return s;
      }
    });

    let highlighted = sentenceHighlights.join('. ');
    topWords.forEach(([word]) => {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span style="background-color:#ffa7a7">${word}</span>`);
    });

    const result = `
      <strong>총 문장 수:</strong> ${sentenceCount}문장<br/>
      <strong>평균 문장 길이 (공백 제외):</strong> ${avgLength}자<br/>
      <strong>자주 쓰는 어미 분석:</strong> ${endingCounts.join(', ')}<br/>
      <strong>자주 쓰는 단어(4회 이상):</strong> ${topWords.map(([w, c]) => `${w} (${c}회)`).join(', ') || '없음'}<br/>
      <strong>너무 짧은 문장:</strong> ${shortCount}개, <strong>너무 긴 문장:</strong> ${longCount}개<br/>
      <small style="color:gray">※ 단어는 2글자 이상부터 카운트됩니다</small>
    `;

    setAnalysis(result);
  };

  return (
    <>
      <Head>
        <title>자소서 분석기 - 문장 길이, 어미, 단어 빈도 분석</title>
        <meta name="description" content="자기소개서 문장 구조를 분석하고 자주 쓰는 어미, 단어를 시각적으로 확인할 수 있는 분석기입니다." />
        <meta property="og:title" content="자소서 분석기" />
        <meta property="og:description" content="AI 기반 자소서 분석 도구로 완성도를 높여보세요." />
        <meta property="og:type" content="website" />
      </Head>

    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: 'var(--background)', color: 'var(--foreground)', borderRadius: '10px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>📊 자소서 문장 분석기</h1>

      <nav style={{ marginBottom: '20px', backgroundColor: '#e6ffe6', padding: '12px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '16px', fontWeight: 500 }}>
        <Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>맞춤법 검사기</Link>
        <Link href="/word-count" style={{ color: '#0070f3', textDecoration: 'none' }}>단어 수 세기</Link>
        <Link href="/char-count" style={{ color: '#0070f3', textDecoration: 'none' }}>글자 수 세기</Link>
        <Link href="/resume-analyzer" style={{ color: '#0070f3', textDecoration: 'none' }}>자소서 분석기</Link>
      </nav>

      <div style={{ backgroundColor: 'var(--ad-bg)', padding: '12px', textAlign: 'center', marginBottom: '15px', borderRadius: '6px', border: '1px dashed #0070f3' }}>
        <Image src="/ad-placeholder.png" alt="광고 영역" width={800} height={80} style={{ objectFit: 'contain' }} />
      </div>

      <textarea
        rows={10}
        style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '6px', backgroundColor: 'var(--textarea-bg)', color: 'var(--foreground)' }}
        placeholder="여기에 텍스트를 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={analyzeText} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '6px' }}>분석하기</button>

      <div style={{ marginTop: '20px', padding: '15px', background: 'var(--analyze-bg)', borderRadius: '8px' }} dangerouslySetInnerHTML={{ __html: analysis }} />
    </div>
    </>
  );
}