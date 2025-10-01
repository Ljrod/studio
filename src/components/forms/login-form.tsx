"use client";

// /src/components/forms/login-form.tsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { loginSchema, type LoginValues } from "@/lib/validations/auth";
import { signInUser } from "@/lib/firebase/auth";
import { FirebaseError } from "firebase/app";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/componentsuin/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";

/**
 * Componente del formulario de inicio de sesión.
 * Maneja la lógica de validación, envío y feedback al usuario.
 */
export function LoginForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginValues) {
    setIsLoading(true);
    try {
      await signInUser(data);
      // La redirección es manejada por el AuthLayout al detectar el cambio de estado.
      toast({
        title: "¡Éxito!",
        description: "Has iniciado sesión correctamente. Redirigiendo...",
      });
    } catch (error) {
      // Manejo de errores específicos de Firebase.
      let title = "Error de autenticación";
      let description = "Ocurrió un error. Por favor, inténtalo de nuevo.";
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "auth/invalid-credential":
            title = "Credenciales incorrectas";
            description = "El email o la contraseña no son correctos. Por favor, verifica tus datos.";
            break;
          default:
            title = "Error de Firebase";
            description = `Código de error: ${error.code}`;
        }
      }
      toast({ title, description, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Contraseña</FormLabel>
                <Link
                  href="/reset-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <FormControl>
                <PasswordInput placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Iniciar Sesión
        </Button>
      </form>
    </Form>
  );
}
