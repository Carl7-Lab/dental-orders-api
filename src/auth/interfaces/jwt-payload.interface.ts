import { Role } from '@prisma/client';

export interface JwtPayload {
  sub: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: Role;
}
