// /src/lib/firebase/config.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase obtenida desde las variables de entorno.
// Es crucial que estas variables estén definidas en tu archivo .env.local.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Inicializa Firebase, pero solo si aún no ha sido inicializado.
// Esto previene errores de reinicialización en entornos de desarrollo con Hot Reload.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exporta las instancias de los servicios de Firebase que se usarán en la aplicación.
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
