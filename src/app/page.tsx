'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [role, setRole] = useState<'student'|'parent'|'teacher'|null>(null)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>

      {/* 헤더 */}
      <header style={{
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border)',
        background: 'var(--white)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* 콜라주 로고 미니 */}
          <svg width="32" height="32" viewBox="0 0 300 300" style={{ borderRadius: 8, flexShrink: 0 }}>
            <defs>
              <clipPath id="sq"><rect width="300" height="300" rx="52"/></clipPath>
              <clipPath id="lt"><polygon points="0,0 300,300 0,300"/></clipPath>
              <clipPath id="rt"><polygon points="0,0 300,0 300,300"/></clipPath>
            </defs>
            <g clipPath="url(#sq)">
              <g clipPath="url(#lt)">
                <rect width="300" height="300" fill="#F5F0E8"/>
                <path d="M28 108 Q82 88 136 108 L146 300 L18 300 Z" fill="#FAFAFA" stroke="#DCDCDC" strokeWidth="2"/>
                <path d="M68 108 L50 136 L82 150 Z" fill="#FAFAFA" stroke="#BDBDBD" strokeWidth="1.5"/>
                <path d="M96 108 L114 136 L82 150 Z" fill="#FAFAFA" stroke="#BDBDBD" strokeWidth="1.5"/>
                <path d="M78 147 L82 162 L86 147 L84 137 L80 137 Z" fill="#1B2A52"/>
              </g>
              <g clipPath="url(#rt)">
                <rect width="300" height="300" fill="#E8EAF0"/>
                <path d="M160 96 Q216 76 278 96 L290 290 L148 290 Z" fill="#1B2A52"/>
                <path d="M160 96 L132 124 L142 238 L172 238 L168 110 Z" fill="#F5F5F5"/>
                <path d="M278 96 L300 120 L300 238 L270 238 L266 110 Z" fill="#F5F5F5"/>
                <path d="M204 96 L220 132 L236 96" fill="#F43F75"/>
                <text x="195" y="174" fontFamily="Georgia,serif" fontSize="38" fontWeight="700" fill="#F5F5F5" textAnchor="middle">K</text>
              </g>
              <line x1="0" y1="0" x2="300" y2="300" stroke="#fff" strokeWidth="5" clipPath="url(#sq)"/>
              <line x1="0" y1="0" x2="300" y2="300" stroke="#BDBDBD" strokeWidth="2" clipPath="url(#sq)"/>
            </g>
          </svg>
          <span style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Georgia, serif', letterSpacing: -0.5 }}>
            과<span style={{ color: 'var(--rose)' }}>(외하)</span>자
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/login">
            <button style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'var(--white)',
              fontSize: 14,
              color: '#374151',
            }}>로그인</button>
          </Link>
          <Link href="/signup">
            <button style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--rose)',
              fontSize: 14,
              color: 'var(--white)',
              fontWeight: 600,
            }}>시작하기</button>
          </Link>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section style={{
        padding: '80px 24px 60px',
        textAlign: 'center',
        maxWidth: 680,
        margin: '0 auto',
      }}>
        <div style={{
          display: 'inline-block',
          background: 'var(--rose-light)',
          color: 'var(--rose)',
          padding: '4px 14px',
          borderRadius: 999,
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 20,
          border: '1px solid var(--rose-border)',
        }}>과외 연결 플랫폼</div>
        <h1 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.2, marginBottom: 20, color: '#111' }}>
          나에게 딱 맞는<br />
          <span style={{ color: 'var(--rose)' }}>과외 선생님</span>을 찾아요
        </h1>
        <p style={{ fontSize: 18, color: 'var(--gray)', marginBottom: 40, lineHeight: 1.6 }}>
          수준 불일치, 일정 취소, 비용 불투명 — 과외의 모든 불편을<br />
          <strong style={{ color: '#111' }}>과(외하)자</strong>가 해결해드려요.
        </p>

        {/* 역할 선택 */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 14, color: 'var(--gray)', marginBottom: 14 }}>어떤 분이신가요?</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { key: 'student', label: '학생', desc: '선생님 찾기 · 수업 관리' },
              { key: 'parent', label: '학부모', desc: '자녀 수업 모니터링' },
              { key: 'teacher', label: '선생님', desc: '학생 모집 · 수익 관리' },
            ].map(r => (
              <button
                key={r.key}
                onClick={() => setRole(r.key as any)}
                style={{
                  padding: '14px 24px',
                  borderRadius: 12,
                  border: `2px solid ${role === r.key ? 'var(--rose)' : 'var(--border)'}`,
                  background: role === r.key ? 'var(--rose-light)' : 'var(--white)',
                  fontSize: 15,
                  fontWeight: 600,
                  color: role === r.key ? '#881337' : '#374151',
                  minWidth: 130,
                  transition: 'all 0.15s',
                }}
              >
                <div>{r.label}</div>
                <div style={{ fontSize: 12, fontWeight: 400, color: role === r.key ? '#BE1254' : 'var(--gray)', marginTop: 2 }}>{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <Link href={role ? `/signup?role=${role}` : '/signup'}>
          <button style={{
            padding: '16px 48px',
            borderRadius: 12,
            border: 'none',
            background: 'var(--rose)',
            color: 'var(--white)',
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 12,
            width: '100%',
            maxWidth: 320,
            transition: 'opacity 0.15s',
          }}>
            {role ? `${role === 'student' ? '학생' : role === 'parent' ? '학부모' : '선생님'}으로 시작하기 →` : '무료로 시작하기 →'}
          </button>
        </Link>
        <p style={{ fontSize: 13, color: '#9CA3AF' }}>회원가입 무료 · 카드 등록 불필요</p>
      </section>

      {/* 3가지 문제 해결 섹션 */}
      <section style={{ background: 'var(--gray-light)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
            과외의 3가지 불편, 이제 끝
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--gray)', marginBottom: 48, fontSize: 16 }}>
            실제 학부모·학생·선생님의 목소리에서 시작했어요
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { emoji: '🎯', title: '수준 불일치', desc: '진단 테스트로 딱 맞는 선생님 매칭. 과목별 단원까지 세밀하게 맞춰요.' },
              { emoji: '📅', title: '일정 취소·변경', desc: '월별 수업 일정을 미리 확정. 갑작스러운 취소엔 자동 알림이 가요.' },
              { emoji: '💳', title: '비용 불투명', desc: '시간당 요금 사전 공개, 에스크로 결제, 환불 정책 명확히 표시해요.' },
            ].map(item => (
              <div key={item.title} style={{
                background: 'var(--white)',
                borderRadius: 16,
                padding: '28px 24px',
                border: '1px solid var(--border)',
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.emoji}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 선생님 목록 미리보기 */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>지금 활동 중인 선생님</h2>
          <p style={{ color: 'var(--gray)', marginBottom: 36, fontSize: 15 }}>검증된 선생님들과 바로 연결되세요</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { name: '김민준', univ: '서울대 수학교육과', subject: '수학', area: '강남구', price: 35000, rating: 4.9, reviews: 38 },
              { name: '이수연', univ: '연세대 영어영문과', subject: '영어', area: '마포구', price: 28000, rating: 4.7, reviews: 12 },
              { name: '박지호', univ: 'KAIST 물리학과', subject: '과학', area: '서초구', price: 42000, rating: 5.0, reviews: 21 },
            ].map(t => (
              <div key={t.name} style={{
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '20px',
                background: 'var(--white)',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--rose)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'var(--rose-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#881337',
                    flexShrink: 0,
                  }}>
                    {t.name.slice(0, 2)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{t.name} 선생님</div>
                    <div style={{ fontSize: 12, color: 'var(--gray)' }}>{t.univ}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  {[t.subject, t.area].map(tag => (
                    <span key={tag} style={{
                      fontSize: 11,
                      padding: '2px 8px',
                      borderRadius: 999,
                      background: 'var(--gray-light)',
                      color: 'var(--gray)',
                      border: '1px solid var(--border)',
                    }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: 'var(--rose)', fontSize: 16 }}>
                    {t.price.toLocaleString()}원<span style={{ fontSize: 11, fontWeight: 400, color: 'var(--gray)' }}>/시간</span>
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--gray)' }}>
                    ★ {t.rating} ({t.reviews})
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <Link href="/teachers">
              <button style={{
                padding: '12px 32px',
                borderRadius: 10,
                border: '1.5px solid var(--rose)',
                background: 'var(--rose-light)',
                color: '#881337',
                fontSize: 15,
                fontWeight: 600,
              }}>모든 선생님 보기 →</button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'var(--navy)',
        padding: '64px 24px',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--white)', marginBottom: 12 }}>
          지금 바로 시작해보세요
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32, fontSize: 16 }}>
          학생, 학부모, 선생님 모두 무료로 가입할 수 있어요
        </p>
        <Link href="/signup">
          <button style={{
            padding: '16px 48px',
            borderRadius: 12,
            border: 'none',
            background: 'var(--rose)',
            color: 'var(--white)',
            fontSize: 18,
            fontWeight: 700,
          }}>과(외하)자 시작하기 →</button>
        </Link>
      </section>

      {/* 푸터 */}
      <footer style={{
        padding: '24px',
        textAlign: 'center',
        fontSize: 13,
        color: '#9CA3AF',
        borderTop: '1px solid var(--border)',
      }}>
        © 2026 과(외하)자 · 과외 연결 플랫폼
      </footer>
    </div>
  )
}
