// ✅ 파일: pages/resume-analyzer.tsx
import { useState } from 'react';
import Link from 'next/link';

export default function ResumeAnalyzer() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState('');

  const analyze = () => {
    const sentences = input.split(/(?<=[.!?\n])/).map(s => s.trim()).filter(Boolean);
    const sentenceLengths = sentences.map(s => s.replace(/\s/g, '').length);
    const avgLength = sentenceLengths.length ? (sentenceLengths.reduce((a, b) => a + b) / sentenceLengths.length).toFixed(1) : '0';

    const endings = ['입니다', '습니다', '합니다'];
    const endingCount: Record<string, number> = {};
    endings.forEach(end => {
      endingCount[end] = (input.match(new RegExp(end, 'g')) || []).length;
    });

    const wordFreq: Record<string, number> = {};
    input.replace(/[.,!?\n]/g, '').split(/\s+/).forEach(word => {
      if (!wordFreq[word]) wordFreq[word] = 0;
      wordFreq[word]++;
    });

    const topWords = Object.entries(wordFreq)
      .filter(([, count]) => count >= 4)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);

    const longSentences = sentences.filter(s => s.replace(/\s/g, '').length > 80);
    const shortSentences = sentences.filter(s => s.replace(/\s/g, '').length < 15);

    let highlighted = input;
    topWords.forEach(([word]) => {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span style="background-color:#ffa7a7">${word}</span>`);
    });
    longSentences.forEach(s => {
      highlighted = highlighted.replace(s, `<span style="background-color:#ccffcc">${s}</span>`);
    });
    shortSentences.forEach(s => {
      highlighted = highlighted.replace(s, `<span style="background-color:#ffffaa">${s}</span>`);
    });

    const analysisText = `
=== 분석결과 =============================\n
평균 문장 길이 : ${avgLength}자\n
자주 쓰는 어미 분석 : ${endings.map(e => `${e} (${endingCount[e]}회)`).join(', ')}\n
특정 단어 사용 빈도 : ${topWords.map(([w, c]) => `${w}: ${c}회`).join(', ')}\n
너무 긴 문장: ${longSentences.length}개, 짧은 문장: ${shortSentences.length}개\n
(※ 특정 단어는 4회 이상 사용 시 강조됨)\n==========================================
    `;

    setAnalysis(`<div style="white-space: pre-wrap;">${highlighted}</div><br/><pre>${analysisText}</pre>`);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>📄 자소서 분석기</h1>

      <nav style={{ marginBottom: '20px', backgroundColor: '#e6ffe6', padding: '12px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '16px', fontWeight: 500 }}>
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
        onClick={analyze}
        style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}>
        분석하기
      </button>

      <div
        style={{ marginTop: '20px', padding: '15px', background: '#fffbe6', borderRadius: '8px' }}
        dangerouslySetInnerHTML={{ __html: analysis }}
      />
    </div>
  );
}
