// /src/lib/firebase/auth.ts

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./config";
import type { LoginValues, RegisterValues, ResetPasswordValues } from "@/lib/validations/auth";

// --- PROVEEDORES DE AUTH ---

const googleProvider = new GoogleAuthProvider();

// --- FUNCIONES DE AUTENTICACIÓN ---

/**
 * Inicia el flujo de inicio de sesión con Google a través de un popup.
 * @returns Una promesa que se resuelve con las credenciales del usuario.
 */
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

/**
 * Crea un nuevo usuario utilizando email y contraseña.
 * @param values - Un objeto con email y contraseña.
 * @returns Una promesa que se resuelve con las credenciales del nuevo usuario.
 */
export const createUser = async ({ email, password }: RegisterValues) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Inicia sesión de un usuario existente con email y contraseña.
 * @param values - Un objeto con email y contraseña.
 * @returns Una promesa que se resuelve con las credenciales del usuario.
 */
export const signInUser = async ({ email, password }: LoginValues) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Cierra la sesión del usuario actualmente autenticado.
 * @returns Una promesa que se resuelve cuando el usuario ha cerrado sesión.
 */
export const signOutUser = () => signOut(auth);

/**
 * Envía un correo para restablecer la contraseña a un email dado.
 * @param values - Un objeto con el email del usuario.
 * @returns Una promesa que se resuelve cuando el correo ha sido enviado.
 */
export const resetPassword = async ({ email }: ResetPasswordValues) => {
  return await sendPasswordResetEmail(auth, email);
};
