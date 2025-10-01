// /src/components/auth/auth-wrapper.tsx

import { Logo } from "@/components/icons";
import Link from "next/link";
import type { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
  title: string;
  description: string;
}

/**
 * Componente que envuelve los formularios de autenticación (Login, Register, etc.).
 * Proporciona un layout consistente y atractivo para estas páginas.
 */
export function AuthWrapper({ children, title, description }: AuthWrapperProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10 -z-10" />
      <div className="mx-auto w-full max-w-md space-y-6 p-4">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Link href="/">
            <Logo className="h-12 w-12 text-primary" />
          </Link>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
