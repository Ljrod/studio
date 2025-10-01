# Laibell: Marketing y Sitios Web

Este es un proyecto Next.js para la landing page de "Laibell", una agencia de marketing digital. El proyecto está construido con Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn/UI y Firebase.

## Características

- **Landing Page Completa**: Secciones de Hero, Servicios, Planes, Testimonios, Proceso, FAQ y Contacto.
- **Autenticación de Usuarios**: Registro e inicio de sesión con Email/Contraseña y Google.
- **Área de Cliente**: Dashboard protegido para usuarios autenticados.
- **Captura de Leads**: Formulario de contacto que guarda la información en Firestore.
- **Herramienta de IA**: Panel de administración con una herramienta para refinar textos de marketing usando Genkit.
- **SEO y Performance**: Optimizado para motores de búsqueda y con foco en la velocidad de carga.
- **Diseño Moderno**: Tema oscuro elegante y profesional, totalmente responsive.

---

## 1. Configuración del Proyecto

### Requisitos Previos

- Node.js (versión 20.x o superior)
- `pnpm` (o `npm`/`yarn`)
- Una cuenta de Firebase

### 1.1. Clonar y Instalar Dependencias

```bash
# Clonar el repositorio (si aplica)
# git clone ...

# Instalar dependencias
pnpm install
```

### 1.2. Configuración de Firebase

1.  **Crear un Proyecto en Firebase**: Ve a la [consola de Firebase](https://console.firebase.google.com/) y crea un nuevo proyecto.

2.  **Crear una Aplicación Web**:
    - Dentro de tu proyecto, ve a "Project Settings" (Configuración del proyecto).
    - En la sección "Your apps" (Tus apps), haz clic en el icono web (`</>`) para crear una nueva aplicación web.
    - Dale un nombre (ej. "Laibell Web") y registra la app. NO actives Firebase Hosting en este paso.
    - Firebase te proporcionará un objeto de configuración (`firebaseConfig`). Copia estos valores.

3.  **Configurar Variables de Entorno**:
    - Crea un archivo `.env.local` en la raíz del proyecto.
    - Pega la configuración de Firebase que copiaste, añadiendo el prefijo `NEXT_PUBLIC_` a cada clave.

    Tu archivo `.env.local` debería lucir así:

    ```env
    # Firebase
    NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="tu-proyecto.firebaseapp.com"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="tu-proyecto"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="tu-proyecto.appspot.com"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
    NEXT_PUBLIC_FIREBASE_APP_ID="1:..."
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-..."

    # Google AI (para la herramienta de refinamiento de copy)
    # Crea una API Key en Google AI Studio: https://aistudio.google.com/app/apikey
    GOOGLE_API_KEY="AIza..."
    ```

4.  **Activar Servicios de Firebase**:
    - **Authentication**:
        - Ve a la sección "Authentication" en la consola de Firebase.
        - En la pestaña "Sign-in method" (Método de inicio de sesión), activa los proveedores:
            - Email/Password
            - Google
    - **Firestore**:
        - Ve a la sección "Firestore Database".
        - Crea una base de datos en modo de **producción**.
        - Elige la ubicación del servidor que prefieras.
        - **Reglas de Seguridad**: Ve a la pestaña "Rules" y pega las siguientes reglas para permitir escrituras en `users` y `leads`:
          ```
          rules_version = '2';
          service cloud.firestore {
            match /databases/{database}/documents {
              match /users/{userId} {
                allow read, write: if request.auth != null && request.auth.uid == userId;
              }
              match /leads/{leadId} {
                allow create: if request.auth == null || request.auth != null; // Permite crear leads a cualquiera
              }
            }
          }
          ```

---

## 2. Ejecutar el Proyecto

### Modo Desarrollo

Para iniciar el servidor de desarrollo local:

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:9002`.

### Servidor de Genkit (IA)

Para probar la herramienta de IA localmente, necesitas ejecutar el servidor de Genkit en una terminal separada:

```bash
pnpm genkit:dev
```

Esto iniciará el inspector de Genkit, generalmente en `http://localhost:4000`.

---

## 3. Despliegue en Firebase Hosting

Este proyecto está configurado para desplegarse fácilmente en Firebase App Hosting.

1. **Instalar Firebase CLI**: Si no lo tienes, instala la CLI de Firebase globalmente.
   ```bash
   npm install -g firebase-tools
   ```

2. **Iniciar sesión en Firebase**:
   ```bash
   firebase login
   ```

3. **Inicializar Firebase en el proyecto**:
   ```bash
   firebase init hosting
   ```
   - Selecciona "Use an existing project" y elige el proyecto que creaste.
   - Cuando te pregunte por el framework web, elige **Next.js**. Firebase App Hosting se configurará automáticamente.

4. **Desplegar**:
   ```bash
   firebase deploy
   ```

Firebase se encargará de construir tu aplicación Next.js y desplegarla.

---

## Nota sobre el envío de correos

El formulario de contacto guarda los leads en Firestore. Para enviar un correo electrónico se requiere una **Firebase Function**. Debido a que no es posible generar el código completo de la función desde aquí, se debe implementar manualmente.

**Pasos sugeridos**:
1. Inicializa Firebase Functions en tu proyecto (`firebase init functions`).
2. Crea una función `onDocumentCreated` que se active cuando se añade un nuevo documento a la colección `leads`.
3. Usa un servicio como `Nodemailer` con un proveedor SMTP (ej. SendGrid, Brevo) para enviar el correo desde la función.
4ø. Asegúrate de configurar las variables de entorno para las credenciales SMTP de forma segura (`firebase functions:config:set`).
