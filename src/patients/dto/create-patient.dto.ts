import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({
    description: 'Nombre del paciente',
    example: 'María González',
  })
  name: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  @ApiProperty({
    description: 'El email del paciente',
    example: 'maria.gonzalez@example.com',
    required: false,
  })
  email?: string;

  @IsNumberString()
  @IsOptional()
  @Length(10, 10)
  @ApiProperty({
    description: 'El número de teléfono del paciente (10 dígitos)',
    example: '0991234567',
    required: false,
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  @ApiProperty({
    description: 'La dirección del paciente',
    example: 'Calle 456, Ciudad, País',
    required: false,
  })
  address?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  @ApiProperty({
    description: 'Notas adicionales sobre el paciente',
    example: 'Alérgico a la penicilina',
    required: false,
  })
  notes?: string;
}
