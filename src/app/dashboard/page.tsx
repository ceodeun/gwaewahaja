'use client'
import { useState } from 'react'
import Link from 'next/link'

const TEACHERS = [
  { id: 1, name: '김민준', univ: '서울대 수학교육과', subject: '수학', area: '강남구', price: 35000, rating: 4.9, reviews: 38, badge: '인기' },
  { id: 2, name: '이수연', univ: '연세대 영어영문과', subject: '영어', area: '마포구', price: 28000, rating: 4.7, reviews: 12, badge: '신규' },
  { id: 3, name: '박지호', univ: 'KAIST 물리학과', subject: '과학', area: '서초구', price: 42000, rating: 5.0, reviews: 21, badge: '' },
  { id: 4, name: '최하준', univ: '고려대 국어교육과', subject: '국어', area: '강북구', price: 30000, rating: 4.8, reviews: 15, badge: '' },
  { id: 5, name: '정다은', univ: '서울시립대 컴퓨터공학', subject: '코딩', area: '마포구', price: 45000, rating: 4.6, reviews: 9, badge: '신규' },
  { id: 6, name: '윤서준', univ: '한양대 수학과', subject: '수학', area: '성동구', price: 32000, rating: 4.9, reviews: 27, badge: '인기' },
]

const SUBJECTS = ['전체', '수학', '영어', '과학', '국어', '코딩']

