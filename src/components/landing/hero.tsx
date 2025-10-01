// /src/components/landing/hero.tsx

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, ShieldCheck } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

/**
 * Componente Hero: la primera sección que ven los usuarios.
 * Contiene la propuesta de valor principal, CTAs y elementos de confianza.
 */
export default function Hero() {
  // Busca la imagen de fondo para el héroe en los datos de placeholder.
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Fondo con imagen y degradado */}
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover object-center z-0"
          priority
        />
      )}
      <div className="absolute inset-0 bg-background/80 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background z-10"></div>
      
      {/* Contenido principal del Hero */}
      <div className="container relative z-20 mx-auto px-4 md:px-6 text-center">
        <div className="flex flex-col items-center space-y-6">
          {/* Título principal H1 */}
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
            Laibell: Marketing y Sitios Web que <span className="text-primary">hacen crecer</span> tu empresa
          </h1>

          {/* Subtítulo de valor */}
          <p className="max-w-[700px] text-foreground/80 md:text-xl">
            Estrategia, diseño y performance para crecer en digital. Transformamos tu visión en resultados medibles.
          </p>

          {/* Botones de Call to Action (CTA) */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/register">Quiero impulsar mi negocio</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/#plans">Ver Planes</Link>
            </Button>
          </div>

          {/* Badges de confianza */}
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Badge variant="secondary" className="gap-2 py-1 px-3">
              <Star className="h-4 w-4 text-primary" />
              <span>+50 Clientes Satisfechos</span>
            </Badge>
            <Badge variant="secondary" className="gap-2 py-1 px-3">
              <Award className="h-4 w-4 text-primary" />
              <span>Resultados Comprobados</span>
            </Badge>
            <Badge variant="secondary" className="gap-2 py-1 px-3">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Expertos Certificados</span>
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
