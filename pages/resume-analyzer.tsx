// pages/resume-analyzer.tsx
import { useState } from 'react';

export default function ResumeAnalyzer() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState('');

  const analyze = () => {
    const sentences = input
      .replace(/([.!?])(?!\s|$)/g, '$1 ')
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const sentenceCount = sentences.length;
    const charCount = input.replace(/\s/g, '').length;
    const avgLength = sentenceCount ? (charCount / sentenceCount).toFixed(1) : 0;

    const endingPatterns = ['입니다', '습니다', '있습니다'];
    const endingCounts = endingPatterns.map(ending => {
      const regex = new RegExp(ending, 'g');
      return { ending, count: (input.match(regex) || []).length };
    });

    const keywords = ['열정', '책임감', '성장'];
    const keywordCounts = keywords.map(word => {
      const regex = new RegExp(word, 'g');
      return { word, count: (input.match(regex) || []).length };
    });

    const longSentences = sentences.filter(s => s.length > 40);
    const shortSentences = sentences.filter(s => s.length < 10);

    const typoPatterns: Record<string, string> = {
      '않니다': '않습니다',
      '잇습니다': '있습니다',
      '되요': '돼요',
      '안되': '안 돼'
    };

    let highlightedText = input;
    Object.entries(typoPatterns).forEach(([wrong, correct]) => {
      const regex = new RegExp(wrong, 'g');
      highlightedText = highlightedText.replace(regex, `<span style="background-color:#d1b3ff">${wrong}</span>`);
    });

    keywordCounts.forEach(({ word, count }) => {
      if (count >= 4) {
        const regex = new RegExp(word, 'g');
        highlightedText = highlightedText.replace(regex, `<span style="background-color:#ffa7a7">${word}</span>`);
      }
    });

    longSentences.forEach(s => {
      highlightedText = highlightedText.replace(s, `<span style="background-color:#b3ffb3">${s}</span>`);
    });

    shortSentences.forEach(s => {
      highlightedText = highlightedText.replace(s, `<span style="background-color:#ffffcc">${s}</span>`);
    });

    const result = `
📊 <strong>분석 결과</strong><br/>
• 총 문장 수: ${sentenceCount}<br/>
• 평균 문장 길이: ${avgLength}자<br/>
• 자주 쓰는 어미: ${endingCounts.map(e => `${e.ending} (${e.count}회)`).join(', ')}<br/>
• 특정 단어 빈도: ${keywordCounts.map(k => `${k.word}: ${k.count}회`).join(', ') || '없음'}<br/>
• 긴 문장: ${longSentences.length}개, 짧은 문장: ${shortSentences.length}개<br/><br/>
<em>※ 기준: 긴 문장(40자 이상), 짧은 문장(10자 이하), 특정 단어 4회 이상 강조</em>
    `;

    setAnalysis(result);
    setInput(highlightedText);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>📄 자소서 문장 분석기</h1>

      <nav style={{ marginBottom: '20px', backgroundColor: '#e6ffe6', padding: '12px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '16px', fontWeight: 500 }}>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>맞춤법 검사기</a>
        <a href="/word-count" style={{ color: '#0070f3', textDecoration: 'none' }}>단어 수 세기</a>
        <a href="/char-count" style={{ color: '#0070f3', textDecoration: 'none' }}>글자 수 세기</a>
        <a href="/resume-analyzer" style={{ color: '#0070f3', textDecoration: 'none' }}>자소서 분석기</a>
      </nav>

      <div style={{ backgroundColor: '#cce5ff', padding: '12px', textAlign: 'center', marginBottom: '15px', borderRadius: '6px', border: '1px dashed #0070f3' }}>
        <img src="/ad-placeholder.png" alt="자기소개서 관련 추천 광고" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>

      <textarea
        rows={10}
        style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '6px', whiteSpace: 'pre-wrap' }}
        placeholder="여기에 텍스트를 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={analyze} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}>분석하기</button>

      <div style={{ backgroundColor: '#f0f8ff', padding: '15px', marginTop: '20px', borderRadius: '8px', whiteSpace: 'pre-wrap', fontSize: '15px' }} dangerouslySetInnerHTML={{ __html: analysis }} />
    </div>
  );
}
