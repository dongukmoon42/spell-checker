// ✅ 파일: pages/resume-analyzer.tsx

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ResumeAnalyzer() {
  const [input, setInput] = useState('');
  const [highlighted, setHighlighted] = useState('');
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    const analyzeText = () => {
      if (!input) {
        setHighlighted('');
        setAnalysis('');
        return;
      }

      const sentences = input.match(/[^.!?\n]+[.!?]*/g) || [];
      const totalSentences = sentences.length;
      const cleanSentences = sentences.map((s) => s.trim().replace(/\s+/g, ''));
      const avgLength = cleanSentences.length
        ? Math.round(cleanSentences.reduce((a, b) => a + b.length, 0) / cleanSentences.length)
        : 0;

      const endings = ['입니다', '습니다', '합니다', '있습니다'];
      const endingCounts = endings.map((ending) => {
        const count = (input.match(new RegExp(ending, 'g')) || []).length;
        return `${ending} (${count}회)`;
      });

      const wordFreq: Record<string, number> = {};
      const words = input.match(/\b[가-힣a-zA-Z]{2,}\b/g) || [];
      words.forEach((word) => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      });

      const commonWords = Object.entries(wordFreq)
        .filter(([_, count]) => count >= 4)
        .sort((a, b) => b[1] - a[1]);

      let highlightedText = input;
      commonWords.forEach(([word]) => {
        highlightedText = highlightedText.replaceAll(
          new RegExp(`(${word})`, 'g'),
          '<span style="background-color:#ffa7a7">$1</span>'
        );
      });

      sentences.forEach((sentence) => {
        const length = sentence.replace(/\s/g, '').length;
        if (length >= 80) {
          highlightedText = highlightedText.replace(
            sentence,
            `<span style="background-color:#d4f4be">${sentence}</span>`
          );
        } else if (length <= 15) {
          highlightedText = highlightedText.replace(
            sentence,
            `<span style="background-color:#ffffcc">${sentence}</span>`
          );
        }
      });

      const result = `✅ 총 문장 수: ${totalSentences}\n✅ 평균 문장 길이 (공백 제외): ${avgLength}자\n✅ 자주 쓰는 어미: ${endingCounts.join(', ')}\n✅ 특정 단어 빈도(4회 이상): ${commonWords
        .map(([w, c]) => `${w}: ${c}회`)
        .join(', ') || '없음'}\n✅ 긴 문장: ${sentences.filter((s) => s.replace(/\s/g, '').length >= 80).length}개, 짧은 문장: ${sentences.filter(
        (s) => s.replace(/\s/g, '').length <= 15
      ).length}개`;

      setHighlighted(highlightedText);
      setAnalysis(result);
    };

    analyzeText();
  }, [input]);

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>📄 자소서 문장 분석기</h1>

      <nav style={{ marginBottom: '20px', backgroundColor: '#e6ffe6', padding: '12px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '16px', fontWeight: 500 }}>
        <Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>맞춤법 검사기</Link>
        <Link href="/word-count" style={{ color: '#0070f3', textDecoration: 'none' }}>단어 수 세기</Link>
        <Link href="/char-count" style={{ color: '#0070f3', textDecoration: 'none' }}>글자 수 세기</Link>
        <Link href="/resume-analyzer" style={{ color: '#0070f3', textDecoration: 'none' }}>자소서 분석기</Link>
      </nav>

      <div style={{ backgroundColor: '#cce5ff', padding: '12px', textAlign: 'center', marginBottom: '15px', borderRadius: '6px', border: '1px dashed #0070f3' }}>
        <Image src="/ad-placeholder.png" alt="광고 영역" width={600} height={80} />
      </div>

      <textarea
        rows={10}
        placeholder="여기에 텍스트를 입력하세요..."
        style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '6px' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div
        style={{ marginTop: '20px', background: '#fffbe6', padding: '12px', borderRadius: '6px', whiteSpace: 'pre-wrap' }}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />

      <div style={{ marginTop: '15px', background: '#e6f7ff', padding: '12px', borderRadius: '6px', whiteSpace: 'pre-wrap' }}>
        {analysis}
      </div>
    </div>
  );
}
