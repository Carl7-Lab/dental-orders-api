import { ApiProperty } from '@nestjs/swagger';
import { User, Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'El id del usuario',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'El nombre del usuario',
    example: 'Dr. Juan Pérez',
  })
  name: string;

  @ApiProperty({
    description: 'El email del usuario',
    example: 'juan.perez@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'La contraseña del usuario',
    example: 'password123',
  })
  @Exclude()
  password: string;

  @ApiProperty({
    description: 'El número de teléfono del usuario',
    example: '0991234567',
    required: false,
    nullable: true,
  })
  phone: string | null;

  @ApiProperty({
    description: 'La dirección del usuario',
    example: 'Calle 123, Ciudad, País',
    required: false,
    nullable: true,
  })
  address: string | null;

  @ApiProperty({
    description: 'El rol del usuario',
    enum: Role,
    example: Role.DOCTOR,
  })
  role: Role;

  @ApiProperty({
    description: 'Si el usuario está activo',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'La fecha de creación del usuario',
  })
  @Exclude()
  createdAt: Date;

  @ApiProperty({
    description: 'La fecha de actualización del usuario',
  })
  @Exclude()
  updatedAt: Date;
}
