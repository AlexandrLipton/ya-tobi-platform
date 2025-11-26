// src/components/AuthButton.tsx
'use client'

import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'
import { LogOut, LogIn } from 'lucide-react'

export function AuthButton({ user }: { user: User | null }) {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: location.origin }
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    location.reload()
  }

  return user ? (
    <Button variant="outline" onClick={signOut} className="gap-2">
      <LogOut className="h-4 w-4" />
      Вийти ({user.email})
    </Button>
  ) : (
    <Button onClick={signIn} className="gap-2">
      <LogIn className="h-4 w-4" />
      Увійти через Google
    </Button>
  )
}