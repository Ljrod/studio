"use client";

// /src/components/auth/social-logins.tsx

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Chrome } from "lucide-react";

/**
 * Componente que muestra los botones para iniciar sesión con redes sociales.
 * Actualmente implementa Google. Facebook se puede añadir de forma similar.
 */
export function SocialLogins() {
  const { signInWithGoogle } = useAuth();
  // El loading se podría usar para deshabilitar los botones mientras se procesa.
  // const [isLoading, setIsLoading] = React.useState<"google" | "facebook" | null>(null);

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O continuar con
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <Button variant="outline" type="button" onClick={signInWithGoogle}>
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
    </>
  );
}
