import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from '../interfaces';
import { META_ROLES } from '../decorator/role-protected.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const validRoles: string[] = this.reflector.getAllAndOverride(META_ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);

    const req: Express.Request = context.switchToHttp().getRequest();
    const user = req.user as JwtPayload;

    if (validRoles.length === 0) return true;

    if (!user) throw new BadRequestException('Usuario no encontrado');

    if (validRoles.includes(user.role)) return true;

    throw new ForbiddenException(
      `El usuario ${user.name} necesita un rol válido: "${validRoles.join(', ')}"`,
    );
  }
}
