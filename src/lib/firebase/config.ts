// /src/lib/firebase/config.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- Validación de Variables de Entorno ---
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    throw new Error(`Error: La variable de entorno ${varName} es requerida pero no fue encontrada. Asegúrate de configurarla en tu entorno de despliegue (ej. Vercel).`);
  }
}

// Configuración de Firebase obtenida desde las variables de entorno.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Esta es opcional
};

// Inicializa Firebase, pero solo si aún no ha sido inicializado.
// Esto previene errores de reinicialización en entornos de desarrollo con Hot Reload.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exporta las instancias de los servicios de Firebase que se usarán en la aplicación.
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
