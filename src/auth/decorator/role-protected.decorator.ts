import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';

export const META_ROLES = 'roles';

export const RoleProtected = (
  ...args: Role[]
): MethodDecorator & ClassDecorator => {
  return applyDecorators(SetMetadata(META_ROLES, args), UseGuards(RoleGuard));
};
