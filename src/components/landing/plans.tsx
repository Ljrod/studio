// /src/components/landing/plans.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import plansData from "@/content/plans.json";
import type { Plan } from "@/lib/types";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Casting de los datos para asegurar el tipado correcto.
const plans: Plan[] = plansData as Plan[];

/**
 * Componente que renderiza la sección de planes de precios.
 * Destaca el plan recomendado con un estilo visual diferente.
 */
export default function Plans() {
  return (
    <section id="plans" className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
      <div className="container px-4 md:px-6">
        {/* Encabezado de la sección */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Planes y Precios</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Planes diseñados para tu éxito</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Elige el plan que mejor se adapte a tu etapa de crecimiento. Todos nuestros planes son flexibles y orientados a resultados.
          </p>
        </div>
        
        {/* Grid de tarjetas de planes */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "flex flex-col",
                plan.isRecommended && "border-primary ring-2 ring-primary shadow-lg"
              )}
            >
              {plan.isRecommended && (
                <div className="bg-primary text-primary-foreground text-center py-1.5 text-sm font-semibold rounded-t-lg">
                  Recomendado
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                <CardDescription>{plan.audience}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price.startsWith("Desde") ? "" : plan.price}</span>
                  <span className="text-muted-foreground">{plan.price.startsWith("Desde") ? plan.price : "/mes"}</span>
                  <p className="text-sm text-muted-foreground mt-1">{plan.price === "Personalizado" ? "Según requerimientos" : "Impuestos no incluidos"}</p>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild 
                  className={cn("w-full", plan.isRecommended && "bg-accent hover:bg-accent/90 text-accent-foreground")}
                  variant={plan.isRecommended ? "default" : "outline"}
                >
                  <Link href="/register">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
