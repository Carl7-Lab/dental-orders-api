import {
  PrismaClient,
  OrderStatus,
  RadiographService,
  ComplementaryService,
  TomographyService,
  OrthodonticPackage,
  IndividualOrthodonticStudy,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('📋 Iniciando semilla de órdenes de imagen...');

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

  const getRandomRadiographService = (): RadiographService => {
    const services = Object.values(RadiographService);
    return services[Math.floor(Math.random() * services.length)];
  };

  const getRandomComplementaryService = (): ComplementaryService => {
    const services = Object.values(ComplementaryService);
    return services[Math.floor(Math.random() * services.length)];
  };

  const getRandomTomographyService = (): TomographyService => {
    const services = Object.values(TomographyService);
    return services[Math.floor(Math.random() * services.length)];
  };

  const getRandomOrthodonticPackage = (): OrthodonticPackage => {
    const packages = Object.values(OrthodonticPackage);
    return packages[Math.floor(Math.random() * packages.length)];
  };

  const getRandomIndividualStudy = (): IndividualOrthodonticStudy => {
    const studies = Object.values(IndividualOrthodonticStudy);
    return studies[Math.floor(Math.random() * studies.length)];
  };

  const imagingOrders = [
    {
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      radiographService: getRandomRadiographService(),
      reportRequired: true,
      studyObjective: 'Evaluación de caries interproximales',
      observations: 'Paciente con historia de caries recurrente',
      toothNumber: '16, 17, 26, 27',
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      radiographService: getRandomRadiographService(),
      complementaryService: getRandomComplementaryService(),
      reportRequired: false,
      studyObjective: 'Control post-tratamiento',
      observations: 'Seguimiento de tratamiento endodóntico',
      toothNumber: '14',
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      tomographyService: getRandomTomographyService(),
      reportRequired: true,
      studyObjective: 'Planificación de implantes',
      observations: 'Evaluación de densidad ósea',
      toothNumber: '11, 21',
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      orthodonticPackage: getRandomOrthodonticPackage(),
      reportRequired: true,
      studyObjective: 'Estudio ortodóntico completo',
      observations: 'Paciente adolescente, maloclusión clase II',
      toothNumber: 'Todas las piezas',
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.CANCELLED,
      orderDate: getRandomDate(),
      individualOrthodonticStudy: getRandomIndividualStudy(),
      reportRequired: false,
      studyObjective: 'Cefalometría lateral',
      observations: 'Paciente no se presentó a la cita',
      toothNumber: null,
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      radiographService: getRandomRadiographService(),
      tomographyService: getRandomTomographyService(),
      reportRequired: true,
      studyObjective: 'Diagnóstico de patología maxilofacial',
      observations: 'Sospecha de quiste en maxilar superior',
      toothNumber: '13, 14, 15',
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      radiographService: getRandomRadiographService(),
      complementaryService: getRandomComplementaryService(),
      reportRequired: true,
      studyObjective: 'Control de periodontitis',
      observations: 'Paciente con enfermedad periodontal avanzada',
      toothNumber: 'Todas las piezas',
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      tomographyService: getRandomTomographyService(),
      reportRequired: true,
      studyObjective: 'Evaluación de ATM',
      observations: 'Dolor articular y limitación de apertura',
      toothNumber: null,
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      orthodonticPackage: getRandomOrthodonticPackage(),
      reportRequired: false,
      studyObjective: 'Seguimiento de tratamiento ortodóntico',
      observations: 'Control mensual de brackets',
      toothNumber: 'Todas las piezas',
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      radiographService: getRandomRadiographService(),
      reportRequired: true,
      studyObjective: 'Evaluación pre-operatoria',
      observations: 'Cirugía de terceros molares programada',
      toothNumber: '18, 28, 38, 48',
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.IN_PROGRESS,
      orderDate: getRandomDate(),
      individualOrthodonticStudy: getRandomIndividualStudy(),
      reportRequired: true,
      studyObjective: 'Análisis cefalométrico',
      observations: 'Paciente con prognatismo mandibular',
      toothNumber: null,
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      radiographService: getRandomRadiographService(),
      complementaryService: getRandomComplementaryService(),
      reportRequired: false,
      studyObjective: 'Control rutinario',
      observations: 'Paciente con buena higiene oral',
      toothNumber: 'Todas las piezas',
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.COMPLETED,
      orderDate: getRandomDate(),
      tomographyService: getRandomTomographyService(),
      reportRequired: true,
      studyObjective: 'Planificación de cirugía ortognática',
      observations: 'Maloclusión clase III severa',
      toothNumber: null,
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.CANCELLED,
      orderDate: getRandomDate(),
      radiographService: getRandomRadiographService(),
      reportRequired: false,
      studyObjective: 'Evaluación de trauma dental',
      observations: 'Paciente canceló por motivos personales',
      toothNumber: '11, 12',
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
    {
      status: OrderStatus.PENDING,
      orderDate: getRandomDate(),
      orthodonticPackage: getRandomOrthodonticPackage(),
      reportRequired: true,
      studyObjective: 'Inicio de tratamiento ortodóntico',
      observations: 'Paciente adolescente, maloclusión clase I',
      toothNumber: 'Todas las piezas',
      userId: users[Math.floor(Math.random() * users.length)].id,
      patientId: patients[Math.floor(Math.random() * patients.length)].id,
      clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
    },
  ];

  let createdCount = 0;
  let errorCount = 0;

  for (const orderData of imagingOrders) {
    try {
      await prisma.imagingOrder.create({
        data: orderData,
      });
      createdCount++;
      console.log(
        `✅ Orden de imagen creada: ${orderData.status} para paciente ${orderData.patientId}`,
      );
    } catch (error) {
      errorCount++;
      console.error(
        `❌ Error creando orden de imagen para paciente ${orderData.patientId}:`,
        error,
      );
    }
  }

  const totalOrders = await prisma.imagingOrder.count();
  const ordersByStatus = await prisma.imagingOrder.groupBy({
    by: ['status'],
    _count: { status: true },
  });

  console.log('');
  console.log('🎉 Semilla de órdenes de imagen completada!');
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
    '📋 Las 15 órdenes de imagen están listas para usar en el sistema.',
  );
}

main()
  .catch((e) => {
    console.error(
      '❌ Error durante la ejecución de semillas de órdenes de imagen:',
      e,
    );
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
