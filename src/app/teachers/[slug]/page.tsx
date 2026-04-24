'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
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

export default function TeacherProfile() {
  const { slug } = useParams()
  const [teacher, setTeacher] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [tab, setTab] = useState<'story'|'review'|'info'>('story')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) fetchData()
  }, [slug])

  async function fetchData() {
    const { data: t } = await supabase.from('teachers').select('*').eq('slug', slug).single()
    const { data: r } = await supabase.from('reviews').select('*').eq('teacher_slug', slug)
    setTeacher(t)
    setReviews(r || [])
    setLoading(false)
  }

  if (loading) return (
    <div style={{ minHeight:'100vh', background:CREAM, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:F }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:40 }}>🍪</div>
        <p style={{ fontSize:14, color:HINT, marginTop:10 }}>불러오는 중...</p>
      </div>
    </div>
  )

  if (!teacher) return (
    <div style={{ minHeight:'100vh', background:CREAM, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:F }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:40 }}>😢</div>
        <p style={{ fontSize:14, color:HINT, marginTop:10 }}>선생님을 찾을 수 없어요</p>
        <Link href="/teachers"><button style={{ marginTop:14, padding:'8px 20px', borderRadius:20, border:`1.5px solid ${C}`, background:CL, color:SUB, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:F }}>목록으로</button></Link>
      </div>
    </div>
  )

  const avgRating = reviews.length > 0 ? (reviews.reduce((a,r)=>a+r.rating,0)/reviews.length).toFixed(1) : teacher.rating

  return (
    <div style={{ maxWidth:480, margin:'0 auto', minHeight:'100vh', background:CREAM, fontFamily:F }}>
      <header style={{ padding:'12px 16px', display:'flex', alignItems:'center', gap:10, background:'#fff', borderBottom:`1px solid ${BD}`, position:'sticky', top:0, zIndex:50 }}>
        <Link href="/teachers"><button style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:HINT }}>←</button></Link>
        <span style={{ fontSize:15, fontWeight:700, color:TEXT }}>선생님 프로필</span>
      </header>

      <div style={{ background:'#fff', padding:'20px 16px', borderBottom:`1px solid ${BD}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
          <div style={{ width:80, height:80, borderRadius:'50%', background:CL, flexShrink:0, overflow:'hidden', border:`3px solid ${CM}` }}>
            <img src={teacher.img} alt={teacher.name} style={{ width:'100%', height:'100%', objectFit:'contain' }}/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:20, fontWeight:900, color:TEXT, marginBottom:2 }}>{teacher.name} 선생님</div>
            <div style={{ fontSize:12, color:HINT, marginBottom:6 }}>{teacher.univ} {teacher.dept}</div>
            <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
              {teacher.subjects?.map((s:string)=>(
                <span key={s} style={{ fontSize:11, padding:'3px 9px', borderRadius:999, background:CL, color:SUB, border:`1px solid ${BD}`, fontWeight:700 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display:'flex', gap:8, marginBottom:16 }}>
          {[{n:String(avgRating),l:'평점'},{n:`${teacher.review_count}회`,l:'수업'},{n:`${teacher.price?.toLocaleString()}`,l:'원/시간'},{n:teacher.area,l:'지역'}].map(s=>(
            <div key={s.l} style={{ flex:1, background:WARM, borderRadius:10, padding:'8px 4px', textAlign:'center', border:`1px solid ${BD}` }}>
              <div style={{ fontSize:13, fontWeight:900, color:C }}>{s.n}</div>
              <div style={{ fontSize:9, color:HINT, marginTop:1 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <Link href={`/booking?teacher=${teacher.slug}`}>
          <button style={{ width:'100%', padding:'13px', borderRadius:14, border:'none', background:C, color:'#fff', fontSize:15, fontWeight:900, cursor:'pointer' }}>
            수업 예약하기 →
          </button>
        </Link>
      </div>

      <div style={{ display:'flex', background:'#fff', borderBottom:`1px solid ${BD}` }}>
        {([['story','입시스토리'],['review','후기'],['info','수업정보']] as const).map(([key,label])=>(
          <button key={key} onClick={()=>setTab(key)} style={{ flex:1, padding:'12px 4px', fontSize:12, fontWeight:700, textAlign:'center', cursor:'pointer', color:tab===key?C:HINT, borderBottom:tab===key?`2px solid ${C}`:'2px solid transparent', background:'none', border:'none', marginBottom:-1, fontFamily:F }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding:'16px 14px' }}>
        {tab==='story' && (
          <div>
            <div style={{ background:'#fff', borderRadius:14, padding:14, marginBottom:12, border:`1px solid ${BD}` }}>
              <div style={{ fontSize:14, fontWeight:700, color:TEXT, marginBottom:7 }}>{teacher.intro}</div>
              <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                {teacher.subjects?.map((s:string)=>(
                  <span key={s} style={{ fontSize:10, padding:'2px 8px', borderRadius:999, background:WARM, color:HINT, border:`1px solid ${BD}` }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ background:WARM, borderRadius:14, padding:20, border:`2px dashed ${BD}`, textAlign:'center' }}>
              <div style={{ fontSize:28, marginBottom:6 }}>📸</div>
              <div style={{ fontSize:12, color:HINT, fontWeight:700 }}>수업 사진이 여기 들어와요</div>
            </div>
          </div>
        )}

        {tab==='review' && (
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, background:'#fff', borderRadius:14, padding:14, marginBottom:14, border:`1px solid ${BD}` }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:32, fontWeight:900, color:C }}>{avgRating}</div>
                <div style={{ fontSize:10, color:HINT }}>전체 평점</div>
                <div style={{ fontSize:14, marginTop:2 }}>⭐⭐⭐⭐⭐</div>
              </div>
              <div style={{ flex:1, paddingLeft:14, borderLeft:`1px solid ${BD}` }}>
                {[5,4,3,2,1].map(star=>{
                  const cnt = reviews.filter(r=>r.rating===star).length
                  return (
                    <div key={star} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                      <span style={{ fontSize:10, color:HINT, width:16 }}>{star}점</span>
                      <div style={{ flex:1, height:5, background:BD, borderRadius:3, overflow:'hidden' }}>
                        <div style={{ height:5, width:`${reviews.length>0?(cnt/reviews.length)*100:0}%`, background:C, borderRadius:3 }}/>
                      </div>
                      <span style={{ fontSize:10, color:HINT, width:16 }}>{cnt}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            {reviews.map((r,i)=>(
              <div key={i} style={{ background:'#fff', borderRadius:14, padding:14, marginBottom:10, border:`1px solid ${BD}` }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background:CL, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>
                    {r.role==='학생'?'🧁':'🍩'}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:TEXT }}>{r.reviewer_name} · {r.role}</div>
                    <div style={{ fontSize:10, color:HINT }}>{new Date(r.created_at).toLocaleDateString('ko-KR', {year:'numeric',month:'2-digit'})}</div>
                  </div>
                  <div style={{ fontSize:12 }}>{'⭐'.repeat(r.rating)}</div>
                </div>
                <div style={{ fontSize:12, color:SUB, lineHeight:1.7 }}>{r.content}</div>
              </div>
            ))}
            {reviews.length===0 && (
              <div style={{ textAlign:'center', padding:'30px 0' }}>
                <div style={{ fontSize:30 }}>🍪</div>
                <p style={{ fontSize:13, color:HINT, marginTop:8 }}>아직 후기가 없어요</p>
              </div>
            )}
          </div>
        )}

        {tab==='info' && (
          <div>
            {[
              { label:'과목', content: teacher.subjects || [] },
              { label:'지역', content: [teacher.area, '온라인 가능'] },
              { label:'시간당', content: [`${teacher.price?.toLocaleString()}원`] },
              { label:'수업 방식', content: ['개념 → 기출 → 심화 순서로 진행','매 수업 후 일지 작성','숙제 체크 및 오답 관리'] },
            ].map(item=>(
              <div key={item.label} style={{ background:'#fff', borderRadius:14, padding:14, marginBottom:10, border:`1px solid ${BD}` }}>
                <div style={{ fontSize:11, color:HINT, fontWeight:700, marginBottom:8 }}>{item.label}</div>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {item.content.map((c:string)=>(
                    <span key={c} style={{ fontSize:12, padding:'4px 11px', borderRadius:999, background:CL, color:SUB, border:`1px solid ${BD}`, fontWeight:600 }}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
            <Link href={`/booking?teacher=${teacher.slug}`}>
              <button style={{ width:'100%', padding:'13px', borderRadius:14, border:'none', background:C, color:'#fff', fontSize:15, fontWeight:900, cursor:'pointer' }}>
                {teacher.name} 선생님과 수업하기 →
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
