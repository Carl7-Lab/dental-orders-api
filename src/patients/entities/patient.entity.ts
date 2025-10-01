import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class PatientEntity implements Patient {
  constructor(partial: Partial<PatientEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'El id del paciente',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'El nombre del paciente',
    example: 'María González',
  })
  name: string;

  @ApiProperty({
    description: 'El email del paciente',
    example: 'maria.gonzalez@example.com',
    required: false,
    nullable: true,
  })
  email: string | null;

  @ApiProperty({
    description: 'El número de teléfono del paciente',
    example: '0991234567',
    required: false,
    nullable: true,
  })
  phone: string | null;

  @ApiProperty({
    description: 'La dirección del paciente',
    example: 'Calle 456, Ciudad, País',
    required: false,
    nullable: true,
  })
  address: string | null;

  @ApiProperty({
    description: 'Notas adicionales sobre el paciente',
    example: 'Alérgico a la penicilina',
    required: false,
    nullable: true,
  })
  notes: string | null;

  @ApiProperty({
    description: 'La fecha de creación del paciente',
  })
  @Exclude()
  createdAt: Date;

  @ApiProperty({
    description: 'La fecha de actualización del paciente',
  })
  @Exclude()
  updatedAt: Date;
}
