<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 🦷 Sistema de Órdenes Dentales - API REST

API REST desarrollada con NestJS para la gestión digital de órdenes dentales, eliminando el uso de papelería física en clínicas odontológicas.

## 📝 Descripción del Proyecto

Este sistema permite a los odontólogos generar órdenes digitales para sus pacientes de forma rápida y eficiente. El sistema reemplaza las órdenes físicas en papel por una interfaz web moderna.

### 🎯 Objetivo

Digitalizar el proceso de órdenes dentales que actualmente se realiza en papel, reduciendo costos de papelería y mejorando la eficiencia en la gestión de órdenes entre odontólogos y la clínica.

### 👥 Roles del Sistema

- **Doctor (Odontólogo)**: Registra órdenes para sus pacientes
- **Admin (Clínica)**: Visualiza y gestiona todas las órdenes recibidas

## 📡 API Endpoints

Once the server is running, you can access the following endpoints:

### Authentication

- `POST /api/auth/login` - Inicio de sesión (Doctor/Admin)
- `POST /api/auth/register` - Registro de nuevo doctor

### Doctores

- `GET /api/doctors` - Obtener todos los doctores (Admin)
- `GET /api/doctors/:id` - Obtener un doctor por ID
- `POST /api/doctors` - Crear nuevo doctor
- `PATCH /api/doctors/:id` - Actualizar información del doctor
- `DELETE /api/doctors/:id` - Eliminar doctor

### Pacientes/Clientes

- `GET /api/patients` - Obtener todos los pacientes
- `GET /api/patients/:id` - Obtener un paciente por ID
- `POST /api/patients` - Registrar nuevo paciente
- `PATCH /api/patients/:id` - Actualizar información del paciente
- `DELETE /api/patients/:id` - Eliminar paciente

### Órdenes

- `GET /api/orders` - Obtener todas las órdenes (Admin) / Mis órdenes (Doctor)
- `GET /api/orders/:id` - Obtener una orden por ID
- `POST /api/orders` - Crear nueva orden
- `PATCH /api/orders/:id` - Actualizar orden
- `DELETE /api/orders/:id` - Eliminar orden
- `GET /api/orders?userId=:id` - Obtener órdenes de un usuario específico
- `GET /api/orders/patient/:patientId` - Obtener órdenes de un paciente específico

### Documentation

- `GET /docs` - API Documentation (Swagger)

## 📁 Project Structure

```
src/
├── app.module.ts          # Main application module
├── main.ts               # Application entry point
├── auth/                 # Authentication module
│   ├── dto/              # Data Transfer Objects
│   ├── entities/          # Entities
│   ├── guards/            # Authentication guards
│   ├── strategies/        # Passport strategies
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── users/                # Users module (Usuarios/Doctores)
│   ├── dto/              # Data Transfer Objects
│   ├── entities/          # Entities
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
├── patients/             # Patients module (Clientes/Pacientes)
│   ├── dto/              # Data Transfer Objects
│   ├── entities/          # Entities
│   ├── patients.controller.ts
│   ├── patients.module.ts
│   └── patients.service.ts
├── orders/               # Orders module (Órdenes)
│   ├── dto/              # Data Transfer Objects
│   ├── entities/          # Entities
│   ├── orders.controller.ts
│   ├── orders.module.ts
│   └── orders.service.ts
├── common/               # Common utilities
│   ├── adapters/         # Adapters
│   ├── decorators/       # Custom decorators
│   ├── dto/              # Shared DTOs
│   └── pipes/            # Custom pipes
├── config/               # Configuration files
│   ├── app.config.ts
│   └── joi.validation.ts
├── prisma/               # Prisma service
│   ├── prisma.module.ts
│   └── prisma.service.ts
└── prisma-client-exception.filter.ts  # Prisma exception filter
```
