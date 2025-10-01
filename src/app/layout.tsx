import type { Metadata } from "next";
import { AuthProvider } from "@/context/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "./globals.css";

// Metadatos base para SEO. Se pueden sobreescribir en páginas específicas.
export const metadata: Metadata = {
  title: {
    default: "Laibell: Marketing y Sitios Web para hacer crecer tu empresa",
    template: "%s | Laibell",
  },
  description:
    "Transformamos tu negocio con estrategias de marketing digital, diseño web de alto impacto y performance. Aumenta tus ventas y consolida tu marca con Laibell.",
  keywords: [
    "marketing digital",
    "diseño web",
    "growth marketing",
    "seo",
    "redes sociales",
    "páginas web",
    "empresas",
    "pymes",
    "emprendedores",
    "Santiago",
    "Chile",
  ],
  authors: [{ name: "Laibell" }],
  creator: "Laibell",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://laibell.com", // Reemplazar con el dominio final
    title: "Laibell: Marketing y Sitios Web para hacer crecer tu empresa",
    description:
      "Estrategias de marketing digital y diseño web de alto impacto para impulsar el crecimiento de tu negocio.",
    siteName: "Laibell",
    images: [
      {
        url: "/og-image.png", // Asegúrate de tener este archivo en /public
        width: 1200,
        height: 630,
        alt: "Laibell Digital Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laibell: Marketing y Sitios Web para hacer crecer tu empresa",
    description:
      "Estrategia, diseño y performance para crecer en digital. Impulsa tu negocio con Laibell.",
    images: ["/og-image.png"], // Asegúrate de tener este archivo en /public
    creator: "@laibell", // Reemplazar con el usuario de Twitter si existe
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <head>
        {/* Importación de fuentes desde Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased"
        )}
      >
        {/* El AuthProvider gestiona el estado de autenticación del usuario en toda la aplicación */}
        <AuthProvider>
          {children}
        </AuthProvider>
        {/* El Toaster es necesario para mostrar notificaciones (ej. errores de formulario) */}
        <Toaster />
      </body>
    </html>
  );
}
