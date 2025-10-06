import { PrismaClient, Role } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Iniciando proceso de semillas...');

  const hashedPassword = await argon.hash('password123');

  const admin = await prisma.user.upsert({
    where: { email: 'admin@dental.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@dental.com',
      password: hashedPassword,
      phone: '1234567890',
      address: 'Calle Principal 123, Ciudad',
      role: Role.ADMIN,
      isActive: true,
    },
  });

  console.log('✅ Usuario ADMIN creado:', {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  });

  const doctor = await prisma.user.upsert({
    where: { email: 'doctor@dental.com' },
    update: {},
    create: {
      name: 'Dr. Juan Pérez',
      email: 'doctor@dental.com',
      password: hashedPassword,
      phone: '0987654321',
      address: 'Avenida Salud 456, Ciudad',
      role: Role.DOCTOR,
      isActive: true,
    },
  });

  console.log('✅ Usuario DOCTOR creado:', {
    id: doctor.id,
    name: doctor.name,
    email: doctor.email,
    role: doctor.role,
  });

  const intern = await prisma.user.upsert({
    where: { email: 'intern@dental.com' },
    update: {},
    create: {
      name: 'María García',
      email: 'intern@dental.com',
      password: hashedPassword,
      phone: '1122334455',
      address: 'Calle Estudiantes 789, Ciudad',
      role: Role.INTERN,
      isActive: true,
    },
  });

  console.log('✅ Usuario INTERN creado:', {
    id: intern.id,
    name: intern.name,
    email: intern.email,
    role: intern.role,
  });

  console.log('🎉 Semillas completadas exitosamente!');
  console.log('');
  console.log('📋 Credenciales de acceso:');
  console.log('ADMIN:');
  console.log('  Email: admin@dental.com');
  console.log('  Password: password123');
  console.log('');
  console.log('DOCTOR:');
  console.log('  Email: doctor@dental.com');
  console.log('  Password: password123');
  console.log('');
  console.log('INTERN:');
  console.log('  Email: intern@dental.com');
  console.log('  Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error durante la ejecución de semillas:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
