import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mountain, HeartHandshake, Users, MapPin } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-8">
            <Mountain className="h-24 w-24 text-blue-600" />
            <HeartHandshake className="h-24 w-24 text-red-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Я — тобі
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Платформа, що з’єднує волонтерів та територіальні громади України
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="text-lg px-10">
              <Link href="/gromady">Переглянути громади</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-blue-600" />
            <h3>34+ волонтерських організацій</h3>
          </div>
          <div className="text-center">
            <MapPin className="h-16 w-16 mx-auto mb-4 text-green-600" />
            <h3>Покриття по всій Україні</h3>
          </div>
          <div className="text-center">
            <HeartHandshake className="h-16 w-16 mx-auto mb-4 text-red-600" />
            <h3>Реальна допомога там, де потрібно</h3>
          </div>
        </div>
      </section>
    </main>
  )
}