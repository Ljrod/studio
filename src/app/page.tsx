import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/landing/hero";
import Services from "@/components/landing/services";
import Plans from "@/components/landing/plans";
import Process from "@/components/landing/process";
import Testimonials from "@/components/landing/testimonials";
import Faq from "@/components/landing/faq";
import ContactSection from "@/components/landing/contact-section";
import CtaSection from "@/components/landing/cta-section";

/**
 * Componente principal de la Landing Page.
 * Agrupa y renderiza todas las secciones de la página de marketing.
 * La estructura es modular, importando cada sección como un componente independiente.
 */
export default function MarketingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      {/* Header: Contiene la navegación principal y el logo */}
      <Header />

      {/* La sección Hero se coloca fuera del main para que ocupe el ancho completo */}
      <Hero />

      {/* Main: Contenedor principal para el resto del contenido de la página */}
      <main className="flex-1 w-full container">
        {/* Cada sección es un componente autocontenido */}
        <Services />
        <Plans />
        <Process />
        <Testimonials />
        <Faq />
        <CtaSection />
        <ContactSection />
      </main>

      {/* Footer: Contiene links de navegación secundaria, legales y de contacto */}
      <Footer />
    </div>
  );
}
