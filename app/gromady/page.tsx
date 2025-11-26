import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase} from '@/lib/supabase'

export const revalidate = 60

export default async function GromadyPage() {
  const { data: gromady } = await supabase
    .from('gromady')
    .select('id, name, region, district, population')
    .order('name')

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Територіальні громади ({gromady?.length})</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gromady?.map((g) => (
          <Link key={g.id} href={`/gromady/${g.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-lg">{g.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{g.region} область</p>
                <p className="text-sm text-gray-500 mt-1">Населення: ~{g.population?.toLocaleString()}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}