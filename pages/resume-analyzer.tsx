// pages/resume-analyzer.tsx
import { useState } from 'react';

export default function ResumeAnalyzer() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState('');

  const analyze = () => {
    const sentences = input
      .replace(/([.!?])(?=\s|$)/g, '$1|')
      .split('|')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const totalLength = sentences.reduce((sum, s) => sum + s.replace(/\s/g, '').length, 0);
    const avgLength = sentences.length > 0 ? (totalLength / sentences.length).toFixed(1) : '0';

    const endings = ['입니다', '합니다', '습니다', '있습니다', '하고 있습니다'];
    const endingCount: Record<string, number> = {};
    endings.forEach(end => {
      const match = input.match(new RegExp(end, 'g'));
      endingCount[end] = match ? match.length : 0;
    });

    const keywordList = ['열정', '책임감', '도전', '소통', '창의'];
    const keywordCount: Record<string, number> = {};
    keywordList.forEach(word => {
      const match = input.match(new RegExp(word, 'g'));
      keywordCount[word] = match ? match.length : 0;
    });

    let shortCount = 0;
    let longCount = 0;
    const minLen = 10;
    const maxLen = 40;

    const highlighted = sentences.map(s => {
      const len = s.replace(/\s/g, '').length;
      let colored = s;
      if (len < minLen) {
        colored = `<span style="background-color:#fff6b3">${s}</span>`;
        shortCount++;
      } else if (len > maxLen) {
        colored = `<span style="background-color:#b9fbc0">${s}</span>`;
        longCount++;
      }
      return colored;
    }).join(' ');

    let marked = highlighted;

    Object.entries(keywordCount).forEach(([word, count]) => {
      if (count > 0) {
        const regex = new RegExp(word, 'g');
        marked = marked.replace(regex, `<span style="background-color:#ffa7a7">${word}</span>`);
      }
    });

    const result = `
      <strong>📊 분석 결과</strong><br />
      • 총 문장 수: ${sentences.length}<br />
      • 평균 문장 길이: ${avgLength}자<br />
      • 자주 쓰는 어미: ${Object.entries(endingCount)
        .filter(([, v]) => v > 0)
        .map(([k, v]) => `${k} (${v}회)`).join(', ') || '없음'}<br />
      • 특정 단어 빈도: ${Object.entries(keywordCount)
        .filter(([, v]) => v > 0)
        .map(([k, v]) => `${k} (${v}회)`).join(', ') || '없음'}<br />
      • 긴 문장: ${longCount}개, 짧은 문장: ${shortCount}개
    `;

    setAnalysis(result + '<br /><br />' + marked);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📄 자소서 문장 분석기</h1>
      <textarea
        rows={10}
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
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
        style={{ marginTop: '20px', padding: '15px', background: '#f4f4f4', borderRadius: '8px' }}
        dangerouslySetInnerHTML={{ __html: analysis }}
      />
    </div>
  );
}
