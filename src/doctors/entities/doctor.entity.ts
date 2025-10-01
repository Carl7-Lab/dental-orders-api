import { ApiProperty } from '@nestjs/swagger';
import { Doctor, Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class DoctorEntity implements Doctor {
  constructor(partial: Partial<DoctorEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'El id del doctor',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'El nombre del doctor',
    example: 'Dr. Juan Pérez',
  })
  name: string;

  @ApiProperty({
    description: 'El email del doctor',
    example: 'juan.perez@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'La contraseña del doctor',
    example: 'password123',
  })
  @Exclude()
  password: string;

  @ApiProperty({
    description: 'El número de teléfono del doctor',
    example: '0991234567',
    required: false,
    nullable: true,
  })
  phone: string | null;

  @ApiProperty({
    description: 'La dirección del doctor',
    example: 'Calle 123, Ciudad, País',
    required: false,
    nullable: true,
  })
  address: string | null;

  @ApiProperty({
    description: 'La especialidad del doctor',
    example: 'Ortodoncista',
    required: false,
    nullable: true,
  })
  specialty: string | null;

  @ApiProperty({
    description: 'El rol del doctor',
    enum: Role,
    example: Role.DOCTOR,
  })
  role: Role;

  @ApiProperty({
    description: 'Si el doctor está activo',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'La fecha de creación del doctor',
  })
  @Exclude()
  createdAt: Date;

  @ApiProperty({
    description: 'La fecha de actualización del doctor',
  })
  @Exclude()
  updatedAt: Date;
}
