import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces';

export const GetCurrentUserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): number => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req.user as JwtPayload;

    return user.sub;
  },
);
