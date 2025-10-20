import { ApiProperty } from '@nestjs/swagger';
import {
  ImagingOrder,
  OrderStatus,
  RadiographService,
  ComplementaryService,
  TomographyService,
  OrthodonticPackage,
  IndividualOrthodonticStudy,
  User,
  Patient,
  Clinic,
} from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ImagingOrderEntity implements ImagingOrder {
  constructor(partial: Partial<ImagingOrderEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'El id de la orden de imagen',
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
    description: 'Servicio de radiografía',
    enum: RadiographService,
    required: false,
  })
  radiographService: RadiographService | null;

  @ApiProperty({
    description: 'Servicio complementario',
    enum: ComplementaryService,
    required: false,
  })
  complementaryService: ComplementaryService | null;

  @ApiProperty({
    description: 'Servicio de tomografía',
    enum: TomographyService,
    required: false,
  })
  tomographyService: TomographyService | null;

  @ApiProperty({
    description: 'Paquete ortodóncico',
    enum: OrthodonticPackage,
    required: false,
  })
  orthodonticPackage: OrthodonticPackage | null;

  @ApiProperty({
    description: 'Estudio ortodóncico individual',
    enum: IndividualOrthodonticStudy,
    required: false,
  })
  individualOrthodonticStudy: IndividualOrthodonticStudy | null;

  @ApiProperty({
    description: 'Si se requiere reporte',
    example: false,
  })
  reportRequired: boolean;

  @ApiProperty({
    description: 'Objetivo del estudio',
    required: false,
  })
  studyObjective: string | null;

  @ApiProperty({
    description: 'Observaciones',
    required: false,
  })
  observations: string | null;

  @ApiProperty({
    description: 'Número de diente',
    required: false,
  })
  toothNumber: string | null;

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
