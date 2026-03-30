# 📊 Sistema de Gestión de Proyectos

Sistema web para la gestión de proyectos y tareas, desarrollado con Next.js, TypeScript y Tailwind CSS. Permite administrar proyectos, tareas y usuarios con autenticación incluida.

---

## 🚀 Tecnologías utilizadas

- **Next.js 16** — Framework de React para aplicaciones web
- **TypeScript** — Tipado estático para JavaScript
- **Tailwind CSS 4** — Estilos utilitarios
- **Zustand** — Manejo de estado global
- **Axios** — Cliente HTTP para consumo de APIs
- **JSON Server** — Base de datos falsa para desarrollo
- **JWT (jsonwebtoken)** — Autenticación con tokens

---

## ⚙️ Requisitos previos

- Node.js v18 o superior
- npm v9 o superior

---

## 🛠️ Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd dps-sistema-gestion-proyectos
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Correr el proyecto

El proyecto requiere dos servidores corriendo al mismo tiempo: Next.js y JSON Server.

**Opción A — Correr ambos con un solo comando (recomendado):**

```bash
npm run dev:all
```

**Opción B — Correr por separado en dos terminales:**

```bash
# Terminal 1 - Next.js
npm run dev

# Terminal 2 - JSON Server
npm run json-server
```

### 4. Abrir en el navegador

| Servicio | URL |
|---|---|
| Aplicación | http://localhost:3000 |
| Base de datos | http://localhost:3001 |

---

## 👤 Credenciales de prueba

| Nombre | Email | Contraseña | Rol |
|---|---|---|---|
| Carlos Martínez | carlos@ejemplo.com | 123456 | Gerente |
| Ana García | ana@ejemplo.com | 123456 | Usuario |
| Luis Pérez | luis@ejemplo.com | 123456 | Usuario |

---

## ✨ Funcionalidades

- **Autenticación** — Login y logout con JWT. Las rutas están protegidas según si hay sesión activa.
- **Dashboard** — Vista general con estadísticas de proyectos y tareas: totales, en progreso, completados y alta prioridad.
- **CRUD de Proyectos** — Crear, editar y eliminar proyectos con campos de nombre, descripción, fechas y estado.
- **CRUD de Tareas** — Crear, editar y eliminar tareas con asignación a proyecto, prioridad y estado.
- **Loading global** — Spinner automático en cada petición HTTP.
- **Página 404** — Pantalla personalizada para rutas no encontradas.

---

## 📁 Estructura del proyecto

```
├── app/                        # Páginas y rutas de la aplicación
│   ├── api/                    # Endpoints del servidor
│   │   ├── login/              # POST /api/login
│   │   ├── proyectos/          # GET y POST /api/proyectos
│   │   │   └── [id]/           # PUT y DELETE /api/proyectos/:id
│   │   └── tareas/             # GET y POST /api/tareas
│   │       └── [id]/           # PUT y DELETE /api/tareas/:id
│   ├── login/                  # Página de inicio de sesión
│   ├── proyectos/              # Página de gestión de proyectos
│   ├── tareas/                 # Página de gestión de tareas
│   ├── layout.tsx              # Layout global
│   ├── page.tsx                # Dashboard principal
│   └── not-found.tsx           # Página 404
│
├── components/                 # Componentes reutilizables
│   ├── DashboardCard/          # Tarjeta de estadística
│   ├── DashboardComponents/    # Bloques del dashboard
│   ├── Loading/                # Spinner de carga global
│   ├── ApiInterceptor.tsx      # Activa el spinner en cada request
│   ├── ProtectedRoute.tsx      # Protege rutas privadas
│   ├── PublicRoute.tsx         # Redirige si ya hay sesión
│   └── UserInfo.tsx            # Info del usuario y botón de logout
│
├── hooks/                      # Lógica reutilizable
│   ├── useDashboardData.ts     # Carga y calcula datos del dashboard
│   ├── useLogin.ts             # Lógica del formulario de login
│   ├── useProyectos.ts         # Lógica del CRUD de proyectos
│   └── useTareas.ts            # Lógica del CRUD de tareas
│
├── store/                      # Estado global con Zustand
│   ├── useAuthStore.ts         # Sesión del usuario (persiste en localStorage)
│   └── useLoadingStore.ts      # Estado del spinner global
│
├── lib/                        # Configuración y servicios
│   ├── api.ts                  # Cliente Axios y conexión a JSON Server
│   └── services/
│       ├── auth.service.ts     # Servicio de autenticación
│       ├── proyectos.service.ts# Servicio de proyectos
│       └── tareas.service.ts   # Servicio de tareas
│
├── interfaces/                 # Tipos TypeScript
│   └── user.interface.ts       # Interfaces de usuario y autenticación
│
└── db.json                     # Base de datos de desarrollo (JSON Server)
```

---

## 🔄 Flujo de la aplicación

```
Usuario entra → ProtectedRoute verifica sesión
  ↓ Sin sesión → redirige a /login
  ↓ Con sesión → muestra Dashboard

Login:
  Formulario → useLogin → auth.service → POST /api/login
  → Verifica en db.json → genera JWT → guarda en Zustand → redirige a /

Dashboard:
  useDashboardData → GET /api/proyectos + GET /api/tareas
  → Calcula estadísticas → renderiza Statistics, ListProject, TaskStatus
```
Url de repositorio:

https://github.com/MB503DatIA/UDB.git

https://github.com/MB503DatIA/UDB


---

## 👥 Integrantes del equipo
Ricardo Ernesto Alfaro Recinos AR180405 
Miguel Ángel Barahona García BG191322 
Neris Moisés Méndez Díaz MD161918 
