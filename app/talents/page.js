import Image from 'next/image';
import Link from 'next/link';

const navStyle = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeight: 300,
  fontSize: '11px',
  letterSpacing: '0.05em',
  color: '#000',
  textDecoration: 'none',
};

export default function Talents() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" style={navStyle}>shop</a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" style={navStyle}>sell</a>
        </div>
        <Link href="/account" style={navStyle}>account</Link>
      </nav>

      {/* CONTENT */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px', textAlign: 'center' }}>

        <div style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 300,
          fontSize: '11px',
          lineHeight: '16px',
          letterSpacing: '0.05em',
          maxWidth: '280px',
          marginBottom: '40px',
        }}>
          <p style={{ marginBottom: '16px' }}>
            Major is a practice in execution.
          </p>
          <p style={{ marginBottom: '16px' }}>
            At the intersection of academic rigor and cultural currency, our vision is built into our infrastructure.
          </p>
          <p style={{ marginBottom: '16px' }}>
            Major operates as a high-stakes playground for a collective of multifaceted students bridging theoretical study and high-level output.
          </p>
          <p>
            We serve as the vehicle for those who view their career as a craft. Whether you are here to substantiate a portfolio or pivot your discipline into a new medium, we provide the architecture for the next generation of industry leaders.
          </p>
        </div>

        {/* FIXED IMAGE PATH */}
        <div style={{ position: 'relative', width: '200px', height: '210px', marginBottom: '32px' }}>
          <Image
            src="/images/talents-photo.png" 
            alt="major talents"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <p style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 300,
          fontSize: '11px',
          lineHeight: '16px',
          letterSpacing: '0.05em',
          color: '#000',
        }}>
          talent scouting has been paused.
        </p>

      </main>

      {/* FOOTER */}
      <footer style={{ display: 'flex', justifyContent: 'center', padding: '18px 24px' }}>
        <Link href="/" style={navStyle}>← back</Link>
      </footer>

    </div>
  );
}
