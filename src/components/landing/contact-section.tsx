// /src/components/landing/contact-section.tsx

import { ContactForm } from "@/components/forms/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

/**
 * Componente para la sección de contacto.
 * Incluye el formulario de contacto y otra información relevante.
 */
export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Columna de información y formulario */}
          <div className="space-y-6">
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Contacto</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Hablemos de tu proyecto</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Completa el formulario y nuestro equipo se pondrá en contacto contigo en menos de 24 horas para agendar una reunión.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Columna con información de contacto adicional */}
          <div className="flex flex-col justify-center space-y-6 rounded-lg bg-muted/50 p-8">
            <h3 className="text-2xl font-bold">Información de Contacto</h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <a href="mailto:info@liabell.com" className="hover:text-primary">
                    info@liabell.com
                  </a>
                  <p className="text-sm">Para consultas generales y propuestas.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Teléfono</h4>
                  <a href="tel:+56912345678" className="hover:text-primary">
                    +56 9 1234 5678
                  </a>
                  <p className="text-sm">Lunes a Viernes, 9:00 - 18:00.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Ubicación</h4>
                  <p>Santiago, Chile</p>
                  <p className="text-sm">Trabajamos con clientes de todo el mundo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
