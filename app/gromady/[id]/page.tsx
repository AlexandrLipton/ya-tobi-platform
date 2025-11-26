import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {supabase} from '@/lib/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const revalidate = 60

export default async function GromadaPage({ params }: { params: { id: string } }) {
  const supabaseServer = createServerComponentClient({ cookies })
  const { data: { user } } = await supabaseServer.auth.getUser()

  const { data: gromada } = await supabase
    .from('gromady')
    .select('name')
    .eq('id', params.id)
    .single()

  if (!gromada) notFound()

  const { data: links } = await supabase
    .from('community_organization_links')
    .select(`
      organization:community_organizations (
        id, name, website, contact_person
      )
    `)
    .eq('gromada_id', params.id)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{gromada.name}</h1>
      <p className="text-xl text-gray-600 mb-8">
        Волонтерські організації та ініціативи ({links?.length || 0})
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {links?.map(({ organization }: any) => (
          <Card key={organization.id}>
            <CardHeader>
              <CardTitle className="text-lg">{organization.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {organization.website && (
                <a href={organization.website} target="_blank" className="text-blue-600 hover:underline text-sm">
                  {organization.website.replace(/^https?:\/\//, '')}
                </a>
              )}
              {user && organization.contact_person && (
                <div className="mt-4">
                  <Badge variant="secondary">Контактна особа</Badge>
                  <p className="mt-2 text-sm">{organization.contact_person}</p>
                </div>
              )}
              {!user && organization.contact_person && (
                <p className="text-sm text-gray-500 mt-4">
                  Увійдіть, щоб побачити контакти
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}