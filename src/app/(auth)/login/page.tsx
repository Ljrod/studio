// /src/app/(auth)/login/page.tsx

import Link from "next/link";
import { LoginForm } from "@/components/forms/login-form";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { SocialLogins } from "@/components/auth/social-logins";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description: "Ingresa a tu cuenta de Laibell para gestionar tus proyectos.",
};

/**
 * Página de Inicio de Sesión.
 * Combina el formulario de login con email/contraseña y las opciones de login social.
 */
export default function LoginPage() {
  return (
    <AuthWrapper
      title="Bienvenido de vuelta"
      description="Ingresa tus credenciales para acceder a tu cuenta."
    >
      <div className="grid gap-6">
        <LoginForm />
        <SocialLogins />
        <p className="px-8 text-center text-sm text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </AuthWrapper>
  );
}
