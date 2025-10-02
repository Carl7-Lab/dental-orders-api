import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🏥 Iniciando semilla de pacientes...');

  const patients = [
    {
      name: 'María González Rodríguez',
      email: 'maria.gonzalez@email.com',
      phone: '0991234567',
      address: 'Av. Amazonas 1234, Quito',
      notes: 'Alérgica a la penicilina. Prefiere citas en la mañana.',
    },
    {
      name: 'Carlos Eduardo Pérez',
      email: 'carlos.perez@email.com',
      phone: '0987654321',
      address: 'Calle 9 de Octubre 567, Guayaquil',
      notes: 'Paciente con diabetes. Requiere atención especial.',
    },
    {
      name: 'Ana Lucía Martínez',
      email: 'ana.martinez@email.com',
      phone: '0976543210',
      address: 'Av. 6 de Diciembre 890, Quito',
      notes: 'Embarazada de 5 meses. Evitar radiografías.',
    },
    {
      name: 'Roberto Silva Vega',
      email: 'roberto.silva@email.com',
      phone: '0965432109',
      address: 'Calle Rocafuerte 234, Cuenca',
      notes: 'Fumador. Historia de enfermedad periodontal.',
    },
    {
      name: 'Carmen Dolores Herrera',
      email: 'carmen.herrera@email.com',
      phone: '0954321098',
      address: 'Av. Libertador 345, Ambato',
      notes: 'Paciente de la tercera edad. Necesita asistencia.',
    },
    {
      name: 'Diego Fernando Torres',
      email: 'diego.torres@email.com',
      phone: '0943210987',
      address: 'Calle Bolívar 678, Riobamba',
      notes: 'Estudiante universitario. Horarios flexibles.',
    },
    {
      name: 'Patricia Isabel Jiménez',
      email: 'patricia.jimenez@email.com',
      phone: '0932109876',
      address: 'Av. Pichincha 901, Loja',
      notes: 'Madre soltera. Prefiere citas los fines de semana.',
    },
    {
      name: 'Luis Miguel Córdova',
      email: 'luis.cordova@email.com',
      phone: '0921098765',
      address: 'Calle Sucre 012, Manta',
      notes: 'Deportista. Bruxismo nocturno.',
    },
    {
      name: 'Sofía Alejandra Vargas',
      email: 'sofia.vargas@email.com',
      phone: '0910987654',
      address: 'Av. Colón 345, Portoviejo',
      notes: 'Paciente pediátrica (12 años). Muy nerviosa.',
    },
    {
      name: 'Andrés Felipe Ruiz',
      email: 'andres.ruiz@email.com',
      phone: '0909876543',
      address: 'Calle 24 de Mayo 678, Esmeraldas',
      notes: 'Empresario. Solo disponible en horarios de almuerzo.',
    },
  ];

  let createdCount = 0;
  let updatedCount = 0;

  for (const patientData of patients) {
    try {
      const existingPatient = await prisma.patient.findFirst({
        where: { email: patientData.email },
      });

      if (existingPatient) {
        await prisma.patient.update({
          where: { id: existingPatient.id },
          data: patientData,
        });
        updatedCount++;
        console.log(`🔄 Paciente actualizado: ${patientData.name}`);
      } else {
        await prisma.patient.create({
          data: patientData,
        });
        createdCount++;
        console.log(`✅ Paciente creado: ${patientData.name}`);
      }
    } catch (error) {
      console.error(`❌ Error con paciente ${patientData.name}:`, error);
    }
  }

  console.log('');
  console.log('🎉 Semilla de pacientes completada!');
  console.log(`📊 Estadísticas:`);
  console.log(`   - Pacientes creados: ${createdCount}`);
  console.log(`   - Pacientes actualizados: ${updatedCount}`);
  console.log(`   - Total procesados: ${createdCount + updatedCount}`);
  console.log('');
  console.log('👥 Los 10 pacientes están listos para usar en el sistema.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante la ejecución de semillas de pacientes:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
