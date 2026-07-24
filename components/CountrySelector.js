'use client';

import { useState, useRef, useEffect } from 'react';

const COUNTRIES = [
  { code: 'US', name: 'USA', flag: '🇺🇸', language: 'English', currency: 'USD' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', language: 'Spanish', currency: 'ARS' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲', language: 'Armenian', currency: 'AMD' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', language: 'English', currency: 'AUD' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', language: 'German', currency: 'EUR' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸', language: 'English', currency: 'BSD' },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧', language: 'English', currency: 'BBD' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾', language: 'Belarusian', currency: 'BYN' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', language: 'French', currency: 'EUR' },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿', language: 'English', currency: 'BZD' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', language: 'Spanish', currency: 'BOB' },
  { code: 'BA', name: 'Bosnia', flag: '🇧🇦', language: 'Bosnian', currency: 'BAM' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', language: 'Portuguese', currency: 'BRL' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭', language: 'Khmer', currency: 'KHR' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', language: 'English', currency: 'CAD' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', language: 'Spanish', currency: 'CLP' },
  { code: 'CN', name: 'China', flag: '🇨🇳', language: 'Chinese', currency: 'CNY' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', language: 'Spanish', currency: 'COP' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', language: 'Spanish', currency: 'CRC' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', language: 'Croatian', currency: 'EUR' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', language: 'Greek', currency: 'EUR' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', language: 'Czech', currency: 'CZK' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', language: 'Danish', currency: 'DKK' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', language: 'Spanish', currency: 'DOP' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', language: 'Spanish', currency: 'USD' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', language: 'Arabic', currency: 'EGP' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻', language: 'Spanish', currency: 'USD' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', language: 'Estonian', currency: 'EUR' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', language: 'Finnish', currency: 'EUR' },
  { code: 'FR', name: 'France', flag: '🇫🇷', language: 'French', currency: 'EUR' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪', language: 'Georgian', currency: 'GEL' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', language: 'German', currency: 'EUR' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', language: 'Greek', currency: 'EUR' },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩', language: 'English', currency: 'XCD' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹', language: 'Spanish', currency: 'GTQ' },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼', language: 'Portuguese', currency: 'XOF' },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾', language: 'English', currency: 'GYD' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', language: 'Spanish', currency: 'HNL' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', language: 'Chinese', currency: 'HKD' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', language: 'Hungarian', currency: 'HUF' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸', language: 'Icelandic', currency: 'ISK' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', language: 'Indonesian', currency: 'IDR' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', language: 'English', currency: 'EUR' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', language: 'Italian', currency: 'EUR' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲', language: 'English', currency: 'JMD' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', language: 'Japanese', currency: 'JPY' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴', language: 'Arabic', currency: 'JOD' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', language: 'Kazakh', currency: 'KZT' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', language: 'Swahili', currency: 'KES' },
  { code: 'KR', name: 'Korea', flag: '🇰🇷', language: 'Korean', currency: 'KRW' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', language: 'Arabic', currency: 'KWD' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', language: 'Latvian', currency: 'EUR' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧', language: 'Arabic', currency: 'LBP' },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷', language: 'English', currency: 'LRD' },
  { code: 'LY', name: 'Libya', flag: '🇱🇾', language: 'Arabic', currency: 'LYD' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', language: 'Lithuanian', currency: 'EUR' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', language: 'Luxembourgish', currency: 'EUR' },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬', language: 'Malagasy', currency: 'MGA' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', language: 'Malay', currency: 'MYR' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻', language: 'Dhivehi', currency: 'MVR' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', language: 'Maltese', currency: 'EUR' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', language: 'Spanish', currency: 'MXN' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩', language: 'Romanian', currency: 'MDL' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳', language: 'Mongolian', currency: 'MNT' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪', language: 'Montenegrin', currency: 'EUR' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', language: 'Arabic', currency: 'MAD' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', language: 'Burmese', currency: 'MMK' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', language: 'Nepali', currency: 'NPR' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', language: 'Dutch', currency: 'EUR' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', language: 'English', currency: 'NZD' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', language: 'Spanish', currency: 'NIO' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', language: 'English', currency: 'NGN' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦', language: 'Spanish', currency: 'PAB' },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬', language: 'English', currency: 'PGK' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾', language: 'Spanish', currency: 'PYG' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', language: 'Spanish', currency: 'PEN' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', language: 'Polish', currency: 'PLN' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', language: 'Portuguese', currency: 'EUR' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', language: 'Arabic', currency: 'QAR' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', language: 'Romanian', currency: 'RON' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', language: 'Russian', currency: 'RUB' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', language: 'Arabic', currency: 'SAR' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', language: 'French', currency: 'XOF' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸', language: 'Serbian', currency: 'RSD' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', language: 'English', currency: 'SGD' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', language: 'Slovak', currency: 'EUR' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', language: 'English', currency: 'ZAR' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', language: 'Spanish', currency: 'EUR' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', language: 'Sinhala', currency: 'LKR' },
  { code: 'LC', name: 'St. Lucia', flag: '🇱🇨', language: 'English', currency: 'XCD' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', language: 'Swedish', currency: 'SEK' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', language: 'German', currency: 'CHF' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', language: 'Chinese', currency: 'TWD' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', language: 'Thai', currency: 'THB' },
  { code: 'TR', name: 'Türkiye', flag: '🇹🇷', language: 'Turkish', currency: 'TRY' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', language: 'Ukrainian', currency: 'UAH' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', language: 'Arabic', currency: 'AED' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', language: 'English', currency: 'GBP' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', language: 'Spanish', currency: 'UYU' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', language: 'Spanish', currency: 'VEF' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', language: 'Vietnamese', currency: 'VND' },
];

