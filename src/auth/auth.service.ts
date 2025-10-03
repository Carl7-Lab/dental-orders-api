import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { SigninDto } from './dto/signin.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from './interfaces';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async signupLocal(dto: CreateUserDto): Promise<Tokens> {
    const user = await this.usersService.create(dto);

    const tokens = await this.getTokens({
      sub: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone as string,
      address: user.address as string,
      role: user.role,
    });
    return tokens;
  }

  async signinLocal(dto: SigninDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException(
        'Acceso denegado, no se encontró el usuario',
      );
    }

    const isPasswordValid = await argon.verify(user.password, dto.password);

    if (!isPasswordValid) {
      throw new ForbiddenException(
        'Acceso denegado, contraseña o email incorrectos',
      );
    }

    const tokens = await this.getTokens({
      sub: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone as string,
      address: user.address as string,
      role: user.role,
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

  async refreshTokens(userId: number, _refreshToken: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ForbiddenException('Acceso denegado');
    }

    const tokens = await this.getTokens({
      sub: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone as string,
      address: user.address as string,
      role: user.role,
    });
    return tokens;
  }
}
