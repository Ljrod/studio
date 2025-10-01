"use client";

// /src/components/forms/contact-form.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import { submitContactForm } from "@/app/actions/contact";
import services from "@/content/services.json";
import { useState } from "react";
import { Loader2 } from "lucide-react";

/**
 * Componente de formulario de contacto.
 * Utiliza React Hook Form y Zod para validación y gestión del estado.
 * Muestra notificaciones (toasts) al usuario sobre el resultado del envío.
 */
export function ContactForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Inicializa el formulario con React Hook Form.
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
  });

  /**
   * Función que se ejecuta al enviar el formulario.
   * Llama a la Server Action para procesar los datos.
   * @param data Los valores del formulario validados.
   */
  async function onSubmit(data: ContactFormValues) {
    setIsLoading(true);
    try {
      const result = await submitContactForm(data);

      if (result.success) {
        toast({
          title: "¡Formulario enviado!",
          description: "Gracias por contactarnos. Te responderemos en breve.",
        });
        form.reset(); // Limpia el formulario tras el envío exitoso.
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error desconocido.";
      toast({
        title: "Error al enviar",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Campo Nombre */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Campo Email */}
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Campo Teléfono (opcional) */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono <span className="text-muted-foreground">(Opcional)</span></FormLabel>
                <FormControl>
                  <Input placeholder="+56 9 1234 5678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Campo Empresa (opcional) */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa <span className="text-muted-foreground">(Opcional)</span></FormLabel>
                <FormControl>
                  <Input placeholder="El nombre de tu empresa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Campo Servicio de Interés */}
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Servicio de interés</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service.id} value={service.title}>
                      {service.title}
                    </SelectItem>
                  ))}
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Campo Mensaje */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuéntanos sobre tu proyecto, tus metas y desafíos."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Botón de envío */}
        <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</>
          ) : (
            "Enviar Mensaje"
          )}
        </Button>
      </form>
    </Form>
  );
}
