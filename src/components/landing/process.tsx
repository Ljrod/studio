// /src/components/landing/process.tsx

import { ScanSearch, DraftingCompass, Rocket, LineChart } from "lucide-react";

const processSteps = [
  {
    icon: ScanSearch,
    title: "1. Descubrimiento y Estrategia",
    description: "Analizamos tu negocio, tu mercado y tus metas. Juntos, definimos una estrategia digital sólida y a medida para alcanzar tus objetivos."
  },
  {
    icon: DraftingCompass,
    title: "2. Diseño y Desarrollo",
    description: "Creamos experiencias de usuario memorables y desarrollamos soluciones web y de marketing que no solo lucen bien, sino que convierten."
  },
  {
    icon: Rocket,
    title: "3. Lanzamiento e Implementación",
    description: "Ponemos en marcha la estrategia, lanzando tu sitio web, campañas y contenidos al mundo. Monitoreamos cada detalle para un despegue exitoso."
  },
  {
    icon: LineChart,
    title: "4. Optimización y Crecimiento",
    description: "Medimos, analizamos y optimizamos constantemente. Tu éxito es nuestro éxito, por lo que buscamos el crecimiento continuo y sostenible."
  }
];

/**
 * Componente que describe el proceso de trabajo de Laibell.
 * Muestra los 4 pasos clave de su metodología.
 */
export default function Process() {
  return (
    <section id="process" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        {/* Encabezado de la sección */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Nuestra Metodología</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tu camino al éxito en 4 pasos</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Hemos perfeccionado un proceso que garantiza resultados. Transparente, colaborativo y enfocado en el crecimiento.
          </p>
        </div>

        {/* Grid con los pasos del proceso */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center p-4">
                <div className="relative mb-4">
                  <div className="bg-primary/10 p-6 rounded-full">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
