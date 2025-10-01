// /src/app/(auth)/register/page.tsx

import Link from "next/link";
import { RegisterForm } from "@/components/forms/register-form";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { SocialLogins } from "@/components/auth/social-logins";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear Cuenta",
  description: "Regístrate en Laibell para empezar a impulsar tu negocio.",
};

/**
 * Página de Registro.
 * Permite a los usuarios crear una cuenta nueva con email/contraseña o mediante login social.
 */
export default function RegisterPage() {
  return (
    <AuthWrapper
      title="Crea tu cuenta"
      description="Completa el formulario para unirte a Laibell."
    >
      <div className="grid gap-6">
        <RegisterForm />
        <SocialLogins />
        <p className="px-8 text-center text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </AuthWrapper>
  );
}
