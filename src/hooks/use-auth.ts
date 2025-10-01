"use client";

// /src/hooks/use-auth.ts

import { useContext } from "react";
import { AuthContext } from "@/context/auth-provider";

/**
 * Hook personalizado para acceder al contexto de autenticación.
 * Simplifica el uso del AuthContext, evitando la importación de `useContext` y `AuthContext`
 * en cada componente que necesite acceso al estado del usuario.
 *
 * @returns El valor del contexto de autenticación (usuario, estado de carga, funciones de auth).
 * @throws {Error} Si se usa fuera de un AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Asegura que el hook se esté utilizando dentro del árbol de componentes del AuthProvider.
  if (context === undefined) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }

  return context;
};
