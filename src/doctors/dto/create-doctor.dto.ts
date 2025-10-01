import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({
    description: 'Nombre del doctor',
    example: 'Dr. Juan Pérez',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @ApiProperty({
    description: 'El email del doctor',
    example: 'juan.perez@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  @ApiProperty({
    description: 'La contraseña del doctor',
    example: 'password123',
  })
  password: string;

  @IsNumberString()
  @IsOptional()
  @Length(10, 10)
  @ApiProperty({
    description: 'El número de teléfono del doctor (10 dígitos)',
    example: '0991234567',
    required: false,
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({
    description: 'La dirección del doctor',
    example: 'Calle 123, Ciudad, País',
  })
  address?: string;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({
    description: 'El rol del doctor',
    enum: Role,
    default: Role.DOCTOR,
    required: false,
  })
  role?: Role;
}
