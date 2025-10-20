import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClinicDto, UpdateClinicDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Clinic } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { getPaginationParams, getTotalPages } from 'src/common/utils';

export type ClinicWithRelations = Clinic;

export type PaginatedClinics = {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: ClinicWithRelations[];
};

@Injectable()
export class ClinicsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateClinicDto): Promise<Clinic> {
    return await this.prisma.clinic.create({
      data: dto,
    });
  }

  async findAll(pagination: PaginationDto): Promise<PaginatedClinics> {
    const { page, limit, skip } = getPaginationParams(pagination);

    const [data, total] = await Promise.all([
      this.prisma.clinic.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.clinic.count(),
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

  async findOne(id: number): Promise<ClinicWithRelations> {
    const clinic = await this.prisma.clinic.findUnique({
      where: { id },
    });

    if (!clinic) {
      throw new NotFoundException(`Clínica con id "${id}" no encontrada`);
    }

    return clinic;
  }

  async update(id: number, dto: UpdateClinicDto): Promise<ClinicWithRelations> {
    await this.findOne(id);

    return await this.prisma.clinic.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<ClinicWithRelations> {
    await this.findOne(id);

    return await this.prisma.clinic.delete({
      where: { id },
    });
  }
}
