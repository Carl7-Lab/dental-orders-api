import { PrismaClient, OrderType, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('📋 Iniciando semilla de órdenes...');

  const users = await prisma.user.findMany();
  const patients = await prisma.patient.findMany();

  if (users.length === 0) {
    console.error(
      '❌ No hay usuarios en la base de datos. Ejecuta primero: npm run seed:doctors',
    );
    process.exit(1);
  }

  if (patients.length === 0) {
    console.error(
      '❌ No hay pacientes en la base de datos. Ejecuta primero: npm run seed:patients',
    );
    process.exit(1);
  }

  console.log(`👨‍⚕️ Usuarios disponibles: ${users.length}`);
  console.log(`🏥 Pacientes disponibles: ${patients.length}`);

  const getRandomDate = (): Date => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const randomTime =
      thirtyDaysAgo.getTime() +
      Math.random() * (now.getTime() - thirtyDaysAgo.getTime());
    return new Date(randomTime);
  };

  const orders = [
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.CANCELLED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.CANCELLED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.CANCELLED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.RADIOGRAPHY,
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
    {
      orderType: OrderType.LABORATORY,
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
    },
  ];

  let createdCount = 0;
  let errorCount = 0;

  for (const orderData of orders) {
    try {
      await prisma.order.create({
        data: orderData,
      });
      createdCount++;
      console.log(
        `✅ Orden creada: ${orderData.orderType} - ${orderData.status} para paciente ${orderData.patientId}`,
      );
    } catch (error) {
      errorCount++;
      console.error(
        `❌ Error creando orden para paciente ${orderData.patientId}:`,
        error,
      );
    }
  }

  const totalOrders = await prisma.order.count();
  const ordersByType = await prisma.order.groupBy({
    by: ['orderType'],
    _count: { orderType: true },
  });
  const ordersByStatus = await prisma.order.groupBy({
    by: ['status'],
    _count: { status: true },
  });

  console.log('');
  console.log('🎉 Semilla de órdenes completada!');
  console.log(`📊 Estadísticas:`);
  console.log(`   - Órdenes creadas: ${createdCount}`);
  console.log(`   - Errores: ${errorCount}`);
  console.log(`   - Total de órdenes en BD: ${totalOrders}`);
  console.log('');
  console.log('📈 Distribución por tipo:');
  ordersByType.forEach((group) => {
    console.log(`   - ${group.orderType}: ${group._count.orderType} órdenes`);
  });
  console.log('');
  console.log('📈 Distribución por estado:');
  ordersByStatus.forEach((group) => {
    console.log(`   - ${group.status}: ${group._count.status} órdenes`);
  });
  console.log('');
  console.log('📋 Las 30 órdenes están listas para usar en el sistema.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante la ejecución de semillas de órdenes:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
