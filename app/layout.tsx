import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthButton } from '@/components/AuthButton'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Я — тобі • Допомога громадам і волонтерам',
  description: 'Платформа для з’єднання волонтерів та територіальних громад України',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="uk">
      <body className={`${inter.className} bg-gray-50`}>
        <header className="border-b bg-white">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Я — тобі
            </Link>
            <nav className="flex gap-6 items-center">
              <Link href="/gromady" className="text-gray-700 hover:text-blue-600">
                Громади
              </Link>
              <AuthButton user={user} />
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}