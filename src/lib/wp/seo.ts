import { wpApi } from '@/lib/wordpress';

export type SeoContext =
  | { type: 'home' }
  | { type: 'page'; id: number }
  | { type: 'post'; id: number }
  | { type: 'product'; id: number }
  | { type: 'product_category'; id: number }

export async function getSeo(context: SeoContext) {
  const { type, ...params } = context

  const { data } = await wpApi.get('/headless/v1/seo', {
    params: { type, ...params },
  })

  return data
}
