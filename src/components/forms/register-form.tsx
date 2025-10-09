"use client";

// /src/components/forms/register-form.tsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { registerSchema, type RegisterValues } from "@/lib/validations/auth";
import { createUser } from "@/lib/firebase/auth";
import { FirebaseError } from "firebase/app";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";

/**
 * Componente del formulario de registro.
 * Maneja la creación de nuevos usuarios con email y contraseña.
 */
export function RegisterForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: RegisterValues) {
    setIsLoading(true);
    try {
      await createUser(data);
      // El AuthLayout se encargará de redirigir al dashboard.
      toast({
        title: "¡Cuenta creada!",
        description: "Te hemos enviado a tu dashboard.",
      });
    } catch (error) {
      // Manejo de errores específicos de Firebase.
      let title = "Error de registro";
      let description = "Ocurrió un error inesperado.";
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          title = "Email en uso";
          description = "Este email ya está registrado. Por favor, inicia sesión.";
        } else {
            description = error.message;
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
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Crear Cuenta
        </Button>
      </form>
    </Form>
  );
}
