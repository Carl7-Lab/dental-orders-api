import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces';
import { DoctorsService } from 'src/doctors/doctors.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(
    configService: ConfigService,
    private readonly doctorsService: DoctorsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwtSecret')!,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const doctor = await this.doctorsService.findOne(payload.sub);

    if (!doctor || !doctor.isActive) {
      throw new UnauthorizedException('Acceso denegado');
    }

    return payload;
  }
}
