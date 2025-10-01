// /src/components/layout/footer.tsx

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";

/**
 * Componente Footer para el sitio web.
 * Contiene información de la marca, enlaces a redes sociales y links legales.
 */
export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40">
      <div className="container grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        {/* Sección de la marca y descripción */}
        <div className="flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">Liabell</span>
          </Link>
          <p className="text-muted-foreground">
            Estrategia, diseño y performance para crecer en digital.
          </p>
        </div>

        {/* Sección de navegación y enlaces */}
        <div className="grid grid-cols-2 gap-4 text-sm md:col-span-2 md:grid-cols-4">
          <div className="grid gap-2">
            <h4 className="font-semibold font-headline">Servicios</h4>
            <Link href="/#services" className="text-muted-foreground hover:text-foreground">
              Estrategia Digital
            </Link>
            <Link href="/#services" className="text-muted-foreground hover:text-foreground">
              Diseño Web
            </Link>
            <Link href="/#services" className="text-muted-foreground hover:text-foreground">
              Gestión RRSS
            </Link>
          </div>
          <div className="grid gap-2">
            <h4 className="font-semibold font-headline">Compañía</h4>
            <Link href="/#about" className="text-muted-foreground hover:text-foreground">
              Nosotros
            </Link>
            <Link href="/#testimonials" className="text-muted-foreground hover:text-foreground">
              Casos de Éxito
            </Link>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground pointer-events-none opacity-50">
              Blog (pronto)
            </Link>
          </div>
          <div className="grid gap-2">
            <h4 className="font-semibold font-headline">Legal</h4>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground pointer-events-none opacity-50">
              Términos de Servicio
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground pointer-events-none opacity-50">
              Política de Privacidad
            </Link>
          </div>
          <div className="grid gap-2">
            <h4 className="font-semibold font-headline">Contacto</h4>
            <a href="mailto:info@liabell.com" className="text-muted-foreground hover:text-foreground">
              info@liabell.com
            </a>
          </div>
        </div>
      </div>

      {/* Barra inferior con copyright y redes sociales */}
      <div className="container flex flex-col items-center justify-between gap-4 border-t border-border/40 py-6 sm:flex-row">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Liabell. Todos los derechos reservados.</p>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="mailto:info@liabell.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}