export default function CountrySelector({ selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const modalRef = useRef(null);

  const current = COUNTRIES.find(c => c.code === selected) || COUNTRIES[0];

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: "var(--font)",
          fontWeight: 300,
          fontSize: '11px',
          letterSpacing: '0.05em',
          color: '#000',
          padding: 0,
        }}
        onMouseEnter={e => (e.target.style.color = '#999')}
        onMouseLeave={e => (e.target.style.color = '#000')}
      >
        {current.flag} {current.code}
      </button>

      {open && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.18)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div ref={modalRef} style={{
            background: '#fff',
            width: '320px',
            maxHeight: '480px',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "var(--font)",
            fontWeight: 300,
          }}>
            <div style={{ padding: '20px 20px 12px', borderBottom: '1px solid #eee' }}>
              <p style={{ margin: '0 0 12px', fontSize: '11px', letterSpacing: '0.05em' }}>select country</p>
              <input
                autoFocus
                placeholder="search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  borderBottom: '1px solid #000',
                  outline: 'none',
                  fontFamily: "var(--font)",
                  fontWeight: 300,
                  fontSize: '11px',
                  letterSpacing: '0.05em',
                  padding: '4px 0',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {filtered.map(country => (
                <button
                  key={country.code}
                  onClick={() => { onSelect(country); setOpen(false); setSearch(''); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 20px',
                    background: country.code === selected ? '#f5f5f5' : 'none',
                    border: 'none',
                    borderBottom: '1px solid #f0f0f0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: "var(--font)",
                    fontWeight: 300,
                    fontSize: '11px',
                    letterSpacing: '0.05em',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
                  onMouseLeave={e => (e.currentTarget.style.background = country.code === selected ? '#f5f5f5' : 'none')}
                >
                  <span style={{ fontSize: '18px' }}>{country.flag}</span>
                  <span style={{ flex: 1 }}>{country.name}</span>
                  <span style={{ color: '#999', fontSize: '10px' }}>{country.currency}</span>
                </button>
              ))}
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid #eee', fontSize: '10px', color: '#999', letterSpacing: '0.05em' }}>
              {current.language} · {current.currency}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
