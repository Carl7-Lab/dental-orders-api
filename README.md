# 🦷 API de Órdenes Dentales

API REST desarrollada con NestJS para gestionar órdenes dentales digitales, reemplazando el sistema de papelería física en clínicas odontológicas.

## 🎯 ¿Qué hace?

Sistema que permite a odontólogos crear órdenes digitales para radiografías y trabajos de laboratorio de sus pacientes, con gestión completa por parte de administradores de clínica.

## 🏗️ Módulos del Sistema

### 👥 Usuarios (`/api/users`)

Gestión de usuarios del sistema con diferentes roles y permisos.

### 🏥 Clínicas (`/api/clinics`)

Administración de clínicas odontológicas y sus datos.

### 👤 Pacientes (`/api/patients`)

Registro y gestión de pacientes de las clínicas.

### 📸 Órdenes de Imagen (`/api/imaging-orders`)

Creación y gestión de órdenes para radiografías y estudios de imagen.

### 🧪 Órdenes de Laboratorio (`/api/laboratory-orders`)

Creación y gestión de órdenes para trabajos de laboratorio dental.

### 🔐 Autenticación (`/api/auth`)

Sistema de autenticación y autorización con JWT.

## 👥 Usuarios

- **DOCTOR**: Crea órdenes para sus pacientes
- **ADMIN**: Gestiona todas las órdenes y usuarios
- **INTERN**: Consulta órdenes y pacientes

## 🔐 Permisos por Rol

### ADMIN

- ✅ Gestión completa de usuarios (crear, editar, eliminar)
- ✅ Gestión completa de clínicas
- ✅ Gestión completa de pacientes
- ✅ Gestión completa de órdenes de imagen
- ✅ Gestión completa de órdenes de laboratorio
- ✅ Consulta de todos los datos

### DOCTOR

- ❌ Gestión de usuarios
- ✅ Gestión de clínicas
- ✅ Gestión de pacientes
- ✅ Crear y gestionar órdenes de imagen
- ✅ Crear y gestionar órdenes de laboratorio
- ✅ Consulta de órdenes

### INTERN

- ❌ Gestión de usuarios
- ❌ Gestión de clínicas
- ❌ Gestión de pacientes
- ❌ Crear órdenes
- ✅ Solo consulta de órdenes y pacientes

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar base de datos
npm run db:up
npm run db:migrate

# Poblar con datos de prueba
npm run seed:all

# Iniciar servidor
npm run start:dev
```

## 📡 Endpoints Principales

### 🔐 Autenticación

- `POST /api/auth/local/signup` - Registro de usuario
- `POST /api/auth/local/signin` - Login de usuario
- `GET /api/auth/profile` - Perfil del usuario autenticado

### 👥 Usuarios

- `GET /api/users` - Listar usuarios (Admin)
- `POST /api/users` - Crear usuario (Admin)
- `GET /api/users/:id` - Obtener usuario
- `PATCH /api/users/:id` - Actualizar usuario (Admin)
- `DELETE /api/users/:id` - Eliminar usuario (Admin)

### 🏥 Clínicas

- `GET /api/clinics` - Listar clínicas
- `POST /api/clinics` - Crear clínica (Admin/Doctor)
- `GET /api/clinics/:id` - Obtener clínica
- `PATCH /api/clinics/:id` - Actualizar clínica (Admin/Doctor)
- `DELETE /api/clinics/:id` - Eliminar clínica (Admin/Doctor)

### 👤 Pacientes

- `GET /api/patients` - Listar pacientes
- `POST /api/patients` - Crear paciente (Admin/Doctor)
- `GET /api/patients/:id` - Obtener paciente
- `PATCH /api/patients/:id` - Actualizar paciente (Admin/Doctor)
- `DELETE /api/patients/:id` - Eliminar paciente (Admin/Doctor)

### 📸 Órdenes de Imagen

- `GET /api/imaging-orders` - Listar órdenes de imagen
- `POST /api/imaging-orders` - Crear orden de imagen (Admin/Doctor)
- `GET /api/imaging-orders/:id` - Obtener orden de imagen
- `PATCH /api/imaging-orders/:id` - Actualizar orden de imagen (Admin/Doctor)
- `DELETE /api/imaging-orders/:id` - Eliminar orden de imagen (Admin/Doctor)

### 🧪 Órdenes de Laboratorio

- `GET /api/laboratory-orders` - Listar órdenes de laboratorio
- `POST /api/laboratory-orders` - Crear orden de laboratorio (Admin/Doctor)
- `GET /api/laboratory-orders/:id` - Obtener orden de laboratorio
- `PATCH /api/laboratory-orders/:id` - Actualizar orden de laboratorio (Admin/Doctor)
- `DELETE /api/laboratory-orders/:id` - Eliminar orden de laboratorio (Admin/Doctor)

### 📚 Documentación

- `GET /docs` - Swagger UI con documentación completa

## 🛠️ Scripts Disponibles

### Base de Datos

```bash
npm run db:up          # Levantar base de datos con Docker
npm run db:migrate     # Ejecutar migraciones
npm run prisma:reset   # Resetear base de datos
```

### Seeds (Datos de Prueba)

```bash
npm run seed:users              # Poblar usuarios
npm run seed:patients           # Poblar pacientes
npm run seed:clinics            # Poblar clínicas
npm run seed:imaging-orders     # Poblar órdenes de imagen
npm run seed:laboratory-orders  # Poblar órdenes de laboratorio
npm run seed:all               # Poblar todos los datos
```

### Desarrollo

```bash
npm run start:dev     # Servidor en modo desarrollo
npm run start:prod    # Servidor en modo producción
npm run build         # Compilar proyecto
npm run lint          # Linter de código
```

## 🛠️ Tecnologías

- **NestJS** - Framework de Node.js
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación y autorización
- **Swagger** - Documentación de API
- **Docker** - Contenedorización
- **TypeScript** - Lenguaje de programación
