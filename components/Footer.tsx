// components/Footer.tsx
export default function Footer() {
  return (
    <footer style={{
      marginTop: '60px',
      padding: '20px',
      fontSize: '14px',
      textAlign: 'center',
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      borderTop: '1px solid #ccc'
    }}>
      <p>
        <a href="/terms" style={{ marginRight: '15px' }}>이용약관</a>
        <a href="/privacy" style={{ marginRight: '15px' }}>개인정보처리방침</a>
        <a href="/contact">문의하기</a>
      </p>
      <p style={{ marginTop: '10px' }}>© 2025 맞춤형 글 도구</p>
    </footer>
  );
}
