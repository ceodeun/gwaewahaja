import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '과(외하)자 — 나에게 맞는 과외 선생님',
  description: '학생, 학부모, 선생님을 연결하는 과외 매칭 플랫폼',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
