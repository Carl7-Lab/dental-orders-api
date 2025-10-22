import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Patient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { getPaginationParams, getTotalPages } from 'src/common/utils';

export interface PaginatedPatients {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: Patient[];
}

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePatientDto): Promise<Patient> {
    return await this.prisma.patient.create({
      data: dto,
    });
  }

  async findAll(pagination: PaginationDto): Promise<PaginatedPatients> {
    const { page, limit, skip } = getPaginationParams(pagination);

    const [data, total] = await Promise.all([
      this.prisma.patient.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.patient.count(),
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

  async findOne(id: number): Promise<Patient> {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException(`Paciente con id "${id}" no encontrado`);
    }

    return patient;
  }

  async update(id: number, dto: UpdatePatientDto): Promise<Patient> {
    await this.findOne(id);

    return await this.prisma.patient.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<Patient> {
    await this.findOne(id);

    return await this.prisma.patient.delete({
      where: { id },
    });
  }
}
