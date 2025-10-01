// /src/app/robots.ts

import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // TODO: Reemplazar con la URL de producción final.
  const sitemapUrl = 'https://laibell.com/sitemap.xml';

  return {
    rules: {
      userAgent: '*', // Aplica a todos los bots
      allow: '/', // Permite crawlear todo el sitio
      disallow: ['/dashboard/', '/admin/'], // No crawlear rutas privadas/de admin
    },
    sitemap: sitemapUrl,
  }
}
