// /src/lib/types.ts

// Define el tipo para un solo servicio ofrecido por Laibell.
export interface Service {
  id: string; // Identificador único para el servicio.
  title: string; // Título del servicio (ej. "Diseño Web").
  description: string; // Descripción corta del beneficio principal.
  icon: string; // Nombre del icono de lucide-react a usar.
  details: string[]; // Lista de puntos clave o características del servicio.
}

// Define el tipo para un plan de precios.
export interface Plan {
  id: string; // Identificador único para el plan.
  title: string; // Nombre del plan (ej. "Emprendedor").
  audience: string; // A quién está dirigido el plan (ej. "Para startups y freelancers").
  price: string; // Precio del plan (ej. "Desde $499.990").
  features: string[]; // Lista de características incluidas en el plan.
  isRecommended: boolean; // Booleano para destacar el plan.
  cta: string; // Texto para el Call to Action del plan.
}

// Define el tipo para un testimonio de cliente.
export interface Testimonial {
  id: string; // Identificador único del testimonio.
  name: string; // Nombre de la persona que da el testimonio.
  company: string; // Empresa o rol de la persona.
  quote: string; // La cita o testimonio en sí.
  avatarImage: string; // ID de la imagen del avatar en placeholder-images.json.
}

// Define el tipo para una pregunta frecuente.
export interface FaqItem {
  id: string; // Identificador único de la pregunta.
  question: string; // La pregunta.
  answer: string; // La respuesta a la pregunta.
}
