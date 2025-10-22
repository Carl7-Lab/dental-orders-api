import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { HashAdapter } from 'src/common/adapters/hash.adapter';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { getPaginationParams, getTotalPages } from 'src/common/utils';

export type UserWithRelations = User;
export type PaginatedUsers = {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: UserWithRelations[];
};

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

  async findAll(pagination: PaginationDto): Promise<PaginatedUsers> {
    const { page, limit, skip } = getPaginationParams(pagination);

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        orderBy: { name: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.user.count(),
    ]);

    const totalPages = getTotalPages(total, limit);

    return {
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
      data,
    };
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
