import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class CreateLaboratoryOrderDto {
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
  @IsPositive()
  @ApiProperty({
    description: 'El ID del usuario que crea la orden',
    example: 1,
  })
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: 'El ID del paciente para la orden',
    example: 1,
  })
  patientId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: 'El ID de la clínica para la orden',
    example: 1,
  })
  clinicId: number;
}
