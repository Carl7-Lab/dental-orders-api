# 🦷 API de Órdenes Dentales

API REST desarrollada con NestJS para gestionar órdenes dentales digitales, reemplazando el sistema de papelería física en clínicas odontológicas.

## 🎯 ¿Qué hace?

Sistema que permite a odontólogos crear órdenes digitales para radiografías y trabajos de laboratorio de sus pacientes, con gestión completa por parte de administradores de clínica.

## 👥 Usuarios

- **DOCTOR**: Crea órdenes para sus pacientes
- **ADMIN**: Gestiona todas las órdenes y usuarios
- **INTERN**: Consulta órdenes y pacientes

## 🔐 Permisos por Rol

### ADMIN

- ✅ Gestión completa de usuarios (crear, editar, eliminar)
- ✅ Gestión completa de pacientes
- ✅ Gestión completa de órdenes
- ✅ Consulta de todos los datos

### DOCTOR

- ❌ Gestión de usuarios
- ✅ Gestión de pacientes
- ✅ Crear y gestionar órdenes
- ✅ Consulta de órdenes

### INTERN

- ❌ Gestión de usuarios
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

### Autenticación

- `POST /api/auth/local/signup` - Registro
- `POST /api/auth/local/signin` - Login
- `GET /api/auth/profile` - Perfil del usuario

### Gestión

- `GET /api/users` - Usuarios (Admin)
- `GET /api/patients` - Pacientes
- `GET /api/orders` - Órdenes con filtros

### Documentación

- `GET /docs` - Swagger UI

## 🛠️ Tecnologías

- **NestJS** - Framework
- **Prisma** - ORM
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **Swagger** - Documentación
