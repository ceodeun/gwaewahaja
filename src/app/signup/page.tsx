'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const C = '#8B5E3C'; const CL = '#F5E6D3'; const BD = '#E8D5C0'
const TEXT = '#2C1A0E'; const SUB = '#6B4C35'; const HINT = '#A07858'; const WARM = '#F9F0E6'; const CREAM = '#FDFAF6'
const F = "'Noto Serif KR', Georgia, serif"

export default function SignupPage() {
  const router = useRouter()
  const [role, setRole] = useState<'student'|'parent'|'teacher'|null>(null)
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); router.push('/onboarding') }
  return (
    <div style={{ minHeight:'100vh', background:CREAM, display:'flex', alignItems:'center', justifyContent:'center', padding:24, fontFamily:F }}>
      <div style={{ background:'#fff', borderRadius:20, border:`1px solid ${BD}`, padding:'36px 32px', width:'100%', maxWidth:400 }}>
        <Link href="/" style={{ fontSize:13, color:HINT, display:'block', marginBottom:20 }}>← 돌아가기</Link>
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ fontSize:28, marginBottom:8 }}>🍪</div>
          <h1 style={{ fontSize:24, fontWeight:900, marginBottom:6, color:TEXT }}>과<span style={{ color:C }}>(외하)</span>자 가입</h1>
        </div>
        <p style={{ fontSize:12, fontWeight:700, color:SUB, marginBottom:10 }}>나는 어떤 과자? 🍪</p>
        <div style={{ display:'flex', gap:8, marginBottom:20 }}>
          {[{key:'student',emoji:'🧁',label:'학생'},{key:'parent',emoji:'🍩',label:'학부모'},{key:'teacher',emoji:'🍭',label:'선생님'}].map(r=>(
            <button key={r.key} onClick={()=>setRole(r.key as any)} style={{ flex:1, padding:'10px 4px', borderRadius:12, border:`2px solid ${role===r.key?C:BD}`, background:role===r.key?CL:'#fff', cursor:'pointer', fontFamily:F }}>
              <div style={{ fontSize:22, marginBottom:4 }}>{r.emoji}</div>
              <div style={{ fontSize:12, fontWeight:700, color:role===r.key?SUB:TEXT }}>{r.label}</div>
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          {[{label:'이름',k:'name',type:'text',ph:'홍길동'},{label:'이메일',k:'email',type:'email',ph:'hello@example.com'},{label:'비밀번호',k:'password',type:'password',ph:'8자 이상'}].map(f=>(
            <div key={f.k} style={{ marginBottom:14 }}>
              <label style={{ display:'block', fontSize:13, fontWeight:700, marginBottom:5, color:SUB }}>{f.label}</label>
              <input type={f.type} placeholder={f.ph} required value={form[f.k as keyof typeof form]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} style={{ width:'100%', padding:'11px 14px', borderRadius:10, border:`1.5px solid ${BD}`, fontSize:14, outline:'none', background:WARM, fontFamily:F, color:TEXT }}/>
            </div>
          ))}
          <button type="submit" style={{ width:'100%', padding:'13px', borderRadius:12, border:'none', background:C, color:'#fff', fontSize:16, fontWeight:900, marginTop:8, cursor:'pointer', fontFamily:F }}>
            {role?`${role==='student'?'🧁 학생':role==='parent'?'🍩 학부모':'🍭 선생님'}으로 시작하기 →`:'🍪 무료로 시작하기 →'}
          </button>
        </form>
        <p style={{ textAlign:'center', marginTop:16, fontSize:13, color:HINT }}>이미 계정이 있으신가요? <Link href="/login" style={{ color:C, fontWeight:700 }}>로그인</Link></p>
      </div>
    </div>
  )
}
