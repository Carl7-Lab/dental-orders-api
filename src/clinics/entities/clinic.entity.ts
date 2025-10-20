import { ApiProperty } from '@nestjs/swagger';
import { Clinic } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ClinicEntity implements Clinic {
  constructor(partial: Partial<ClinicEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'El id de la clínica',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'El nombre de la clínica',
    example: 'Clínica Dental Central',
  })
  name: string;

  @ApiProperty({
    description: 'La dirección de la clínica',
    example: 'Av. Principal 123, Ciudad',
    required: false,
  })
  address: string | null;

  @ApiProperty({
    description: 'El teléfono de la clínica',
    example: '+1234567890',
    required: false,
  })
  phone: string | null;

  @ApiProperty({
    description: 'El email de la clínica',
    example: 'contacto@clinicadental.com',
    required: false,
  })
  email: string | null;

  @ApiProperty({
    description: 'La fecha de creación de la clínica',
  })
  @Exclude()
  createdAt: Date;

  @ApiProperty({
    description: 'La fecha de actualización de la clínica',
  })
  @Exclude()
  updatedAt: Date;
}
