import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayloadWithRT } from 'src/auth/interfaces';

export const GetCurrentUser = createParamDecorator(
  (
    data: keyof JwtPayloadWithRT | undefined,
    ctx: ExecutionContext,
  ): JwtPayloadWithRT | JwtPayloadWithRT[keyof JwtPayloadWithRT] => {
    const req = ctx.switchToHttp().getRequest<Request>();
    if (!data) return req.user as JwtPayloadWithRT;

    return req.user?.[data] as JwtPayloadWithRT[keyof JwtPayloadWithRT];
  },
);
