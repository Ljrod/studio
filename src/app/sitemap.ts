// /src/app/sitemap.ts

import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: Reemplazar con la URL de producción final.
  const baseUrl = 'https://liabell.com'

  // Aquí se podrían añadir rutas dinámicas, por ejemplo, desde un blog.
  // const blogPosts = await fetch(...).then(res => res.json());
  // const blogPostUrls = blogPosts.map(post => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: post.updatedAt }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#plans`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    // ... y aquí se añadirían las URLs dinámicas.
    // ...blogPostUrls
  ]
}
