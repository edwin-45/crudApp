# 🎵 Lista de Reproducción - CRUD App

Aplicación web desarrollada con **Angular 21** para gestionar listas de reproducción de música. Permite a los usuarios autenticados crear, editar, eliminar y visualizar listas de reproducción con sus canciones asociadas.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Componentes Principales](#componentes-principales)
- [Servicios](#servicios)
- [Rutas y Navegación](#rutas-y-navegación)
- [Autenticación y Seguridad](#autenticación-y-seguridad)
- [API Backend](#api-backend)
- [Desarrollo](#desarrollo)

---

## ✨ Características

- ✅ **Autenticación de usuarios** con JWT (JSON Web Tokens)
- ✅ **CRUD completo** de listas de reproducción
- ✅ **Gestión de canciones** dentro de cada lista
- ✅ **Rutas protegidas** con guards de autenticación
- ✅ **Lazy loading** de componentes para optimización
- ✅ **Diseño responsive** y moderno
- ✅ **Validación de formularios**
- ✅ **Manejo de errores** centralizado

---

## 🛠 Tecnologías Utilizadas

### Frontend
- **Angular 21.0.0** - Framework principal
- **TypeScript 5.9.2** - Lenguaje de programación
- **RxJS 7.8.0** - Programación reactiva
- **Angular Router** - Sistema de navegación
- **Angular Forms** - Manejo de formularios
- **Zone.js 0.16.0** - Detección de cambios

### Backend (Esperado)
- **Spring Boot** - Framework backend Java
- **API REST** - Comunicación HTTP
- **JWT** - Autenticación basada en tokens

### Herramientas de Desarrollo
- **Angular CLI 21.0.1** - Generación y scaffolding
- **Vitest 4.0.8** - Testing unitario
- **Prettier** - Formateo de código
- **npm 11.2.0** - Gestor de paquetes

---

## 🏗 Arquitectura del Proyecto

La aplicación sigue el patrón de arquitectura **Standalone Components** de Angular con:

- **Componentes Standalone**: Sin módulos NgModule tradicionales
- **Inyección de dependencias** moderna con `inject()`
- **Lazy Loading**: Carga diferida de componentes
- **Guards funcionales**: Protección de rutas con `CanActivateFn`
- **Servicios singleton**: Provisión en root para servicios compartidos

---

## 🚀 Instalación y Configuración

### Prerequisitos

- **Node.js** (versión 18 o superior)
- **npm** (versión 11.2.0 o superior)
- **Angular CLI** (versión 21.0.1)

### Pasos de Instalación

1. **Clonar el repositorio**:
```bash
git clone https://github.com/edwin-45/crudApp.git
cd crudApp
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno** (si es necesario):
   - Editar `src/app/services/auth.service.ts` y `lista-reproduccion.service.ts`
   - Cambiar la URL del API: `private apiUrl = 'http://localhost:8080';`

4. **Iniciar el servidor de desarrollo**:
```bash
npm start
# o
ng serve
```

5. **Abrir el navegador**:
   - Navegar a `http://localhost:4200/`
   - La app redirigirá automáticamente a `/login`

---

## 📁 Estructura del Proyecto

```
crud-app/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes de la aplicación
│   │   │   ├── login/           # Componente de inicio de sesión
│   │   │   │   ├── login.ts
│   │   │   │   ├── login.html
│   │   │   │   ├── login.css
│   │   │   │   └── login.spec.ts
│   │   │   ├── register/        # Componente de registro
│   │   │   └── lista-reproduccion/
│   │   │       ├── lista-list/  # Lista de todas las listas
│   │   │       ├── lista-form/  # Formulario crear/editar lista
│   │   │       ├── lista-detail/# Detalle de una lista específica
│   │   │       └── cancion-item/# Item individual de canción
│   │   │
│   │   ├── services/            # Servicios de la aplicación
│   │   │   ├── auth.service.ts          # Servicio de autenticación
│   │   │   └── lista-reproduccion.service.ts  # Servicio CRUD listas
│   │   │
│   │   ├── guards/              # Guards de protección de rutas
│   │   │   └── auth-guard.ts    # Guard de autenticación
│   │   │
│   │   ├── models/              # Modelos de datos TypeScript
│   │   │   ├── lista-reproduccion.model.ts
│   │   │   └── cancion.model.ts
│   │   │
│   │   ├── app.ts               # Componente raíz
│   │   ├── app.html             # Template del componente raíz
│   │   ├── app.css              # Estilos globales
│   │   ├── app.config.ts        # Configuración de la aplicación
│   │   └── app.routes.ts        # Definición de rutas
│   │
│   ├── index.html               # HTML principal
│   ├── main.ts                  # Punto de entrada de la aplicación
│   └── styles.css               # Estilos globales
│
├── angular.json                 # Configuración de Angular CLI
├── package.json                 # Dependencias del proyecto
├── tsconfig.json                # Configuración de TypeScript
└── README.md                    # Este archivo
```

---

## 🧩 Componentes Principales

### 1. **LoginComponent** (`src/app/components/login/`)

Componente de autenticación de usuarios.

**Funcionalidades**:
- Formulario de login con validación
- Manejo de errores de autenticación
- Redirección a `/listas` después del login exitoso
- Navegación a registro

**Propiedades**:
```typescript
username: string = '';
password: string = '';
errorMessage: string = '';
isLoading: boolean = false;
```

**Métodos principales**:
- `onSubmit()`: Envía credenciales al backend
- `goToRegister()`: Navega al componente de registro

---

### 2. **ListaListComponent** (`src/app/components/lista-reproduccion/lista-list/`)

Muestra todas las listas de reproducción del usuario.

**Funcionalidades**:
- Listado de todas las listas de reproducción
- Navegación a detalles de lista
- Botón para crear nueva lista
- Opción de eliminar listas

---

### 3. **ListaFormComponent** (`src/app/components/lista-reproduccion/lista-form/`)

Formulario para crear y editar listas de reproducción.

**Funcionalidades**:
- Crear nueva lista de reproducción
- Editar lista existente
- Validación de campos obligatorios
- Agregar canciones a la lista

---

### 4. **ListaDetailComponent** (`src/app/components/lista-reproduccion/lista-detail/`)

Vista detallada de una lista de reproducción específica.

**Funcionalidades**:
- Visualizar información de la lista
- Mostrar todas las canciones de la lista
- Editar canciones
- Eliminar canciones
- Volver al listado

---

### 5. **CancionItemComponent** (`src/app/components/lista-reproduccion/cancion-item/`)

Componente reutilizable para mostrar información de una canción.

**Funcionalidades**:
- Mostrar detalles de la canción (título, artista, álbum, género)
- Acciones de editar/eliminar
- Diseño responsive

---

## 🔧 Servicios

### 1. **AuthService** (`src/app/services/auth.service.ts`)

Gestiona la autenticación de usuarios.

**Métodos principales**:

```typescript
// Iniciar sesión
login(username: string, password: string): Observable<any>

// Registrar nuevo usuario
register(user: any): Observable<any>

// Cerrar sesión
logout(): void

// Obtener token JWT
getToken(): string | null

// Verificar si usuario está autenticado
isAuthenticated(): boolean
```

**Características**:
- Almacena token JWT en `localStorage`
- Verifica expiración de token
- Observable para estado de autenticación
- Headers con Bearer token para peticiones

**URL del API**: `http://localhost:8080`

---

### 2. **ListaReproduccionService** (`src/app/services/lista-reproduccion.service.ts`)

Gestiona operaciones CRUD de listas de reproducción.

**Métodos principales**:

```typescript
// Obtener todas las listas
getListas(): Observable<ListaReproduccion[]>

// Obtener lista por nombre
getListaByNombre(nombre: string): Observable<ListaReproduccion>

// Crear nueva lista
createLista(lista: ListaReproduccion): Observable<ListaReproduccion>

// Actualizar lista existente
updateLista(nombre: string, lista: ListaReproduccion): Observable<ListaReproduccion>

// Eliminar lista
deleteLista(nombre: string): Observable<void>

// Agregar canción a lista
addCancion(nombreLista: string, cancion: Cancion): Observable<Cancion>

// Eliminar canción de lista
removeCancion(nombreLista: string, cancionId: number): Observable<void>
```

**Características**:
- Incluye headers de autenticación en todas las peticiones
- Maneja errores HTTP
- Usa tipos TypeScript para type-safety

**URL del API**: `http://localhost:8080/lists`

---

## 🗺 Rutas y Navegación

### Configuración de Rutas (`src/app/app.routes.ts`)

```typescript
export const routes: Routes = [
  // Ruta raíz redirige a login
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  
  // Login (sin protección)
  { 
    path: 'login', 
    component: LoginComponent 
  },
  
  // Lista de listas (protegida)
  {
    path: 'listas',
    canActivate: [authGuard],
    loadComponent: () => import('./components/lista-reproduccion/lista-list/lista-list')
      .then(m => m.ListaListComponent)
  },
  
  // Crear nueva lista (protegida)
  {
    path: 'listas/nueva',
    canActivate: [authGuard],
    loadComponent: () => import('./components/lista-reproduccion/lista-form/lista-form')
      .then(m => m.ListaFormComponent)
  },
  
  // Detalle de lista (protegida)
  {
    path: 'listas/:nombre',
    canActivate: [authGuard],
    loadComponent: () => import('./components/lista-reproduccion/lista-detail/lista-detail')
      .then(m => m.ListaDetailComponent)
  }
];
```

### Estrategia de Carga

- **Eager Loading**: `LoginComponent` se carga inmediatamente
- **Lazy Loading**: Componentes de listas se cargan bajo demanda
- **Route Parameters**: `:nombre` para identificar lista específica

---

## 🔐 Autenticación y Seguridad

### Auth Guard (`src/app/guards/auth-guard.ts`)

Guard funcional que protege rutas privadas:

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirigir al login si no está autenticado
  router.navigate(['/login']);
  return false;
};
```

**Funcionamiento**:
1. Verifica si el usuario tiene token válido
2. Si está autenticado, permite el acceso
3. Si no, redirige a `/login`

### Flujo de Autenticación

1. **Login**:
   - Usuario ingresa credenciales
   - `AuthService.login()` envía petición a backend
   - Backend responde con token JWT
   - Token se guarda en `localStorage`
   - Usuario es redirigido a `/listas`

2. **Navegación**:
   - `authGuard` verifica token en cada ruta protegida
   - Si token es válido, permite acceso
   - Si no, redirige a login

3. **Logout**:
   - `AuthService.logout()` elimina token
   - Usuario es redirigido a login

### Seguridad del Token

```typescript
isAuthenticated(): boolean {
  const token = this.getToken();
  if (!token) {
    return false;
  }

  // Verificar si el token está expirado
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp * 1000;
    return Date.now() < expiration;
  } catch (error) {
    return false;
  }
}
```

---

## 📡 API Backend

### Endpoints Esperados

#### **Autenticación**

```
POST /login
Body: { "username": "string", "password": "string" }
Response: { "token": "jwt_token" }

POST /users/register
Body: { "username": "string", "password": "string", "email": "string" }
Response: Usuario creado
```

#### **Listas de Reproducción**

```
GET /lists
Headers: Authorization: Bearer {token}
Response: ListaReproduccion[]

GET /lists/{nombre}
Headers: Authorization: Bearer {token}
Response: ListaReproduccion

POST /lists
Headers: Authorization: Bearer {token}
Body: ListaReproduccion
Response: ListaReproduccion creada

PUT /lists/{nombre}
Headers: Authorization: Bearer {token}
Body: ListaReproduccion
Response: ListaReproduccion actualizada

DELETE /lists/{nombre}
Headers: Authorization: Bearer {token}
Response: 204 No Content
```

#### **Canciones**

```
POST /lists/{nombreLista}/canciones
Headers: Authorization: Bearer {token}
Body: Cancion
Response: Cancion creada

DELETE /lists/{nombreLista}/canciones/{cancionId}
Headers: Authorization: Bearer {token}
Response: 204 No Content
```

### Modelos de Datos

#### **ListaReproduccion**
```typescript
interface ListaReproduccion {
  id?: number;
  nombre: string;
  descripcion?: string;
  canciones: Cancion[];
}
```

#### **Cancion**
```typescript
interface Cancion {
  id?: number;
  titulo: string;
  artista: string;
  album: string;
  genero: string;
}
```

---

## 💻 Desarrollo

### Servidor de Desarrollo

```bash
ng serve
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente con cualquier cambio en los archivos fuente.

### Generar Componentes

```bash
ng generate component components/nombre-componente --standalone
```

### Generar Servicios

```bash
ng generate service services/nombre-servicio
```

### Generar Guards

```bash
ng generate guard guards/nombre-guard --functional
```

### Compilar para Producción

```bash
ng build
```

Los archivos compilados se almacenarán en el directorio `dist/`. La compilación de producción optimiza la aplicación para rendimiento y velocidad.

### Ejecutar Tests Unitarios

```bash
ng test
```

Utiliza [Vitest](https://vitest.dev/) como test runner para ejecutar las pruebas unitarias.

### Modo Watch (Desarrollo continuo)

```bash
ng build --watch --configuration development
```

---

## 🧪 Testing

### Estructura de Tests

Cada componente y servicio tiene su archivo de pruebas correspondiente:

```
login.spec.ts              # Tests del componente Login
auth.service.spec.ts       # Tests del servicio de autenticación
auth-guard.spec.ts         # Tests del guard de autenticación
```

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test -- --watch
```

---

## 📝 Buenas Prácticas Implementadas

### 1. **Arquitectura Limpia**
- Separación clara entre componentes, servicios y modelos
- Servicios singleton para lógica de negocio compartida
- Componentes standalone para mejor tree-shaking

### 2. **TypeScript Estricto**
- Tipado fuerte en todos los modelos
- Interfaces para contratos de datos
- Type-safety en servicios HTTP

### 3. **Seguridad**
- Autenticación basada en JWT
- Guards para protección de rutas
- Validación de expiración de tokens
- Headers de autorización en peticiones HTTP

### 4. **Performance**
- Lazy loading de componentes
- OnPush change detection (recomendado)
- Código optimizado para producción

### 5. **Mantenibilidad**
- Código formateado con Prettier
- Nomenclatura consistente
- Comentarios explicativos
- Documentación completa

---

## 🚧 Próximas Mejoras

- [ ] Implementar componente de registro
- [ ] Agregar interceptor HTTP para manejo automático de tokens
- [ ] Implementar refresh token
- [ ] Agregar notificaciones toast
- [ ] Mejorar diseño UI/UX
- [ ] Implementar paginación en lista de listas
- [ ] Agregar búsqueda y filtros
- [ ] Implementar drag & drop para reordenar canciones
- [ ] Agregar tests E2E con Cypress
- [ ] Implementar PWA (Progressive Web App)
- [ ] Agregar modo oscuro
- [ ] Integración con Spotify API (opcional)

---

## 🐛 Solución de Problemas

### Error: "NG0908: In this configuration Angular requires Zone.js"

**Solución**: Asegúrate de que `zone.js` esté importado en `main.ts`:

```typescript
import 'zone.js'; // Debe ser la primera línea
import { bootstrapApplication } from '@angular/platform-browser';
// ...resto del código
```

### Error: "Cannot find module or its corresponding type declarations"

**Solución**: Verifica que todos los componentes estén exportados correctamente:

```typescript
export class LoginComponent { }
export class ListaListComponent { }
```

### Error: "Cannot match any routes"

**Solución**: Verifica que `RouterOutlet` esté importado en `app.ts`:

```typescript
import { RouterOutlet } from '@angular/router';

@Component({
  // ...
  imports: [RouterOutlet]
})
```

### Error de CORS en peticiones HTTP

**Solución**: Configura CORS en el backend Spring Boot:

```java
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class MyController {
  // ...
}
```

---

## 📞 Contacto y Soporte

- **Repositorio**: [github.com/edwin-45/crudApp](https://github.com/edwin-45/crudApp)
- **Issues**: Reportar problemas en GitHub Issues
- **Documentación Angular**: [angular.dev](https://angular.dev)

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 👨‍💻 Autor

**Edwin**
- GitHub: [@edwin-45](https://github.com/edwin-45)

---

## 🙏 Agradecimientos

- Angular Team por el framework
- Comunidad de Angular por recursos y soporte
- Spring Boot por el backend robusto

---

**¡Disfruta desarrollando con Angular! 🚀**
