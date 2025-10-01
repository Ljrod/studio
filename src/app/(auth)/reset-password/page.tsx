// /src/app/(auth)/reset-password/page.tsx

import Link from "next/link";
import { ResetPasswordForm } from "@/components/forms/reset-password-form";
import { AuthWrapper } from "@/componentsaut/auth-wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restablecer Contraseña",
  description: "Recupera el acceso a tu cuenta de Laibell.",
};

/**
 * Página para Restablecer Contraseña.
 * Muestra el formulario para que los usuarios introduzcan su email.
 */
export default function ResetPasswordPage() {
  return (
    <AuthWrapper
      title="Restablecer contraseña"
      description="Introduce tu email y te enviaremos un enlace para recuperar tu cuenta."
    >
      <div className="grid gap-6">
        <ResetPasswordForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          ¿Recordaste tu contraseña?{" "}
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
