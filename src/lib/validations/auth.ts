// /srcsrc/lib/validations/auth.ts

import { z } from "zod";

/**
 * Esquema de validación para el formulario de inicio de sesión.
 */
export const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  password: z.string().min(1, { message: "La contraseña es requerida." }),
});

export type LoginValues = z.infer<typeof loginSchema>;


/**
 * Esquema de validación para el formulario de registro.
 */
export const registerSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  // La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .regex(/[a-z]/, { message: "Debe contener al menos una minúscula." })
    .regex(/[A-Z]/, { message: "Debe contener al menos una mayúscula." })
    .regex(/[0-9]/, { message: "Debe contener al menos un número." }),
});

export type RegisterValues = z.infer<typeof registerSchema>;


/**
 * Esquema de validación para el formulario de reseteo de contraseña.
 */
export const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
});

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
