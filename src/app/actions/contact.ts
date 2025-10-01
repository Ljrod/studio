"use server";

// /src/app/actions/contact.ts

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";

/**
 * Server Action para procesar los datos del formulario de contacto.
 * Esta función se ejecuta en el servidor, por lo que es segura para interactuar
 * con la base de datos.
 *
 * @param values - Los datos del formulario.
 * @returns Un objeto indicando si la operación fue exitosa o no, con un mensaje.
 */
export async function submitContactForm(
  values: ContactFormValues
): Promise<{ success: boolean; message: string }> {
  // 1. Validar los datos del formulario en el servidor usando Zod.
  //    Esto es una capa de seguridad adicional a la validación del cliente.
  const validatedFields = contactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Datos inválidos. Por favor, revisa el formulario.",
    };
  }

  const { name, email, phone, company, service, message } = validatedFields.data;

  try {
    // 2. Guardar el lead en la colección 'leads' de Firestore.
    await addDoc(collection(db, "leads"), {
      name,
      email,
      phone: phone || null, // Guarda null si es opcional y no se proveyó.
      company: company || null,
      service,
      message,
      source: "landing-page-contact-form",
      createdAt: serverTimestamp(), // Usa la marca de tiempo del servidor.
      status: "new", // Un estado inicial para gestión interna.
    });

    // --- NOTA DE IMPLEMENTACIÓN PARA ENVÍO DE EMAIL ---
    // Este es el lugar ideal para disparar una notificación por correo.
    // La mejor práctica es usar una Firebase Function que se active
    // con la creación de un nuevo documento en la colección 'leads'.
    // Esto desacopla el envío de correo del formulario y permite reintentos.
    //
    // Ejemplo de cómo sería la lógica si se hiciera aquí (no recomendado para producción):
    // await sendEmail({ to: 'info@laibell.com', subject: 'Nuevo Lead', ... });

    // 3. Devolver una respuesta exitosa.
    return {
      success: true,
      message: "Formulario enviado con éxito.",
    };
  } catch (error) {
    console.error("Error al guardar el lead en Firestore:", error);
    return {
      success: false,
      message: "Ocurrió un error en el servidor. Por favor, inténtalo más tarde.",
    };
thats
  }
}
