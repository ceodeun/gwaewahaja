'use client'
import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

function SignupForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const defaultRole = searchParams.get('role') || 'student'
  const [role, setRole] = useState(defaultRole)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const roleLabel: Record<string, string> = { student: '학생', parent: '학부모', teacher: '선생님' }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
    setTimeout(() => router.push('/dashboard'), 1500)
  }

  if (step === 2) return (
    <div style={{ textAlign: 'center', padding: '60px 24px' }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: '#FFF1F5', border: '2px solid #F43F75',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px',
      }}>
        <span style={{ fontSize: 28 }}>✓</span>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>가입 완료!</h2>
      <p style={{ color: '#6B7280' }}>잠시 후 이동합니다...</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E5E7EB', padding: '40px 36px', width: '100%', maxWidth: 440 }}>

        <Link href="/" style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 24 }}>← 돌아가기</Link>

        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>
          과<span style={{ color: '#F43F75' }}>(외하)</span>자 가입
        </h1>
        <p style={{ color: '#6B7280', marginBottom: 28, fontSize: 14 }}>나에게 맞는 역할을 선택해 주세요</p>

        {/* 역할 선택 */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {['student', 'parent', 'teacher'].map(r => (
            <button key={r} onClick={() => setRole(r)} style={{
              flex: 1, padding: '10px 4px',
              borderRadius: 10,
              border: `1.5px solid ${role === r ? '#F43F75' : '#E5E7EB'}`,
              background: role === r ? '#FFF1F5' : '#fff',
              fontSize: 13, fontWeight: 600,
              color: role === r ? '#881337' : '#374151',
            }}>{roleLabel[r]}</button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {[
            { label: '이름', key: 'name', type: 'text', placeholder: '홍길동' },
            { label: '이메일', key: 'email', type: 'email', placeholder: 'hello@example.com' },
            { label: '비밀번호', key: 'password', type: 'password', placeholder: '8자 이상' },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                required
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                style={{
                  width: '100%', padding: '10px 14px',
                  borderRadius: 8, border: '1px solid #E5E7EB',
                  fontSize: 15, outline: 'none',
                  background: '#FAFAFA',
                }}
              />
            </div>
          ))}

          <button type="submit" style={{
            width: '100%', padding: '13px',
            borderRadius: 10, border: 'none',
            background: '#F43F75', color: '#fff',
            fontSize: 16, fontWeight: 700,
            marginTop: 8,
          }}>
            {roleLabel[role]}으로 시작하기 →
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: '#6B7280' }}>
          이미 계정이 있으신가요? <Link href="/login" style={{ color: '#F43F75', fontWeight: 600 }}>로그인</Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  )
}
