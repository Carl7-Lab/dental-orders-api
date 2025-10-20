import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  MaxLength,
  IsNumberString,
  IsPositive,
} from 'class-validator';
import {
  OrderStatus,
  RadiographService,
  ComplementaryService,
  TomographyService,
  OrthodonticPackage,
  IndividualOrthodonticStudy,
} from '@prisma/client';

export class CreateImagingOrderDto {
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

  @IsEnum(RadiographService)
  @IsOptional()
  @ApiProperty({
    description: 'Servicio de radiografía',
    enum: RadiographService,
    required: false,
  })
  radiographService?: RadiographService;

  @IsEnum(ComplementaryService)
  @IsOptional()
  @ApiProperty({
    description: 'Servicio complementario',
    enum: ComplementaryService,
    required: false,
  })
  complementaryService?: ComplementaryService;

  @IsEnum(TomographyService)
  @IsOptional()
  @ApiProperty({
    description: 'Servicio de tomografía',
    enum: TomographyService,
    required: false,
  })
  tomographyService?: TomographyService;

  @IsEnum(OrthodonticPackage)
  @IsOptional()
  @ApiProperty({
    description: 'Paquete ortodóncico',
    enum: OrthodonticPackage,
    required: false,
  })
  orthodonticPackage?: OrthodonticPackage;

  @IsEnum(IndividualOrthodonticStudy)
  @IsOptional()
  @ApiProperty({
    description: 'Estudio ortodóncico individual',
    enum: IndividualOrthodonticStudy,
    required: false,
  })
  individualOrthodonticStudy?: IndividualOrthodonticStudy;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Si se requiere reporte',
    default: false,
    required: false,
  })
  reportRequired?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Objetivo del estudio',
    required: false,
  })
  studyObjective?: string;

  @IsString()
  @IsOptional()
  @MaxLength(250)
  @ApiProperty({
    description: 'Observaciones',
    required: false,
  })
  observations?: string;

  @IsNumberString()
  @IsPositive()
  @IsOptional()
  @ApiProperty({
    description: 'Número de diente',
    required: false,
  })
  toothNumber?: string;

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
