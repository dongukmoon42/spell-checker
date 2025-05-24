// pages/resume-analyzer.tsx
import { useState, useRef } from 'react';

const resumeKeywords = [
  "열정", "책임감", "성장", "소통", "도전", "협업", "창의성", "노력", "성실", "변화",
  "목표", "문제해결", "경험", "학습", "주도성", "조직", "성과", "고객", "분석", "전문성"
];

export default function ResumeAnalyzer() {
  const [input, setInput] = useState('');
  const [highlighted, setHighlighted] = useState('');
  const [analysis, setAnalysis] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  const analyze = () => {
    const sentences = input
      .replace(/([.!?])(?=\s|$)/g, '$1|')
      .split('|')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const total = sentences.length;
    const totalLength = sentences.reduce((acc, cur) => acc + cur.replace(/\s/g, '').length, 0);
    const avgLength = total > 0 ? (totalLength / total).toFixed(1) : 0;

    const endingCounts: Record<string, number> = { '입니다': 0, '습니다': 0, '있습니다': 0 };
    sentences.forEach(s => {
      Object.keys(endingCounts).forEach(end => {
        if (s.endsWith(end)) endingCounts[end]++;
      });
    });

    const keywordCounts: Record<string, number> = {};
    resumeKeywords.forEach(k => {
      const re = new RegExp(k, 'g');
      const count = (input.match(re) || []).length;
      if (count > 0) keywordCounts[k] = count;
    });

    const longSentences = sentences.filter(s => s.replace(/\s/g, '').length > 40);
    const shortSentences = sentences.filter(s => s.replace(/\s/g, '').length < 10);

    const typoPatterns: Record<string, string> = {
      '않니다': '않습니다',
      '잇습니다': '있습니다',
      '되요': '돼요',
      '안되': '안 돼'
    };

    let marked = input;
    Object.entries(typoPatterns).forEach(([wrong, correct]) => {
      marked = marked.replace(new RegExp(wrong, 'g'), `<span style="background-color:#d1b3ff">${wrong}</span>`);
    });
    Object.entries(keywordCounts).forEach(([word]) => {
      marked = marked.replace(new RegExp(word, 'g'), `<span style="background-color:#ffe6e6">${word}</span>`);
    });
    longSentences.forEach(s => {
      marked = marked.replace(s, `<span style="background-color:#b3f7c8">${s}</span>`);
    });
    shortSentences.forEach(s => {
      marked = marked.replace(s, `<span style="background-color:#ffff99">${s}</span>`);
    });

    setHighlighted(marked);

    setAnalysis(`
      <p><strong>📊 분석 결과</strong></p>
      <ul>
        <li>총 문장 수: ${total}</li>
        <li>평균 문장 길이: ${avgLength}자</li>
        <li>자주 쓰는 어미: 입니다 (${endingCounts['입니다']}회), 습니다 (${endingCounts['습니다']}회), 있습니다 (${endingCounts['있습니다']}회)</li>
        <li>자주 쓰는 자소서 키워드: ${Object.entries(keywordCounts).map(([k, v]) => `${k} (${v}회)`).join(', ') || '없음'}</li>
        <li>긴 문장: ${longSentences.length}개, 짧은 문장: ${shortSentences.length}개</li>
      </ul>
      <p style="font-size:13px; color:#666">※ 기준: 긴 문장(40자 이상), 짧은 문장(10자 이하), 자소서 키워드 1회 이상 강조</p>
    `);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>📄 자소서 문장 분석기</h1>

      <nav style={{ marginBottom: '20px', backgroundColor: '#ccffcc', padding: '12px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '16px', fontWeight: 500 }}>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>맞춤법 검사기</a>
        <a href="/word-count" style={{ color: '#0070f3', textDecoration: 'none' }}>단어 수 세기</a>
        <a href="/char-count" style={{ color: '#0070f3', textDecoration: 'none' }}>글자 수 세기</a>
        <a href="/resume-analyzer" style={{ color: '#0070f3', textDecoration: 'none' }}>자소서 분석기</a>
      </nav>

      <div style={{ backgroundColor: '#e6f2ff', padding: '12px', textAlign: 'center', marginBottom: '15px', borderRadius: '6px', border: '1px dashed #0070f3' }}>
        <img src="/ad-placeholder.png" alt="자기소개서 관련 추천 광고" style={{ maxWidth: '100%', height: 'auto' }} />
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

      <div style={{ marginTop: '20px', backgroundColor: '#e6f7ff', padding: '12px', borderRadius: '8px' }} dangerouslySetInnerHTML={{ __html: analysis }}></div>

      <div
        ref={resultRef}
        style={{ marginTop: '20px', backgroundColor: '#fff', padding: '15px', borderRadius: '6px', whiteSpace: 'pre-wrap', lineHeight: '1.5', border: '1px solid #ddd' }}
        dangerouslySetInnerHTML={{ __html: highlighted }}>
      </div>
    </div>
  );
}
