import Link from 'next/link';

const navStyle = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeight: 300,
  fontSize: '11px',
  letterSpacing: '0.05em',
  color: '#000',
  textDecoration: 'none',
};

export default function About() {
  return (
    /* ADDED THE CLASS HERE */
    <div className="page-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" style={navStyle}>shop</a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" style={navStyle}>sell</a>
        </div>
        <Link href="/account" style={navStyle}>account</Link>
      </nav>

      {/* CONTENT */}
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '60px 24px', 
        textAlign: 'center' 
      }}>

        {/* LOGO TEXT PLACEHOLDER */}
        <div style={{ 
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: '11px', 
          letterSpacing: '0.12em', 
          textTransform: 'uppercase', 
          marginBottom: '48px',
          fontWeight: 400
        }}>
          major
        </div>

        {/* ABOUT TEXT */}
        <div style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 300,
          fontSize: '11px',
          lineHeight: '20px',
          letterSpacing: '0.05em',
          maxWidth: '420px',
          color: '#000'
        }}>
          <p style={{ marginBottom: '24px' }}>
            We provide the platform to acquire and sell essentials at subsidized rates with environmental consciousness in mind.
          </p>
          
          <p style={{ marginBottom: '24px' }}>
            Textbooks, lab equipment, game day merch, dorm decor, calculators, bikes, even someone to braid your hair or do your lashes. <br />
            Major started at the end of 2023 as an observation of necessity.
          </p>
          
          <p style={{ marginBottom: '24px' }}>
            Our founder watched students scavenge for art materials to keep up with their projects. Later, home in Los Angeles, she saw some students fail quizzes simply because they could not afford the textbook. She personally bought a plethora of books only to read a single chapter. Later she became aware of the millions of tons of waste each year from dorm essentials and these books, that many cannot afford, harming our world and student potential.
          </p>
          
          <p>
            The need for a campus ecosystem infrastructure was universal, even if the exact material needs or reasons for need differed across demographics. So our founder built a singular, transferable infrastructure, a constant for students no matter the campus.
          </p>
        </div>

      </main>

      {/* FOOTER */}
      <footer style={{ display: 'flex', justifyContent: 'center', padding: '32px 24px' }}>
        <Link href="/" style={navStyle}>← back</Link>
      </footer>

    </div>
  );
}
