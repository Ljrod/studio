// /src/components/landing/services.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import servicesData from "@/content/services.json";
import type { Service } from "@/lib/types";
import { Check } from "lucide-react";
import * as Icons from "lucide-react";

// Hacemos un casting explícito para asegurar que los datos cumplen con el tipo Service[]
const services: Service[] = servicesData as Service[];

// Mapeo para convertir el string del icono en un componente de Lucide
const iconMap: { [key: string]: React.ElementType } = {
  Compass: Icons.Compass,
  Users: Icons.Users,
  Rocket: Icons.Rocket,
  Target: Icons.Target,
  Clapperboard: Icons.Clapperboard,
  TrendingUp: Icons.TrendingUp,
};

/**
 * Componente que renderiza la sección de servicios.
 * Mapea los datos de services.json para crear una tarjeta por cada servicio.
 */
export default function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        {/* Encabezado de la sección */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Nuestros Servicios</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Impulsamos tu crecimiento digital</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Ofrecemos un ecosistema de soluciones digitales diseñadas para llevar tu negocio al siguiente nivel.
          </p>
        </div>
        
        {/* Grid de tarjetas de servicios */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            // Obtiene el componente de icono correspondiente del mapa de iconos.
            const IconComponent = iconMap[service.icon] || Icons.HelpCircle;

            return (
              <Card key={service.id} className="flex flex-col transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="pt-2">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {service.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-1 shrink-0 text-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
