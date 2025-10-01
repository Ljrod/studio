// /src/components/landing/faq.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import faqData from "@/content/faq.json";
import type { FaqItem } from "@/lib/types";

// Casting para asegurar el tipado de los datos.
const faqs: FaqItem[] = faqData as FaqItem[];

/**
 * Componente que muestra las Preguntas Frecuentes (FAQ).
 * Utiliza un acordeón para una presentación limpia y funcional.
 */
export default function Faq() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        {/* Encabezado de la sección */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">FAQ</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Preguntas Frecuentes</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Resolvemos tus dudas más comunes. Si no encuentras tu respuesta, no dudes en contactarnos.
          </p>
        </div>

        {/* Acordeón con las preguntas y respuestas */}
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
