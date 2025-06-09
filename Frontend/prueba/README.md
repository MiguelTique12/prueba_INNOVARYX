# Frontend - Sistema de Gestión de Presupuestos

Aplicación web para gestionar presupuestos organizacionales con interfaz moderna y responsive.

## 🚀 Tecnologías

- **React 18** + **TypeScript**
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Styling
- **ESLint** - Code linting

## ✨ Funcionalidades

- 📊 **CRUD de Presupuestos** - Crear, leer, actualizar y eliminar
- 🔍 **Tabla con Paginación** - Navegación eficiente de datos
- 📱 **Diseño Responsivo** - Optimizado para móvil y desktop
- 🏷️ **Estados Visuales** - Badges de estado (Pendiente, Aprobado, etc.)
- 💰 **Formato de Moneda** - COP (Peso Colombiano)

## 📂 Estructura

```
src/
├── components/     # Componentes UI
├── hooks/         # Custom hooks (usePagination)
├── pages/         # Páginas principales
├── services/      # API calls
├── types/         # TypeScript types
└── App.tsx
```

## ⚙️ Configuración

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Variables de entorno**
   ```bash
   # .env
   VITE_API_URL=http://localhost:8080
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

## 📜 Scripts

```bash
npm run dev      # Servidor desarrollo
npm run build    # Build producción
npm run preview  # Preview build
npm run lint     # Ejecutar ESLint
```

## 🔗 Backend Required

El frontend requiere un backend REST API en `http://localhost:8080` con endpoints:

- `GET /api/presupuestos` - Listar presupuestos
- `POST /api/presupuestos` - Crear presupuesto
- `PUT /api/presupuestos/{id}` - Actualizar presupuesto
- `DELETE /api/presupuestos/{id}` - Eliminar presupuesto

## 🎨 Componentes Principales

- **PresupuestoTable** - Tabla con paginación
- **PresupuestoModal** - Modal para crear/editar
- **PresupuestoForm** - Formulario con validación
- **Pagination** - Controles de paginación