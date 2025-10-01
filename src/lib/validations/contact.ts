// /src/lib/validations/contact.ts

import { z } from "zod";

/**
 * Esquema de validación para el formulario de contacto usando Zod.
 * Define las reglas para cada campo del formulario.
 */
export const contactFormSchema = z.object({
  // El nombre es requerido y debe tener al menos 2 caracteres.
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  // El email es requerido y debe ser una dirección de correo válida.
  email: z.string().email({
    message: "Por favor, introduce una dirección de email válida.",
  }),
  // El teléfono es opcional.
  phone: z.string().optional(),
  // La empresa es opcional.
  company: z.string().optional(),
  // El servicio de interés es requerido.
  service: z.string({
    required_error: "Por favor, selecciona un servicio de interés.",
  }),
  // El mensaje es requerido y debe tener al menos 10 caracteres.
  message: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
});

// Exporta el tipo inferido del esquema para usarlo en los componentes.
export type ContactFormValues = z.infer<typeof contactFormSchema>;
