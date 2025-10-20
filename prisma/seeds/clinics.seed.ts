import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🏥 Iniciando semilla de clínicas...');

  const clinics = [
    {
      name: 'Clínica Dental San José',
      address: 'Av. Amazonas 1234, Quito',
      phone: '0992345678',
      email: 'info@clinicasanjose.com',
    },
    {
      name: 'Centro Odontológico Moderno',
      address: 'Calle 9 de Octubre 567, Guayaquil',
      phone: '0993456789',
      email: 'contacto@centromoderno.com',
    },
    {
      name: 'Dental Care Plus',
      address: 'Av. 6 de Diciembre 890, Quito',
      phone: '0994567890',
      email: 'info@dentalcareplus.com',
    },
    {
      name: 'Clínica Dental Los Andes',
      address: 'Calle Rocafuerte 234, Cuenca',
      phone: '0995678901',
      email: 'contacto@losandesdental.com',
    },
    {
      name: 'Centro de Especialidades Dentales',
      address: 'Av. Libertador 345, Ambato',
      phone: '0996789012',
      email: 'info@especialidadesdental.com',
    },
    {
      name: 'Dental Studio Pro',
      address: 'Calle Bolívar 678, Riobamba',
      phone: '0997890123',
      email: 'contacto@dentalstudiopro.com',
    },
    {
      name: 'Clínica Dental del Sur',
      address: 'Av. Pichincha 901, Loja',
      phone: '0998901234',
      email: 'info@dentaldelsur.com',
    },
    {
      name: 'Centro Odontológico del Pacífico',
      address: 'Calle Sucre 012, Manta',
      phone: '0999012345',
      email: 'contacto@odontologicopacifico.com',
    },
    {
      name: 'Dental Care Center',
      address: 'Av. Colón 345, Portoviejo',
      phone: '0990123456',
      email: 'info@dentalcarecenter.com',
    },
    {
      name: 'Clínica Dental Esmeraldas',
      address: 'Calle 24 de Mayo 678, Esmeraldas',
      phone: '0991234567',
      email: 'contacto@dentalesmeraldas.com',
    },
  ];

  let createdCount = 0;
  let updatedCount = 0;

  for (const clinicData of clinics) {
    try {
      const existingClinic = await prisma.clinic.findFirst({
        where: { email: clinicData.email },
      });
      if (existingClinic) {
        await prisma.clinic.update({
          where: { id: existingClinic.id },
          data: clinicData,
        });
        updatedCount++;
        console.log(`🔄 Clínica actualizada: ${clinicData.name}`);
      } else {
        await prisma.clinic.create({
          data: clinicData,
        });
        createdCount++;
        console.log(`✅ Clínica creada: ${clinicData.name}`);
      }
    } catch (error) {
      console.error(`❌ Error con clínica ${clinicData.name}:`, error);
    }
  }

  console.log('');
  console.log('🎉 Semilla de clínicas completada!');
  console.log(`📊 Estadísticas:`);
  console.log(`   - Clínicas creadas: ${createdCount}`);
  console.log(`   - Clínicas actualizadas: ${updatedCount}`);
  console.log(`   - Total procesadas: ${createdCount + updatedCount}`);
  console.log('');
  console.log('🏥 Las 10 clínicas están listas para usar en el sistema.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante la ejecución de semillas de clínicas:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
