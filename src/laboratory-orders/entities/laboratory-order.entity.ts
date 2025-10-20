import { ApiProperty } from '@nestjs/swagger';
import {
  LaboratoryOrder,
  OrderStatus,
  User,
  Patient,
  Clinic,
} from '@prisma/client';
import { Exclude } from 'class-transformer';

export class LaboratoryOrderEntity implements LaboratoryOrder {
  constructor(partial: Partial<LaboratoryOrderEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'El id de la orden de laboratorio',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'El estado de la orden',
    enum: OrderStatus,
    example: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @ApiProperty({
    description: 'La fecha de la orden',
    example: new Date(),
  })
  orderDate: Date;

  @ApiProperty({
    description: 'El ID del usuario',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'El ID del paciente',
    example: 1,
  })
  patientId: number;

  @ApiProperty({
    description: 'El ID de la clínica',
    example: 1,
  })
  clinicId: number;

  @ApiProperty({
    description: 'Información del usuario',
    type: Object,
  })
  user?: Omit<User, 'createdAt' | 'updatedAt' | 'isActive' | 'password'>;

  @ApiProperty({
    description: 'Información del paciente',
    type: Object,
  })
  patient?: Omit<Patient, 'createdAt' | 'updatedAt'>;

  @ApiProperty({
    description: 'Información de la clínica',
    type: Object,
  })
  clinic?: Omit<Clinic, 'createdAt' | 'updatedAt'>;

  @ApiProperty({
    description: 'La fecha de creación de la orden',
  })
  @Exclude()
  createdAt: Date;

  @ApiProperty({
    description: 'La fecha de actualización de la orden',
  })
  @Exclude()
  updatedAt: Date;
}
