"use client";

// /src/app/(auth)/layout.tsx

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

/**
 * Layout para las páginas de autenticación (login, register, etc.).
 * Su principal función es proteger estas rutas: si un usuario ya está autenticado,
 * lo redirige automáticamente al dashboard.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Si la carga ha terminado y hay un usuario, redirigir al dashboard.
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  // Mientras se verifica el estado de autenticación, muestra un loader.
  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Si no está cargando y no hay usuario, muestra el contenido de la página de auth.
  return <>{children}</>;
}
