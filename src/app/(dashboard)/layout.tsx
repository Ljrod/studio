"use client";

// /src/app/(dashboard)/layout.tsx

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/sidebar";

/**
 * Layout para las rutas protegidas del dashboard.
 *
 * --- LÓGICA DE PROTECCIÓN DE RUTA (CLIENT-SIDE) ---
 * 1.  Usa el hook `useAuth` para acceder al estado de autenticación (`user`, `loading`).
 * 2.  Muestra un loader mientras `loading` es true.
 * 3.  `useEffect` se ejecuta cuando `loading` o `user` cambian.
 * 4.  Si la carga ha finalizado (`!loading`) y no hay usuario (`!user`),
 *     redirige al usuario a la página de login.
 *
 * --- TRADE-OFFS DE ESTA APROXIMACIÓN ---
 * - **Flicker**: El contenido del dashboard podría renderizarse brevemente en el servidor
 *   y ser visible por un instante antes de que el cliente redirija. El loader global
 *   en `auth-provider` y el loader local aquí mitigan esto.
 * - **Seguridad**: Los datos sensibles no deben cargarse en componentes de servidor dentro
 *   de esta ruta, ya que el middleware no está bloqueando el acceso a nivel de servidor.
 *   La carga de datos debe realizarse en componentes de cliente después de confirmar la
t   autenticación.
 *
 * --- SOLUCIÓN IDEAL (con backend/cookies de sesión) ---
 * La protección se haría en `middleware.ts`, bloqueando la petición en el servidor
 * antes de que cualquier componente de la ruta se renderice.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Muestra un loader mientras se verifica el estado o si no hay usuario (antes de redirigir).
  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Si el usuario está autenticado, muestra el layout del dashboard.
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  );
}
