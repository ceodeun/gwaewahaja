'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E5E7EB', padding: '40px 36px', width: '100%', maxWidth: 400 }}>

        <Link href="/" style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 24 }}>← 돌아가기</Link>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>
            과<span style={{ color: '#F43F75' }}>(외하)</span>자
          </h1>
          <p style={{ color: '#6B7280', fontSize: 14 }}>로그인하고 과외를 시작해요</p>
        </div>

        <form onSubmit={handleSubmit}>
          {[
            { label: '이메일', key: 'email', type: 'email', placeholder: 'hello@example.com' },
            { label: '비밀번호', key: 'password', type: 'password', placeholder: '비밀번호 입력' },
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
                  fontSize: 15, outline: 'none', background: '#FAFAFA',
                }}
              />
            </div>
          ))}

          <button type="submit" style={{
            width: '100%', padding: '13px',
            borderRadius: 10, border: 'none',
            background: '#F43F75', color: '#fff',
            fontSize: 16, fontWeight: 700, marginTop: 8,
          }}>로그인 →</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: '#6B7280' }}>
          아직 계정이 없으신가요? <Link href="/signup" style={{ color: '#F43F75', fontWeight: 600 }}>회원가입</Link>
        </p>
      </div>
    </div>
  )
}
