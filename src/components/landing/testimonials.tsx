// /src/components/landing/testimonials.tsx

"use client"

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import testimonialsData from "@/content/testimonials.json";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Testimonial } from "@/lib/types";

// Casting para asegurar el tipado de los datos.
const testimonials: Testimonial[] = testimonialsData as Testimonial[];

/**
 * Componente que muestra los testimonios de clientes en un carrusel.
 * Sirve como prueba social para generar confianza.
 */
export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
      <div className="container px-4 md:px-6">
        {/* Encabezado de la sección */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonios</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Lo que dicen nuestros clientes</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Historias de éxito de empresas que han confiado en nosotros para crecer.
          </p>
        </div>

        {/* Carrusel de testimonios */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => {
              // Busca la imagen del avatar correspondiente.
              const avatar = PlaceHolderImages.find(p => p.id === testimonial.avatarImage);
              return (
                <CarouselItem key={testimonial.id}>
                  <div className="p-1">
                    <Card className="border-0 shadow-none bg-transparent">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        {avatar && (
                           <Image
                             src={avatar.imageUrl}
                             alt={`Avatar de ${testimonial.name}`}
                             width={80}
                             height={80}
                             className="rounded-full mb-4 border-2 border-primary"
                             data-ai-hint={avatar.imageHint}
                           />
                        )}
                        <p className="text-lg md:text-xl font-medium italic text-foreground">&quot;{testimonial.quote}&quot;</p>
                        <div className="mt-4">
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
