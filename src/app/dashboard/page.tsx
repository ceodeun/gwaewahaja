'use client'
import Link from 'next/link'

const C = '#8B5E3C'; const CL = '#F5E6D3'; const CM = '#C8956C'; const BD = '#E8D5C0'
const TEXT = '#2C1A0E'; const SUB = '#6B4C35'; const HINT = '#A07858'; const WARM = '#F9F0E6'; const CREAM = '#FDFAF6'
const F = "'Noto Serif KR', Georgia, serif"

export default function Dashboard() {
  return (
    <div style={{maxWidth:480,margin:'0 auto',minHeight:'100vh',background:CREAM,fontFamily:F}}>
      <header style={{padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#fff',borderBottom:`1px solid ${BD}`,position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:6}}><span style={{fontSize:20}}>🍪</span><span style={{fontSize:17,fontWeight:900,color:TEXT}}>과<span style={{color:C}}>(외하)</span>자</span></div>
        <Link href="/"><span style={{fontSize:11,color:HINT}}>로그아웃</span></Link>
      </header>
      <div style={{padding:'16px'}}>
        <p style={{fontSize:12,color:HINT,marginBottom:2}}>안녕하세요 👋</p>
        <h2 style={{fontSize:20,fontWeight:900,color:TEXT,marginBottom:16}}>이지수 학생 🧁</h2>
        <div style={{background:C,borderRadius:16,padding:14,color:'#fff',marginBottom:14}}>
          <p style={{fontSize:10,color:'rgba(255,255,255,0.7)',marginBottom:3,fontWeight:700}}>오늘 다음 수업</p>
          <p style={{fontSize:16,fontWeight:900,marginBottom:2}}>우해든 선생님 · 수학</p>
          <p style={{fontSize:12,color:'rgba(255,255,255,0.8)',marginBottom:8}}>오후 2:00–4:00 · 강남구</p>
          <span style={{fontSize:10,background:'rgba(255,255,255,0.2)',color:'#fff',padding:'3px 10px',borderRadius:20,fontWeight:700}}>1시간 후 시작</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {[
            {label:'선생님 찾기',emoji:'🔍',href:'/teachers'},{label:'수업 일정',emoji:'📅',href:'/student-schedule'},
            {label:'수업 일지',emoji:'📓',href:'/student-schedule'},{label:'송금·결제',emoji:'💰',href:'/parent-schedule'},
            {label:'학부모 알림',emoji:'🔔',href:'/parent-schedule'},{label:'일정 수정',emoji:'📝',href:'/student-schedule'},
            {label:'월별 결제',emoji:'💳',href:'/parent-schedule'},{label:'입시 스토리',emoji:'📚',href:'/teachers'},
          ].map(item=>(
            <Link key={item.label} href={item.href}>
              <div style={{background:'#fff',borderRadius:14,padding:'16px',border:`1px solid ${BD}`,textAlign:'center',cursor:'pointer'}}>
                <div style={{fontSize:28,marginBottom:8}}>{item.emoji}</div>
                <div style={{fontSize:12,fontWeight:700,color:TEXT}}>{item.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
