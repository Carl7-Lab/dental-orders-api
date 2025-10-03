import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { OrderType, OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  @IsEnum(OrderType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'El tipo de orden',
    enum: OrderType,
    example: OrderType.RADIOGRAPHY,
  })
  orderType: OrderType;

  @IsEnum(OrderStatus)
  @IsOptional()
  @ApiProperty({
    description: 'El estado de la orden',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    required: false,
  })
  status?: OrderStatus;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'La fecha de la orden',
    example: new Date(),
  })
  orderDate: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'El ID del usuario que crea la orden',
    example: 1,
  })
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'El ID del paciente para la orden',
    example: 1,
  })
  patientId: number;
}
