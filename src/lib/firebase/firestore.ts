// /src/lib/firebase/firestore.ts

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./config";

/**
 * Crea o actualiza el perfil de un usuario en la colección 'users' de Firestore.
 * Esta función se debe llamar después de un registro o inicio de sesión exitoso.
 * 
 * @param user - El objeto de usuario de Firebase Authentication.
 */
export async function addUserProfile(user: User) {
  // Crea una referencia al documento del usuario usando su UID.
  const userRef = doc(db, "users", user.uid);

  try {
    // Utiliza setDoc con { merge: true } para crear el documento si no existe,
    // o para fusionar los datos si ya existe, sin sobrescribir campos no especificados.
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(), // Guarda la marca de tiempo del servidor.
      lastLoginAt: serverTimestamp(), // Actualiza la última fecha de login.
    }, { merge: true });
    console.log("Perfil de usuario creado/actualizado en Firestore.");
  } catch (error) {
    console.error("Error al guardar el perfil del usuario en Firestore:", error);
    // Opcional: podrías lanzar el error para manejarlo en el lugar de la llamada.
    // throw error;
  }
}
