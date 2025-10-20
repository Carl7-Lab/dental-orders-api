import { PrismaClient, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🧪 Iniciando semilla de órdenes de laboratorio...');

  const users = await prisma.user.findMany();
  const patients = await prisma.patient.findMany();
  const clinics = await prisma.clinic.findMany();

  if (users.length === 0) {
    console.error(
      '❌ No hay usuarios en la base de datos. Ejecuta primero: npm run seed:users',
    );
    process.exit(1);
  }

  if (patients.length === 0) {
    console.error(
      '❌ No hay pacientes en la base de datos. Ejecuta primero: npm run seed:patients',
    );
    process.exit(1);
  }

  if (clinics.length === 0) {
    console.error(
      '❌ No hay clínicas en la base de datos. Ejecuta primero: npm run seed:clinics',
    );
    process.exit(1);
  }

  console.log(`👨‍⚕️ Usuarios disponibles: ${users.length}`);
  console.log(`🏥 Pacientes disponibles: ${patients.length}`);
  console.log(`🏥 Clínicas disponibles: ${clinics.length}`);

  const getRandomDate = (): Date => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const randomTime =
      thirtyDaysAgo.getTime() +
      Math.random() * (now.getTime() - thirtyDaysAgo.getTime());
    return new Date(randomTime);
  };

  const laboratoryOrders = [
    {
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.CANCELLED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.CANCELLED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
  ];

  let createdCount = 0;
  let errorCount = 0;

  for (const orderData of laboratoryOrders) {
    try {
      await prisma.laboratoryOrder.create({
        data: orderData,
      });
      createdCount++;
      console.log(
        `✅ Orden de laboratorio creada: ${orderData.status} para paciente ${orderData.patientId}`,
      );
    } catch (error) {
      errorCount++;
      console.error(
        `❌ Error creando orden de laboratorio para paciente ${orderData.patientId}:`,
        error,
      );
    }
  }

  const totalOrders = await prisma.laboratoryOrder.count();
  const ordersByStatus = await prisma.laboratoryOrder.groupBy({
    by: ['status'],
    _count: { status: true },
  });

  console.log('');
  console.log('🎉 Semilla de órdenes de laboratorio completada!');
  console.log(`📊 Estadísticas:`);
  console.log(`   - Órdenes creadas: ${createdCount}`);
  console.log(`   - Errores: ${errorCount}`);
  console.log(`   - Total de órdenes en BD: ${totalOrders}`);
  console.log('');
  console.log('📈 Distribución por estado:');
  ordersByStatus.forEach((group) => {
    console.log(`   - ${group.status}: ${group._count.status} órdenes`);
  });
  console.log('');
  console.log(
    '🧪 Las 20 órdenes de laboratorio están listas para usar en el sistema.',
  );
}

main()
  .catch((e) => {
    console.error(
      '❌ Error durante la ejecución de semillas de órdenes de laboratorio:',
      e,
    );
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
