# Sistema de Gestión de Proyectos

## Documentación Breve

Sistema de gestión de proyectos y tareas desarrollado con Next.js 16. Permite la gestión de usuarios, proyectos y tareas con un sistema de autenticación basado en roles (Admin, Manager, Developer). La aplicación utiliza json-server como backend simulado para el almacenamiento de datos.

## Estructura del Proyecto

```
sistema-gestion-proyectos/
├── app/                          # Directorio principal de Next.js (App Router)
│   ├── api/                      # API Routes
│   │   ├── login/
│   │   ├── register/
│   │   ├── proyectos
│   │   ├── tareas/
│   │   └── usuarios/
│   ├── login/
│   ├── register/
│   ├── proyectos/
│   ├── tareas/
│   ├── usuarios/
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página de inicio
├── components/                   # Componentes reutilizables
│   ├── ApiInterceptor.tsx        # Interceptor de API
│   ├── Navbar.tsx 
│   ├── ProtectedRoute.tsx
│   ├── PublicRoute.tsx
│   ├── Sidebar.tsx
│   ├── UserInfo.tsx
│   ├── DashboardCard/
│   ├── DashboardComponents/
│   └── Loading/
├── hooks/                        # Custom hooks
│   ├── useDashboardData.ts
│   ├── useGetUsuarios.ts
│   ├── useLogin.ts
│   ├── usePermissions.ts
│   ├── useProyectos.ts
│   ├── useRegister.ts
│   ├── useSidebar.ts
│   └── useTareas.ts
├── interfaces/                   # Definiciones de TypeScript
│   ├── components.interface.ts
│   └── user.interface.ts
├── lib/                          # Utilidades y servicios
│   ├── api.ts
│   └── services/
│       ├── auth.service.ts
│       ├── proyectos.service.ts
│       ├── tareas.service.ts
│       └── usuarios.service.ts
├── store/                        # Estado global (Zustand)
│   ├── useAuthStore.ts
│   └── useLoadingStore.ts
├── constants/                    # Constantes de la aplicación
│   └── navigation.tsx
├── db.json                       # Base de datos JSON Server
└── package.json
```

## Cómo Ejecutar la App Localmente

### Requisitos Previos

- Node.js (versión 20 o superior)
- Administrador de paquetes (npm, yarn, pnpm o bun)

### Pasos para Ejecutar

1. **Instalar dependencias**

```bash
npm install
```

2. **Ejecutar el servidor de desarrollo**

Opción 1: Solo Next.js (sin backend)
```bash
npm run dev
```

Opción 2: Next.js + JSON Server (recomendado)
```bash
npm run dev:all
```

Este comando ejecutará simultáneamente:
- **Next.js**: [http://localhost:3000](http://localhost:3000)
- **JSON Server**: [http://localhost:3001](http://localhost:3001)

3. **Abrir en el navegador**

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

### Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo de Next.js
- `npm run dev:all` - Ejecuta Next.js y JSON Server simultáneamente
- `npm run build` - Genera el build de producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run json-server` - Ejecuta solo el JSON Server

### Credenciales de Prueba

Consulta el archivo `db.json` para ver los usuarios disponibles o crea uno nuevo usando la página de registro.

## Tecnologías Utilizadas

- **Next.js 16** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Zustand** - Gestión de estado
- **Axios** - Cliente HTTP
- **JSON Server** - Backend simulado
- **JWT** - Autenticación