export default function DashboardPage() {
  const [tab, setTab] = useState<'home'|'teachers'|'schedule'|'chat'>('home')
  const [selectedSubject, setSelectedSubject] = useState('전체')
  const [bookedTeacher, setBookedTeacher] = useState<number|null>(null)

  const filtered = SUBJECTS[0] === selectedSubject || selectedSubject === '전체'
    ? TEACHERS
    : TEACHERS.filter(t => t.subject === selectedSubject)

  const navItems = [
    { key: 'home', label: '홈', icon: '🏠' },
    { key: 'teachers', label: '선생님 찾기', icon: '🔍' },
    { key: 'schedule', label: '수업 일정', icon: '📅' },
    { key: 'chat', label: '채팅', icon: '💬' },
  ]

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#fff', position: 'relative' }}>

      {/* 앱바 */}
      <header style={{
        padding: '14px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #F3F4F6',
        background: '#fff',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="24" height="24" viewBox="0 0 300 300" style={{ borderRadius: 6 }}>
            <defs>
              <clipPath id="s2"><rect width="300" height="300" rx="52"/></clipPath>
              <clipPath id="l2"><polygon points="0,0 300,300 0,300"/></clipPath>
              <clipPath id="r2"><polygon points="0,0 300,0 300,300"/></clipPath>
            </defs>
            <g clipPath="url(#s2)">
              <g clipPath="url(#l2)"><rect width="300" height="300" fill="#F5F0E8"/><path d="M28 108 Q82 88 136 108 L146 300 L18 300 Z" fill="#FAFAFA" stroke="#DCDCDC" strokeWidth="2"/><path d="M78 147 L82 162 L86 147 L84 137 L80 137 Z" fill="#1B2A52"/></g>
              <g clipPath="url(#r2)"><rect width="300" height="300" fill="#E8EAF0"/><path d="M160 96 Q216 76 278 96 L290 290 L148 290 Z" fill="#1B2A52"/><text x="193" y="174" fontFamily="Georgia,serif" fontSize="38" fontWeight="700" fill="#F5F5F5" textAnchor="middle">K</text></g>
              <line x1="0" y1="0" x2="300" y2="300" stroke="#fff" strokeWidth="5" clipPath="url(#s2)"/>
            </g>
          </svg>
          <span style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Georgia, serif' }}>
            과<span style={{ color: '#F43F75' }}>(외하)</span>자
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#FFF1F5', color: '#F43F75',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700,
          }}>나</div>
        </div>
      </header>

      {/* 컨텐츠 */}
      <div style={{ padding: '18px 18px 80px' }}>

        {/* 홈 탭 */}
        {tab === 'home' && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 2 }}>안녕하세요 👋</p>
              <h2 style={{ fontSize: 22, fontWeight: 700 }}>
                <span style={{ color: '#F43F75' }}>이지수</span> 학생
              </h2>
            </div>

            {/* 다음 수업 카드 */}
            <div style={{
              background: '#FFF1F5', border: '1px solid #FFADC8',
              borderRadius: 14, padding: '14px 16px', marginBottom: 20,
            }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#BE1254', marginBottom: 4 }}>오늘 다음 수업</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#881337', marginBottom: 2 }}>김민준 선생님 · 수학</p>
              <p style={{ fontSize: 13, color: '#BE1254', marginBottom: 6 }}>오후 2:00 – 4:00 · 강남구</p>
              <span style={{
                fontSize: 11, background: '#F43F75', color: '#fff',
                padding: '2px 8px', borderRadius: 4,
              }}>1시간 후 시작</span>
            </div>

            {/* 퀵메뉴 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
              {[
                { icon: '🔍', title: '선생님 찾기', sub: '과목·지역 검색', tab: 'teachers' as const },
                { icon: '📅', title: '수업 일정', sub: '캘린더 보기', tab: 'schedule' as const },
                { icon: '💬', title: '선생님 채팅', sub: '메시지 보내기', tab: 'chat' as const },
                { icon: '📊', title: '학습 진도', sub: '과목별 현황', tab: 'home' as const },
              ].map(item => (
                <button key={item.title} onClick={() => setTab(item.tab)} style={{
                  border: '1px solid #E5E7EB', borderRadius: 12,
                  padding: '14px', textAlign: 'left', background: '#fff',
                  cursor: 'pointer',
                }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>{item.sub}</div>
                </button>
              ))}
            </div>

            {/* 추천 선생님 */}
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>추천 선생님</h3>
            {TEACHERS.slice(0, 2).map(t => (
              <div key={t.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                border: '1px solid #E5E7EB', borderRadius: 12,
                padding: '12px', marginBottom: 8, background: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setTab('teachers')}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: '#FFF1F5', color: '#881337',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 600, flexShrink: 0,
                }}>{t.name.slice(0,2)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name} · {t.subject}</div>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>{t.univ} · {t.area}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#F43F75' }}>{t.price.toLocaleString()}원</div>
              </div>
            ))}
          </div>
        )}

        {/* 선생님 찾기 탭 */}
        {tab === 'teachers' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>선생님 찾기</h2>

            {/* 검색바 */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#F9FAFB', borderRadius: 10,
              padding: '10px 14px', marginBottom: 14,
              border: '1px solid #E5E7EB',
            }}>
              <span>🔍</span>
              <input placeholder="과목, 지역, 선생님 이름 검색" style={{
                border: 'none', background: 'none', outline: 'none',
                fontSize: 14, flex: 1, color: '#374151',
              }}/>
            </div>

            {/* 과목 필터 */}
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 18, paddingBottom: 4 }}>
              {SUBJECTS.map(s => (
                <button key={s} onClick={() => setSelectedSubject(s)} style={{
                  padding: '6px 14px', borderRadius: 999, flexShrink: 0,
                  border: `1px solid ${selectedSubject === s ? '#F43F75' : '#E5E7EB'}`,
                  background: selectedSubject === s ? '#FFF1F5' : '#fff',
                  fontSize: 13, fontWeight: 500,
                  color: selectedSubject === s ? '#881337' : '#6B7280',
                }}>{s}</button>
              ))}
            </div>

            {/* 선생님 카드 목록 */}
            {TEACHERS.filter(t => selectedSubject === '전체' || t.subject === selectedSubject).map(t => (
              <div key={t.id} style={{
                border: '1px solid #E5E7EB', borderRadius: 14,
                padding: '14px', marginBottom: 10, background: '#fff',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: '#FFF1F5', color: '#881337',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 600, flexShrink: 0,
                  }}>{t.name.slice(0,2)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>
                      {t.name} 선생님
                      {t.badge && <span style={{
                        marginLeft: 6, fontSize: 10, padding: '1px 6px',
                        borderRadius: 4,
                        background: t.badge === '인기' ? '#FFF1F5' : '#FAECE7',
                        color: t.badge === '인기' ? '#881337' : '#712B13',
                        border: `1px solid ${t.badge === '인기' ? '#FFADC8' : '#F0997B'}`,
                      }}>{t.badge}</span>}
                    </div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>{t.univ} · {t.area}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
                  {[t.subject, t.area].map(tag => (
                    <span key={tag} style={{
                      fontSize: 11, padding: '2px 8px', borderRadius: 999,
                      background: '#F9FAFB', color: '#6B7280', border: '1px solid #E5E7EB',
                    }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#F43F75' }}>
                    {t.price.toLocaleString()}원<span style={{ fontSize: 11, fontWeight: 400, color: '#6B7280' }}>/시간</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>★ {t.rating} ({t.reviews})</span>
                    <button
                      onClick={() => setBookedTeacher(t.id)}
                      style={{
                        padding: '6px 14px', borderRadius: 8,
                        border: 'none',
                        background: bookedTeacher === t.id ? '#16A34A' : '#F43F75',
                        color: '#fff', fontSize: 12, fontWeight: 600,
                      }}
                    >{bookedTeacher === t.id ? '예약됨 ✓' : '예약하기'}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 수업 일정 탭 */}
        {tab === 'schedule' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>수업 일정</h2>
            <div style={{ background: '#F9FAFB', borderRadius: 14, padding: 16, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>2026년 4월</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ fontSize: 16, background: 'none', border: 'none', color: '#6B7280' }}>‹</button>
                  <button style={{ fontSize: 16, background: 'none', border: 'none', color: '#6B7280' }}>›</button>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' }}>
                {['일','월','화','수','목','금','토'].map(d => (
                  <div key={d} style={{ fontSize: 11, color: '#9CA3AF', paddingBottom: 6 }}>{d}</div>
                ))}
                {Array.from({length: 30}, (_, i) => i + 1).map(d => (
                  <div key={d} style={{
                    fontSize: 12, padding: '6px 2px', borderRadius: 6,
                    background: [6,9,13,16,20,23,27,30].includes(d) ? '#FFF1F5' : 'transparent',
                    color: [6,9,13,16,20,23,27,30].includes(d) ? '#F43F75' : '#374151',
                    fontWeight: [6,9,13,16,20,23,27,30].includes(d) ? 700 : 400,
                    cursor: 'pointer',
                    position: 'relative',
                  }}>
                    {d}
                    {[6,9,13,16,20,23,27,30].includes(d) && (
                      <div style={{
                        width: 4, height: 4, borderRadius: '50%',
                        background: '#F43F75', margin: '2px auto 0',
                      }}/>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#374151' }}>이번 달 수업 (8회)</h3>
            {[
              { date: '4/6 (월)', teacher: '김민준', subject: '수학', time: '오후 2:00–4:00' },
              { date: '4/9 (목)', teacher: '김민준', subject: '수학', time: '오후 2:00–4:00' },
              { date: '4/13 (월)', teacher: '이수연', subject: '영어', time: '오후 3:00–5:00' },
              { date: '4/16 (목)', teacher: '김민준', subject: '수학', time: '오후 2:00–4:00' },
            ].map(item => (
              <div key={item.date} style={{
                display: 'flex', gap: 12, padding: '10px 0',
                borderBottom: '1px solid #F3F4F6', alignItems: 'center',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F43F75', flexShrink: 0, marginTop: 2 }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{item.teacher} · {item.subject}</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{item.time}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{item.date}</span>
              </div>
            ))}
          </div>
        )}

        {/* 채팅 탭 */}
        {tab === 'chat' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>채팅</h2>
            {[
              { name: '김민준', subject: '수학', last: '내일 수업 교재 미리 풀어오세요!', time: '오후 2:14', unread: 2 },
              { name: '이수연', subject: '영어', last: '수업 예약이 확정됐어요 🎉', time: '오전 11:02', unread: 1 },
              { name: '박지호', subject: '과학', last: '네, 다음 주 목요일 가능해요!', time: '어제', unread: 0 },
            ].map(c => (
              <div key={c.name} style={{
                display: 'flex', gap: 12, padding: '14px 0',
                borderBottom: '1px solid #F3F4F6', cursor: 'pointer', alignItems: 'center',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: '#1B2A52', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 600, flexShrink: 0, position: 'relative',
                }}>
                  {c.name.slice(0,2)}
                  <div style={{
                    position: 'absolute', bottom: 1, right: 1,
                    width: 9, height: 9, borderRadius: '50%',
                    background: '#22C55E', border: '1.5px solid #fff',
                  }}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{c.name} 선생님</span>
                    <span style={{ fontSize: 11, color: '#9CA3AF' }}>{c.time}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>{c.last}</span>
                    {c.unread > 0 && (
                      <span style={{
                        background: '#F43F75', color: '#fff',
                        fontSize: 11, fontWeight: 600,
                        borderRadius: 999, padding: '1px 7px', flexShrink: 0,
                      }}>{c.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 하단 네비게이션 */}
      <nav style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 480,
        background: '#fff', borderTop: '1px solid #F3F4F6',
        display: 'flex', padding: '8px 0 16px',
        zIndex: 100,
      }}>
        {navItems.map(item => (
          <button key={item.key} onClick={() => setTab(item.key as any)} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 3, background: 'none', border: 'none',
            fontSize: 11, color: tab === item.key ? '#F43F75' : '#9CA3AF',
            fontWeight: tab === item.key ? 700 : 400,
          }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
