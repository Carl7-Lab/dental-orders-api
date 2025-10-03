import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { HashAdapter } from 'src/common/adapters/hash.adapter';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashAdapter,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    dto.password = await this.hash.hashData(dto.password);

    return await this.prisma.user.create({
      data: dto,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: { isActive: true },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id "${id}" no encontrado`);
    }

    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.findOne(id);

    if (dto.password) {
      dto.password = await this.hash.hashData(dto.password);
    }

    return await this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<User> {
    await this.findOne(id);

    return await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
