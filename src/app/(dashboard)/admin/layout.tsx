"use client";

// /src/app/(dashboard)/admin/layout.tsx

import { ReactNode } from "react";
// import { useAuth } from "@/hooks/use-auth";
// import { useRouter } from "next/navigation";

/**
 * Layout para las rutas de administración.
 *
 * --- NOTA DE IMPLEMENTACIÓN ---
 * Este es el lugar ideal para verificar si el usuario autenticado tiene el rol de "admin".
 * Si no lo tiene, se le debería redirigir o mostrar una página de "Acceso denegado".
 *
 * Ejemplo de cómo se podría hacer:
 * 1. Al crear el perfil de usuario en Firestore, añadir un campo `role: 'customer'`.
 * 2. Extender el `AuthContext` para que también provea la información del perfil de Firestore.
 * 3. En este layout, comprobar `if (!loading && authUser.role !== 'admin') { router.replace('/dashboard') }`.
 *
 * Por simplicidad, esta comprobación no se ha implementado.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  // Aquí iría la lógica de comprobación de rol de administrador.
  // const { authUser, loading } = useAuth(); // Suponiendo que authUser tiene los datos del perfil.
  // const router = useRouter();

  // useEffect(() => {
  //   if (!loading && authUser?.role !== 'admin') {
  //     router.replace('/dashboard');
  //   }
  // }, [authUser, loading, router]);

  // if (loading || authUser?.role !== 'admin') {
  //   return <p>Verificando permisos...</p>
  // }

  return <>{children}</>;
}
