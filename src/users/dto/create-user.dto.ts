import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
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

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Dr. Juan Pérez',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @ApiProperty({
    description: 'El email del usuario',
    example: 'admin@dental.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  @ApiProperty({
    description: 'La contraseña del usuario',
    example: 'password123',
  })
  password: string;

  @IsNumberString()
  @IsOptional()
  @IsEmpty()
  @Length(0, 10)
  @ApiProperty({
    description: 'El número de teléfono del usuario (10 dígitos)',
    example: '0991234567',
    required: false,
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({
    description: 'La dirección del usuario',
    example: 'Calle 123, Ciudad, País',
  })
  address?: string;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({
    description: 'El rol del usuario',
    enum: Role,
    default: Role.ADMIN,
    required: false,
  })
  role?: Role;
}
