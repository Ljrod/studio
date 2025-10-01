"use client";

// /src/components/forms/reset-password-form.tsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { resetPasswordSchema, type ResetPasswordValues } from "@/lib/validations/auth";
import { resetPassword } from "@/lib/firebase/auth";
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

/**
 * Componente del formulario de reseteo de contraseña.
 */
export function ResetPasswordForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [wasSent, setWasSent] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: ResetPasswordValues) {
    setIsLoading(true);
    try {
      await resetPassword(data);
      setWasSent(true); // Marca que el correo fue enviado para mostrar un mensaje.
      toast({
        title: "Correo enviado",
        description: "Revisa tu bandeja de entrada (y spam) para ver el enlace de recuperación.",
      });
    } catch (error) {
      let description = "Ocurrió un error. Por favor, inténtalo de nuevo.";
      if (error instanceof FirebaseError && error.code === "auth/user-not-found") {
        description = "No se encontró ninguna cuenta con este email.";
      }
      toast({ title: "Error", description, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }
  
  if (wasSent) {
    return (
      <div className="text-center text-muted-foreground p-4 bg-muted/50 rounded-lg">
        <p>Si existe una cuenta asociada a <strong>{form.getValues("email")}</strong>, recibirás un correo con instrucciones para restablecer tu contraseña.</p>
      </div>
    );
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
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Enviar enlace de recuperación
        </Button>
      </form>
    </Form>
  );
}
