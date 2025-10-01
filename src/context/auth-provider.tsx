"use client";

// /src/context/auth-provider.tsx

import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { signInWithGooglePopup, signOutUser } from "@/lib/firebase/auth";
import { addUserProfile } from "@/lib/firebase/firestore";
import { Loader2 } from "lucide-react";

// Define la estructura del contexto de autenticación.
interface AuthContextType {
  user: User | null; // El objeto de usuario de Firebase, o null si no está autenticado.
  loading: boolean; // Un booleano para saber si el estado de auth se está cargando.
  signInWithGoogle: () => Promise<void>; // Función para iniciar sesión con Google.
  signOut: () => Promise<void>; // Función para cerrar sesión.
}

// Crea el contexto con un valor inicial undefined.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider de Autenticación.
 * Este componente envuelve la aplicación y provee el estado de autenticación a todos
 * sus componentes hijos. Gestiona la carga inicial del estado del usuario y las
 * funciones de login/logout.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect para suscribirse a los cambios de estado de autenticación de Firebase.
  useEffect(() => {
    // onAuthStateChanged devuelve una función para desuscribirse.
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Si el usuario inicia sesión, actualizamos el estado y guardamos/actualizamos su perfil.
        setUser(user);
        await addUserProfile(user);
      } else {
        // Si el usuario cierra sesión, limpiamos el estado.
        setUser(null);
      }
      // Una vez que tenemos una respuesta (sea usuario o null), dejamos de cargar.
      setLoading(false);
    });

    // La función de cleanup se ejecuta cuando el componente se desmonta.
    // Es crucial para evitar memory leaks.
    return () => unsubscribe();
  }, []);

  // Función para manejar el inicio de sesión con Google.
  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
      // El estado del usuario se actualizará automáticamente por el listener onAuthStateChanged.
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      // Aquí podrías mostrar una notificación al usuario.
    }
  };

  // Función para manejar el cierre de sesión.
  const signOut = async () => {
    try {
      await signOutUser();
      // El estado del usuario se actualizará a null por el listener onAuthStateChanged.
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // El valor que será accesible por los componentes hijos.
  const value = { user, loading, signInWithGoogle, signOut };

  // Muestra un indicador de carga global mientras se verifica el estado de autenticación.
  // Esto previene parpadeos (flickering) donde el contenido protegido se muestra brevemente.
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
