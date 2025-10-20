import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Length,
  IsNumberString,
} from 'class-validator';

export class CreateClinicDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({
    description: 'El nombre de la clínica',
    example: 'Clínica Dental Central',
  })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  @ApiProperty({
    description: 'La dirección de la clínica',
    example: 'Av. Principal 123, Ciudad',
    required: false,
  })
  address?: string;

  @IsNumberString()
  @IsOptional()
  @Length(0, 10)
  @ApiProperty({
    description: 'El teléfono de la clínica',
    example: '0991234567',
    required: false,
  })
  phone?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({
    description: 'El email de la clínica',
    example: 'contacto@clinicadental.com',
    required: false,
  })
  email?: string;
}
