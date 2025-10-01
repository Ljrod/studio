// /src/components/landing/cta-section.tsx

import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Componente de Call to Action (CTA) intermedio.
 * Su objetivo es reforzar el mensaje y dirigir al usuario hacia la conversión.
 */
export default function CtaSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            ¿Listo para llevar tu negocio al siguiente nivel?
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Hablemos de tus metas. Agenda una consultoría gratuita y sin compromisos para descubrir cómo podemos ayudarte a crecer.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#contact">Quiero una consultoría gratis</Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            Resultados garantizados. Estrategia personalizada.
          </p>
        </div>
      </div>
    </section>
  );
}
