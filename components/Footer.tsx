// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: '60px',
        padding: '20px',
        fontSize: '14px',
        textAlign: 'center',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        borderTop: '1px solid #ccc',
      }}
    >
      <p>
        <Link href="/terms">
          <a style={{ marginRight: '15px' }}>이용약관</a>
        </Link>
        <Link href="/privacy">
          <a style={{ marginRight: '15px' }}>개인정보처리방침</a>
        </Link>
        <Link href="/contact">
          <a>문의하기</a>
        </Link>
      </p>
      <p style={{ marginTop: '10px' }}>© 티스토리 생활백서 </p>
    </footer>
  );
}