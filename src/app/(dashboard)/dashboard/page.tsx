"use client";

// /src/app/(dashboard)/dashboard/page.tsx

import { useAuth } from "@/hooks/use-auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * Página principal del Dashboard.
 * Saluda al usuario autenticado y muestra un resumen de su perfil.
 */
export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    // Esto es un fallback, ya que el layout debería haber redirigido.
    return null;
  }

  const userInitials = user.displayName
    ? user.displayName.split(" ").map((n) => n[0]).join("")
    : user.email?.[0].toUpperCase() ?? "U";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        ¡Hola, {user.displayName || user.email}! Bienvenido a tu espacio en Laibell.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Tu Perfil</CardTitle>
          <CardDescription>Esta es la información de tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.photoURL ?? ""} alt={user.displayName ?? ""} />
            <AvatarFallback className="text-xl">{userInitials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{user.displayName || "Sin nombre"}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-xs text-muted-foreground mt-1">Miembro desde: {new Date(user.metadata.creationTime!).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mis Proyectos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Aquí aparecerán tus proyectos y servicios activos. (Función en desarrollo)</p>
        </CardContent>
      </Card>
    </div>
  );
}
