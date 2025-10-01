import { ApiProperty } from '@nestjs/swagger';
import { Order, OrderType, OrderStatus } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class OrderEntity implements Order {
  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'El id de la orden',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'El tipo de orden',
    enum: OrderType,
    example: OrderType.RADIOGRAPHY,
  })
  orderType: OrderType;

  @ApiProperty({
    description: 'El estado de la orden',
    enum: OrderStatus,
    example: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @ApiProperty({
    description: 'El ID del doctor',
    example: 1,
  })
  doctorId: number;

  @ApiProperty({
    description: 'El ID del paciente',
    example: 1,
  })
  patientId: number;

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
