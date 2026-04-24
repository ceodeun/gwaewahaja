'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const C = '#8B5E3C'
const CL = '#F5E6D3'
const CM = '#C8956C'
const BD = '#E8D5C0'
const TEXT = '#2C1A0E'
const SUB = '#6B4C35'
const HINT = '#A07858'
const CREAM = '#FDFAF6'
const WARM = '#F9F0E6'
const F = "'Noto Serif KR', Georgia, serif"

const AREAS = ['전체','서울','경기','인천','부산','대구','온라인']
const UNIVS = ['전체','서울대','연세대','고려대','이화여대','한양대','KAIST','서강대','성균관대']
const SUBJECTS = ['전체','수1','수2','확통','화학','지구과학','영어','국어','물리','생명과학']
const STATUSES = ['전체','재학','휴학','졸업']

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [area, setArea] = useState('전체')
  const [univ, setUniv] = useState('전체')
  const [subject, setSubject] = useState('전체')
  const [status, setStatus] = useState('전체')
  const [search, setSearch] = useState('')
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    fetchTeachers()
  }, [])

  async function fetchTeachers() {
    const { data } = await supabase.from('teachers').select('*')
    setTeachers(data || [])
    setLoading(false)
  }

  const filtered = teachers.filter(t => {
    if (area !== '전체' && t.area !== area) return false
    if (univ !== '전체' && t.univ !== univ) return false
    if (subject !== '전체' && !t.subjects?.includes(subject)) return false
    if (status !== '전체' && t.status !== status) return false
    if (search && !t.name.includes(search) && !t.dept.includes(search) && !t.subjects?.some((s:string)=>s.includes(search))) return false
    return true
  })

  const FilterRow = ({ label, items, val, setVal }: any) => (
    <div style={{ marginBottom:14 }}>
      <p style={{ fontSize:12, fontWeight:700, color:SUB, marginBottom:7 }}>{label}</p>
      <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
        {items.map((item:string) => (
          <button key={item} onClick={() => setVal(item)} style={{ padding:'5px 12px', borderRadius:999, border:`1.5px solid ${val===item?C:BD}`, background:val===item?CL:'#fff', fontSize:11, fontWeight:700, color:val===item?SUB:HINT, cursor:'pointer', fontFamily:F }}>{item}</button>
        ))}
      </div>
    </div>
  )

  const activeFilters = [area,univ,subject,status].filter(v=>v!=='전체').length

  return (
    <div style={{ maxWidth:480, margin:'0 auto', minHeight:'100vh', background:CREAM, fontFamily:F }}>
      <header style={{ padding:'12px 16px', display:'flex', alignItems:'center', gap:10, background:'#fff', borderBottom:`1px solid ${BD}`, position:'sticky', top:0, zIndex:50 }}>
        <Link href="/onboarding"><button style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:HINT }}>←</button></Link>
        <span style={{ fontSize:16, fontWeight:900, color:TEXT, flex:1 }}>선생님 찾기</span>
        <span style={{ fontSize:11, color:HINT }}>🍪 과(외하)자</span>
      </header>

      <div style={{ padding:'12px 14px', background:'#fff', borderBottom:`1px solid ${BD}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, background:WARM, borderRadius:12, padding:'10px 14px', border:`1px solid ${BD}`, marginBottom:10 }}>
          <span style={{ fontSize:16 }}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="이름, 학교, 과목 검색" style={{ border:'none', background:'none', outline:'none', fontSize:14, flex:1, fontFamily:F, color:TEXT }}/>
        </div>
        <button onClick={()=>setShowFilter(!showFilter)} style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 14px', borderRadius:20, border:`1.5px solid ${activeFilters>0?C:BD}`, background:activeFilters>0?CL:'#fff', cursor:'pointer', fontFamily:F }}>
          <span style={{ fontSize:13 }}>🎛️</span>
          <span style={{ fontSize:12, fontWeight:700, color:activeFilters>0?SUB:HINT }}>필터 {activeFilters>0?`(${activeFilters}개 선택)`:''}</span>
        </button>
      </div>

      {showFilter && (
        <div style={{ background:'#fff', padding:'14px', borderBottom:`1px solid ${BD}` }}>
          <FilterRow label="📍 지역" items={AREAS} val={area} setVal={setArea}/>
          <FilterRow label="🏫 학교" items={UNIVS} val={univ} setVal={setUniv}/>
          <FilterRow label="📚 과목" items={SUBJECTS} val={subject} setVal={setSubject}/>
          <FilterRow label="📋 재학 상태" items={STATUSES} val={status} setVal={setStatus}/>
          <button onClick={()=>{setArea('전체');setUniv('전체');setSubject('전체');setStatus('전체')}} style={{ fontSize:12, color:HINT, background:'none', border:'none', cursor:'pointer', fontFamily:F, textDecoration:'underline' }}>필터 초기화</button>
        </div>
      )}

      <div style={{ padding:'14px' }}>
        {loading ? (
          <div style={{ textAlign:'center', padding:'40px 0' }}>
            <div style={{ fontSize:40 }}>🍪</div>
            <p style={{ fontSize:14, color:HINT, marginTop:10 }}>선생님 불러오는 중...</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize:12, color:HINT, marginBottom:12 }}>선생님 {filtered.length}명</p>
            {filtered.map(t => (
              <div key={t.id} style={{ background:'#fff', borderRadius:16, border:`1px solid ${BD}`, marginBottom:12, overflow:'hidden' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, padding:'14px' }}>
                  <div style={{ width:64, height:64, borderRadius:'50%', background:CL, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, overflow:'hidden', border:`2px solid ${CM}` }}>
                    <img src={t.img} alt={t.name} style={{ width:'100%', height:'100%', objectFit:'contain' }}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                      <span style={{ fontSize:16, fontWeight:900, color:TEXT }}>{t.name} 선생님</span>
                      <span style={{ fontSize:10, padding:'2px 7px', borderRadius:999, background:CL, color:SUB, border:`1px solid ${BD}`, fontWeight:700 }}>{t.status}</span>
                    </div>
                    <div style={{ fontSize:12, color:HINT, marginBottom:5 }}>{t.univ} {t.dept} · {t.grade}</div>
                    <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                      {t.subjects?.map((s:string) => (
                        <span key={s} style={{ fontSize:10, padding:'2px 8px', borderRadius:999, background:CL, color:SUB, border:`1px solid ${BD}`, fontWeight:700 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ padding:'0 14px 10px' }}>
                  <p style={{ fontSize:12, color:SUB, lineHeight:1.6, background:WARM, borderRadius:10, padding:'8px 12px', border:`1px solid ${BD}` }}>{t.intro}</p>
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', borderTop:`1px solid ${BD}` }}>
                  <div>
                    <span style={{ fontSize:18, fontWeight:900, color:C }}>{t.price?.toLocaleString()}원</span>
                    <span style={{ fontSize:11, color:HINT }}>/시간</span>
                    <span style={{ fontSize:11, color:HINT, marginLeft:8 }}>⭐ {t.rating} ({t.review_count})</span>
                  </div>
                  <div style={{ display:'flex', gap:7 }}>
                    <Link href={`/teachers/${t.slug}`}>
                      <button style={{ padding:'7px 14px', borderRadius:20, border:`1.5px solid ${BD}`, background:'#fff', fontSize:12, fontWeight:700, color:SUB, cursor:'pointer', fontFamily:F }}>프로필</button>
                    </Link>
                    <Link href={`/booking?teacher=${t.slug}`}>
                      <button style={{ padding:'7px 14px', borderRadius:20, border:'none', background:C, fontSize:12, fontWeight:700, color:'#fff', cursor:'pointer', fontFamily:F }}>예약하기</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
