import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { SigninDto } from './dto/signin.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from './interfaces';
import { DoctorsService } from 'src/doctors/doctors.service';
import { CreateDoctorDto } from 'src/doctors/dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly doctorsService: DoctorsService,
  ) {}

  async signupLocal(dto: CreateDoctorDto): Promise<Tokens> {
    const doctor = await this.doctorsService.create(dto);

    const tokens = await this.getTokens({
      sub: doctor.id,
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone as string,
      address: doctor.address as string,
      role: doctor.role,
    });
    return tokens;
  }

  async signinLocal(dto: SigninDto): Promise<Tokens> {
    const doctor = await this.prisma.doctor.findUnique({
      where: { email: dto.email },
    });

    if (!doctor) {
      throw new ForbiddenException('Acceso denegado, no se encontró el doctor');
    }

    const isPasswordValid = await argon.verify(doctor.password, dto.password);

    if (!isPasswordValid) {
      throw new ForbiddenException(
        'Acceso denegado, contraseña o email incorrectos',
      );
    }

    const tokens = await this.getTokens({
      sub: doctor.id,
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone as string,
      address: doctor.address as string,
      role: doctor.role,
    });
    return tokens;
  }

  async getTokens(payload: JwtPayload): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: payload.sub,
      name: payload.name || '',
      email: payload.email || '',
      phone: payload.phone as string,
      address: payload.address as string,
      role: payload.role || '',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('jwtSecret'),
        expiresIn: this.configService.get<string>('jwtExpirationTime'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('jwtRefreshSecret'),
        expiresIn: this.configService.get<string>('jwtRefreshExpirationTime'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(
    doctorId: number,
    _refreshToken: string,
  ): Promise<Tokens> {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: doctorId },
    });

    if (!doctor) {
      throw new ForbiddenException('Acceso denegado');
    }

    const tokens = await this.getTokens({
      sub: doctor.id,
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone as string,
      address: doctor.address as string,
      role: doctor.role,
    });
    return tokens;
  }
}
