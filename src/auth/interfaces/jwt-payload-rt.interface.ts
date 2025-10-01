import { JwtPayload } from './jwt-payload.interface';

export interface JwtPayloadWithRT extends JwtPayload {
  refreshToken: string;
}
