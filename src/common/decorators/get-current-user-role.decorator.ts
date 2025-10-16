import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces';

export const GetCurrentUserRole = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): Role => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req.user as JwtPayload;

    return user.role;
  },
);
