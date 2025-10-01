// Este archivo está intencionadamente vacío por ahora.
// La lógica de protección de rutas se manejará en el lado del cliente
// dentro del layout del dashboard (`src/app/dashboard/layout.tsx`).

// --- NOTA DE IMPLEMENTACIÓN ---
// Una solución más robusta y segura implicaría usar cookies de sesión HTTP-only
// gestionadas en el servidor. Este middleware sería el lugar ideal para verificar
// esa cookie de sesión.
//
// Ejemplo de cómo se vería con cookies de sesión:
/*
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('__session');

  const { pathname } = request.nextUrl;

  // Si el usuario intenta acceder al dashboard sin una cookie de sesión,
  // redirigirlo a la página de login.
  if (pathname.startsWith('/dashboard') && !sessionCookie) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si el usuario está autenticado e intenta acceder a las páginas de login/register,
  // redirigirlo al dashboard.
  if ((pathname === '/login' || pathname === '/register') && sessionCookie) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
*/
// Dado que no podemos añadir dependencias como `firebase-admin` para verificar
// tokens y crear cookies de sesión seguras, optamos por una protección
// del lado del cliente como una solución provisional.

import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: [],
};
